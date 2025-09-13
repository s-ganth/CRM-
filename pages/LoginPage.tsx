


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const LoginPage: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (auth) {
            // FIX: Pass email and password from the form to the login function.
            const email = e.currentTarget.email.value;
            const password = e.currentTarget.password.value;
            await auth.login(email, password);
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-background text-text flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-text">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-text-secondary">
                    Or{' '}
                    <Link to="/signup" className="font-medium text-primary hover:text-primary-hover">
                        start your free trial
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-card py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-border">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input id="email" name="email" type="email" autoComplete="email" required defaultValue="demo@crm.com"
                                    className="appearance-none block w-full px-3 py-2 bg-input-bg border border-border rounded-md shadow-sm placeholder-text-secondary text-text focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password"
                                className="block text-sm font-medium text-text-secondary">
                                Password
                            </label>
                            <div className="mt-1">
                                <input id="password" name="password" type="password" autoComplete="current-password" required defaultValue="123456"
                                    className="appearance-none block w-full px-3 py-2 bg-input-bg border border-border rounded-md shadow-sm placeholder-text-secondary text-text focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary border-border rounded bg-input-bg" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-text">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-primary hover:text-primary-hover">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;