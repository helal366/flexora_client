import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure'; // adjust path as needed
import Swal from 'sweetalert2';
import { DonationData } from '../types/donations';

const useAddDonation = () => {
  const axiosSecure = useAxiosSecure();

  const mutation = useMutation({
    mutationFn: async (donationData:DonationData) => {
      const res = await axiosSecure.post('/donations', donationData);
      return res?.data;
    },
   
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Failed to add donation',
        text: error.message || 'Please try again later.',
      });
    },
  });

  return mutation;
};
export default useAddDonation;
