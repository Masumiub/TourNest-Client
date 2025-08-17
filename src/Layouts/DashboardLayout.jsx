import React, { use } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import logo from '../assets/logo.png'
import useUserRole from '../hooks/useUserRole';
import Swal from 'sweetalert2';


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

                    <li><NavLink to='/dashboard' className='mt-10'>Manage Profile</NavLink></li>
                    {
                        !roleLoading && role == 'user' &&
                        <>
                            <li><NavLink to='myBookings'>My Bookings</NavLink></li>
                            <li><NavLink to='joinAsTourGuide'>Join As Tour Guide</NavLink></li>
                        </>
                    }


                    {
                        !roleLoading && (role == 'user' || role == 'guide') &&
                        <>
                            <li><NavLink to='addStories'>Add Stories</NavLink></li>
                            <li><NavLink to='manageStories'>Manage Stories</NavLink></li>
                        </>
                    }


                    {
                        !roleLoading && role == 'guide' &&
                        <>
                            <li><NavLink to='myAssignedTours'>My Assigned Tours</NavLink></li>
                        </>
                    }

                    {
                        !roleLoading && role == 'admin' &&
                        <>
                            <li><NavLink to='addPackage'>Add Package</NavLink></li>
                            <li><NavLink to='manageUsers'>Manage Users</NavLink></li>
                            <li><NavLink to='manageCandidates'>Manage Candidates</NavLink></li>
                        </>
                    }


                    <li><NavLink to='/'>Back to Home</NavLink></li>
                    <li><button onClick={handleLogOut}>Signout</button></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;