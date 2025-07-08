import React from 'react';

const ContactPage = () => {
    return (
        <section className='padding bg-teal-50 my-10 rounded shadow-lg border border-gray-500/50'>
            <div className="max-w-4xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-6 text-center text-teal-600">Contact Us</h1>

                {/* Contact Info Section */}
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Official Contact Information</h2>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li><strong>Address:</strong> 123 Flexora Street, Dhaka 1207, Bangladesh</li>
                        <li><strong>Phone:</strong> +880 2-12345678</li>
                        <li><strong>Mobile:</strong> +880 1711-000000</li>
                        <li><strong>Email (Support):</strong> support@flexora.org</li>
                        <li><strong>Email (General):</strong> info@flexora.org</li>
                        <li><strong>Email (Admin):</strong> admin@flexora.org</li>
                    </ul>

                </div>

                {/* Contact Form */}
                <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Send us a message</h2>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Your full name"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Message</label>
                        <textarea
                            rows="5"
                            placeholder="Type your message here..."
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition shadow-md"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ContactPage;
