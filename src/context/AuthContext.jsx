import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../lib/firebase.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [tokens, setTokens] = useState(0);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return undefined;
    }

    let unsubUser = null;
    let unsubWallet = null;

    const unsubAuth = onAuthStateChanged(auth, (fbUser) => {
      if (unsubUser) { unsubUser(); unsubUser = null; }
      if (unsubWallet) { unsubWallet(); unsubWallet = null; }

      setUser(fbUser);
      if (!fbUser) {
        setProfile(null);
        setTokens(0);
        setLoading(false);
        return;
      }

      if (db) {
        unsubUser = onSnapshot(
          doc(db, 'users', fbUser.uid),
          (snap) => setProfile(snap.exists() ? snap.data() : null),
          () => setProfile(null),
        );
        unsubWallet = onSnapshot(
          doc(db, 'wallets', fbUser.uid),
          (snap) => setTokens(snap.exists() ? Number(snap.data()?.tokens) || 0 : 0),
          () => setTokens(0),
        );
      }
      setLoading(false);
    });

    return () => {
      unsubAuth();
      if (unsubUser) unsubUser();
      if (unsubWallet) unsubWallet();
    };
  }, []);

  const ensureReady = () => {
    if (!isFirebaseConfigured || !auth) {
      throw new Error('Firebase Web App config is not set yet. Add VITE_FIREBASE_API_KEY and VITE_FIREBASE_APP_ID.');
    }
  };

  const signInWithEmail = useCallback(async (email, password) => {
    ensureReady();
    return signInWithEmailAndPassword(auth, email.trim(), password);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    ensureReady();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }, []);

  const signInWithApple = useCallback(async () => {
    ensureReady();
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    return signInWithPopup(auth, provider);
  }, []);

  const signOut = useCallback(async () => {
    if (!auth) return;
    await firebaseSignOut(auth);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        tokens,
        loading,
        isFirebaseConfigured,
        signInWithEmail,
        signInWithGoogle,
        signInWithApple,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
