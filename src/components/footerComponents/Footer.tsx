import React from 'react'; // Added explicit import for TypeScript stability
import { Link } from 'react-router';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// 1. Define strict type for style variants
interface SocialStyleValue {
  color: string;
  shadowClass: string;
  hoverShadowClass: string;
}

// 2. Explicitly type the configurations
const socialStyles:Record<'facebook' | 'twitter' | 'instagram' | 'linkedin', SocialStyleValue> = {
  facebook: {
    color: '#1877F2',
    shadowClass: 'shadow-[0_4px_8px_rgba(24,119,242,0.6)]',
    hoverShadowClass: 'hover:shadow-[0_6px_12px_rgba(24,119,242,0.9)]',
  },
  twitter: {
    color: '#1DA1F2',
    shadowClass: 'shadow-[0_4px_8px_rgba(29,161,242,0.6)]',
    hoverShadowClass: 'hover:shadow-[0_6px_12px_rgba(29,161,242,0.9)]',
  },
  instagram: {
    color: '#E4405F',
    shadowClass: 'shadow-[0_4px_8px_rgba(228,64,95,0.6)]',
    hoverShadowClass: 'hover:shadow-[0_6px_12px_rgba(228,64,95,0.9)]',
  },
  linkedin: {
    color: '#0A66C2',
    shadowClass: 'shadow-[0_4px_8px_rgba(10,102,194,0.6)]',
    hoverShadowClass: 'hover:shadow-[0_6px_12px_rgba(10,102,194,0.9)]',
  },
};

// 3. Define the structural shape for our link array items
interface SocialLinkItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  style: SocialStyleValue;
}
const Footer = () => {
  const socialLinks: SocialLinkItem[] = [
    { href: 'https://facebook.com', label: 'Facebook', icon: <FaFacebookF />, style: socialStyles.facebook },
    { href: 'https://twitter.com', label: 'Twitter', icon: <FaTwitter />, style: socialStyles.twitter },
    { href: 'https://instagram.com', label: 'Instagram', icon: <FaInstagram />, style: socialStyles.instagram },
    { href: 'https://linkedin.com', label: 'LinkedIn', icon: <FaLinkedinIn />, style: socialStyles.linkedin },
  ];
  return (
    <footer className="bg-teal-50 text-gray-800 px-6 py-8 shadow-lg border border-gray-500/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left: Branding */}
        <div className="text-center md:text-left pr-5">
          <h2 className="text-xl font-semibold italic">flexora</h2>
          <p className="text-sm text-gray-700">
            Empowering communities through food sharing. Reduce waste. Support lives.
          </p>
        </div>

        {/* Center: Navigation */}
        <div className="flex gap-6 text-sm">
          <Link to="/about-us" className="hover:text-teal-700 transition cursor-pointer">About Us</Link>
          <Link to="/contact" className="hover:text-teal-700 transition cursor-pointer">Contact</Link>
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex gap-4 text-lg">
          {socialLinks.map(({ href, label, icon, style }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
               className={`inline-flex items-center justify-center p-1 rounded transition-all duration-300 transform hover:scale-110 ${style.shadowClass} ${style.hoverShadowClass}`}
              style={{ color: style.color }}
               // className="transition-transform duration-300"
              // style={{
              //   color: style.color,
              //   boxShadow: style.shadowClass,
              //   borderRadius: '0.25rem', // rounded corners
              //   padding: '0.25rem',
              //   display: 'inline-flex',
              //   alignItems: 'center',
              //   justifyContent: 'center',
              // }}
              // onMouseEnter={e => {
              //   e.currentTarget.style.boxShadow = style.hoverShadowClass;
              //   e.currentTarget.style.transform = 'scale(1.1)';
              // }}
              // onMouseLeave={e => {
              //   e.currentTarget.style.boxShadow = style.shadowClass;
              //   e.currentTarget.style.transform = 'scale(1)';
              // }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="mt-6 text-center text-xs text-gray-700">
        &copy; {new Date().getFullYear()} <strong><i>flexora</i></strong>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
