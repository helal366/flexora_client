import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center text-center px-6 py-12">
      <img
        src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
        alt="Error"
        className="w-40 h-40 mb-6"
      />
      <h1 className="text-5xl font-bold text-teal-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-6">
        Oops! The page you’re looking for doesn’t exist. At <strong><i>flexora</i></strong>, we’re focused on reducing food waste and helping communities — not sending you in circles.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded shadow transition"
      >
        <FaArrowLeft /> Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
