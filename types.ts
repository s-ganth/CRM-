export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  tags: string[];
  avatar: string;
}

export enum LeadStage {
  New = 'New',
  Contacted = 'Contacted',
  Proposal = 'Proposal',
  Negotiation = 'Negotiation',
  Won = 'Won',
  Lost = 'Lost',
}

export interface Lead {
  id: number;
  name: string;
  source: string;
  value: number;
  stage: LeadStage;
  owner: { name: string; avatar: string };
  score?: number;
  email?: string;
  phone?: string;
  notes?: string;
}

export interface Deal extends Lead {
    contactId?: number;
}

export enum TaskPriority {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low'
}

export enum TaskStatus {
    Pending = 'Pending',
    InProgress = 'In Progress',
    Completed = 'Completed'
}

export interface Task {
    id: number;
    title: string;
    dueDate: string; // ISO 8601 date string
    priority: TaskPriority;
    status: TaskStatus;
    contactId?: number;
}