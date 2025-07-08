import { Link, NavLink } from 'react-router';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const socialStyles = {
  facebook: {
    color: '#1877F2',
    boxShadow: '0 4px 8px rgba(24, 119, 242, 0.6)',
    hoverBoxShadow: '0 6px 12px rgba(24, 119, 242, 0.9)',
  },
  twitter: {
    color: '#1DA1F2',
    boxShadow: '0 4px 8px rgba(29, 161, 242, 0.6)',
    hoverBoxShadow: '0 6px 12px rgba(29, 161, 242, 0.9)',
  },
  instagram: {
    color: '#E4405F',
    boxShadow: '0 4px 8px rgba(228, 64, 95, 0.6)',
    hoverBoxShadow: '0 6px 12px rgba(228, 64, 95, 0.9)',
  },
  linkedin: {
    color: '#0A66C2',
    boxShadow: '0 4px 8px rgba(10, 102, 194, 0.6)',
    hoverBoxShadow: '0 6px 12px rgba(10, 102, 194, 0.9)',
  },
};

const Footer = () => {
  return (
    <footer className="bg-teal-50 text-gray-800 px-6 py-8 shadow-lg border border-gray-100/50">
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
          <NavLink to="/about-us" className="hover:text-teal-700 transition cursor-pointer">About Us</NavLink>
          <NavLink to="/contact" className="hover:text-teal-700 transition cursor-pointer">Contact</NavLink>
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex gap-4 text-lg">
          {[
            {
              href: 'https://facebook.com',
              label: 'Facebook',
              icon: <FaFacebookF />,
              style: socialStyles.facebook,
            },
            {
              href: 'https://twitter.com',
              label: 'Twitter',
              icon: <FaTwitter />,
              style: socialStyles.twitter,
            },
            {
              href: 'https://instagram.com',
              label: 'Instagram',
              icon: <FaInstagram />,
              style: socialStyles.instagram,
            },
            {
              href: 'https://linkedin.com',
              label: 'LinkedIn',
              icon: <FaLinkedinIn />,
              style: socialStyles.linkedin,
            },
          ].map(({ href, label, icon, style }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className="transition-transform duration-300"
              style={{
                color: style.color,
                boxShadow: style.boxShadow,
                borderRadius: '0.25rem', // rounded corners
                padding: '0.25rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = style.hoverBoxShadow;
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = style.boxShadow;
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="mt-6 text-center text-xs text-gray-700">
        &copy; {new Date().getFullYear()} Flexora. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
