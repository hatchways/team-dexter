import { Grid, Typography, Card, CardContent, CardMedia, CardActions, Button } from '@material-ui/core';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '60%',
    },
    cardContent: {
      flexGrow: 1,
    },
    button: {
        color: '#FFF',
        background: theme.palette.primary.gradient,
        marginTop: theme.spacing(1),
        textTransform: 'none',
        height: '3rem',
        width: "100%",

    }
    
  }));

//format group user count
const formatGroupCount = (num) => {
    if (num >= 1000000000) {
       return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
       return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
       return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}

const GroupCard = (props) => {
    
    const classes = useStyles();

    return (

        <Grid item  xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={props.data.image}
                    title={props.data.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" style={{ fontWeight: 600 }}>
                      {props.data.title}
                    </Typography>
                    <Grid container direction="row" style={{ paddingTop: "10px"}}>
                        <PeopleAltOutlinedIcon color="disabled" fontSize="small" />
                        <Typography variant="body1" color="textSecondary" style={{ paddingLeft: "5px"}} >
                            {formatGroupCount(props.data.members)} members
                        </Typography>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button  className={classes.button}>
                      Join Group
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

    )
}

export default GroupCard