import React from 'react';
import Navbar from '../components/headerComponents/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../components/footerComponents/Footer';
import Loading from '../components/loadingComponents/Loading';
import useAuth from '../hooks/useAuth';

const HomeLayout = () => {
    const {authLoading}=useAuth();
    console.log({authLoading})
    const navigation = useNavigation();
    const loading = navigation.state === 'loading' || authLoading;

    return (
        <section >
            <Navbar />
            <section >
                {
                    loading ? <Loading /> : <Outlet />
                }
            </section>
            <Footer />
        </section>
    );
};

export default HomeLayout;