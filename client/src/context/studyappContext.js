import React, { createContext, useContext, useReducer } from 'react';

import { initialState, reducer } from './reducer';

const AppContext = createContext({
    isLoading: true,
    isAuth: false,
    dispatch: () => {},
    profile: {},
});

// const reducer = (state, action) => {
//     const { type, payload } = action;
//     switch (type) {
//         case 'updateProfile':
//             state.profile = payload;
//             return {
//                 ...state,
//             };
//         case 'CASE_TWO':
//             return {
//                 ...state,
//             };
//         default:
//             throw new Error('No action type found!');
//     }
// };


const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
