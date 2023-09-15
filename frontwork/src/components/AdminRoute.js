import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

//it is used to check if the user is admin then only the dashboard nd other admin'stuff shown up other wise go to login first
export default function AdminRoute({ children }) {
    const { state } = useContext(Store);
    const { userInfo } = state;
    return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
}