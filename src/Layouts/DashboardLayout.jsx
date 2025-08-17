import React, { use } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import logo from '../assets/logo.png'
import useUserRole from '../hooks/useUserRole';
import Swal from 'sweetalert2';
import { FaUser, FaBook, FaClipboardList, FaUserPlus, FaPen, FaFolderOpen, FaChartBar, FaTasks, FaBoxOpen, FaUsers, FaUserCheck, FaHome, FaSignOutAlt } from "react-icons/fa";

const DashboardLayout = () => {

    const { user, logout } = use(AuthContext);
    const navigate = useNavigate();
    const { role, roleLoading } = useUserRole()

    //console.log('role use', role)

    const handleLogOut = () => {
        logout()
            .then(() => {
                //alert('Bye, Have a nice day!');
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Bye, Have a nice day!",
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
        <div className="drawer md:drawer-open">
            {/* Drawer toggle for small screen */}
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

            {/* Page content */}
            <div className="drawer-content flex flex-col">
                {/* Navbar (visible only on small screens) */}
                <div className="navbar bg-base-300 md:hidden">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>

                    <NavLink to='/' className="text-3xl font-bold ml-2 md:hidden"> <img src={logo} alt="logo" className='w-12' /></NavLink>

                    <NavLink to='/' className="text-3xl font-bold ml-2 hidden md:block"> <span className='text-blue-500'>tour</span>Nest</NavLink>
                </div>

                {/* Main content */}
                <div className="px-4">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar (drawer side) - always visible on md+ screens */}
            <div className="drawer-side">
                {/* Overlay only for small screens */}
                <label htmlFor="my-drawer-3" className="drawer-overlay md:hidden"></label>

                <ul className="menu bg-base-300 w-80 min-h-full p-4 text-base-content">
                    {/* Sidebar content */}

                    <div className='flex items-center'>
                        <img src={logo} alt="logo" className='w-18' />
                        <NavLink to='/' className="text-4xl font-bold"> <span className='text-blue-500'>tour</span>Nest</NavLink>
                    </div>


                    <div className='mt-4 ml-2 flex gap-2 items-center border-b-1 border-t-1 border-base-100 py-2'>
                        <div className="w-13 rounded-full">
                            <img
                                alt="User" className='rounded-full'
                                src={user.photoURL} title={user ? user.displayName : 'Anonymous'} />
                        </div>
                        <div>
                            <h2 className='font-semibold text-lg'>{user.displayName}</h2>
                            <p>{role}</p>
                        </div>
                    </div>


                    {/* <li><NavLink to='/dashboard' className='mt-10'>Dashboard</NavLink></li> */}

                    <li>
                        <NavLink to='/dashboard' className='mt-10'>
                            <div className="flex flex-row items-center gap-2">
                                <FaUser /> Manage Profile
                            </div>
                        </NavLink>
                    </li>

                    {
                        !roleLoading && role == 'user' &&
                        <>
                            <li>
                                <NavLink to='OverviewUser'>
                                    <div className="flex flex-row items-center gap-2">
                                        <FaChartBar /> Overview
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='myBookings'>
                                    <div className="flex flex-row items-center gap-2">
                                        <FaBook /> My Bookings
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='joinAsTourGuide'>
                                    <div className="flex flex-row items-center gap-2">
                                        <FaUserPlus /> Join As Tour Guide
                                    </div>
                                </NavLink>
                            </li>
                        </>
                    }


                    {
                        !roleLoading && (role == 'user' || role == 'guide') &&
                        <>

                            <li>
                                <NavLink to='addStories'>
                                    <div className="flex flex-row items-center gap-2">
                                        <FaPen /> Add Stories
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='manageStories'>
                                    <div className="flex flex-row items-center gap-2">
                                        <FaFolderOpen /> Manage Stories
                                    </div>
                                </NavLink>
                            </li>
                        </>
                    }


                    {
                        !roleLoading && role == 'guide' &&
                        <>
                            <li>
                                <NavLink to='OverviewGuide'>
                                    <div className="flex flex-row items-center gap-2">
                                        <FaChartBar /> Overview
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='myAssignedTours'>
                                    <div className="flex flex-row items-center gap-2">
                                        <FaTasks /> My Assigned Tours
                                    </div>
                                </NavLink>
                            </li>
                        </>
                    }

                    {
                        !roleLoading && role == 'admin' &&
                        <>
                            <li>
                                <NavLink to='OverviewAdmin'>
                                    <div className="flex flex-row items-center gap-2">
                                        <FaChartBar /> Overview
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='addPackage'>
                                    <div className="flex flex-row items-center gap-2">
                                        <FaBoxOpen /> Add Package
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='manageUsers'>
                                    <div className="flex flex-row items-center gap-2">
                                        <FaUsers /> Manage Users
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='manageCandidates'>
                                    <div className="flex flex-row items-center gap-2">
                                        <FaUserCheck /> Manage Candidates
                                    </div>
                                </NavLink>
                            </li>
                        </>
                    }


                    <li>
                        <NavLink to='/'>
                            <div className="flex flex-row items-center gap-2">
                                <FaHome /> Back to Home
                            </div>
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={handleLogOut}>
                            <div className="flex flex-row items-center gap-2">
                                <FaSignOutAlt /> Signout
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;