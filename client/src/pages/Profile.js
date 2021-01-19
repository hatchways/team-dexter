import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

// Custom component imports
import UserInfo from '../components/Profile/UserInfo';
// import Courses from '../components/Profile/Courses';
import Settings from '../components/Profile/Settings';
import Notifications from '../components/Profile/Notifications';
import Sidebar from '../components/Profile/Sidebar';
import Navbar from '../pages/layout/Navbar';

const useStyles = makeStyles(theme => ({
    container: {
        height: 'calc(100vh - 100px)',
        marginTop: 3,
    },
    contentContainer: {
        backgroundColor: theme.palette.common.white,
    },
}));

const Profile = () => {
    const classes = useStyles();

    return (
        <Grid>
            <Navbar />
            <Grid container className={classes.container}>
                <Grid item container sm={3} className={classes.sidebar}>
                    <Sidebar />
                </Grid>
                <Grid item container sm={9} className={classes.contentContainer}>
                    <Switch>
                        <Route exact path="/profile">
                            <UserInfo />
                        </Route>
                        {/* <Route path={`${path}/courses`}>
                        <Courses />
                    </Route */}
                        <Route path="/profile/settings">
                            <Settings />
                        </Route>
                        <Route path="/profile/notifications">
                            <Notifications />
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;
