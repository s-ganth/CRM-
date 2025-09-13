import React, { useState, useEffect } from 'react';
import KanbanBoard, { KanbanItem } from '../components/KanbanBoard';
import { Lead, LeadStage } from '../types';
import Modal from '../components/Modal';
import Input from '../components/form/Input';
import Select, { SelectOption } from '../components/form/Select';
import Textarea from '../components/form/Textarea';
import { api } from '../utils/api';

const emptyLead: Omit<Lead, 'id' | 'owner' | 'score'> = {
    name: '',
    email: '',
    phone: '',
    source: '',
    value: 0,
    stage: LeadStage.New,
    notes: '',
};

const stageOptions: SelectOption[] = Object.values(LeadStage).map(s => ({ value: s, label: s }));

const LeadsPage: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLead, setEditingLead] = useState<Lead | null>(null);
    const [formState, setFormState] = useState(emptyLead);

    useEffect(() => {
        const fetchLeads = async () => {
            setIsLoading(true);
            try {
                const data = await api.getLeads();
                setLeads(data);
            } catch (error) {
                console.error("Failed to fetch leads", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLeads();
    }, []);

    useEffect(() => {
        if (editingLead) {
            setFormState({
                name: editingLead.name,
                email: editingLead.email,
                phone: editingLead.phone,
                source: editingLead.source,
                value: editingLead.value,
                stage: editingLead.stage,
                notes: editingLead.notes,
            });
        } else {
            setFormState(emptyLead);
        }
    }, [editingLead]);

    const handleOpenModal = (lead: Lead | null = null) => {
        setEditingLead(lead);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingLead(null);
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: name === 'value' ? parseFloat(value) || 0 : value }));
    };

    const handleSelectChange = (name: keyof typeof formState, value: string | number) => {
        setFormState(prev => ({ ...prev, [name]: value as LeadStage }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingLead) {
            const updatedLead = { ...editingLead, ...formState };
            setLeads(leads.map(l => l.id === editingLead.id ? updatedLead : l));
            handleCloseModal();
            await api.updateLead(editingLead.id, formState);
        } else {
            const tempId = Date.now();
            const owner = { name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/user/40/40' };
            const newLead: Lead = { ...formState, id: tempId, owner, score: 75 };
            setLeads([newLead, ...leads]);
            handleCloseModal();
            const savedLead = await api.createLead(formState);
            setLeads(prev => prev.map(l => l.id === tempId ? savedLead : l));
        }
    };

    const handleCardClick = (item: KanbanItem) => {
        const lead = leads.find(l => l.id === item.id);
        if (lead) {
            handleOpenModal(lead);
        }
    };

    const handleLeadMove = (leadId: string | number, newStage: string) => {
        const leadToMove = leads.find(l => l.id.toString() === leadId.toString());
        if(leadToMove && leadToMove.stage !== newStage) {
            const updatedLeads = leads.map(lead => 
                lead.id.toString() === leadId.toString() 
                ? { ...lead, stage: newStage as LeadStage } 
                : lead
            );
            setLeads(updatedLeads);
            api.updateLead(Number(leadId), { stage: newStage as LeadStage });
        }
    };

    const columns = Object.values(LeadStage).map(stage => ({
        id: stage,
        title: stage,
        items: leads
            .filter(lead => lead.stage === stage)
            .map(lead => ({
                id: lead.id,
                title: lead.name,
                content: (
                    <>
                        <p>Value: ₹{lead.value.toLocaleString()}</p>
                        <p>Source: {lead.source}</p>
                        <div className="flex items-center mt-2">
                             <img src={lead.owner.avatar} alt={lead.owner.name} className="w-5 h-5 rounded-full mr-1.5" />
                             <span>{lead.owner.name}</span>
                        </div>
                    </>
                ),
            }))
    }));

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-between items-center">
                <h1 className="text-3xl font-bold text-text">Leads</h1>
                 <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
                >
                    Add Lead
                </button>
            </div>
            {isLoading ? <div className="text-center p-10">Loading leads...</div> : <KanbanBoard columns={columns} onCardClick={handleCardClick} onItemMove={handleLeadMove} />}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingLead ? 'Edit Lead' : 'Add New Lead'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Lead Name" id="name" name="name" type="text" placeholder="e.g., Website Redesign Project" value={formState.name} onChange={handleInputChange} required />
                    <Input label="Email" id="email" name="email" type="email" placeholder="e.g., contact@example.com" value={formState.email || ''} onChange={handleInputChange} />
                    <Input label="Phone" id="phone" name="phone" type="tel" placeholder="e.g., 9876543210" value={formState.phone || ''} onChange={handleInputChange} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Source" id="source" name="source" type="text" placeholder="e.g., Referral" value={formState.source} onChange={handleInputChange} required />
                        <Input label="Value (₹)" id="value" name="value" type="number" placeholder="e.g., 50000" value={formState.value} onChange={handleInputChange} required />
                    </div>
                    <Select label="Stage" id="stage" options={stageOptions} value={formState.stage} onChange={(val) => handleSelectChange('stage', val as LeadStage)} />
                    <Textarea label="Notes" id="notes" name="notes" placeholder="Add any relevant notes here..." value={formState.notes || ''} onChange={handleInputChange} />

                    <div className="flex justify-end pt-4 gap-3">
                         <button type="button" onClick={handleCloseModal} className="bg-card text-text px-4 py-2 rounded-lg font-semibold hover:bg-background border border-border">
                            Cancel
                        </button>
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover">
                             {editingLead ? 'Save Changes' : 'Save Lead'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default LeadsPage;