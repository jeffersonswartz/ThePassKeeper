import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

interface Props {}

const UpdateProfile = (props: Props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const { currentUser, updateEmail, updatePassword } = useAuth();

    const history = useHistory();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
            return setError('Passwords do not match');
        }
        const promises = [];
        if (emailRef?.current?.value && emailRef?.current?.value !== currentUser.email) {
            promises.push(updateEmail(emailRef?.current?.value));
        }
        if (passwordRef.current?.value) {
            promises.push(updatePassword(passwordRef.current?.value));
        }
        try {
            setError('');
            setMessage('');
            setLoading(true);
            await Promise.all(promises);
            setLoading(false);
            setMessage('Profile updated Successfully');
            history.push('/');
        } catch (error) {
            setError('Account creation failed');
            setLoading(false);
            setMessage('');
        }
    };
    return (
        <>
            <Card className="w-100">
                <Card.Body>
                    <h2 className="text-center mb-5">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" className="mt-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" defaultValue={currentUser.email || ''} ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password" className="mt-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Leave blank to keep same" ref={passwordRef} />
                        </Form.Group>
                        <Form.Group id="password-confirm" className="mt-4">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Leave blank to keep same"
                                ref={passwordConfirmRef}
                            />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">
                            Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </>
    );
};

export default UpdateProfile;
