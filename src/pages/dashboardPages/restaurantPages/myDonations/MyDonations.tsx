import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Loading from '../../../../components/loadingComponents/Loading';
import SingleDonation from './SingleDonation';
import { FoodDonation } from '../../../../types/donations';

const MyDonations = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: donations = [],
    isLoading,
    isError,
  } = useQuery<FoodDonation[]>({
    queryKey: ["my-donations", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get<FoodDonation[]>(
        `/donations?email=${user?.email}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });
 
  if (isLoading) return <Loading/>;
  if (isError) return <p>Error loading donations.</p>;
  if (donations.length === 0)
  return (
    <p className="text-center text-gray-600 py-10">
      You have not made any donations yet.
    </p>
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {donations.map(donation => (
        <SingleDonation 
        key={donation._id}
        donation={donation}

        />
      ))}
    </section>
  );
};

export default MyDonations;
