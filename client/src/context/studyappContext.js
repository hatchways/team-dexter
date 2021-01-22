import React, { createContext, useContext, useReducer } from 'react';

import { initialState, reducer } from './reducer';

const AppContext = createContext({
    isLoading: true,
    isAuth: false,
    dispatch: () => {},
    profile: {},
});

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
