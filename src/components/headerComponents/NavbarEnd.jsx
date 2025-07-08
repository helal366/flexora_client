import React from 'react';
import { NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const NavbarEnd = () => {
    const { userLogout, user } = useAuth();

    const shadowStyle = {
        base: '0 2px 6px rgba(14, 165, 233, 0.4)', // soft sky-500
        hover: '0 4px 12px rgba(14, 165, 233, 0.8)', // stronger on hover
    };

    const handleHover = (e, hover = true) => {
        e.currentTarget.style.boxShadow = hover ? shadowStyle.hover : shadowStyle.base;
        e.currentTarget.style.transform = hover ? 'scale(1.05)' : 'scale(1)';
    };

    const handleLogout = () => {
        userLogout()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    text: 'Logout successful',
                    timer: 1500,
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Logout failed',
                    text: `${error}`,
                });
            });
    };

    const profilePic =
        user?.photoURL ||
        'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';

    return (
        <div className="navbar-end">
            {user ? (
                <>
                    <span className="text-xs mr-3">{user?.displayName}</span>
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer rounded px-3 py-1 transition-transform duration-200 mr-3 bg-teal-200 border border-teal-300"
                        style={{ boxShadow: shadowStyle.base }}
                        onMouseEnter={(e) => handleHover(e, true)}
                        onMouseLeave={(e) => handleHover(e, false)}
                    >
                        Logout
                    </button>

                    <div className="dropdown dropdown-end mr-0">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full border border-purple-600 p-[1px]">  {/* 🔧 Outer border */}
                                <div className="w-full h-full rounded-full border border-white p-[1px]">  {/* 🔧 Inner gap */}
                                    <img
                                        className="rounded-full w-full h-full object-cover border border-purple-600 drop-shadow-custom"
                                        alt="Profile picture"
                                        src={profilePic}
                                    />
                                </div>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <p>
                                    <span className="mr-1">Name:</span> {user?.displayName}
                                </p>
                            </li>
                            <li>
                                <p>
                                    <span className="mr-1">Email:</span> {user?.email}
                                </p>
                            </li>
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    <NavLink to="/auth/login">
                        <button
                            className="cursor-pointer rounded px-3 py-1 transition-transform duration-200 mr-2 bg-teal-200"
                            style={{ boxShadow: shadowStyle.base }}
                            onMouseEnter={(e) => handleHover(e, true)}
                            onMouseLeave={(e) => handleHover(e, false)}
                        >
                            Login
                        </button>
                    </NavLink>
                    <NavLink to="/auth/register">
                        <button
                            className="cursor-pointer rounded px-3 py-1 transition-transform duration-200 bg-teal-200"
                            style={{ boxShadow: shadowStyle.base }}
                            onMouseEnter={(e) => handleHover(e, true)}
                            onMouseLeave={(e) => handleHover(e, false)}
                        >
                            Register
                        </button>
                    </NavLink>
                </>
            )}
        </div>
    );
};

export default NavbarEnd;
