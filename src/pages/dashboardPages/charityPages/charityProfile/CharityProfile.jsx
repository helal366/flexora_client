import React from 'react';
// import useAuth from '../../../../hooks/useAuth';
import useUserRole from '../../../../hooks/useUserRole';
import { FaHandPointDown } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const CharityProfile = () => {
    // const { user } = useAuth();
    const { role, userInfo } = useUserRole();
    const navigate=useNavigate()
    const contact = userInfo?.user_by_email?.organization_contact || 'Not found';
    const organizationLogo = userInfo?.user_by_email?.organization_logo || 'Not found';
    const organizationName = userInfo?.user_by_email?.organization_name || 'Not found';
    const organizationEmail = userInfo?.user_by_email?.organization_email || 'Not found';
    const organizationAddress = userInfo?.user_by_email?.organization_address || 'Not found';
    const missionStatement = userInfo?.user_by_email?.mission || 'Not found';

    console.log({ userInfo })
    const handleUpdate=()=>{
        navigate('/dashboard/charity_profile_update')
    }
 
    return (
        <section className="max-w-md mx-auto bg-white shadow-lg shadow-teal-200 rounded-lg mt-10 p-6">
            {/* Profile Picture Centered */}
            <div className="flex justify-center mb-4">
                {organizationLogo && organizationLogo!=='Not found' ? (
                    <img
                        src={organizationLogo}
                        alt={organizationName}
                        className="w-28 h-28 rounded-full border-4 border-teal-500 shadow"
                    />
                ) : (
                    <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-white">
                        {organizationName?.charAt(0) || 'N'}
                    </div>
                )}
            </div>

            {/* Name Centered */}
            <h2 className="text-center text-2xl font-semibold mb-8">{organizationName}</h2>

            {/* Info Left-Aligned */}

            <div className="space-y-2 text-sm text-gray-700">
                {role !== 'user' && (
                    <p>
                        <span className="font-medium">Role:</span> {role? role.charAt(0).toUpperCase() + role.slice(1): 'user'}
                    </p>
                )}

                <p className='my-2 text-lg italic font-semibold text-teal-950'>
                    Organization Information
                </p>
                <p>
                    <span className="font-medium italic text-teal-700 text-[15px]">Organization Contact Number:</span> {contact}
                </p>
                <p>
                    <span className="font-medium italic text-teal-700 text-[15px]">Organization Email:</span> {organizationEmail}
                </p>
                <p>
                    <span className="font-medium italic text-teal-700 text-[15px]">Organization Address:</span> {organizationAddress}
                </p>
                <p>
                    <span className="font-medium italic text-teal-700 text-[15px]">Organization Mission :</span> {missionStatement}
                </p>
                <div>
                    <p className="font-medium italic text-center mb-1 text-teal-200 bg-gray-800 py-2 px-4 rounded flex gap-2 justify-center">You can update your profile here: <FaHandPointDown className="text-2xl text-yellow-300" /></p>
                    <button
                        onClick={handleUpdate}
                        className='btn bg-teal-700 text-gray-100 hover:bg-teal-800 w-full'>
                        Update
                    </button>
                </div>
                {/* Role shown only if not a regular user */}

            </div>
        </section>
    );
};

export default CharityProfile;