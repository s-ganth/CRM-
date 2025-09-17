

import React from 'react';
import { Link } from 'react-router-dom';
import { SymphonyLogo } from '../components/icons';

const LandingPage: React.FC = () => {
    return (
        <div className="bg-background text-text min-h-screen flex flex-col">
            <header className="px-4 lg:px-6 h-16 flex items-center border-b border-border">
                <Link to="/" className="flex items-center justify-center gap-2">
                    <SymphonyLogo className="h-8 w-8 text-primary" />
                    <span className="font-bold text-lg">Symphony</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
                    <Link to="/login" className="text-sm font-medium hover:underline underline-offset-4 text-text-secondary hover:text-text">Login</Link>
                    <Link to="/signup" className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover">Sign Up</Link>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-text">
                                        Simplify Your Client Managemen
                                    </h1>
                                    <p className="max-w-[600px] text-text-secondary md:text-xl mx-auto lg:mx-0">
                                        Our AI-powered CRM helps freelancers and small teams manage leads, deals, and tasks effortlessly.
                                        Focus on what you do best, we'll handle the rest.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row mx-auto lg:mx-0">
                                    <Link to="/signup" className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-white shadow transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50">
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                            <img src="https://picsum.photos/seed/crm/600/600" width="600" height="600" alt="Hero" className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last" />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;
