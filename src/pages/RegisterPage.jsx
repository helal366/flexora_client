import SignUp from '../lotties/register/SignUp';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from './../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

const RegisterPage = () => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const { userRegister, userProfileUpdate } = useAuth();
    const location = useLocation();
    const desire = location?.desire ? location?.desire : '/';
    const { register,
        formState: { errors },
        handleSubmit,
        reset } = useForm({ criteriaMode: 'all' });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])
    const mutation = useMutation({
        mutationFn: (userInfo) => axiosSecure.post('/users', userInfo),
        onSuccess: (res) => {
            console.log('user data to database', res?.data);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'You have registered successfully.',
                timer: 1500
            });
            navigate(desire);
            reset(); // inside onSuccess if you import from react-hook-form

        },
        onError: (err) => {
            Swal.fire({
                icon: 'error',
                title: 'Failed to store user',
                text: `${err?.message || err}`,
                showConfirmButton: true
            });
        }
    })
    const onSubmit = async data => {
        const file = data?.image?.[0]
        if (!file) {
            Swal.fire({
                icon: 'error',
                title: 'Image Missing!',
                text: 'Please upload a profile image.',
                showConfirmButton: true
            });
            return;
        }

        // cloudinary image upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", `${import.meta.env.VITE_upload_preset}`);
        formData.append("cloud_name", `${import.meta.env.VITE_cloud_name}`);
        try {
            const result = await axios.post(`${import.meta.env.VITE_cloudinary_url}`, formData);
            const uploadedImageURL = result?.data?.secure_url;
            console.log({ uploadedImageURL });
            console.log(data?.name);
            if (!uploadedImageURL) throw new Error('Failed to create image url!');

            // user registration   
            const userCredential = await userRegister(data?.email, data?.password);
            if (!userCredential?.user) throw new Error('Registration failed!')

            // updateInfo
            console.log('from registration page, data: ',data)
            const updateInfo = {
                displayName: data?.name,
                photoURL: uploadedImageURL,
            }
            console.log({ updateInfo })
            // update profile info
            await userProfileUpdate(updateInfo);

            // user info
            let rawNumber=data?.contact_number? data?.contact_number.trim():'';
            if(rawNumber.startsWith('0')){
                rawNumber='+880'+rawNumber.slice(1)
            }
            const userInfo = {
                name: data?.name,
                email: data?.email,
                photoURL: uploadedImageURL,
                role: 'user',
                contact_number:  rawNumber,
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString(),
            }
            // store user info in the database
            mutation.mutate(userInfo)
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                text: `${err}`,
                showConfirmButton: true
            })
        }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="hidden lg:block">
                    <SignUp />
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-3xl font-bold text-center mb-2">Register now!</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="fieldset">

                                {/* name */}
                                <label className="label">Name</label>
                                <input type="text" {...register("name", { required: true })} className="input" placeholder="Name" />
                                {errors.name?.type === 'required' && <p className='text-red-600 text-xs'>Name is required</p>}

                                {/* image upload */}
                                <label className="label">Upload image</label>
                                <input type="file" accept='image/*' {...register("image", { required: true })} className="input" placeholder="Email" />
                                {errors.image?.type === 'required' && <p className='text-red-600 text-xs'>Image is required</p>}

                                {/* email */}
                                <label className="label">Email</label>
                                <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
                                {errors.email?.type === 'required' && <p className='text-red-600 text-xs'>Email is required</p>}

                                {/* mobile number */}
                                <label className="label">Contact number</label>
                                <input type="tel" inputMode='numeric' maxLength={11}
                                {...register("contact_number", { required: 'Contact number is required', pattern:{value: /^01[3-9]\d{8}$/, message: 'Please provide 11 digit Bangladeshi mobile number.'} })} 
                                className="input" placeholder="01*********" />
                                {errors.contact_number && <p className='text-red-600 text-xs'>{errors.contact_number.message}</p>}

                                {/* password */}
                                <label className="label">Password</label>
                                <input className='px-4 py-2'
                                    placeholder='******'
                                    type="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        validate: (value) => {
                                            const errors = [];
                                            if (value.length < 6) errors.push('Password less than 6 characters');
                                            if (!/[A-Z]/.test(value)) errors.push('No capital letter in password.');
                                            if (!/[\W_]/.test(value)) errors.push('No special character in password.');

                                            return errors.length === 0 || `${errors.join(', ')}`;
                                        }
                                    })}
                                />
                                {errors.password && (
                                    <p className="text-red-600 text-xs">{errors?.password?.message}</p>
                                )}
                                <button type='submit' disabled={mutation.isPending} className="btn btn-neutral mt-4">
                                    {mutation.isPending ? (
                                        <>
                                            <span className="loading loading-spinner loading-xs mr-1"></span> Registering...
                                        </>
                                    ) : 'Register'}

                                </button>
                            </fieldset>
                        </form>
                        <p>Already have an account? Please <Link to='/auth/login' className='text-blue-600 underline'>Login </Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;