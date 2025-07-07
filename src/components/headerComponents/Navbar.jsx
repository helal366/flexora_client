import React from 'react';
import NavbarStart from './NavbarStart';
import NavbarCenter from './NavbarCenter';
import NavbarEnd from './NavbarEnd';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <NavbarStart />
            <NavbarCenter/>
            <NavbarEnd/>
        </div>
    );
};

export default Navbar;