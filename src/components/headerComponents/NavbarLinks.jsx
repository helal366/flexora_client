import React from 'react';
import { NavLink } from 'react-router';

const NavbarLinks = () => {
    return (
        <>
            <li className='mr-2 '>
                <NavLink><button className='cursor-pointer'>Home</button> </NavLink>
            </li>
            <li className='relative group mr-2 cursor-pointer'>
                <NavLink>
                    <button className='cursor-pointer'>
                        <span>All Articles</span>
                    </button>
                </NavLink>

                <ul className="p-2 absolute min-w-40 z-50 bg-gray-300 rounded-md top-12 -left-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <li className='my-1'><NavLink><button className='cursor-pointer'>Submenu 1</button> </NavLink></li>
                    <li className='my-1'><NavLink><button className='cursor-pointer '>Submenu 2</button> </NavLink></li>
                </ul>
            </li>
            <li><NavLink><button className='cursor-pointer'>About Us</button> </NavLink></li>
        </>
    );
};

export default NavbarLinks;