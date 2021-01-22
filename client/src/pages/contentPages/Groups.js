import React from 'react';
import { Grid, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { groups } from '../../data/mockData.js';
import GroupCard from '../../components/Group/GroupCard';

const useStyles = makeStyles(theme => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
}));

const Groups = () => {
    const classes = useStyles();

    return (
        <Grid>
            <Grid container>
                <Grid item justify="center" direction="row" container sm={12}>
                    <Typography
                        variant="h1"
                        color="textPrimary"
                        style={{ paddingTop: '60px' }}
                    >
                        Sugggested For You.
                    </Typography>
                </Grid>
                <Grid item justify="center" direction="row" container sm={12}>
                    <Typography
                        variant="h6"
                        color="textSecondary"
                        style={{ paddingTop: '20px' }}
                    >
                        Groups you might be interested in!
                    </Typography>
                </Grid>
            </Grid>

            <Container className={classes.cardGrid} maxWidth="md">
                <Grid container spacing={4}>
                    {groups.map(card => (
                        <GroupCard key={card.id} data={card} />
                    ))}
                </Grid>
            </Container>
        </Grid>
    );
};

export default Groups;
