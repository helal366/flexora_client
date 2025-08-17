import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/loadingComponents/Loading';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { FaBox, FaCheckCircle, FaHandHoldingHeart } from 'react-icons/fa';

const Overview = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ['overviewData'],
    queryFn: async () => {
      const res = await axiosSecure.get('/overview');
      return res.data; // { approvedDonations, charityRequests, pickedUpDonations }
    },
  });

  if (isLoading) return <Loading />;

  const { approvedDonations, charityRequests, pickedUpDonations } = data;

  const pieData = [
    { name: 'Approved Donations', value: approvedDonations },
    { name: 'Charity Requests', value: charityRequests },
    { name: 'Picked Up', value: pickedUpDonations },
  ];

  const COLORS = ['#1E3A8A', '#FACC15', '#10B981'];

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Restaurant Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-blue-100 rounded shadow flex items-center gap-3">
          <FaBox size={30} className="text-blue-700" />
          <div>
            <p className="text-lg font-semibold">{approvedDonations}</p>
            <p className="text-gray-700">Approved Donations</p>
          </div>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow flex items-center gap-3">
          <FaHandHoldingHeart size={30} className="text-yellow-700" />
          <div>
            <p className="text-lg font-semibold">{charityRequests}</p>
            <p className="text-gray-700">Charity Requests</p>
          </div>
        </div>
        <div className="p-4 bg-green-100 rounded shadow flex items-center gap-3">
          <FaCheckCircle size={30} className="text-green-700" />
          <div>
            <p className="text-lg font-semibold">{pickedUpDonations}</p>
            <p className="text-gray-700">Picked Up Donations</p>
          </div>
        </div>
      </div>

      <div className="w-full h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default Overview;
