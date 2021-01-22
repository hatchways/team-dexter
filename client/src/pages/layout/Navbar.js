import React, { useState } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Avatar,
    List,
    ListItem,
    Badge,
    Menu,
    MenuItem,
    Link,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { NavLink, useHistory } from 'react-router-dom';

import logo from '../../images/logo_study.png';
import profileImg from '../../images/empty_profile.png';
import { useStyles } from './NavbarStyles';
import { useGlobalContext } from '../../context/studyappContext';
import * as actions from '../../context/actions';

const Navbar = () => {
    const classes = useStyles();

    const history = useHistory();

    const { profile, dispatch } = useGlobalContext();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleProfile = () => {
        setAnchorEl(null);
        history.push('/profile');
    };

    const handleLogout = () => {
        actions.logout()(dispatch);
        history.push('/login');
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" elevation={2}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.logo_study}>
                        <Link
                            color="inherit"
                            variant="inherit"
                            underline="none"
                            // component={RouterLink}
                            // to="/login"
                        >
                            <img src={logo} alt="logo_study" />
                        </Link>
                        <Typography variant="h3">studyapp</Typography>
                    </div>
                    <div className={classes.listContainer}>
                        <List>
                            <Link
                                color="inherit"
                                variant="inherit"
                                underline="none"
                                component={NavLink}
                                activeStyle={{
                                    fontWeight: 600,
                                    color: '#2574FF',
                                }}
                                to="/forum"
                            >
                                <ListItem>
                                    <Typography variant="h6">Forum</Typography>
                                </ListItem>
                            </Link>
                            <Link
                                color="inherit"
                                variant="inherit"
                                underline="none"
                                component={NavLink}
                                activeStyle={{
                                    fontWeight: 600,
                                    color: '#2574FF',
                                }}
                                to="/groups"
                            >
                                <ListItem>
                                    <Typography variant="h6">Groups</Typography>
                                </ListItem>
                            </Link>
                            <Link
                                color="inherit"
                                variant="inherit"
                                underline="none"
                                component={NavLink}
                                activeStyle={{
                                    fontWeight: 600,
                                    color: '#2574FF',
                                }}
                                to="/chat"
                            >
                                <ListItem>
                                    <Typography variant="h6">Chats</Typography>
                                    <Badge badgeContent={12} className={classes.badge} />
                                </ListItem>
                            </Link>
                        </List>
                    </div>
                    <div className={classes.profile}>
                        <Avatar
                            alt="profiel_img"
                            src={profile.imageUrl ? profile.imageUrl : profileImg}
                            className={classes.avatar}
                        />
                        <Button
                            endIcon={<ArrowDropDownIcon />}
                            className={classes.profile_button}
                            onClick={e => setAnchorEl(e.currentTarget)}
                        >
                            <Typography variant="h6">Profile</Typography>
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            open={open}
                            onClose={() => setAnchorEl(null)}
                        >
                            <MenuItem onClick={handleLogout}>
                                <ExitToAppIcon className={classes.icons} />
                                <Typography>Logout</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleProfile}>
                                <AccountCircleIcon className={classes.icons} />
                                <Typography>My Profile</Typography>
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
