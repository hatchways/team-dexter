import axios from 'axios';

export const register = values => async dispatch => {
    try {
        const res = await axios.post('auth/register', values).catch(err => {
            throw err.response;
        });
        if (res.status === 201) {
            dispatch({ type: 'REGISTER_SUCCESS' });
            return res;
        }
    } catch (err) {
        console.log(err);
        dispatch({ type: 'REGISTER_FAIL' });
        return err;
    }
};

export const login = values => async dispatch => {
    try {
        const res = await axios.post('auth/login', values).catch(err => {
            throw err.response;
        });

        if (res.status === 200) {
            dispatch({ type: 'LOGIN_SUCCESS' });
            return res;
        }
    } catch (err) {
        console.log(err.response);
        dispatch({ type: 'LOGIN_FAIL' });
        return err;
    }
};

export const logout = () => async dispatch => {
    try {
        const res = await axios.delete('/auth/logout');
        if (res.status === 204) {
            dispatch({ type: 'LOGOUT' });
        }
    } catch (err) {
        console.log(err);
    }
};

export const fetchProfile = () => async dispatch => {
    try {
        const res = await axios.get('/profile');
        console.log('res: ' + res.data);
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
