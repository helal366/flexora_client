import React from 'react';
import Navbar from '../components/headerComponents/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../components/footerComponents/Footer';
import Loading from '../components/loadingComponents/Loading';

const HomeLayout = () => {
    const navigation=useNavigation();
    const loading=navigation.state==='loading';
    return (
        <div>
            <Navbar/>
            {
                loading?<Loading/>:<Outlet/>
            }
            <Footer/>
        </div>
    );
};

export default HomeLayout;