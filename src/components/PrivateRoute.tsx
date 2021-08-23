import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props extends RouteProps {
    children: JSX.Element | JSX.Element[];
}

const PrivateRoute = ({ children, exact, path }: Props) => {
    const { currentUser } = useAuth();
    return (
        <Route
            exact={exact}
            path={path}
            render={() => (Object.keys(currentUser)?.length ? children : <Redirect to="/login" />)}
        />
    );
};

export default PrivateRoute;
