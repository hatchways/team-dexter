import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

// Custom component imports
import Sidebar from '../components/Profile/Sidebar';
import UserInfo from '../components/Profile/UserInfo';
import Settings from '../components/Profile/Settings';
import Notifications from '../components/Profile/Notifications';
import MyCourses from '../components/Profile/MyCourses';
import ProfileSidePane from './ProfileSidePane';

const useStyles = makeStyles(theme => ({
    container: {
        height: 'calc(100vh - 100px)',
    },
    contentContainer: {
        backgroundColor: theme.palette.common.white,
    },
}));

const Profile = () => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid container className={classes.container}>
                <Sidebar>
                    <ProfileSidePane />
                </Sidebar>
                <Grid item container sm={12} md={9} className={classes.contentContainer}>
                    <Switch>
                        <Route exact path="/profile">
                            <UserInfo />
                        </Route>
                        <Route path="/profile/courses">
                            <MyCourses />
                        </Route>
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
