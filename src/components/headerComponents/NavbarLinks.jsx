import React from 'react';
import { NavLink } from 'react-router';

const commonShadow = {
  shadow: '0 2px 6px rgba(14, 165, 233, 0.4)',       // sky-500 soft glow
  hoverShadow: '0 4px 12px rgba(14, 165, 233, 0.8)', // stronger on hover
};

const linkStyles = {
  home: commonShadow,
  articles: commonShadow,
  about: commonShadow,
};


const NavbarLinks = () => {
  return (
    <>
      <li className='mr-2'>
        <NavLink to='/'>
          <button
            className="cursor-pointer rounded px-3 py-1 transition-transform duration-200 "
            style={{ 
              boxShadow: linkStyles.home.shadow 
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = linkStyles.home.hoverShadow;
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = linkStyles.home.shadow;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Home
          </button>
        </NavLink>
      </li>

      <li className='relative group mr-2 cursor-pointer'>
        <NavLink>
          <button
            className="cursor-pointer rounded px-3 py-1 transition-transform duration-300"
            style={{ 
              boxShadow: linkStyles.articles.shadow 
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = linkStyles.articles.hoverShadow;
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = linkStyles.articles.shadow;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span>All Articles</span>
          </button>
        </NavLink>

        <ul className="p-2 absolute min-w-40 z-50 bg-gray-300 rounded-md top-12 -left-5 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
          <li className='my-1'>
            <NavLink>
              <button className='cursor-pointer rounded px-3 py-1 hover:scale-105 transition-transform duration-300'>
                Submenu 1
              </button>
            </NavLink>
          </li>
          <li className='my-1'>
            <NavLink>
              <button className='cursor-pointer rounded px-3 py-1 hover:scale-105 transition-transform duration-300'>
                Submenu 2
              </button>
            </NavLink>
          </li>
        </ul>
      </li>

      <li>
        <NavLink>
          <button
            className="cursor-pointer rounded px-3 py-1 transition-transform duration-300"
            style={{ 
              boxShadow: linkStyles.about.shadow 
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = linkStyles.about.hoverShadow;
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = linkStyles.about.shadow;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            About Us
          </button>
        </NavLink>
      </li>
    </>
  );
};

export default NavbarLinks;
