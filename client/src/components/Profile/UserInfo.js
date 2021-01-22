import React, { useState } from 'react';
import { Grid, InputLabel, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import { useGlobalContext } from '../../context/studyappContext';

const useStyles = makeStyles({
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
});

const UserInfo = props => {
    const [firstName, setFirstName] = useState('Ashly');
    const [lastName, setLastName] = useState('Sanford');
    const [email, setEmail] = useState('usermail@gmail.com');
    const [location, setLocation] = useState('+1 (202) 555 0192');
    const [phone, setPhone] = useState('');

    const classes = useStyles();
    const { profile } = useGlobalContext();
    console.log(profile);
    return (
        //  User Info Grid Parent Container
        <Grid container item sm={12} className={classes.profileGrid}>
            <Grid item sm={12}>
                <Typography variant="h1" className={classes.headerStyles}>
                    Profile
                </Typography>
            </Grid>
            {/* First Name  */}
            <Grid item>
                <InputLabel className={classes.labelStyles}>First Name</InputLabel>{' '}
                <TextField
                    variant="outlined"
                    hinttext="Change First Name.."
                    onChange={e => setFirstName(e.target.value)}
                    value={profile.firstName}
                    className={classes.inputStyles}
                />
            </Grid>

            {/* Last Name */}
            <Grid item>
                <InputLabel className={classes.labelStyles}>Last Name</InputLabel>{' '}
                <TextField
                    variant="outlined"
                    hinttext="Change Last Name.."
                    onChange={e => setLastName(e.target.value)}
                    value={profile.lastName}
                    className={classes.inputStyles}
                />
            </Grid>
            {/* Email */}
            <Grid item>
                <InputLabel className={classes.labelStyles}>Email address</InputLabel>{' '}
                <TextField
                    variant="outlined"
                    hinttext="Change Email..."
                    onChange={e => setEmail(e.target.value)}
                    value={''}
                    className={classes.inputStyles}
                />
            </Grid>

            {/* Phone */}
            <Grid item>
                <InputLabel className={classes.labelStyles}>Phone</InputLabel>{' '}
                <TextField
                    variant="outlined"
                    hinttext="Change Phone Number..."
                    onChange={e => setPhone(e.target.value)}
                    value={profile.phone}
                    className={classes.inputStyles}
                />
            </Grid>
            {/* Location */}
            <Grid item>
                <InputLabel className={classes.labelStyles}>Location</InputLabel>{' '}
                <TextField
                    variant="outlined"
                    hinttext="Change Location.."
                    onChange={e => setLocation(e.target.value)}
                    value={profile.location}
                    className={classes.inputStyles}
                />
            </Grid>
            <Button>Submit changes</Button>
        </Grid>
    );
};

export default UserInfo;
