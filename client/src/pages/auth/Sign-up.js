import React, { useEffect, useState, useCallback } from 'react';
import {
    Grid,
    Typography,
    FormHelperText,
    Paper,
    Link,
    Button,
    Select,
    MenuItem,
    Hidden,
    LinearProgress,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Formik, Form, Field } from 'formik';
import { TextField as MikTextField } from 'formik-material-ui';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import logo from '../../images/logo.png';
import { useStyles } from './Styles';
import CourseList from './CourseList';
import handleAuthErrors from '../../utils/handleAuthErrors';
import * as actions from '../../context/actions';
import { useGlobalContext } from '../../context/studyappContext';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6).required('Required'),
});

const Signup = () => {
    const classes = useStyles();
    const { isAuth, dispatch } = useGlobalContext();
    const { enqueueSnackbar } = useSnackbar();

    const [isLoading, setIsLoading] = useState(true);
    const [schools, setSchools] = useState([]);
    const [courseId, setCourseId] = useState('');
    const [courses, setCourses] = useState([{ _id: 1, name: 'Select a school first' }]);
    const [id, setId] = useState('');
    const [addedCourses, setAddedCourses] = useState([]);

    // fetch all the universities
    const fetchData = async () => {
        try {
            const response = await axios.get('/universities');

            setSchools(response.data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (courseId) {
            const schoolCourses = [];
            [...schools].forEach(s => {
                if (s._id === courseId) schoolCourses.push(...s.courses);
            });
            setCourses(schoolCourses);
        }
    }, [courseId, schools]);

    const addCourse = () => {
        // return if the courese alread exist or
        // if user haven't selected anything
        if (addedCourses.some(ac => ac._id === id) || id === '' || id === 1) return;

        setAddedCourses([...addedCourses, courses.find(c => c._id === id)]);
    };

    const handleRemoveCourse = useCallback(
        id => {
            setAddedCourses(addedCourses.filter(c => c._id !== id));
        },
        [addedCourses]
    );

    if (isLoading) return <LinearProgress />;

    if (isAuth) return <Redirect to="/profile" />;

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid
                    item
                    container
                    md={6}
                    direction="column"
                    justify="flex-start"
                    className={classes.formContainer}
                >
                    <div className={classes.logoContainer}>
                        <div className={classes.logo}>
                            <img src={logo} alt="logo"></img>
                        </div>
                        <Hidden mdUp>
                            <Link
                                color="inherit"
                                variant="inherit"
                                underline="none"
                                component={RouterLink}
                                to="/login"
                            >
                                <Button
                                    variant="contained"
                                    className={classes.button}
                                    style={{ marginTop: 0 }}
                                >
                                    login
                                </Button>
                            </Link>
                        </Hidden>
                    </div>
                    <Typography variant="h1" color="textPrimary">
                        Create an account.
                    </Typography>

                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            university: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={async (values, { setSubmitting, setErrors }) => {
                            values.courses = [...addedCourses].map(ac => ac._id);
                            actions
                                .register(values)(dispatch)
                                .then(res => {
                                    if (res.status === 201) {
                                        enqueueSnackbar('Registered successfully', {
                                            variant: 'success',
                                            autoHideDuration: '5000',
                                        });
                                    } else if (res.status === 500) {
                                        enqueueSnackbar('Server Error', {
                                            variant: 'Error',
                                            autoHideDuration: '5000',
                                        });
                                    } else {
                                        handleAuthErrors(res, setErrors)
                                    }
                                });
                            setTimeout(() => {
                                setSubmitting(false);
                            }, 500);
                        }}
                    >
                        {({ submitForm, isSubmitting, errors }) => (
                            <Form className={classes.form}>
                                <FormHelperText>Email address</FormHelperText>
                                <Field
                                    component={MikTextField}
                                    name="email"
                                    type="email"
                                    variant="outlined"
                                />
                                <FormHelperText required>Password</FormHelperText>
                                <Field
                                    component={MikTextField}
                                    name="password"
                                    type="password"
                                    variant="outlined"
                                />
                                <FormHelperText>Select your school</FormHelperText>
                                <Field
                                    component={MikTextField}
                                    name="university"
                                    type="text"
                                    select
                                    variant="outlined"
                                    defaultValue=""
                                >
                                    {schools.map(school => {
                                        return (
                                            <MenuItem
                                                key={school._id}
                                                value={school._id}
                                                onClick={() => setCourseId(school._id)}
                                            >
                                                {school.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Field>
                                {addedCourses.length > 0 && (
                                    <CourseList
                                        courses={addedCourses}
                                        removeCourse={handleRemoveCourse}
                                    />
                                )}
                                <FormHelperText>Select the course</FormHelperText>
                                <Select
                                    defaultValue=""
                                    variant="outlined"
                                    onChange={e => setId(e.target.value)}
                                >
                                    {courses.map(course => {
                                        const isSelected = addedCourses.some(
                                            ac => ac._id === course._id
                                        );
                                        if (isSelected) {
                                            return (
                                                <MenuItem
                                                    key={course._id}
                                                    value={course._id}
                                                    disabled
                                                >
                                                    {course.name}
                                                </MenuItem>
                                            );
                                        } else {
                                            return (
                                                <MenuItem
                                                    key={course._id}
                                                    value={course._id}
                                                >
                                                    {course.name}
                                                </MenuItem>
                                            );
                                        }
                                    })}
                                </Select>
                                <Grid className={classes.add_course}>
                                    <Button
                                        color="primary"
                                        startIcon={<AddIcon />}
                                        onClick={addCourse}
                                    >
                                        Add course
                                    </Button>
                                </Grid>
                                <Button
                                    variant="contained"
                                    className={classes.button}
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                >
                                    Sign up
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Grid>
                <Grid item md={6}>
                    <Hidden smDown>
                        <Paper className={classes.paper}>
                            <div className={classes.dark_overlay}>
                                <Link
                                    color="inherit"
                                    variant="inherit"
                                    underline="none"
                                    component={RouterLink}
                                    to="/login"
                                >
                                    <Button variant="outlined">Login</Button>
                                </Link>
                            </div>
                        </Paper>
                    </Hidden>
                </Grid>
            </Grid>
        </div>
    );
};

export default Signup;
