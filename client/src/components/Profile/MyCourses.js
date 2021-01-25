import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    FormHelperText,
    Button,
    Select,
    MenuItem,
    ListItem,
    IconButton,
    LinearProgress,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useGlobalContext } from '../../context/studyappContext';
import * as actions from '../../context/actions';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.common.white,
        flexDirection: 'column',
        justify: 'flex-start',
        padding: theme.spacing(8, 0, 0, 11),
    },
    university: {
        marginBottom: theme.spacing(3),
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    list_item: {
        justifyContent: 'space-between',
        maxWidth: '400px',
        padding: '0 4px 0 8px',
        '& button': {
            padding: 8,
        },
    },
    btn_group: {
        width: '15%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',

        '& input': {
            borderRadius: 4,
            backgroundColor: theme.palette.common.white,
        },
        '& p': {
            fontSize: 12,
            margin: theme.spacing(2.5, 0, 0.5, 0),
        },
    },
    button: {
        color: '#FFF',
        background: theme.palette.primary.gradient,
        marginTop: theme.spacing(4),
        height: '3rem',
    },
    add_btn: {
        marginTop: 8,
    },
}));

const MyCourses = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { isLoading, userCourse, dispatch } = useGlobalContext();

    const { school, userCourses, schoolCourses } = userCourse;

    const classes = useStyles();
    const [selectId, setSelectId] = useState('');
    const [course, setCourse] = useState('');
    const [myCourses, setMyCourses] = useState(userCourses);

    const addCourse = () => {
        if (selectId === '' || myCourses.some(c => c._id === selectId)) return;
        setMyCourses([...myCourses, schoolCourses.find(c => c._id === selectId)]);
        setCourse('');
        setSelectId('');
    };

    const removeCourse = id => {
        setMyCourses(myCourses.filter(c => c._id !== id));
    };

    const handleCourseUpdate = async () => {
        // if user haven't changed anything
        if (JSON.stringify(myCourses) === JSON.stringify(userCourses)) return;

        const courses = [...myCourses].map(c => c._id);

        const res = await actions.updateCourses(courses)(dispatch);

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

    if (isLoading) return <LinearProgress />;

    return (
        <Grid item container md={9} className={classes.container}>
            <Typography variant="h4" className={classes.university}>
                {school}
            </Typography>
            <Typography variant="h5" className={classes.title}>
                Your courses
            </Typography>
            {myCourses.length < 1 && <Typography>No course selected.</Typography>}
            {myCourses.map(c => {
                if (c._id === course) {
                    return (
                        <ListItem key={c._id} className={classes.list_item}>
                            <Typography>{c.name}</Typography>
                            <div className={classes.btn_group}>
                                <IconButton
                                    edge="end"
                                    onClick={() => removeCourse(c._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton edge="end" onClick={() => setCourse('')}>
                                    <HighlightOffIcon />
                                </IconButton>
                            </div>
                        </ListItem>
                    );
                }
                return (
                    <ListItem key={c._id} className={classes.list_item}>
                        <Typography>{c.name}</Typography>
                        <IconButton edge="end" onClick={() => setCourse(c._id)}>
                            <EditOutlinedIcon />
                        </IconButton>
                    </ListItem>
                );
            })}

            <form className={classes.form}>
                <FormHelperText>Select course</FormHelperText>
                <Select
                    value={selectId}
                    variant="outlined"
                    onChange={e => {
                        setSelectId(e.target.value);
                    }}
                >
                    {schoolCourses.map(course => {
                        const isSelected = myCourses.some(c => c._id === course._id);
                        if (isSelected) {
                            return (
                                <MenuItem key={course._id} value={course._id} disabled>
                                    {course.name}
                                </MenuItem>
                            );
                        } else {
                            return (
                                <MenuItem key={course._id} value={course._id}>
                                    {course.name}
                                </MenuItem>
                            );
                        }
                    })}
                </Select>
                <Grid className={classes.add_btn}>
                    <Button color="primary" startIcon={<AddIcon />} onClick={addCourse}>
                        Add course
                    </Button>
                </Grid>
                <Button
                    variant="contained"
                    className={classes.button}
                    onClick={handleCourseUpdate}
                >
                    Update
                </Button>
            </form>
        </Grid>
    );
};

export default MyCourses;
