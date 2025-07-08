import SignUp from '../lotties/register/SignUp';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from './../hooks/useAxiosSecure';

const RegisterPage = () => {
    const axiosSecure=useAxiosSecure()
    const navigate = useNavigate()
    const { userRegister, userProfileUpdate } = useAuth();
    const { register,
        formState: { errors },
        handleSubmit } = useForm({ criteriaMode: 'all' });
    const onSubmit = async data => {
        const file = data?.image?.[0]
        if (!file) return;
        // cloudinary image upload
        const formData = new FormData()
        formData.append("file", file);
        formData.append("upload_preset", `${import.meta.env.VITE_upload_preset}`);
        formData.append("cloud_name", `${import.meta.env.VITE_cloud_name}`);
        try {
            const result = await axios.post(`${import.meta.env.VITE_cloudinary_url}`, formData);
            const uploadedImageURL = result?.data?.secure_url;
            console.log({ uploadedImageURL });
            console.log(data?.name);
            if(!uploadedImageURL) throw new Error('Failed to create image url!')

            // user registration   
            const userCredential= await userRegister(data?.email, data?.password);
            if(!userCredential?.user) throw new Error('Registration failed!')
                
            // updateInfo
            const updateInfo = {
                displayName: data?.name,
                photoURL: uploadedImageURL
            }
            console.log({ updateInfo })
            // update profile info
            await userProfileUpdate(updateInfo);

            // user info
            const userInfo={
                name:data?.name,
                email: data?.email,
                photoURL: uploadedImageURL,
                role: 'user',
                created_at: new Date().toISOString(),
                last_login: new Date().toISOString(),

            }
            // store user info in the database
            const userResponse=await axiosSecure.post('/users', userInfo);
            console.log('user data to database', userResponse?.data?.message)
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'You have registered successfully.',
                timer: 1500
            })
            navigate('/')
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
                                <button type='submit' className="btn btn-neutral mt-4">Register</button>
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