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
import { useStyles } from './NavbarStyles';
import * as actions from '../../context/actions';
import { logout } from '../../context/actions';
import { useGlobalContext } from '../../context/studyappContext';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

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
                            <ListItem>
                                <NavLink
                                    color="inherit"
                                    variant="inherit"
                                    underline="none"
                                    to="/forum"
                                    style={{ opacity: '50%' }}
                                    activeStyle={{
                                        opacity: '100%',
                                    }}
                                    className={classes.linkStyles}
                                >
                                    Forum
                                </NavLink>
                            </ListItem>
                            <ListItem>
                                <NavLink
                                    color="inherit"
                                    variant="inherit"
                                    underline="none"
                                    to="/groups"
                                    activeStyle={{
                                        opacity: '100%',
                                    }}
                                    className={classes.linkStyles}
                                >
                                    Groups
                                </NavLink>
                            </ListItem>
                            <ListItem>
                                <NavLink
                                    color="inherit"
                                    variant="inherit"
                                    underline="none"
                                    to="/chat"
                                    activeStyle={{
                                        opacity: '100%',
                                    }}
                                    className={classes.linkStyles}
                                >
                                    Chats
                                </NavLink>
                                <Badge badgeContent={12} className={classes.badge} />
                            </ListItem>
                        </List>
                    </div>
                    <div className={classes.profile}>
                        {profile.imageUrl ? (
                            <Avatar
                                alt="Profile Pic"
                                src={profile.imageUrl}
                                className={classes.avatar}
                            />
                        ) : (
                            <Avatar className={classes.large}>
                                <PersonAddIcon className={classes.large} />
                            </Avatar>
                        )}

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
                            <MenuItem onClick={() => logout()(dispatch)}>
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
