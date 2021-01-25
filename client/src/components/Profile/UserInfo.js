import React, { useState } from 'react';
import { Grid, InputLabel, Button, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSnackbar } from 'notistack';

import { useGlobalContext } from '../../context/studyappContext';
import * as actions from '../../context/actions';

const useStyles = makeStyles(theme => ({
    inputStyles: {
        fontWeight: '600',
        width: 300,
    },
    labelStyles: {
        paddingBottom: '.5em',
    },
    profileGrid: {
        padding: '2em 0 0 2em',
    },
    button: {
        color: '#FFF',
        background: theme.palette.primary.gradient,
        height: 54,
        marginLeft: '1.2em',
        marginTop: '1em',
        width: 300,
    },
    container: {
        padding: theme.spacing(0, 0, 0, 11),
    },
}));

const UserInfo = () => {
    const { profile, dispatch } = useGlobalContext();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const [email, setEmail] = useState(profile.user.email);
    const [location, setLocation] = useState(profile.location);
    const [phone, setPhone] = useState(profile.phone);

    const handleSubmit = async e => {
        e.preventDefault();
        const userInfo = {
            firstName,
            lastName,
            location,
            phone,
        };

        const res = await actions.updateProfile(userInfo)(dispatch);
        if (res.status === 200) {
            enqueueSnackbar('Updated successfully', {
                variant: 'success',
                autoHideDuration: '5000',
            });
        } else {
            enqueueSnackbar(res.messages, {
                variant: 'Error',
                autoHideDuration: '5000',
            });
        }
    };

    return (
        <Grid container direction="column" className={classes.container}>
            <Grid
                item
                container
                alignContent="center"
                sm={2}
                className={classes.headerContainer}
            >
                <Typography variant="h1" className={classes.header}>
                    Profile
                </Typography>
            </Grid>
            <form noValidate autoComplete="off">
                <Grid
                    item
                    container
                    sm={10}
                    alignContent="flex-start"
                    justify="flex-start"
                    spacing={4}
                >
                    <Grid item>
                        <InputLabel className={classes.labelStyles}>
                            First Name
                        </InputLabel>
                        <TextField
                            variant="outlined"
                            defaultValue={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className={classes.inputStyles}
                            placeholder="Add a first name.."
                        />
                    </Grid>
                    {/* Last Name */}
                    <Grid item>
                        <InputLabel className={classes.labelStyles}>Last Name</InputLabel>
                        <TextField
                            variant="outlined"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className={classes.inputStyles}
                            placeholder="Add a last name.."
                        />
                    </Grid>
                    {/* Email */}
                    <Grid item>
                        <InputLabel className={classes.labelStyles}>Email</InputLabel>
                        <TextField
                            variant="outlined"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className={classes.inputStyles}
                        />
                    </Grid>

                    {/* Phone */}
                    <Grid item>
                        <InputLabel className={classes.labelStyles}>Phone</InputLabel>
                        <TextField
                            variant="outlined"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className={classes.inputStyles}
                            placeholder="Add phone number.."
                        />
                    </Grid>
                    {/* Location */}
                    <Grid item>
                        <InputLabel className={classes.labelStyles}>Location</InputLabel>
                        <TextField
                            variant="outlined"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                            className={classes.inputStyles}
                            placeholder="eg. Toronto"
                        />
                    </Grid>
                    <Grid container>
                        <Grid item>
                            <Button className={classes.button} onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    );
};

export default UserInfo;
