import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from './../firebase/firebase.config';
import AuthContext from './AuthContext';

const auth=getAuth(app);
const googleProvider= new GoogleAuthProvider()
const AuthProvider = ({children}) => {
    const [loading, setLoading]=useState(false)
    const [user, setUser]=useState(null)
    const userRegister=(email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const userLogin=(email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleLogin=()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const userProfileUpdate=(updataInfo)=>{
        setLoading(true)
        return updateProfile(auth.currentUser, updataInfo)
    }
    const userLogout=()=>{
        setLoading(true)
        return signOut(auth)
    }
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(false)
        });
        return ()=>{
            unSubscribe()
        }
    },[])
    console.log(user)
    const authInfo={
        user,
        setUser,
        loading,
        setLoading,
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