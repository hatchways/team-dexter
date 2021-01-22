import axios from 'axios';

export const register = values => async dispatch => {
    try {
        const res = await axios.post('/register', values);

        if (res.status === 201) {
            dispatch({ type: 'REGISTER_SUCCESS' });
            return res.status;
        }
    } catch (err) {
        console.log(err.response);
        dispatch({ type: 'REGISTER_FAIL' });
        return err.response.data.response;
    }
};

export const login = values => async dispatch => {
    try {
        const res = await axios.post('/login', values);
        if (res.status === 200) {
            dispatch({ type: 'LOGIN_SUCCESS' });
            return res.status;
        }
    } catch (err) {
        console.log(err.response);
        dispatch({ type: 'LOGIN_FAIL' });
        return err.response.data.response;
    }
};

export const fetchProfile = () => async dispatch => {
    try {
        const res = await axios.get('/profile');

        const { profile, user } = res.data;
        const { courses, university } = user;

        dispatch({
            type: 'FETCH_USER_COURSES',
            payload: [
                {
                    ...profile,
                },
                {
                    school: university.name,
                    userCourses: courses,
                    schoolCourses: university.courses,
                },
            ],
        });
    } catch (err) {
        console.log(err.message);
    }
};

export const logout = () => dispatch => {
    dispatch({ type: 'LOGOUT' });
};
