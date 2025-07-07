import React from 'react';
import NavbarLinks from './NavbarLinks';
import ThemeToggle from './ThemeToggle';

const NavbarStart = () => {
    return (
        <>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <NavbarLinks />
                    </ul>
                </div>
                <span className="hidden lg:block font-semibold text-xl mr-4">
                    <i>flexora</i>
                </span>
                <ThemeToggle/>
            </div>
        </>
    );
};

export default NavbarStart;