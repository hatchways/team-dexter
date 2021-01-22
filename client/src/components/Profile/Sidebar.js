import React from 'react';
import { Grid, Typography, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { useGlobalContext } from '../../context/studyappContext';
import DragzonePicture from '../DragzonePicture';
import * as actions from '../../context/actions';

const useStyles = makeStyles(theme => ({
    linkStyles: {
        textDecoration: 'none',
        color: 'black',
        padding: '1em 0 0 2em',
        fontSize: 18,
        opacity: '50%',
    },
    profilePic: {
        borderRadius: '50%',
        width: '130px',
        marginTop: '4em',
    },
    drawer: {
        background: '#F9F9FC',
    },
    linkContainer: {
        paddingTop: '2em',
    },
    profileName: {
        paddingTop: '1em',
        fontSize: 22,
    },
    logoutStyles: {
        padding: '2em',
        color: '#FFF',
        background: theme.palette.primary.gradient,
        height: 54,
        margin: '2em',
    },
}));

const Drawer = props => {
    const classes = useStyles();
    const { profile, dispatch } = useGlobalContext();
    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            justify="space-between"
            item
            className={classes.drawer}
        >
            {/* Profile briefing container */}
            <Grid
                container
                item
                direction="column"
                alignItems="center"
                style={{ marginTop: '3em' }}
            >
                <DragzonePicture className={classes.profilePic} />

                <Typography className={classes.profileName} align="center">
                    {profile.firstName + ' ' + profile.lastName}
                </Typography>
            </Grid>

            {/* Profile Links container */}
            <Grid container item direction="column" className={classes.linkContainer}>
                <NavLink
                    to="/profile"
                    exact
                    activeStyle={{
                        opacity: '100%',
                    }}
                    className={classes.linkStyles}
                >
                    User Info
                </NavLink>
                <NavLink
                    to="/profile/courses"
                    exact
                    activeStyle={{
                        opacity: '100%',
                    }}
                    className={classes.linkStyles}
                >
                    My Courses
                </NavLink>
                <NavLink
                    to="/profile/settings"
                    exact
                    activeStyle={{
                        opacity: '100%',
                    }}
                    className={classes.linkStyles}
                >
                    Settings
                </NavLink>
                <NavLink
                    to="/profile/notifications"
                    exact
                    activeStyle={{
                        opacity: '100%',
                    }}
                    className={classes.linkStyles}
                >
                    Notifications
                </NavLink>
            </Grid>
            <Grid container item>
                <Grid item>
                    <Button
                        className={classes.logoutStyles}
                        onClick={() => actions.logout()(dispatch)}
                    >
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </Grid>

        //  Container for Profile Summary
    );
};

export default Drawer;
