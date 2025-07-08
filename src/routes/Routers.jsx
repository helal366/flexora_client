import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AuthLayout from "../layouts/AuthLayout";
import AboutPage from "../pages/AboutPage";

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
                path:'/about-us',
                element: <AboutPage/>
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