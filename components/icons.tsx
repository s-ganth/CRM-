import React from 'react';

export const Icon: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

export const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
    </Icon>
);

export const ContactsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </Icon>
);

export const LeadsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7" r="4"></circle>
        <polyline points="17 11 19 13 23 9"></polyline>
    </Icon>
);

export const DealsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 6v6l4 2"></path>
    </Icon>
);

export const TasksIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </Icon>
);

export const ReportsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M3 3v18h18"></path>
        <path d="M18.7 8a2.3 2.3 0 0 0-3.4 0l-6 6a2.3 2.3 0 0 0 0 3.4l3.6 3.6a2.3 2.3 0 0 0 3.4 0L22 13.4a2.3 2.3 0 0 0 0-3.4Z"></path>
    </Icon>
);

export const AIIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
    </Icon>
);

export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </Icon>
);

export const PipelineIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M2 12h5l2 -4l3 6l3 -4l2 4h5"></path>
    </Icon>
);


export const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </Icon>
);

export const BellIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </Icon>
);

export const SymphonyLogo: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
    </Icon>
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </Icon>
);

export const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </Icon>
);

export const GmailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
    </svg>
);

export const OutlookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.4,4.6h-1.5v3.4c0,0.4-0.4,0.8-0.8,0.8H6.5c-0.5,0-0.8-0.4-0.8-0.8V4.6H2.6C2.3,4.6,2,4.8,2,5.2v13.6 C2,19.2,2.3,19.4,2.6,19.4h18.8c0.3,0,0.6-0.2,0.6-0.6V5.2C22,4.8,21.7,4.6,21.4,4.6z M16,11.3l5-3.8V6.8l-5,3.8V11.3z M15.2,11.8 l-0.6,0.5c-0.9,0.7-2.1,1.1-3.3,1.1s-2.4-0.4-3.3-1.1l-0.6-0.5L3,15.6V7.4l4.9,4.2c0.2,0.2,0.5,0.3,0.8,0.3h0 c0.3,0,0.6-0.1,0.8-0.3l1.8-1.5l1.8,1.5c0.2,0.2,0.5,0.3,0.8,0.3h0c0.3,0,0.6-0.1,0.8-0.3L21,7.4v8.2L15.2,11.8z"/>
    </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <polyline points="6 9 12 15 18 9"></polyline>
    </Icon>
);

export const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
    <Icon className={className}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </Icon>
);