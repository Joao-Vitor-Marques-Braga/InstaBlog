import { createContext, useState, useEffect } from "react";
import { db } from '../database/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from "firebase/auth"; 
import { doc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();
export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const loadStorageData = () => {
      const storageUser = sessionStorage.getItem("@authFirebase:user");
      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
    };
    loadStorageData();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        sessionStorage.setItem("@authFirebase:user", JSON.stringify(user));
      } else {
        setUser(null);
        sessionStorage.removeItem("@authFirebase:user");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleClickButtonLoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setUser(user);
      sessionStorage.setItem("@authFirebase:token", token);
      sessionStorage.setItem("@authFirebase:user", JSON.stringify(user));
    } catch (error) {
      console.error("Error logging in with Google", error);
    }
  };

  const handleEmailLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error logging in with email and password", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      sessionStorage.removeItem("@authFirebase:user");
      sessionStorage.removeItem("@authFirebase:token");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
      });
      setUser(user);
      sessionStorage.setItem("@authFirebase:user", JSON.stringify(user));
    } catch (error) {
      console.log("Error registering user:", error);
    }
  };
  
  const loginWithEmailAndPassword = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      sessionStorage.setItem("@authFirebase:user", JSON.stringify(result.user));
    } catch (error) {
      console.error("Login error", error);
    }
  }

  return (
    <AuthGoogleContext.Provider value={{ handleClickButtonLoginWithGoogle, registerWithEmailAndPassword, handleEmailLogin, loginWithEmailAndPassword, handleLogout, signed: !!user, user }}>
      {children}
    </AuthGoogleContext.Provider>
  );
};
