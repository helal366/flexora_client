import React, { useContext } from 'react';
import AuthContext from '../auths/AuthContext';

const useAuth = () => {
    const allAuthValues=useContext(AuthContext)
    return allAuthValues;
};

export default useAuth;