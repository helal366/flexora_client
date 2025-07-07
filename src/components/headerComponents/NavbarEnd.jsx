import React from 'react';
import { NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const NavbarEnd = () => {
    const {userLogout, user} = useAuth()
    const handleLogout=()=>{
        userLogout()
        .then(()=>{
            Swal.fire({
                icon: 'success',
                text: 'Logout successful',
                timer: 1500
            })}).catch((error)=>{
                Swal.fire({
                    icon:'error',
                    title: 'Logout failed',
                    text: `${error}`
                })
            })
    }
    return (
        <>
            <div className="navbar-end">
                {
                    user? <>
                    <button onClick={handleLogout} className="btn btn-info">Logout</button>
                    </>:<>
                    <NavLink to='/auth/login' className="btn btn-info px-10 mr-2">Login</NavLink>
                    <NavLink to='/auth/register' className="btn btn-info">Register</NavLink>
                    </>
                }
                
            </div>
        </>
    );
};

export default NavbarEnd;