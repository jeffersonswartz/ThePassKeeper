import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

interface Props {}

const ForgotPassword = (props: Props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { resetPassword } = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!emailRef.current?.value) {
            return setError('Enter details');
        }
        try {
            setError('');
            setMessage('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Password reset email sent');
            setLoading(false);
        } catch (error) {
            setError('Failed to Reset Password');
            setMessage('');
            setLoading(false);
        }
    };
    return (
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2
                className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold"
            >
                Reset Password
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
                    {error && <p className="mt-10 text-red-500 text-center">{error}</p>}
                    {message && <p className="mt-10 text-green-500 text-center">{message}</p>}
                    <div className="mt-10">
                        <button
                            className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
                            disabled={loading}
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
                <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                    Go to
                    <span className="cursor-pointer text-indigo-600 hover:text-indigo-800">
                        <Link to="/login" className="ml-1">
                            Login
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
