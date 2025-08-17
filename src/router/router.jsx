import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Community from '../Pages/Community/Community';
import AboutUs from '../Pages/AboutUs/AboutUs'
import AllTrips from '../Pages/AllTrips/AllTrips'
import TourGuideProfile from "../Pages/TourGuideProfile/TourGuideProfile";
import PrivateRoutes from "../routes/PrivateRoutes";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageProfile from "../Pages/Dashboard/ManageProfile/ManageProfile";
import MyBookings from "../Pages/Dashboard/MyBookings/MyBookings";
import AddStories from "../Pages/Dashboard/AddStories/AddStories";
import ManageStories from '../Pages/Dashboard/ManageStories/ManageStories'
import JoinAsTourGuide from '../Pages/Dashboard/JoinAsTourGuide/JoinAsTourGuide'
import MyAssignedTours from "../Pages/Dashboard/MyAssignedTours/MyAssignedTours";
import AddPackage from "../Pages/Dashboard/AddPackage/AddPackage";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import ManageCandidates from "../Pages/Dashboard/ManageCandidates/ManageCandidates";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import PackageDetails from "../Pages/PackageDetails/PackageDetails";
import BookingForm from "../Pages/BookingForm/BookingForm";
import AllStories from "../Pages/AllStories/AllStories";
import UpdateStories from "../Pages/Dashboard/UpdateStories/UpdateStories";
import Payment from '../Pages/Dashboard/Payment/Payment'
import GuideRoute from "../routes/GuideRoute";
import AdminRoute from "../routes/AdminRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import  Forbidden from '../Pages/Forbidden/Forbidden'
import Loading from "../Components/Loading";
import StoryDetails from "../Pages/StoryDetails/StoryDetails";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <ErrorPage></ErrorPage>,
        hydrateFallbackElement: <Loading></Loading>,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'forbidden',
                Component: Forbidden
            },
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register,
            },
            {
                path: '/community',
                Component: Community
            },
            {
                path: '/aboutUs',
                Component: AboutUs
            },
            {
                path: '/allTrips',
                Component: AllTrips
            },
            {
                path: '/tourGuideProfile',
                Component: TourGuideProfile,
            },
            {
                path: '/forgetPassword',
                Component: ForgetPassword
            },
            {
                path: '/packages/:id',
                loader: ({ params }) => fetch(`https://tour-nest-server.vercel.app/packages/${params.id}`),
                element: <PackageDetails></PackageDetails>
            },
            {

                path: '/bookingForm/:id',
                element: <PrivateRoutes><BookingForm /></PrivateRoutes>

            },
            {
                path: '/tourGuide/:id',
                loader: ({ params }) => fetch(`https://tour-nest-server.vercel.app/tourGuide/${params.id}`),
                element: <TourGuideProfile></TourGuideProfile>
            },
            {
                path: "/allStories",
                element: <AllStories />
            },
            {
                path: '/storyDetails/:id',
                loader: ({params}) =>fetch(`https://tour-nest-server.vercel.app/storyDetails/${params.id}`),
                element: <StoryDetails></StoryDetails>
            }

        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        errorElement: <ErrorPage></ErrorPage>,
        hydrateFallbackElement: <Loading></Loading>,
        children: [
            {
                index: 'manageProfile',
                element: <ManageProfile></ManageProfile>
            },
            {
                path: 'myBookings',
                element: <MyBookings></MyBookings>
            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>
            },
            {
                path: 'addStories',
                element: <AddStories></AddStories>
            },
            {
                path: 'updateStory/:id',
                //loader: ({ params }) => fetch(`https://tour-nest-server.vercel.app/stories/${params.id}`),
                element: <UpdateStories></UpdateStories>
            },
            {
                path: 'manageStories',
                element: <ManageStories></ManageStories>
            },
            {
                path: 'joinAsTourGuide',
                element: <JoinAsTourGuide></JoinAsTourGuide>
            },
            {
                path: 'myAssignedTours',
                element: <GuideRoute><MyAssignedTours></MyAssignedTours></GuideRoute>
            },
            {
                path: 'addPackage',
                element: <AdminRoute><AddPackage></AddPackage></AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'manageCandidates',
                element: <AdminRoute><ManageCandidates></ManageCandidates></AdminRoute>
            }
        ]
    }
]);

export default router;