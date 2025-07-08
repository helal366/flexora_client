import React from 'react';
import NavbarStart from './NavbarStart';
import NavbarCenter from './NavbarCenter';
import NavbarEnd from './NavbarEnd';

const Navbar = () => {
    return (
        <section className='shadow-lg'>
            <div className="navbar bg-teal-50 shadow-sm">
                <NavbarStart />
                <NavbarCenter />
                <NavbarEnd />
            </div>
        </section>
    );
};

export default Navbar;