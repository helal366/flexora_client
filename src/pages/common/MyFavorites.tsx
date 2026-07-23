import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/loadingComponents/Loading';
import NoFavorites from './NoFavorites';
import CardMyFavorites from './CardMyFavorites';

const MyFavorites = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const userEmail=user?.email;
    const {data: favorites, isLoading}=useQuery({
        queryKey: ['favorites', userEmail],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/favorites/user?email=${userEmail}`);
            return res?.data;
        },
        enabled: !!userEmail
    });
    if(isLoading){
        return <Loading/>
    };
    
    return (
        <section className="my-10 px-4 md:px-10 py-10 bg-teal-50 rounded border border-gray-500/50 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-teal-700"> My Favorite Donations</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 ">
                {
                  favorites.length>0?  (favorites.map((favorite) => (
                       <CardMyFavorites
                       key={favorite._id} 
                       favorite={favorite} 
                       />
                    ))): (<NoFavorites/>)
                }
            </div>

        </section>
    );
};

export default MyFavorites;