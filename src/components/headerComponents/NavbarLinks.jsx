import React from 'react';
import { NavLink } from 'react-router';

const commonShadow = {
  shadow: '0 2px 6px rgba(14, 165, 233, 0.4)',       // sky-500 soft glow
  hoverShadow: '0 4px 12px rgba(14, 165, 233, 0.8)', // stronger on hover
};

const linkStyles = {
  home: commonShadow,
  all_donations: commonShadow,
  // featured_donations: commonShadow,
  dashboard: commonShadow,
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
      <li className='mr-2'>
        <NavLink to='/all-donations'>
          <button
            className="cursor-pointer rounded px-3 py-1 transition-transform duration-200 "
            style={{
              boxShadow: linkStyles.all_donations.shadow
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = linkStyles.all_donations.hoverShadow;
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = linkStyles.all_donations.shadow;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            All Donations
          </button>
        </NavLink>
      </li>
      {/* <li className='mr-2'>
        <NavLink to='/featured_donations'>
          <button
            className="cursor-pointer rounded px-3 py-1 transition-transform duration-200"
            style={{
              boxShadow: linkStyles.featured_donations.shadow
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = linkStyles.featured_donations.hoverShadow;
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = linkStyles.featured_donations.shadow;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Featured Donations
          </button>
        </NavLink>
      </li> */}
      <li className='mr-2'>
        <NavLink to='/dashboard'>
          <button
            className="cursor-pointer rounded px-3 py-1 transition-transform duration-200 "
            style={{
              boxShadow: linkStyles.dashboard.shadow
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = linkStyles.dashboard.hoverShadow;
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = linkStyles.dashboard.shadow;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Dashboard
          </button>
        </NavLink>
      </li>

      <li>
        <NavLink to='/about-us'>
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
