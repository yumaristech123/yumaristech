import { initializeApp, getApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  signInWithEmailAndPassword as fbSignInWithEmail,
  createUserWithEmailAndPassword as fbCreateUserWithEmail,
  updateProfile
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  arrayUnion, 
  collection, 
  addDoc, 
  onSnapshot, 
  getDocFromServer, 
  increment,
  query,
  where,
  getDocs
} from 'firebase/firestore';

// Static import is reliable in Vite for existing files
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

const ADMIN_EMAIL = 'yumaristech@gmail.com';

// Connection Test
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The client is offline.");
    }
  }
}
testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export type CourseId = 'math' | 'english' | 'kedinasan' | 'utbk';

export function getCollName(base: string, courseId?: CourseId | null) {
  if (courseId === 'english') {
    return `${base}_en`;
  }
  if (courseId === 'kedinasan') {
    return `${base}_kd`;
  }
  if (courseId === 'utbk') {
    return `${base}_utbk`;
  }
  return base; // Default is math (uses 'users', 'quiz_results', 'classes')
}

export const signInWithGoogle = async (courseId: CourseId = 'math') => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const coll = getCollName('users', courseId);
    const userRef = doc(db, coll, result.user.uid);
    const snap = await getDoc(userRef);
    
    const isAdmin = result.user.email === ADMIN_EMAIL;

    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        role: isAdmin ? 'admin' : 'siswa',
        xp: 0,
        stars: 0,
        completedModules: []
      });
    } else if (isAdmin && snap.data().role !== 'admin') {
      // Ensure the admin role is synced if missing
      await updateDoc(userRef, { role: 'admin' });
    }
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const loginWithEmail = async (userOrEmail: string, pass: string) => {
  const normalized = userOrEmail.trim().toLowerCase();
  const finalEmail = normalized.includes('@') ? normalized : `${normalized}@zonaprestasi.com`;
  return fbSignInWithEmail(auth, finalEmail, pass);
};

export const registerWithEmail = async (userOrEmail: string, pass: string, name: string, role: 'guru' | 'siswa', kelas: string = '', courseId: CourseId = 'math') => {
  const normalized = userOrEmail.trim().toLowerCase();
  const finalEmail = normalized.includes('@') ? normalized : `${normalized}@zonaprestasi.com`;
  
  // Use a secondary app instance to avoid signing out the current (admin) user
  const secondaryApp = getApps().length > 1 
    ? getApps().find(a => a.name === 'Secondary') || initializeApp(firebaseConfig, 'Secondary')
    : initializeApp(firebaseConfig, 'Secondary');
  const secondaryAuth = getAuth(secondaryApp);
  
  try {
    const result = await fbCreateUserWithEmail(secondaryAuth, finalEmail, pass);
    await updateProfile(result.user, { displayName: name });
    
    // Create user record in firestore using the MAIN db instance
    const coll = getCollName('users', courseId);
    const path = `${coll}/${result.user.uid}`;
    try {
      await setDoc(doc(db, coll, result.user.uid), {
        uid: result.user.uid,
        displayName: name,
        email: finalEmail,
        role: role,
        kelas: kelas,
        password: pass, // Special request: storing plain text for admin visibility
        xp: 0,
        stars: 0,
        completedModules: []
      });
    } catch (e) {
      throw handleFirestoreError(e, OperationType.WRITE, path);
    }
    
    // Sign out from the secondary app immediately so it doesn't leave a session
    await signOut(secondaryAuth);
    
    return result.user;
  } catch (err: any) {
    console.error('Registration auth error:', err);
    throw err;
  }
};

export const updateUser = async (uid: string, data: Partial<any>, courseId: CourseId = 'math') => {
  try {
    const coll = getCollName('users', courseId);
    const userRef = doc(db, coll, uid);
    await updateDoc(userRef, data);
  } catch (error) {
    throw handleFirestoreError(error, OperationType.UPDATE, `users/${uid}`);
  }
};

export const deleteUserDoc = async (uid: string, courseId: CourseId = 'math') => {
  try {
    const coll = getCollName('users', courseId);
    const userRef = doc(db, coll, uid);
    await deleteDoc(userRef);
  } catch (error) {
    throw handleFirestoreError(error, OperationType.DELETE, `users/${uid}`);
  }
};

export const logout = () => signOut(auth);

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return new Error(JSON.stringify(errInfo));
}

// Helper for results
export const saveQuizResult = async (userId: string, moduleId: string, score: number, level?: string, timeTaken?: number, courseId: CourseId = 'math') => {
  try {
    const collResults = getCollName('quiz_results', courseId);
    const collUsers = getCollName('users', courseId);
    
    await addDoc(collection(db, collResults), {
      userId,
      moduleId,
      score: Math.round(score),
      level: level || 'Umum',
      timeTaken: timeTaken || 0,
      timestamp: Date.now()
    });

    const userRef = doc(db, collUsers, userId);
    const userSnap = await getDoc(userRef);
    
    const isPerfect = Math.round(score) >= 100;

    if (userSnap.exists()) {
      const data = userSnap.data();
      const alreadyCompleted = data.completedModules?.includes(moduleId);
      const needsUpdate: any = {};

      if (score >= 70 && !alreadyCompleted) {
        needsUpdate.xp = (data.xp || 0) + 50;
        needsUpdate.completedModules = arrayUnion(moduleId);
      }

      if (isPerfect) {
        needsUpdate.stars = increment(1);
      }

      if (Object.keys(needsUpdate).length > 0) {
        await updateDoc(userRef, needsUpdate);
      }
    } else {
      await setDoc(userRef, {
        uid: userId,
        xp: score >= 70 ? 50 : 0,
        stars: isPerfect ? 1 : 0,
        completedModules: score >= 70 ? [moduleId] : [],
        displayName: auth.currentUser?.displayName,
        email: auth.currentUser?.email,
        role: 'siswa'
      });
    }
  } catch (error) {
    throw handleFirestoreError(error, OperationType.WRITE, 'quiz_results');
  }
};

export interface UserData {
  uid: string;
  displayName: string;
  email: string;
  role: string;
  kelas?: string;
  password?: string;
  xp: number;
  stars: number;
  completedModules: string[];
}

export const syncUserStars = async (userId: string, courseId: CourseId = 'math') => {
  try {
    const collResults = getCollName('quiz_results', courseId);
    const collUsers = getCollName('users', courseId);
    
    // Count all perfect scores (100) for this user
    const q = query(
      collection(db, collResults), 
      where('userId', '==', userId), 
      where('score', '>=', 100)
    );
    const snap = await getDocs(q);
    
    // Additional client-side filter to be absolutely safe (Firestore >= can be slightly tricky with mixed types if any)
    const count = snap.docs.filter(d => Math.round(d.data().score) >= 100).length;
    
    const userRef = doc(db, collUsers, userId);
    await updateDoc(userRef, { stars: count });
    return count;
  } catch (error) {
    console.error('Error syncing stars:', error);
    return 0;
  }
};

// Mass sync helper
export const syncAllUsersStars = async (courseId: CourseId = 'math') => {
  try {
    const collUsers = getCollName('users', courseId);
    const usersSnap = await getDocs(collection(db, collUsers));
    
    const results: { name: string, stars: number }[] = [];
    
    for (const userDoc of usersSnap.docs) {
      const userData = userDoc.data();
      if (userData.role === 'siswa') {
        const count = await syncUserStars(userDoc.id, courseId);
        results.push({ name: userData.displayName, stars: count });
      }
    }
    return results;
  } catch (error) {
    console.error('Error mass syncing stars:', error);
    throw error;
  }
};

export const deleteQuizResult = async (id: string, courseId: CourseId = 'math') => {
  try {
    const collResults = getCollName('quiz_results', courseId);
    const collUsers = getCollName('users', courseId);
    
    // Get the document first to check the score and userId
    const resRef = doc(db, collResults, id);
    const resSnap = await getDoc(resRef);
    
    if (resSnap.exists()) {
      const { score, userId } = resSnap.data();
      const isPerfect = Math.round(score) === 100;
      
      // Delete the result
      await deleteDoc(resRef);
      
      // If it was a perfect score, decrement user's stars atomically
      if (isPerfect) {
        const userRef = doc(db, collUsers, userId);
        await updateDoc(userRef, {
          stars: increment(-1)
        });
      }
    }
  } catch (error) {
    throw handleFirestoreError(error, OperationType.DELETE, `quiz_results/${id}`);
  }
};

// Class management
export const addClass = async (name: string, courseId: CourseId = 'math') => {
  try {
    const coll = getCollName('classes', courseId);
    // Sanitize ID: only lowercase letters, numbers, and hyphens. 
    // This prevents slashes (/) from being interpreted as subcollections.
    const id = name.trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-') // Replace any non-safe character with a hyphen
      .replace(/^-+|-+$/g, '');     // Remove leading/trailing hyphens

    // Ensure ID is not empty after sanitization
    const finalId = id || `class-${Date.now()}`;
    
    await setDoc(doc(db, coll, finalId), { id: finalId, name });
  } catch (error) {
    throw handleFirestoreError(error, OperationType.WRITE, 'classes');
  }
};

export const deleteClass = async (id: string, courseId: CourseId = 'math') => {
  try {
    const coll = getCollName('classes', courseId);
    await deleteDoc(doc(db, coll, id));
  } catch (error) {
    throw handleFirestoreError(error, OperationType.DELETE, `classes/${id}`);
  }
};
