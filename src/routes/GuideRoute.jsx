import React from 'react'
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loading from '../Components/Loading';


const GuideRoute = ({children}) => {

    const {user, loading} = useAuth();
    const {role, roleLoading} = useUserRole();

    if(loading|| roleLoading){
        return <Loading></Loading>
    }

    if(!user || role!== 'guide'){
        return <Navigate state={{from: location.pathname}} to='/forbidden'></Navigate>
    }

    return children;
};

export default GuideRoute;