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
        try {
            return createUserWithEmailAndPassword(auth, email, password)
        } finally {
            setAuthLoading(false)
        }
    }
    const userLogin = (email, password) => {
        setAuthLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleLogin = () => {
        setAuthLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const userProfileUpdate = (updataInfo) => {
        setAuthLoading(true)
        return updateProfile(auth.currentUser, updataInfo)
    }
    const userLogout = () => {
        setAuthLoading(true);
        queryClient.clear();
        return signOut(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setAuthLoading(false)
        });
        return () => {
            unSubscribe()
        }
    }, [])
    // console.log('authLoading:', authLoading, 'user:', user);
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
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;