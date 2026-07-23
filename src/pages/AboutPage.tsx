import React from 'react';
import ContactPage from './ContactPage';

const AboutPage = () => {
  return (
    <main className="padding py-10  ">
      <section className="max-w-4xl mx-auto px-6 py-10 my-10 bg-gray-300 rounded-lg shadow-md border border-gray-400">
        <h1 className="text-3xl font-bold mb-6 text-teal-600">About <span className=" italic text-teal-800">flexora</span> </h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <b><i>flexora</i></b> is a local food waste reduction platform connecting restaurants with surplus food to charities and individuals in need.
          Our mission is to minimize food waste while empowering communities by redistributing surplus food efficiently and safely.
        </p>
        <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          Restaurants can easily post their surplus food donations. Charities can browse listings and request pickups. Users can explore donations
          and even request to become verified charities. Admins oversee operations to ensure smooth, trustworthy transactions.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Together, we strive to build a sustainable ecosystem that benefits people and reduces environmental impact.
        </p>
      </section>
      <ContactPage />
    </main>
  );
};

export default AboutPage;
