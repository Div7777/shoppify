import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

//it is used to check if the user is  login then only the orderhistory,profile and placeorder page will shown up other wise go to login first
export default function ProtectedRoute({ children }) {
    const { state } = useContext(Store);
    const { userInfo } = state;
    return userInfo ? children : <Navigate to="/signin" />;
}