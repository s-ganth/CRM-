import React, { useState } from 'react';
import Card from '../components/Card';
import { GmailIcon, OutlookIcon } from '../components/icons';

const SettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isGmailConnected, setIsGmailConnected] = useState(false);
    const [isOutlookConnected, setIsOutlookConnected] = useState(true);

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'team', label: 'Team Management' },
        { id: 'integrations', label: 'Integrations' },
        { id: 'notifications', label: 'Notifications' },
    ];
    
    const IntegrationItem: React.FC<{
        icon: React.ReactNode;
        name: string;
        description: string;
        isConnected: boolean;
        onToggle: () => void;
    }> = ({ icon, name, description, isConnected, onToggle }) => (
        <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
          <div className="flex items-center space-x-4">
            {icon}
            <div>
              <h3 className="font-semibold text-text">{name}</h3>
              <p className="text-sm text-text-secondary">{description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <span className="text-sm font-medium text-green-400 flex items-center">
                  <span className="h-2 w-2 bg-green-400 rounded-full mr-2"></span>
                  Connected
              </span>
            ) : (
              <span className="text-sm text-text-secondary">Not Connected</span>
            )}
            <button 
              onClick={onToggle}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${isConnected ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-primary text-white hover:bg-primary-hover'}`}
            >
              {isConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-text">Settings</h1>
            
            <div className="flex border-b border-border">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 font-semibold text-sm transition-colors ${activeTab === tab.id ? 'border-b-2 border-primary text-primary' : 'text-text-secondary hover:text-text'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <Card>
                {activeTab === 'profile' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-text">Profile Settings</h2>
                        <div className="space-y-4 max-w-md">
                            <div className="flex items-center space-x-4">
                               <img src="https://picsum.photos/seed/user/80/80" alt="User" className="w-20 h-20 rounded-full" />
                                <button className="bg-card hover:bg-background border border-border px-3 py-1.5 text-sm rounded-lg">Change Photo</button>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-text-secondary">Name</label>
                                <input type="text" defaultValue="Priya Sharma" className="mt-1 block w-full px-3 py-2 bg-input-bg border border-border rounded-md shadow-sm text-text focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-text-secondary">Email</label>
                                <input type="email" defaultValue="priya.sharma@example.com" className="mt-1 block w-full px-3 py-2 bg-input-bg border border-border rounded-md shadow-sm text-text focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                            </div>
                            <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover">Save Changes</button>
                        </div>
                    </div>
                )}
                 {activeTab === 'team' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-text">Team Management</h2>
                        <p className="text-text-secondary">Manage your team members and their roles here.</p>
                    </div>
                )}
                 {activeTab === 'integrations' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-text">Email Integrations</h2>
                        <div className="space-y-4">
                           <IntegrationItem
                                icon={<GmailIcon className="w-8 h-8" />}
                                name="Gmail"
                                description="Sync your emails and contacts from your Google account."
                                isConnected={isGmailConnected}
                                onToggle={() => setIsGmailConnected(!isGmailConnected)}
                           />
                           <IntegrationItem
                                icon={<OutlookIcon className="w-8 h-8" />}
                                name="Outlook"
                                description="Connect your Microsoft Outlook account for email sync."
                                isConnected={isOutlookConnected}
                                onToggle={() => setIsOutlookConnected(!isOutlookConnected)}
                           />
                        </div>
                    </div>
                )}
                {activeTab === 'notifications' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-text">Notifications Settings</h2>
                        <p className="text-text-secondary">Manage your email and SMS preferences.</p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default SettingsPage;