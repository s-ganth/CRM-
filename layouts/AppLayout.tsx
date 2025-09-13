import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import { DashboardIcon, ContactsIcon, LeadsIcon, DealsIcon, TasksIcon, ReportsIcon, AIIcon, SettingsIcon, LogoutIcon, BellIcon, SymphonyLogo, MenuIcon, XIcon, PipelineIcon } from '../components/icons';

const AppLayout: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Close sidebar on navigation
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

    const handleLogout = () => {
        if (auth) {
            auth.logout();
            navigate('/login');
        }
    };

    const navItems = [
        { to: '/dashboard', label: 'Overview', icon: DashboardIcon },
        { to: '/contacts', label: 'Contacts', icon: ContactsIcon },
        { to: '/leads', label: 'Leads', icon: LeadsIcon },
        { to: '/deals', label: 'Deals', icon: DealsIcon },
        { to: '/pipeline', label: 'Pipeline', icon: PipelineIcon },
        { to: '/tasks', label: 'Tasks', icon: TasksIcon },
        { to: '/reports', label: 'Reports', icon: ReportsIcon },
        { to: '/ai', label: 'AI Features', icon: AIIcon },
    ];

    const SidebarContent = () => (
        <>
            <div className="h-16 flex items-center px-6 gap-3 border-b border-border flex-shrink-0">
                <SymphonyLogo className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-text">Symphony</span>
            </div>
            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                 <h3 className="px-4 text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Menu</h3>
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-card hover:text-text'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>
            <div className="px-4 py-4 space-y-2 border-t border-border flex-shrink-0">
                 <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                            isActive ? 'bg-primary text-white' : 'text-text-secondary hover:bg-card hover:text-text'
                        }`
                    }
                >
                    <SettingsIcon className="w-5 h-5 mr-3" />
                    Settings
                </NavLink>
                <button onClick={handleLogout} className="flex items-center w-full px-4 py-2.5 text-sm font-medium rounded-lg text-text-secondary hover:bg-card hover:text-text">
                    <LogoutIcon className="w-5 h-5 mr-3" />
                    Logout
                </button>
            </div>
        </>
    );

    return (
        <div className="flex h-screen bg-background text-text">
            {/* Mobile Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <SidebarContent />
                </div>
            </div>
             {isSidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

            {/* Desktop Sidebar */}
            <aside className="w-64 bg-sidebar flex-col border-r border-border hidden md:flex">
                <SidebarContent />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-background border-b border-border flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
                    <div className="flex items-center">
                        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden mr-4 p-2 rounded-md hover:bg-card text-text">
                             {isSidebarOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                        </button>
                        <h1 className="text-lg sm:text-xl font-semibold text-text hidden sm:block capitalize">
                            {location.pathname.split('/').pop() || 'Dashboard'}
                        </h1>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button className="p-2 rounded-full hover:bg-card">
                            <BellIcon className="w-6 h-6 text-text-secondary" />
                        </button>
                        <div className="flex items-center">
                            <img src="https://picsum.photos/seed/user/40/40" alt="User" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
                            <div className="ml-3 hidden sm:block">
                                <p className="text-sm font-semibold text-text">Priya Sharma</p>
                                <p className="text-xs text-text-secondary">Admin</p>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;