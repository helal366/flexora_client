import { createBrowserRouter } from "react-router";
import { Suspense } from "react";
import HomeLayout from "../layouts/HomeLayout";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import Loading from "../components/loadingComponents/Loading";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AuthLayout from "../layouts/AuthLayout";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/homePage/HomePage";
import AllDonations from "../pages/allDonationsPage/AllDonations";
import DashboardLayout from "../layouts/DashboardLayout";
import UserRoute from "./UserRoute";
import ForbiddenPage from './../pages/ForbiddenPage';
import StripeProviderRoute from "./StripeProviderRoute";
import RequestRestaurantRole from "../pages/dashboardPages/userPages/RequestRestaurantRole";
import RequestCharityRole from "../pages/dashboardPages/userPages/RequestCharityRole";
import ProfilePage from "../pages/dashboardPages/ProfilePage";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../pages/dashboardPages/adminPages/manageUsers/ManageUsers";
import ManageRoleRequest from "../pages/dashboardPages/adminPages/manageRoleRequests/ManageRoleRequest";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loading />}>
                        <HomePage />
                    </Suspense>
                )
            },
            {
                path: '/all-donations',
                element: (
                    <Suspense fallback={<Loading />}>
                        <PrivateRoute>
                            <AllDonations />
                        </PrivateRoute>
                    </Suspense>
                )
            },
            {
                path: '/about-us',
                element: (
                    <Suspense fallback={<Loading />}>
                        <PrivateRoute><AboutPage /></PrivateRoute>
                    </Suspense>
                )

            },
            {
                path: '/contact',
                element: (
                    <Suspense fallback={<Loading />}>
                        <PrivateRoute><ContactPage /></PrivateRoute>
                    </Suspense>
                )

            },
            {
                path: '/forbidden',
                element: <ForbiddenPage />
            }
        ]
    },
    {
        path: '/dashboard',
        element: (
            <Suspense fallback={<Loading />}>
                <PrivateRoute><DashboardLayout /></PrivateRoute>
            </Suspense>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'profile',
                element: <ProfilePage />
            },
            {
                path: 'request_charity_role',
                element: (
                    <UserRoute>
                        <StripeProviderRoute>
                            <RequestCharityRole />
                        </StripeProviderRoute>
                    </UserRoute>
                )
            },
            {
                path: 'request_restaurant_role',
                element: (
                    <UserRoute>
                        <RequestRestaurantRole />
                    </UserRoute>
                )
            },
            {
                path: 'manage_users',
                element: (
                    <AdminRoute>
                        <ManageUsers />
                    </AdminRoute>
                )
            },
            {
                path: 'manage_role_requests',
                element: (
                    <AdminRoute>
                        <ManageRoleRequest />
                    </AdminRoute>
                )
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