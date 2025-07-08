import React from 'react';
import Navbar from '../components/headerComponents/Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../components/footerComponents/Footer';
import Loading from '../components/loadingComponents/Loading';

const HomeLayout = () => {
    const navigation = useNavigation();
    const loading = navigation.state === 'loading';
    return (
        <section>
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