import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loading from '../../components/loadingComponents/Loading';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DifferentUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: userCounts = {}, isLoading } = useQuery({
    queryKey: ['userCounts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users-count-by-role');
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const chartData = [
    { name: 'Admin', value: userCounts.admin || 0 },
    { name: 'Restaurant', value: userCounts.restaurant || 0 },
    { name: 'Charity', value: userCounts.charity || 0 },
    { name: 'User', value: userCounts.user || 0 },
  ];

  return (
    <section className="my-10 px-4 md:px-10 py-10 bg-teal-50 rounded border border-gray-500/50 shadow-lg">
      <h2 className="text-3xl font-bold mb-10 text-center text-teal-700">
        Users Distribution
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
};

export default DifferentUsers;
