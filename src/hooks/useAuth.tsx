import React, { useContext } from 'react';
import AuthContext from '../auths/AuthContext';


const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context; // Now TypeScript knows this is never null
};

export default useAuth;