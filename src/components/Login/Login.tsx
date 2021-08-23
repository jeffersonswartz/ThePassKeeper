import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

interface Props {}

const Login = (props: Props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const { logIn } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!emailRef.current?.value || !passwordRef.current?.value) {
            return setError('Enter details');
        }
        try {
            setError('');
            setLoading(true);
            await logIn(emailRef.current.value, passwordRef.current.value);
            setLoading(false);
            history.push('/');
        } catch (error) {
            setError('Failed to Sign in');
            setLoading(false);
        }
    };
    return (
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2
                className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
            >
                Log in
            </h2>
            <div></div>
            <div className="mt-12">
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
                        <input
                            className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                            type="text"
                            required
                            ref={emailRef}
                            placeholder="user@mail.com"
                        />
                    </div>
                    <div className="mt-8">
                        <div className="flex justify-between items-center">
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Password</div>
                            <div>
                                <span
                                    className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                                cursor-pointer"
                                >
                                    <Link to="/forgot-password">Forgot Password?</Link>
                                </span>
                            </div>
                        </div>
                        <input
                            className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                            type="password"
                            ref={passwordRef}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {error && <p className="mt-10 text-red-500 text-center">{error}</p>}
                    <div className="mt-10">
                        <button
                            className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
                            disabled={loading}
                        >
                            Log In
                        </button>
                    </div>
                </form>
                <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                    Don't have an account ?{' '}
                    <span className="cursor-pointer text-indigo-600 hover:text-indigo-800">
                        <Link to="/sign-up">Sign Up</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
