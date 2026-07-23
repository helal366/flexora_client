import React, { useState, useMemo, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/loadingComponents/Loading';

// 1. Define the Donation interface
interface Donation {
  _id: string;
  donation_title: string;
  image: string;
  restaurant_name: string;
  location: string;
  quantity: string | number;
  pickup_time_window?: string;
}

// 2. Add types to helper functions
const parseTime = (timeRange: string | undefined): Date | null => {
  if (!timeRange) return null;
  const firstTime = timeRange.split('–')[0].trim(); // e.g., "4:00 PM"
  return new Date(`1970-01-01T${convertTo24Hour(firstTime)}`);
};

const convertTo24Hour = (timeStr:string):string => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  if (modifier === 'PM' && +hours !== 12) hours =  String(+hours + 12);
  if (modifier === 'AM' && +hours === 12) hours = '0';
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
};

const AllDonations: React.FC  = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  const { data: donations = [], isLoading } = useQuery<Donation[]>({
    queryKey: ['all-donations'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?status=Verified`);
      return res?.data;
    }
  });

  const filteredAndSortedDonations = useMemo(() => {
    let filtered = donations;

    // 🔍 Filter by location
    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 🔃 Sorting
    if (sortOption === 'quantity') {
      filtered = [...filtered].sort((a, b) => parseInt(b.quantity as string) - parseInt(a.quantity as string));
    } else if (sortOption === 'pickup_time') {
      filtered = [...filtered].sort(
        (a, b) => {
          const timeA = parseTime(a.pickup_time_window)?.getTime() || 0;
        const timeB = parseTime(b.pickup_time_window)?.getTime() || 0;
        return timeA - timeB;
        }
      );
    }

    return filtered;
  }, [donations, searchTerm, sortOption]);

  if (isLoading) return <Loading />;

  // 4. Type the interaction event handlers
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => setSortOption(e.target.value);
  return (
    <section className="py-6">
      {/* Search + Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by location..."
          className="input input-bordered w-full max-w-xs"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="select select-bordered w-full max-w-xs"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="">Sort By</option>
          <option value="quantity">Quantity (High to Low)</option>
          <option value="pickup_time">Pickup Time (Earliest First)</option>
        </select>
      </div>

      {/* Grid of Donations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredAndSortedDonations.map(donation => (
          <div
            key={donation._id}
            className="border border-gray-500/50 rounded shadow-lg p-4 bg-teal-50"
          >
            <img
              src={donation.image}
              alt={donation.donation_title}
              className="h-48 w-full object-cover rounded-md mb-3"
            />
            <h2 className="text-xl font-semibold mb-4 text-teal-900">
              {donation.donation_title}
            </h2>
            <p className="text-sm text-gray-600">
              <span className="text-[15px] text-teal-800 italic font-medium">Restaurant:</span>{' '}
              {donation.restaurant_name}
            </p>
            <p className="text-sm text-gray-600">
              <span className="text-[15px] text-teal-800 italic font-medium">Location:</span>{' '}
              {donation.location}
            </p>
           
            <Link
              to={`/donations/${donation._id}`}
              className="btn btn-sm mt-3 bg-teal-700 hover:bg-teal-900 text-white"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllDonations;

