import { createContext, useState, useEffect } from "react";
import { db } from '../database/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; 

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const loadStorageData = () => {
      const storageUser = sessionStorage.getItem("@AuthFirebase:user");
      if(storageUser){
        setUser(JSON.parse(storageUser));
      }
    };
    loadStorageData();
  }, [])

  const handleClickButtonLoginWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
        sessionStorage.setItem("@authFirebase:token", token);
        sessionStorage.setItem("@authFirebase:user", JSON.stringify(user));
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  return(
    <AuthGoogleContext.Provider value={{ handleClickButtonLoginWithGoogle, signed: !!user }}>
      {children}
    </AuthGoogleContext.Provider>
  )
}
