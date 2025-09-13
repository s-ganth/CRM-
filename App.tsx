
    import React, { useState, useEffect } from 'react';
    import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
    import AppLayout from './layouts/AppLayout';
    import DashboardPage from './pages/DashboardPage';
    import ContactsPage from './pages/ContactsPage';
    import ContactDetailsPage from './pages/ContactDetailsPage';
    import LeadsPage from './pages/LeadsPage';
    import DealsPage from './pages/DealsPage';
    import TasksPage from './pages/TasksPage';
    import ReportsPage from './pages/ReportsPage';
    import AIFeaturesPage from './pages/AIFeaturesPage';
    import SettingsPage from './pages/SettingsPage';
    import LoginPage from './pages/LoginPage';
    import SignUpPage from './pages/SignUpPage';
    import LandingPage from './pages/LandingPage';
    import PipelinePage from './pages/PipelinePage';
    import { api } from './utils/api';

    interface AuthContextType {
      isAuthenticated: boolean;
      signUp: (email: string, pass: string) => Promise<any>;
      login: (email: string, pass: string) => Promise<void>;
      logout: () => void;
      isLoading: boolean;
    }

    const AuthContext = React.createContext<AuthContextType | null>(null);

    export function useAuth() {
      return React.useContext(AuthContext);
    }

    const App: React.FC = () => {
      const [isAuthenticated, setIsAuthenticated] = useState(false);
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
        const checkSession = async () => {
          const loggedIn = await api.checkAuthStatus();
          setIsAuthenticated(loggedIn);
          setIsLoading(false);
        };
        checkSession();
      }, []);
      
      const signUp = (email: string, pass: string) => {
        return api.signUp(email, pass);
      };

      const login = async (email: string, pass: string) => {
        await api.login(email, pass);
        setIsAuthenticated(true);
      };

      const logout = async () => {
        await api.logout();
        setIsAuthenticated(false);
      };

      if (isLoading) {
          return (
              <div className="flex items-center justify-center h-screen bg-background">
                  <div className="text-primary text-xl">Loading Symphony...</div>
              </div>
          );
      }

      return (
        <AuthContext.Provider value={{ isAuthenticated, signUp, login, logout, isLoading }}>
          <HashRouter>
            <Routes>
              <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
              <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />
              <Route path="/landing" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/" />} />
              
              <Route path="/" element={isAuthenticated ? <AppLayout /> : <Navigate to="/landing" />}>
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="contacts/:contactId" element={<ContactDetailsPage />} />
                <Route path="leads" element={<LeadsPage />} />
                <Route path="deals" element={<DealsPage />} />
                <Route path="pipeline" element={<PipelinePage />} />
                <Route path="tasks" element={<TasksPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="ai" element={<AIFeaturesPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              
              <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/landing"} />} />
            </Routes>
          </HashRouter>
        </AuthContext.Provider>
      );
    };

    export default App;
    