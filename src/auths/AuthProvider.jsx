import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from './../firebase/firebase.config';
import AuthContext from './AuthContext';

const auth=getAuth(app);
const googleProvider= new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [authLoading, setAuthLoading]=useState(false)
    const [user, setUser]=useState(null)
    const userRegister=(email, password)=>{
        setAuthLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const userLogin=(email, password)=>{
        setAuthLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleLogin=()=>{
        setAuthLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const userProfileUpdate=(updataInfo)=>{
        setAuthLoading(true)
        return updateProfile(auth.currentUser, updataInfo)
    }
    const userLogout=()=>{
        setAuthLoading(true)
        return signOut(auth)
    }
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setAuthLoading(false)
        });
        return ()=>{
            unSubscribe()
        }
    },[])
    console.log(user)
    const authInfo={
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
       <AuthContext value={authInfo}>
        {children}
       </AuthContext>
    );
};

export default AuthProvider;