import React from 'react';
import Loading from '../../components/loadingComponents/Loading';
import NoReviewCard from '../homePage/NoReviewCard';

const ReviewSection = ({  reviewsDonation, reviewsLoading }) => {
    
    // console.log({ reviewsDonation });
    if (reviewsDonation.length === 0) {
        return <NoReviewCard />
    }
    if (reviewsLoading) {
        return <Loading />
    }
    return (
        <section className='my-10 border border-gray-500/50 shadow-lg bg-gray-100'>
            <h2 className='text-teal-800 font-bold italic text-3xl my-6 mx-4'>Total review : {reviewsDonation.length}</h2>
            {
                reviewsDonation.map((review) => (
                    <section key={review?._id} className='mb-5 bg-teal-50 mx-4 p-4 border border-gray-500/50 rounded shadow-lg text-teal-800 flex gap-5 flex-col'>
                        <div className='text-xs flex gap-5 flex-col sm:flex-row'>
                            <div className='w-14 h-14 rounded-full border p-1 mb-2'>
                                <img className='w-full h-full rounded-full' src={review?.donation_image} alt={review?.donation_title} />
                            </div>
                            <div className='flex gap-7 flex-col sm:flex-row'>
                                <div>
                                    <p>{review?.donation_title}</p>
                                    <p className='whitespace-nowrap'>{review?.restaurant_name}</p>
                                </div>
                                <div>
                                    <p>{review?.reviewer_name}</p>
                                    <p>{review?.reviewer_email}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            {review?.description}
                        </div>
                    </section>
                ))
            }
        </section>
    );
};

export default ReviewSection;