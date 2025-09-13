
    import { supabase } from './supabaseClient';
    import { Contact, Lead, Deal, Task, LeadStage } from '../types';

    // --- AUTH ---
    const authApi = {
        signUp: async (email: string, pass: string) => {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: pass,
            });
            if (error) throw error;
            return data;
        },
        login: async (email: string, pass: string) => {
            const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
            if (error) throw error;
        },
        logout: async () => {
            await supabase.auth.signOut();
        },
        checkAuthStatus: async (): Promise<boolean> => {
            const { data: { session } } = await supabase.auth.getSession();
            return !!session;
        }
    }

    // --- CONTACTS ---
    const contactsApi = {
        getContacts: async (): Promise<Contact[]> => {
            const { data, error } = await supabase.from('contacts').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        },
        getContact: async (id: number): Promise<Contact | undefined> => {
            const { data, error } = await supabase.from('contacts').select('*').eq('id', id).single();
            if (error) throw error;
            return data;
        },
        createContact: async (contactData: Omit<Contact, 'id' | 'avatar'>): Promise<Contact> => {
            const { data, error } = await supabase.from('contacts').insert([{ ...contactData, avatar: `https://picsum.photos/seed/${Date.now()}/40/40` }]).select().single();
            if (error) throw error;
            return data;
        },
        updateContact: async (id: number, contactData: Partial<Omit<Contact, 'id' | 'avatar'>>): Promise<Contact> => {
            const { data, error } = await supabase.from('contacts').update(contactData).eq('id', id).select().single();
            if (error) throw error;
            return data;
        },
    };

    // --- LEADS ---
    const leadsApi = {
        getLeads: async (): Promise<Lead[]> => {
            const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            return data;
        },
        createLead: async (leadData: Omit<Lead, 'id' | 'owner' | 'score'>): Promise<Lead> => {
            const owner = { name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/user/40/40' };
            const { data, error } = await supabase.from('leads').insert([{ ...leadData, owner, score: Math.floor(Math.random() * 40) + 60 }]).select().single();
            if (error) throw error;
            return data;
        },
        updateLead: async (id: number, leadData: Partial<Omit<Lead, 'id' | 'owner'>>): Promise<Lead> => {
            const { data, error } = await supabase.from('leads').update(leadData).eq('id', id).select().single();
            if (error) throw error;
            return data;
        },
    };

    // --- DEALS ---
    const dealsApi = {
        getDeals: async (filters?: { contactId?: number }): Promise<Deal[]> => {
            let query = supabase.from('deals').select('*').order('created_at', { ascending: false });
            if (filters?.contactId) {
                query = query.eq('contactId', filters.contactId);
            }
            const { data, error } = await query;
            if (error) throw error;
            return data;
        },
        createDeal: async (dealData: Omit<Deal, 'id' | 'owner' | 'score'>): Promise<Deal> => {
            const owner = { name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/user/40/40' };
            const { data, error } = await supabase.from('deals').insert([{ ...dealData, owner }]).select().single();
            if (error) throw error;
            return data;
        },
        updateDeal: async (id: number, dealData: Partial<Omit<Deal, 'id' | 'owner'>>): Promise<Deal> => {
            const { data, error } = await supabase.from('deals').update(dealData).eq('id', id).select().single();
            if (error) throw error;
            return data;
        },
    };

    // --- TASKS ---
    const tasksApi = {
        getTasks: async (filters?: { contactId?: number }): Promise<Task[]> => {
            let query = supabase.from('tasks').select('*').order('dueDate', { ascending: true });
            if (filters?.contactId) {
                query = query.eq('contactId', filters.contactId);
            }
            const { data, error } = await query;
            if (error) throw error;
            return data;
        },
        createTask: async (taskData: Omit<Task, 'id'>): Promise<Task> => {
            const { data, error } = await supabase.from('tasks').insert([taskData]).select().single();
            if (error) throw error;
            return data;
        },
        updateTask: async (id: number, taskData: Partial<Omit<Task, 'id'>>): Promise<Task> => {
            const { data, error } = await supabase.from('tasks').update(taskData).eq('id', id).select().single();
            if (error) throw error;
            return data;
        },
    };

    // --- REPORTS ---
    const reportsApi = {
        getReport: async (type: 'teamPerformance' | 'leadConversion'): Promise<any[]> => {
            if (type === 'teamPerformance') {
                const { data: deals, error } = await supabase.from('deals').select('owner, value');
                if (error) throw error;
                const performance = deals.reduce((acc, deal) => {
                    const ownerName = deal.owner.name;
                    if (!acc[ownerName]) {
                        acc[ownerName] = { name: ownerName, deals: 0, revenue: 0 };
                    }
                    acc[ownerName].deals += 1;
                    acc[ownerName].revenue += deal.value;
                    return acc;
                }, {} as Record<string, { name: string; deals: number; revenue: number }>);
                return Object.values(performance);
            }
            if (type === 'leadConversion') {
                 const { data: leads, error } = await supabase.from('leads').select('stage');
                 if (error) throw error;
                 const conversion = { Won: 0, Lost: 0, 'In Progress': 0 };
                 leads.forEach(lead => {
                     if (lead.stage === LeadStage.Won) conversion.Won++;
                     else if (lead.stage === LeadStage.Lost) conversion.Lost++;
                     else conversion['In Progress']++;
                 });
                 return Object.entries(conversion).map(([name, value]) => ({ name, value }));
            }
            return Promise.reject("Invalid report type");
        },
    };


    export const api = {
        ...authApi,
        ...contactsApi,
        ...leadsApi,
        ...dealsApi,
        ...tasksApi,
        ...reportsApi
    };
    