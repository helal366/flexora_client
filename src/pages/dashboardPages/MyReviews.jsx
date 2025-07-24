import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/loadingComponents/Loading';

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading, refetch } = useQuery({
    queryKey: ['my-reviews', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user?.email}`);
      return res?.data;
    }
  });
  // console.log({reviews})
  const deleteMutation = useMutation({
    mutationFn: async (reviewId) => {
      const res = await axiosSecure.delete(`/reviews/${reviewId}?email=${user?.email}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Deleted!', 'Your review has been removed.', 'success');
      refetch();
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to delete review.', 'error');
    }
  });

  if (isLoading) return <Loading />;

  if (reviews.length === 0) {
    return (
      <section className="my-10 text-center text-gray-600 font-semibold text-lg">
        You haven’t submitted any reviews yet.
      </section>
    );
  }
  return (
    <section className="my-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
      {reviews.map((review) => (
        <section key={review?._id} className="card bg-gray-100 shadow-md p-5 rounded-lg border border-gray-500/50">
          <div>

            <img className='w-full h-40 rounded border border-gray-500/50' src={review?.donation_image} alt={review?.donation_title} />
          </div>
          <h2 className="text-xl font-semibold text-teal-800 mb-2">{review?.donation_title}</h2>
          <p className="mb-1">
            <span className="font-medium text-teal-800 italic">Restaurant :</span>{' '}
            {review?.restaurant_name}
          </p>
          <p className="mb-1">
            <span className="font-medium text-teal-800 italic">Restaurant Representative Name :</span>{' '}
            {review?.restaurant_representative_name}
          </p>
          <p className="mb-1">
            <span className="font-medium text-teal-800 italic">Reviewed At :</span>{' '}
            {new Date(review?.created_at).toLocaleString()}
          </p>
          <p className="mb-2">
            <span className="font-medium text-teal-800 italic">Description :</span>{' '}
            {review?.description}
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => {
                Swal.fire({
                  title: 'Are you sure?',
                  text: "You won’t be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#3085d6',
                  confirmButtonText: 'Yes, delete it!',
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteMutation.mutate(review._id);
                  }
                });
              }}
              className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </section>
      ))}
    </section>
  );
};

export default MyReviews;
