1. Data Invariants:
- A user must have a valid role (siswa, guru, admin).
- A quiz result must belong to the user who created it (userId == auth.uid).
- A class must have a unique ID and name.

2. The "Dirty Dozen" Payloads:
- Update user role to 'admin' as a non-admin.
- Create a quiz result for another user.
- Delete a user document as a non-admin.
- Create a class as a non-admin.
- Insert a 1.5KB string into a user's displayName.
- Insert a negative XP value.
- Update another user's password field.
- Remove required fields like 'uid' or 'role' from a user record.
- Inject a 'shadow field' into quiz_results.
- Create a user without a valid 'kelas' from the class list (relational sync).
- List all users without being authenticated.
- Update `createdAt` after document creation.

3. Test Runner (Summary):
- Verify all write operations require `request.auth.uid`.
- Verify `isAdmin()` correctly checks role or email.
- Verify `isValidUser()` enforces keys and types.
- Verify `isValidQuizResult()` enforces keys and types.
- Verify `delete` is restricted to admins only.
