import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/loadingComponents/Loading';
import NoTransection from './NoTransection';

const TransectionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['charity-transactions', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/transactions?email=${user?.email}`);
      return res?.data;
    }
  });

  if (isLoading) {
    return <Loading/>;
  }
  if(transactions.length===0){
    return <NoTransection/>
  }

  return (
    <div className="overflow-x-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Organization Logo</th>
            <th>Organization Name</th>
            <th className='whitespace-break-spaces'>Organization Representative Name</th>
            <th>Transaction ID</th>
            <th>Amount (USD)</th>
            <th>Request Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, index) => (
            <tr key={txn._id}>
              <th>{index + 1}</th>
              <td>
                <img
                  src={txn.organization_logo}
                  alt="logo"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td>{txn.organization_name}</td>
              <td>{txn.user_name}</td>
              <td>{txn.transection_id}</td>
              <td>${txn.amount}</td>
              <td>{new Date(txn.request_time).toLocaleString()}</td>
              <td>
                <span
                  className={`badge ${
                    txn.status === 'Approved'
                      ? 'badge-success'
                      : txn.status === 'Pending'
                      ? 'badge-warning'
                      : 'badge-error'
                  }`}
                >
                  {txn.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransectionHistory;

