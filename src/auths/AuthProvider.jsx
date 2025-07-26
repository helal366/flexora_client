import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from './../firebase/firebase.config';
import AuthContext from './AuthContext';
import queryClient from '../api/queryClient';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({ children }) => {
    const [authLoading, setAuthLoading] = useState(true)
    const [user, setUser] = useState(null)
    const userRegister = (email, password) => {
        setAuthLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)   
    }
    const userLogin = (email, password) => {
        setAuthLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
       
    }
    const googleLogin = () => {
        setAuthLoading(true)
        return signInWithPopup(auth, googleProvider)
       
    }
    const userProfileUpdate = (updateInfo) => {
        setAuthLoading(true)
        return updateProfile(auth.currentUser, updateInfo)
        
    }
    const userLogout = () => {
        setAuthLoading(true);
        queryClient.clear();
        return signOut(auth)
        
    }
    useEffect(() => {
        setAuthLoading(true)
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
           if(currentUser){
             setUser(currentUser);
            setAuthLoading(false);
           }else{
            setUser(null);
            setAuthLoading(false)
           }
        });
        return () => {
            unSubscribe()
        }
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
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;