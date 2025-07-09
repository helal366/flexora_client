import React from 'react';
import NavbarStart from './NavbarStart';
import NavbarCenter from './NavbarCenter';
import NavbarEnd from './NavbarEnd';

const Navbar = () => {
    return (
        <section className='shadow-[-4px_4px_10px_rgba(0,0,0,0.25)] border border-gray-500/50 rounded'>
            <div className="navbar bg-teal-50 shadow-sm">
                <NavbarStart />
                <NavbarCenter />
                <NavbarEnd />
            </div>
        </section>
    );
};

export default Navbar;