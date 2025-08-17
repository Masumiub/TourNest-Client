import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { Link, NavLink, useNavigate } from 'react-router';
import { CgDarkMode } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { SlPlane } from "react-icons/sl";
import { RiGroupLine } from "react-icons/ri";
import logo from '../assets/logo.png'
import './Navbar.css'
import { TbLogout } from "react-icons/tb";
import { RiDashboard3Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import { MdNotes } from 'react-icons/md';


const Navbar = () => {

    const [theme, setTheme] = useState('light');

    const { user, logout } = use(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleLogout = () => {
        logout()
            .then(() => {
                //alert('You logged out successfully');
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You logged out successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            })
            .catch((error) => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Failed to logout!",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return (
        <div className='mx-auto flex justify-center w-full' >
            <div className="navbar px-3 mt-3 w-full md:w-9/12 fixed top-0 z-50 shadow-2xl bg-base-100 rounded-2xl">

                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li> <NavLink to='/'>Home</NavLink> </li>
                            <li> <NavLink to='/community'>Community</NavLink> </li>
                            <li><NavLink to='/aboutUs'>About us</NavLink></li>
                            <li><NavLink to='/allTrips'>Trips</NavLink></li>
                             <li><NavLink to='/Conditions'>Conditions</NavLink></li>
                        </ul>
                    </div>
                    <Link to='/' className="ml-2"> <img src={logo} alt="logo" className='w-12' /></Link>
                    <Link to='/' className="text-3xl font-bold ml-2 hidden md:block"> <span className='text-blue-500'>tour</span>Nest</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 ">
                        <li> <NavLink to='/'><IoHomeOutline /> Home</NavLink> </li>
                        <li><NavLink to='/allTrips'><SlPlane /> Trips</NavLink></li>
                        <li> <NavLink to='/community'><RiGroupLine /> Community</NavLink> </li>
                        <li><NavLink to='/aboutUs'><IoPersonOutline /> About us</NavLink></li>
                         <li><NavLink to='/Conditions'><MdNotes />Conditions</NavLink></li>

                    </ul>
                </div>
                <div className="navbar-end gap-3">

                    <div className="form-control mt-1">
                        <label className="label cursor-pointer">
                            <CgDarkMode size={25} />
                            <input type="checkbox" className="toggle theme-controller" onChange={toggleTheme} checked={theme === 'dark'} />
                        </label>
                    </div>

                    {/* {
                        user ? <Link to='/dashboard' className="btn rounded-full bg-blue-500 text-white border-0 btn-sm hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border-1" ><RiDashboard3Line size={20}/>Dashboard</Link> : ""
                    } */}
                    {
                        user ? <div className="dropdown dropdown-end dropdown-hover"> <div className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User"
                                    src={user.photoURL} title={user ? user.displayName : 'Anonymous'} />
                            </div>
                        </div>
                            <ul
                                className="menu dropdown-content bg-base-200 rounded-box z-1 shadow-lg">
                                <li className='pointer-events-none'>
                                    <p className='text-lg font-semibold'>{user.displayName}</p>
                                </li>
                                <li className='pointer-events-none'> <p>{user.email}</p></li>
                                <li><Link to='/dashboard' className="btn rounded-full bg-blue-500 text-white border-0 btn-sm hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border-1" ><RiDashboard3Line size={20} />Dashboard</Link> </li>
                                <li><button onClick={handleLogout} className="btn rounded-full bg-blue-500 text-white border-0 btn-sm mt-2"><TbLogout /> Signout</button></li>
                            </ul> </div> : <div className='flex gap-2'>
                            <NavLink to='/login' className="btn rounded-full  bg-blue-500 text-white border-0">Login</NavLink>
                            <Link to='/register' className="btn rounded-full">Register</Link>
                        </div>
                    }



                </div>

            </div>
        </div>
    );
};

export default Navbar;