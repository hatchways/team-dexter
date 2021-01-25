import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';

import Navbar from './Navbar';
import * as actions from '../../context/actions';
import { useGlobalContext } from '../../context/studyappContext';

const Layout = ({ children }) => {
    const { dispatch, isLoading, isAuth } = useGlobalContext();

    useEffect(() => {
        actions.fetchProfile()(dispatch);
    }, [dispatch]);

    if (!isAuth) return <Redirect to="/login" />;
    if (isLoading) return <LinearProgress />;

    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default Layout;
