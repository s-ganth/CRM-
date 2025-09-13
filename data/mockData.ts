import { Contact, Lead, Deal, Task, LeadStage, TaskPriority, TaskStatus } from '../types';

export let mockContacts: Contact[] = [
  { id: 1, name: 'Aarav Sharma', email: 'aarav.sharma@example.com', phone: '9876543210', company: 'InnovateTech', tags: ['vip', 'developer'], avatar: 'https://picsum.photos/seed/1/40/40' },
  { id: 2, name: 'Diya Patel', email: 'diya.patel@example.com', phone: '9876543211', company: 'DataSolutions', tags: ['influencer'], avatar: 'https://picsum.photos/seed/2/40/40' },
  { id: 3, name: 'Rohan Mehta', email: 'rohan.mehta@example.com', phone: '9876543212', company: 'CloudNet', tags: ['investor'], avatar: 'https://picsum.photos/seed/3/40/40' },
  { id: 4, name: 'Priya Singh', email: 'priya.singh@example.com', phone: '9876543213', company: 'InnovateTech', tags: ['designer'], avatar: 'https://picsum.photos/seed/4/40/40' },
  { id: 5, name: 'Aditya Kumar', email: 'aditya.kumar@example.com', phone: '9876543214', company: 'WebApp Wizards', tags: ['developer'], avatar: 'https://picsum.photos/seed/5/40/40' },
];

export let mockLeads: Lead[] = [
  { id: 1, name: 'Website Redesign', source: 'Referral', value: 50000, stage: LeadStage.Proposal, owner: { name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/user/40/40' }, score: 85, email: 'contact@web-redesign.com', phone: '111-222-3333', notes: 'Initial discussion was positive.' },
  { id: 2, name: 'Mobile App Dev', source: 'Facebook', value: 120000, stage: LeadStage.Negotiation, owner: { name: 'Rajesh Kumar', avatar: 'https://picsum.photos/seed/rajesh/40/40' }, score: 92, email: 'contact@mobile-app.com', phone: '222-333-4444', notes: 'Sent over the final quote.' },
  { id: 3, name: 'SEO Optimization', source: 'Website', value: 25000, stage: LeadStage.Contacted, owner: { name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/user/40/40' }, score: 70, email: 'contact@seo-opt.com', phone: '333-444-5555', notes: 'Awaiting response to initial email.' },
  { id: 4, name: 'Content Marketing', source: 'LinkedIn', value: 35000, stage: LeadStage.New, owner: { name: 'Amit Singh', avatar: 'https://picsum.photos/seed/amit/40/40' }, score: 60, email: 'contact@content-mktg.com', phone: '444-555-6666', notes: '' },
  { id: 5, name: 'E-commerce Platform', source: 'Referral', value: 250000, stage: LeadStage.Won, owner: { name: 'Rajesh Kumar', avatar: 'https://picsum.photos/seed/rajesh/40/40' }, email: 'contact@ecomm.com', phone: '555-666-7777', notes: 'Project kickoff next week.' },
  { id: 6, name: 'UI/UX Consulting', source: 'Website', value: 40000, stage: LeadStage.Lost, owner: { name: 'Amit Singh', avatar: 'https://picsum.photos/seed/amit/40/40' }, email: 'contact@uiux.com', phone: '666-777-8888', notes: 'Client went with a competitor.' },
];

export let mockDeals: Deal[] = mockLeads
  .filter(lead => [LeadStage.Proposal, LeadStage.Negotiation, LeadStage.Won].includes(lead.stage))
  .map(lead => ({ ...lead, contactId: Math.ceil(Math.random() * 5) }));

mockDeals.push({ id: 7, name: 'Cloud Migration', source: 'Partner', value: 180000, stage: LeadStage.Negotiation, owner: { name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/user/40/40' }, contactId: 3, email: 'contact@cloud-migration.com', phone: '777-888-9999', notes: 'Finalizing the SOW.' });

export let mockTasks: Task[] = [
  { id: 1, title: 'Follow up with Aarav Sharma', dueDate: '2024-08-01T00:00:00.000Z', priority: TaskPriority.High, status: TaskStatus.Pending, contactId: 1 },
  { id: 2, title: 'Send proposal to Mobile App Dev', dueDate: '2024-07-28T00:00:00.000Z', priority: TaskPriority.High, status: TaskStatus.InProgress, contactId: 2 },
  { id: 3, title: 'Schedule meeting with Priya Singh', dueDate: '2024-08-05T00:00:00.000Z', priority: TaskPriority.Medium, status: TaskStatus.Pending, contactId: 4 },
  { id: 4, title: 'Prepare demo for Cloud Migration', dueDate: '2024-07-30T00:00:00.000Z', priority: TaskPriority.Low, status: TaskStatus.Completed },
  { id: 5, title: 'Call Rohan Mehta about investment', dueDate: '2024-08-02T00:00:00.000Z', priority: TaskPriority.Medium, status: TaskStatus.Pending, contactId: 3 },
];
