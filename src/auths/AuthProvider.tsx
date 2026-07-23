import React, { ReactNode, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
   User, // 1. Imported User type
} from "firebase/auth";
import AuthContext from "./AuthContext";
import queryClient from "../api/queryClient";
import app from "../firebase/firebase.config";
interface UpdateInfo{ 
  displayName?: string; 
  photoURL?: string 
}
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }:{children:ReactNode}) => {
  const [authLoading, setAuthLoading] = useState(true);
  // 2. Allowed user state to hold a Firebase User object or null
  const [user, setUser] = useState<User| null>(null);
  const userRegister = (email:string, password:string) => {
    setAuthLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const userLogin = (email:string, password:string) => {
    setAuthLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    setAuthLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const userProfileUpdate = (updateInfo:UpdateInfo) => {
    setAuthLoading(true);
    if(!auth.currentUser){
      return Promise.reject(new Error("User is not currently login."))
    }
    return updateProfile(auth.currentUser, updateInfo);
  };
  const userLogout = () => {
    setAuthLoading(true);
    queryClient.clear();
    return signOut(auth);
  };
  useEffect(() => {
    setAuthLoading(true);
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setAuthLoading(false);
      } else {
        setUser(null);
        setAuthLoading(false);
      }
    });
    return () => {
      unSubscribe();
    };
  }, [user?.email]);
  const authInfo = {
    user,
    setUser,
    authLoading,
    setAuthLoading,
    userRegister,
    userLogin,
    googleLogin,
    userProfileUpdate,
    userLogout,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
