export const initialState = {
    isLoading: true,
    isAuth: false,
    userCourse: {},
    profile: {},
};

export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isAuth: true,
                isLoading: true,
            };
        case 'FETCH_USER_INFO':
            return {
                ...state,
                userCourse: payload[1],
                profile: payload[0],
                isLoading: false,
                isAuth: true,
            };
        case 'LOGIN_FAIL':
        case 'REGISTER_FAIL':
            return {
                ...state,
                isLoading: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuth: false,
                isLoading: false,
            };
        case 'updateProfile':
            return {
                ...state,
                profile: payload,
            };
        default:
            throw new Error('No action type found!');
    }
};
