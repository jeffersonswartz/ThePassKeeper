import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

interface Props {}

const SignUp = (props: Props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signUp } = useAuth();

    const history = useHistory();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!emailRef.current?.value || !passwordRef.current?.value || !passwordConfirmRef.current?.value) {
            return setError('Enter details');
        } else if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
            return setError('Passwords do not match');
        }
        try {
            setError('');
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
            setLoading(false);
            history.push('/');
        } catch (error) {
            setError('Account creation failed');
            setLoading(false);
        }
    };
    return (
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2
                className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
            >
                Sign Up
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
                        </div>
                        <input
                            className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                            type="password"
                            ref={passwordRef}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mt-8">
                        <div className="flex justify-between items-center">
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Confirm Password</div>
                        </div>
                        <input
                            className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                            type="password"
                            ref={passwordConfirmRef}
                            placeholder="Confirm Password"
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
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                    Already a User?
                    <span className="cursor-pointer text-indigo-600 hover:text-indigo-800">
                        <Link to="/login">Login</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
