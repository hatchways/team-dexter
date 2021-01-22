import React, { useEffect } from 'react';

import Navbar from './Navbar';
import * as actions from '../../context/actions';
import { useGlobalContext } from '../../context/studyappContext';

const Layout = ({ children }) => {
    const { dispatch } = useGlobalContext();

    useEffect(() => {
        actions.fetchProfile()(dispatch);
    }, [dispatch]);

    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default Layout;
