import React, { useEffect, useState } from 'react';
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
import { useSnackbar } from 'notistack';
import { useConversationContext, useGlobalContext } from '../../context/studyappContext';
import * as actions from '../../context/actions';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.common.white,
        flexDirection: 'column',
        justify: 'flex-start',
        padding: theme.spacing(8, 0, 0, 11),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(0, 0, 0, 6),
        },
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(0, 2, 0, 2),
        },
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
            fontSize: '1.125rem',
        },
    },
    btn_group: {
        width: '15%',
        display: 'flex',
        justifyContent: 'space-between',
        '& button': {
            fontSize: '1.125rem',
        },
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
            fontSize: '0.75rem',
            margin: theme.spacing(2.5, 0, 0.5, 0),
        },
    },
    button: {
        marginTop: theme.spacing(4),
    },
    add_btn: {
        marginTop: 8,
    },
}));

const MyCourses = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { isLoading, userCourse, userGroups, dispatch } = useGlobalContext();
    const { conversationManager } = useConversationContext();
    const { groups } = userGroups;
    const { school, userCourses, schoolCourses } = userCourse;
    const classes = useStyles();
    const [selectId, setSelectId] = useState('');
    const [course, setCourse] = useState('');
    const [myCourses, setMyCourses] = useState(userCourses);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setHasChanges(JSON.stringify(myCourses) !== JSON.stringify(userCourses));
    }, [myCourses, userCourses]);

    const addCourse = () => {
        if (selectId === '' || myCourses.some(c => c._id === selectId)) return;
        setMyCourses([...myCourses, schoolCourses.find(c => c._id === selectId)]);
        setCourse('');
        setSelectId('');
    };

    const handleAddCourses = async () => {
        if (!hasChanges) return;
        const courses = [...myCourses].map(c => c._id);
        try {
            const res = await axios.post('/user/courses', courses);
            actions.fetchUserGroups(res.data.user.groups)(dispatch);
            dispatch({ type: 'updateUserCourses', payload: res.data.user.courses });
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
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemove = async id => {
        //if course has not been added to user
        if (!userCourses.some(course => course._id === id)) {
            setMyCourses(myCourses.filter(c => c._id !== id));
        } else {
            try {
                let groupIds;
                if (groups && groups.length) {
                    // filter user groups selecting only the group id's
                    groupIds = groups.reduce(
                        // eslint-disable-next-line no-sequences
                        (arr, g) => (g.course === id && arr.push(g._id), arr),
                        []
                    );
                } else {
                    groupIds = groups.map(group => group._id);
                }
                const res = await axios.delete(`/user/courses/${id}`, {
                    data: { groupsRemoved: groupIds },
                });

                await actions.fetchUserGroups(res.data.groups)(dispatch);
                conversationManager.updateRooms(res.data.groups);
                dispatch({ type: 'updateUserCourses', payload: res.data.courses });
                setMyCourses(myCourses.filter(c => c._id !== id));
            } catch (err) {
                console.log(err);
            }
        }
    };

    if (isLoading) return <LinearProgress />;

    return (
        <Grid item container md={9} className={classes.container}>
            <Typography variant="h1" className={classes.university}>
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
                                    onClick={() => handleRemove(c._id)}
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
                    <Button color="secondary" startIcon={<AddIcon />} onClick={addCourse}>
                        Add course
                    </Button>
                </Grid>
                <Button
                    variant="text"
                    color="primary"
                    className={classes.button}
                    onClick={handleAddCourses}
                    disabled={!hasChanges}
                >
                    Update
                </Button>
            </form>
        </Grid>
    );
};

export default MyCourses;
