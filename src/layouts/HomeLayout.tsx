import React from 'react';
import Navbar from '../components/headerComponents/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../components/footerComponents/Footer';
import Loading from '../components/loadingComponents/Loading';
import useAuth from '../hooks/useAuth';

const HomeLayout = () => {
     // 1. Get the raw context object first
    const authContent = useAuth();
    const navigation = useNavigation();

    // 2. Type Guard: Return a fallback layout if context is null
    if (!authContent) {
        return (
            <section>
                <Navbar />
                <section className='padding bg-teal-100/50 min-h-[60vh] flex items-center justify-center'>
                    <Loading />
                </section>
                <Footer />
            </section>
        );
    }

    // 3. Now it is completely safe to destructure
    const { authLoading } = authContent;
    const loading = navigation.state === 'loading' || authLoading;

    return (
        <section >
            <Navbar />
            <section className='padding bg-teal-100/50'>
                {
                    loading ? <Loading /> : <Outlet />
                }
            </section>
            <Footer />
        </section>
    );
};

export default HomeLayout;