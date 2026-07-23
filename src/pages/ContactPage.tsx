import React from 'react';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const ContactPage = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-10 mb-10 bg-gray-300 rounded-lg shadow-md border border-gray-400">
      <h2 className="text-2xl font-bold text-teal-600 mb-6">Contact</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        Have questions or suggestions? We'd love to hear from you. Reach out to us through the following channels:
      </p>
      <ul className="space-y-4 text-gray-800 dark:text-gray-200">
        <li className="flex items-center gap-4">
          <MdEmail className="text-teal-500 text-2xl" />
          <span>contact@flexora.org</span>
        </li>
        <li className="flex items-center gap-4">
          <MdPhone className="text-teal-500 text-2xl" />
          <span>+880-1234-567890</span>
        </li>
        <li className="flex items-center gap-4">
          <MdLocationOn className="text-teal-500 text-2xl" />
          <span>Dhaka, Bangladesh</span>
        </li>
      </ul>
    </section>
  );
};

export default ContactPage;

