import React from 'react';
import useUserRole from '../hooks/useUserRole';
import Loading from '../components/loadingComponents/Loading';
import { Link, NavLink, Outlet } from 'react-router';
import { AiFillHome, AiOutlineUser } from 'react-icons/ai'; // Home icon

const DashboardLayout = () => {
    const { role, roleLoading, isUser } = useUserRole();
    if (roleLoading) return <Loading />
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

                                        <li><a>Navbar Item 1</a></li>
                                        <li><a>Navbar Item 2</a></li>
                                    </ul>
                                </div>
                            </div>
                            {/* Page content here */}
                            <Outlet />
                        </div>

                    </div>
                </div>
                <div className="drawer-side shadow-[4px_0px_10px_rgba(0,0,0,0.2)]">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-teal-100 border border-gray-500/50  text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <Link to='/'>
                            <button className='btn bg-teal-50 text-3xl italic text-gray-700 shadow-inner border border-gray-400/50 cursor-pointer mb-6 w-full'>flexora </button>
                        </Link>
                        <li className='shadow-md mb-2 shadow-orange-300 '>
                            <NavLink to="/" className="flex items-center gap-2">
                                <AiFillHome className="text-xl text-orange-500" />
                                Home
                            </NavLink>
                        </li>
                        <li className='shadow-md mb-2 shadow-blue-300'>
                            <NavLink to="/dashboard/profile" className="flex items-center gap-2">
                                <AiOutlineUser className="text-xl text-blue-600" />
                                My Profile
                            </NavLink>
                        </li>
                        {
                            !roleLoading && isUser && <li className='shadow-md mb-2 shadow-blue-300'>
                                <NavLink to="/dashboard/profile" className="flex items-center gap-2">
                                    <AiOutlineUser className="text-xl text-blue-600" />
                                    My Profile
                                </NavLink>
                            </li>
                        }
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </section>


        </>
    );
};

export default DashboardLayout;