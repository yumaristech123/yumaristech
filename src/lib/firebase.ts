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
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc, arrayUnion, collection, addDoc, onSnapshot, getDocFromServer } from 'firebase/firestore';

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

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const userRef = doc(db, 'users', result.user.uid);
    const snap = await getDoc(userRef);
    
    const isAdmin = result.user.email === ADMIN_EMAIL;

    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        role: isAdmin ? 'admin' : 'siswa',
        xp: 0,
        completedModules: []
      });
    }
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const loginWithEmail = async (userOrEmail: string, pass: string) => {
  const finalEmail = userOrEmail.includes('@') ? userOrEmail : `${userOrEmail.toLowerCase()}@zonaprestasi.com`;
  return fbSignInWithEmail(auth, finalEmail, pass);
};

export const registerWithEmail = async (userOrEmail: string, pass: string, name: string, role: 'guru' | 'siswa', kelas: string = '') => {
  const finalEmail = userOrEmail.includes('@') ? userOrEmail : `${userOrEmail.toLowerCase()}@zonaprestasi.com`;
  
  // Use a secondary app instance to avoid signing out the current (admin) user
  const secondaryApp = getApps().length > 1 
    ? getApps().find(a => a.name === 'Secondary') || initializeApp(firebaseConfig, 'Secondary')
    : initializeApp(firebaseConfig, 'Secondary');
  const secondaryAuth = getAuth(secondaryApp);
  
  try {
    const result = await fbCreateUserWithEmail(secondaryAuth, finalEmail, pass);
    await updateProfile(result.user, { displayName: name });
    
    // Create user record in firestore using the MAIN db instance
    const path = `users/${result.user.uid}`;
    try {
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        displayName: name,
        email: finalEmail,
        role: role,
        kelas: kelas,
        password: pass, // Special request: storing plain text for admin visibility
        xp: 0,
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

export const updateUser = async (uid: string, data: Partial<any>) => {
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, data);
  } catch (error) {
    throw handleFirestoreError(error, OperationType.UPDATE, `users/${uid}`);
  }
};

export const deleteUserDoc = async (uid: string) => {
  try {
    const userRef = doc(db, 'users', uid);
    await deleteDoc(userRef);
  } catch (error) {
    throw handleFirestoreError(error, OperationType.DELETE, `users/${uid}`);
  }
};

export const logout = () => signOut(auth);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

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
export const saveQuizResult = async (userId: string, moduleId: string, score: number, level?: string, timeTaken?: number) => {
  try {
    const path = 'quiz_results';
    await addDoc(collection(db, path), {
      userId,
      moduleId,
      score,
      level: level || 'Umum',
      timeTaken: timeTaken || 0,
      timestamp: Date.now()
    });

    if (score >= 70) {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const data = userSnap.data();
        const alreadyCompleted = data.completedModules?.includes(moduleId);
        
        await updateDoc(userRef, {
          xp: alreadyCompleted ? data.xp : (data.xp || 0) + 50,
          completedModules: arrayUnion(moduleId)
        });
      } else {
        await setDoc(userRef, {
          uid: userId,
          xp: 50,
          completedModules: [moduleId],
          displayName: auth.currentUser?.displayName,
          email: auth.currentUser?.email,
          role: 'siswa'
        });
      }
    }
  } catch (error) {
    throw handleFirestoreError(error, OperationType.WRITE, 'users/quiz_results');
  }
};
