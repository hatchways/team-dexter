import React from 'react';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { theme } from './themes/theme';
import Profile from './pages/Profile';
import Signup from './pages/auth/Sign-up';
import Login from './pages/auth/Login';
import ProtectedRoute from './pages/routing/ProtectedRoute';
import Chat from './pages/contentPages/Chat';
import Forum from './pages/contentPages/Forum';
import Groups from './pages/contentPages/Groups';

import './App.css';
import Layout from './pages/layout/Layout';

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <SnackbarProvider>
                <CssBaseline>
                    <BrowserRouter>
                        <Switch>
                            {/* Landing page temporarily redirects to sign-up. */}
                            <Route
                                exact
                                path="/"
                                render={() => <Redirect to="/sign-up" />}
                            />
                            <Route exact path="/sign-up" component={Signup} />
                            <Route exact path="/login" component={Login} />

                            <Layout>
                                <ProtectedRoute exact path="/profile" component={Profile} />
                                <ProtectedRoute
                                    path="/profile/:profileContent"
                                    component={Profile}
                                />
                                <ProtectedRoute path="/forum" component={Forum} />
                                <ProtectedRoute path="/groups" component={Groups} />
                                <ProtectedRoute path="/chat" component={Chat} />
                            </Layout>

                            {/* Any other unknown paths redirects to sign-up. */}
                            <Route
                                path="*"
                                render={props => (
                                    <Redirect
                                        to={{
                                            pathname: '/sign-up',
                                            state: { from: props.location },
                                        }}
                                    />
                                )}
                            />
                        </Switch>
                    </BrowserRouter>
                </CssBaseline>
            </SnackbarProvider>
        </MuiThemeProvider>
    );
}

export default App;
