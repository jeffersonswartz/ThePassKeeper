import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import firebase from 'firebase';

interface IAuthProviderProps {
    children: JSX.Element | JSX.Element[];
}

interface AuthContextProps {
    currentUser: firebase.User;
    loading: boolean;
    signUp: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
    logIn: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
    logOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateEmail: (email: string) => Promise<void>;
    updatePassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<firebase.User>({} as firebase.User);
    const [loading, setLoading] = useState(true);

    const signUp = (email: string, password: string) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };

    const logIn = (email: string, password: string) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    const logOut = () => {
        return auth.signOut();
    };

    const resetPassword = (email: string) => {
        return auth.sendPasswordResetEmail(email);
    };

    const updateEmail = (email: string) => {
        return currentUser.updateEmail(email);
    };

    const updatePassword = (password: string) => {
        return currentUser.updatePassword(password);
    };

    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
            }
            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, []);

    const value = {
        currentUser,
        signUp,
        loading,
        logIn,
        logOut,
        resetPassword,
        updateEmail,
        updatePassword,
    };
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
