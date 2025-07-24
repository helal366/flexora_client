import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Loading from '../../../../components/loadingComponents/Loading';
import useAuth from './../../../../hooks/useAuth';
import useAxiosSecure from './../../../../hooks/useAxiosSecure';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28CFF', '#FF6B6B', '#00B8D9'];

const RestaurantDonationStats = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ['restaurant-donations-stats', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?restaurant_email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) return <Loading />;

  // Aggregate donation data by food_type
  const typeMap = {};
  donations.forEach(donation => {
    const type = donation.food_type || 'Unknown';
    const quantity = parseInt(donation.quantity) || 0;
    if (typeMap[type]) {
      typeMap[type] += quantity;
    } else {
      typeMap[type] = quantity;
    }
  });

  const chartData = Object.entries(typeMap).map(([type, quantity]) => ({
    name: type,
    value: quantity
  }));

  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-teal-800">Donation Statistics</h2>

      {chartData.length === 0 ? (
        <p className="text-center text-gray-500">No donation data available yet.</p>
      ) : (
        <div className="w-full h-[400px]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
};

export default RestaurantDonationStats;
