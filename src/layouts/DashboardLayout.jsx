import React, { useEffect } from 'react';
import useUserRole from '../hooks/useUserRole';
import Loading from '../components/loadingComponents/Loading';
import { Link, NavLink, Outlet } from 'react-router';
import { AiFillHome } from 'react-icons/ai'; // Home icon
import { FaBoxOpen, FaClipboardList, FaEnvelopeOpenText, FaGift, FaHandHoldingHeart, FaPlusCircle, FaRegAddressCard, FaTruckPickup, FaUser, FaUsersCog, FaUserShield, FaUtensils } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { useNavigation } from 'react-router';
import queryClient from '../api/queryClient';

const DashboardLayout = () => {
    const navigation = useNavigation();
    const navigationLoading = navigation.state === 'loading'
    const { authLoading, user } = useAuth()
    const { role, roleLoading, isUser, isAdmin, isCharity, isRestaurant } = useUserRole();
    useEffect(() => {
        if (user?.email) {
            queryClient.invalidateQueries(['userInfo', user.email]);
        }
    }, [user?.email]);
    if (roleLoading || authLoading) {
        return <Loading />
    }
    console.log({ role })
    return (
        <>
            <section className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center ">
                    {/* Page content here */}
                    <div className="drawer">
                        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content flex flex-col">
                            {/* Navbar */}
                            <div className="navbar bg-teal-50 shadow-lg border border-gray-500/50 w-full">
                                <div className="flex-none lg:hidden">
                                    <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            className="inline-block h-6 w-6 stroke-current"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            ></path>
                                        </svg>
                                    </label>
                                </div>
                                <div className="mx-2 flex-1 px-3">Dashboard</div>
                                <div className="hidden flex-none lg:block">
                                    <ul className="menu menu-horizontal">
                                        {/* Navbar menu content here */}

                                        <li><a>{role}</a></li>
                                        <li><a>{user?.email}</a></li>
                                    </ul>
                                </div>
                            </div>
                            {/* Page content here */}
                            {
                                navigationLoading ? <Loading /> : <Outlet />
                            }

                        </div>

                    </div>
                </div>
                <div className="drawer-side shadow-[4px_0px_10px_rgba(0,0,0,0.2)] z-10">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-teal-100/50 border border-gray-500/50  text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <Link to='/'>
                            <button className='btn bg-teal-200 text-3xl italic text-gray-700 shadow-inner border border-gray-400/50 cursor-pointer mb-6 w-full'>flexora </button>
                        </Link>
                        <li className='shadow-md mb-3 shadow-orange-200 bg-teal-200'>
                            <NavLink to="/" className="flex items-center gap-2">
                                <AiFillHome className="text-xl text-orange-500" />
                                Home
                            </NavLink>
                        </li>
                        {
                            !isAdmin && (
                                <li className='shadow-md mb-3 shadow-orange-200 bg-teal-200'>
                                    <NavLink to="/dashboard/profile" className="flex items-center gap-2">
                                        <FaUser className="text-xl text-blue-600" />
                                        My Profile
                                    </NavLink>
                                </li>
                            )
                        }

                        {
                            !roleLoading && isUser &&
                            <>

                                <li className="shadow-md mb-3 shadow-orange-200 bg-teal-200">
                                    <NavLink to="/dashboard/request_charity_role" className="flex items-center gap-2">
                                        <FaRegAddressCard className="text-xl text-orange-500" />
                                        Request Charity Role
                                    </NavLink>
                                </li>
                                <li className="shadow-md mb-3 shadow-orange-200 bg-teal-200">
                                    <NavLink to="/dashboard/request_restaurant_role" className="flex items-center gap-2">
                                        <FaRegAddressCard className="text-xl text-green-600" />
                                        Request Restaurant Role
                                    </NavLink>
                                </li>

                            </>
                        }
                        {
                            !roleLoading && isAdmin &&
                            <>
                                <li className='shadow-md mb-3 shadow-orange-200 bg-teal-200'>
                                    <NavLink to="/dashboard/profile" className="flex items-center gap-2">
                                        <FaUser className="text-xl text-blue-600" />
                                        Admin Profile
                                    </NavLink>
                                </li>
                                <li className="shadow-md mb-3 shadow-orange-200 bg-teal-200">
                                    <NavLink to="/dashboard/manage_users" className="flex items-center gap-2">
                                        <FaUsersCog className="text-xl text-purple-600" />
                                        Manage Users
                                    </NavLink>
                                </li>
                                <li className="shadow-md mb-3 shadow-orange-200 bg-teal-200">
                                    <NavLink to="/dashboard/manage_role_requests" className="flex items-center gap-2">
                                        <FaUserShield className="text-xl text-green-700" />
                                        Manage Role Requests
                                    </NavLink>
                                </li>
                                <li className="shadow-md mb-3 shadow-orange-200 bg-teal-200">
                                    <NavLink to="/dashboard/manage_donations" className="flex items-center gap-2">
                                        <FaGift className="text-xl text-green-700" /> {/* or another icon you prefer */}
                                        Manage Donations
                                    </NavLink>
                                </li>

                            </>
                        }
                        {/* restaurant dashboard */}
                        {
                            !roleLoading && isRestaurant && (
                                <>
                                    <li className="shadow-md mb-3 shadow-orange-200 bg-teal-200">
                                        <NavLink to="/dashboard/restaurant_profile" className="flex items-center gap-2">
                                            <FaUtensils className="text-xl text-green-700" />
                                            Restaurant Profile
                                        </NavLink>
                                    </li>
                                    <li className="shadow-md mb-3 shadow-orange-200 bg-teal-200">
                                        <NavLink to="/dashboard/add-donation" className="flex items-center gap-2">
                                            <FaPlusCircle className="text-xl text-green-700" />
                                            Add Donation
                                        </NavLink>
                                    </li>

                                    <li className="shadow-md mb-3 shadow-orange-200 bg-teal-200">
                                        <NavLink to="/dashboard/my_donations" className="flex items-center gap-2">
                                            <FaUtensils className="text-xl text-blue-700" />
                                            My Donations
                                        </NavLink>
                                    </li>

                                    <li className="shadow-md mb-3 shadow-orange-200 bg-teal-200">
                                        <NavLink to="/dashboard/requested-donations" className="flex items-center gap-2">
                                            <FaEnvelopeOpenText className="text-xl text-blue-700" />
                                            Requested Donations
                                        </NavLink>
                                    </li>

                                </>
                            )
                        }
                        {/* charity dashboard */}
                        {
                            !roleLoading && isCharity && (
                                <>
                                    <li className="shadow-md mb-3 shadow-orange-200 bg-teal-200">
                                        <NavLink to="/dashboard/charity_profile" className="flex items-center gap-2">
                                            <FaHandHoldingHeart className="text-xl text-pink-600" />
                                            Charity Profile
                                        </NavLink>
                                    </li>
                                    <li className="shadow-md mb-3 shadow-orange-200 bg-teal-200">
                                        <NavLink to="/dashboard/my_requests" className="flex items-center gap-2">
                                            <FaClipboardList className="text-xl text-purple-600" />
                                            My Requests
                                        </NavLink>
                                    </li>
                                    <li className="shadow-md mb-3 shadow-orange-200 bg-teal-200">
                                        <NavLink to="/dashboard/my-pickups" className="flex items-center gap-2">
                                            <FaTruckPickup className="text-xl text-green-600" />
                                            My Pickups
                                        </NavLink>
                                    </li>
                                    <li className="shadow-md mb-3 shadow-orange-200 bg-teal-200">
                                        <NavLink to="/dashboard/received-donations" className="flex items-center gap-2">
                                            <FaBoxOpen className="text-xl text-blue-600" />
                                            Received Donations
                                        </NavLink>
                                    </li>

                                </>
                            )

                        }
                    </ul>
                </div>
            </section>
        </>
    );
};

export default DashboardLayout;