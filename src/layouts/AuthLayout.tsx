import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Loading from '../components/loadingComponents/Loading';
import Navbar from '../components/headerComponents/Navbar';

const AuthLayout = () => {
    const navigation=useNavigation();
    const loading=navigation.state==='loading';
    return (
        <div>
            <Navbar/>
            {
                loading?<Loading/>:<Outlet/>
            }
        </div>
    );
};

export default AuthLayout;