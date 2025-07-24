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
import RestaurantRoute from "./RestaurantRoute";
import CharityRoute from "./CharityRoute";
import CharityProfile from "../pages/dashboardPages/charityPages/charityProfile/CharityProfile";
import CharityProfileUpdate from "../pages/dashboardPages/charityPages/charityProfile/CharityProfileUpdate";
import RestaurantProfile from "../pages/dashboardPages/restaurantPages/restaurantProfile/RestaurantProfile";
import RestaurantProfileUpdate from "../pages/dashboardPages/restaurantPages/restaurantProfile/RestaurantProfileUpdate";
import AddDonation from "../pages/dashboardPages/restaurantPages/addDonations/AddDonation";
import ManageDonations from "../pages/dashboardPages/adminPages/manageDonations/ManageDonations";
import RequestedDonations from "../pages/dashboardPages/restaurantPages/requestedDonations/RequestedDonations";
import MyRequests from "../pages/dashboardPages/charityPages/myRequests/MyRequests";
import MyDonations from "../pages/dashboardPages/restaurantPages/myDonations/MyDonations";
import UpdateMyDonation from "../pages/dashboardPages/restaurantPages/myDonations/UpdateMyDonation";
import MyPickups from "../pages/dashboardPages/charityPages/myPickups/MyPickups";
import ReceivedDonations from "../pages/dashboardPages/charityPages/receivedDonations/ReceivedDonations";
import MyReviews from "../pages/dashboardPages/MyReviews";
import TransectionHistory from "../pages/dashboardPages/userPages/TransectionHistory";
import FeatureDonations from "../pages/dashboardPages/adminPages/featureDonations/FeatureDonations";
// import FeaturedDonations from "../pages/homePage/FeaturedDonations";
import RestaurantDonationStats from "../pages/dashboardPages/restaurantPages/stats/RestaurantDonationStats";
import DonationDetails from "../pages/donationDetailsPage/DonationDetails";

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
                path: '/donations/:id',
                element: (
                    <Suspense fallback={<Loading />}>
                        <PrivateRoute>
                            <DonationDetails/>
                        </PrivateRoute>
                    </Suspense>
                )
            },
            // {
            //     path: '/featured_donations',
            //     element: (
            //         <Suspense fallback={<Loading />}>
            //             <PrivateRoute>
            //                 <FeaturedDonations />
            //             </PrivateRoute>
            //         </Suspense>
            //     )
            // },
            
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
            
            // user route
            {
                path: 'profile_user',
                element: (
                    <UserRoute>
                       <ProfilePage />
                    </UserRoute>
                )
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
                path: 'transection_history_user',
                element: (
                    <UserRoute>
                        <TransectionHistory />
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
                path: 'my_reviews_user',
                element: (
                    <UserRoute>
                        <MyReviews />
                    </UserRoute>
                )
            },
            // admin routes
            {
                path: 'profile_admin',
                element: (
                    <AdminRoute>
                       <ProfilePage />
                    </AdminRoute>
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
            },
            {
                path: 'manage_donations',
                element: (
                    <AdminRoute>
                        <ManageDonations />
                    </AdminRoute>
                )
            },
            {
                path: 'feature_donations',
                element: (
                    <AdminRoute>
                        <FeatureDonations />
                    </AdminRoute>
                )
            },
            // restaurant routes
            {
                path: 'profile_restaurant',
                element: (
                    <RestaurantRoute>
                       <ProfilePage />
                    </RestaurantRoute>
                )
            },
            {
                path: 'restaurant_profile',
                element: (
                    <RestaurantRoute>
                        <RestaurantProfile />
                    </RestaurantRoute>
                )
            },
            {
                path: 'restaurant_profile_update',
                element: <RestaurantRoute>
                    <RestaurantProfileUpdate />
                </RestaurantRoute>
            },
            {
                path: 'add-donation',
                element: (
                    <RestaurantRoute>
                        <AddDonation />
                    </RestaurantRoute>
                )
            },
            {
                path: 'requested-donations',
                element: (
                    <RestaurantRoute>
                        <RequestedDonations />
                    </RestaurantRoute>
                )
            },
            {
                path: 'my_donations',
                element: (
                    <RestaurantRoute>
                        <MyDonations />
                    </RestaurantRoute>
                )
            },
            {
                path: 'update_my_donation/:id',
                element: (
                    <RestaurantRoute>
                        <UpdateMyDonation />
                    </RestaurantRoute>
                )
            },
            {
                path: 'restaurant_donation_stats',
                element: (
                    <RestaurantRoute>
                        <RestaurantDonationStats/>
                    </RestaurantRoute>
                )
            },
            // charity routes
            {
                path: 'profile_charity',
                element: (
                    <CharityRoute>
                       <ProfilePage />
                    </CharityRoute>
                )
            },
            {
                path: 'charity_profile',
                element: (
                    <CharityRoute>
                        <CharityProfile />
                    </CharityRoute>
                )
            },
            {
                path: 'transection_history_charity',
                element: (
                    <CharityRoute>
                        <TransectionHistory />
                    </CharityRoute>
                )
            },
            {
                path: 'charity_profile_update',
                element: (
                    <CharityRoute>
                        <CharityProfileUpdate />
                    </CharityRoute>
                )
            },
            {
                path: 'my_requests',
                element: (
                    <CharityRoute>
                        <MyRequests />
                    </CharityRoute>
                )
            },
            {
                path: 'my-pickups',
                element: (
                    <CharityRoute>
                        <MyPickups />
                    </CharityRoute>
                )
            },
            {
                path: 'received-donations',
                element: (
                    <CharityRoute>
                        <ReceivedDonations />
                    </CharityRoute>
                )
            },
            {
                path: 'my_reviews',
                element: (
                    <CharityRoute>
                        <MyReviews />
                    </CharityRoute>
                )
            },
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