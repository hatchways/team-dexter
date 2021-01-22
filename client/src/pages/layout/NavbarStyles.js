import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        height: 100,
        backgroundColor: theme.palette.common.white,
    },
    logo_study: {
        flexGrow: 6,
        display: 'flex',
        alignItems: 'center',
        marginLeft: '2.25rem',
        '& img': {
            width: '2.75rem',
            height: 'auto',
            marginRight: theme.spacing(2),
            cursor: 'pointer',
        },
    },
    listContainer: {
        flexGrow: 3,
        display: 'flex',
        '& > *': {
            display: 'flex',
            fontSize: 16,
            fontWeight: 500,
            cursor: 'pointer',
        },
    },
    profile: {
        flexGrow: 1,
        display: 'flex',
        marginLeft: theme.spacing(2),
    },
    avatar: {
        height: 60,
        width: 60,
    },
    badge: {
        color: theme.palette.common.white,
        paddingLeft: theme.spacing(3),
        '& span': {
            width: 30,
            fontSize: 12,
            background: theme.palette.primary.gradient,
        },
    },
    profile_button: {
        marginLeft: theme.spacing(1),
        textTransform: 'capitalize',
        '& span': {
            marginLeft: 0,
        },
    },
    icons: { marginRight: 8 },
    linkStyles: {
        textDecoration: 'none',
        color: 'black',
        fontSize: 18,
        opacity: '50%',
        marginLeft: 15,
    },
}));
