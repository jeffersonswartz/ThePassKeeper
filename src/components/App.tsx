import React from 'react';
import SignUp from './Login/SignUp';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login/Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './Login/ForgotPassword';
import UpdateProfile from './UpdateProfile';
import LoginWrapper from './Login/LoginWrapper';

const App = () => {
    return (
        <div className="min-h-screen flex items-center">
            <div className="w-full">
                <Router>
                    <AuthProvider>
                        <Switch>
                            <PrivateRoute exact path="/" component={Dashboard}>
                                <Dashboard />
                            </PrivateRoute>
                            <LoginWrapper>
                                <Route path="/sign-up">
                                    <SignUp />
                                </Route>
                                <Route path="/login">
                                    <Login />
                                </Route>
                                <Route path="/forgot-password">
                                    <ForgotPassword />
                                </Route>
                            </LoginWrapper>
                            <PrivateRoute path="/update-profile">
                                <UpdateProfile />
                            </PrivateRoute>
                        </Switch>
                    </AuthProvider>
                </Router>
            </div>
        </div>
    );
};

export default App;
