import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import ErrorPage from "../pages/ErrorPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AuthLayout from "../layouts/AuthLayout";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/homePage/HomePage";
import AllDonations from "../pages/allDonationsPage/AllDonations";
import DashboardLayout from "../layouts/DashboardLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/all-donations',
                element: <AllDonations/>
            },
            {
                path:'/about-us',
                element: <AboutPage/>
            },
            {
                path: '/contact',
                element: <ContactPage/>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'register',
                element: <RegisterPage />
            },
            {
                path: 'login',
                element: <LoginPage />
            }
        ]
    }

])
export default router;