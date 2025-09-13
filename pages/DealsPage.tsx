import React, { useState, useEffect } from 'react';
import KanbanBoard, { KanbanItem } from '../components/KanbanBoard';
import { Deal, LeadStage } from '../types';
import Modal from '../components/Modal';
import Input from '../components/form/Input';
import Select, { SelectOption } from '../components/form/Select';
import Textarea from '../components/form/Textarea';
import { api } from '../utils/api';

const emptyDeal: Omit<Deal, 'id' | 'owner' | 'score' | 'contactId'> = {
    name: '',
    email: '',
    phone: '',
    source: '',
    value: 0,
    stage: LeadStage.Proposal,
    notes: '',
};

const stageOptions: SelectOption[] = [LeadStage.Proposal, LeadStage.Negotiation, LeadStage.Won, LeadStage.Lost].map(s => ({ value: s, label: s }));

const DealsPage: React.FC = () => {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
    const [formState, setFormState] = useState(emptyDeal);

     useEffect(() => {
        const fetchDeals = async () => {
            setIsLoading(true);
            try {
                const data = await api.getDeals();
                setDeals(data);
            } catch (error) {
                console.error("Failed to fetch deals", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDeals();
    }, []);

     useEffect(() => {
        if (editingDeal) {
            setFormState({
                name: editingDeal.name,
                email: editingDeal.email,
                phone: editingDeal.phone,
                source: editingDeal.source,
                value: editingDeal.value,
                stage: editingDeal.stage,
                notes: editingDeal.notes,
            });
        } else {
            setFormState(emptyDeal);
        }
    }, [editingDeal]);

    const handleOpenModal = (deal: Deal | null = null) => {
        setEditingDeal(deal);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingDeal(null);
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
        if (editingDeal) {
            const updatedDeal = { ...editingDeal, ...formState };
            setDeals(deals.map(d => d.id === editingDeal.id ? updatedDeal : d));
            handleCloseModal();
            await api.updateDeal(editingDeal.id, formState);
        } else {
            const tempId = Date.now();
            const owner = { name: 'Priya Sharma', avatar: 'https://picsum.photos/seed/user/40/40' };
            const newDeal: Deal = { ...formState, id: tempId, owner };
            setDeals([newDeal, ...deals]);
            handleCloseModal();
            const savedDeal = await api.createDeal(formState);
            setDeals(prev => prev.map(d => d.id === tempId ? savedDeal : d));
        }
    };

    const handleCardClick = (item: KanbanItem) => {
        const deal = deals.find(d => d.id === item.id);
        if (deal) {
            handleOpenModal(deal);
        }
    };
    
    const handleDealMove = (dealId: string | number, newStage: string) => {
         const dealToMove = deals.find(d => d.id.toString() === dealId.toString());
        if(dealToMove && dealToMove.stage !== newStage) {
            const updatedDeals = deals.map(deal =>
                deal.id.toString() === dealId.toString()
                    ? { ...deal, stage: newStage as LeadStage }
                    : deal
            );
            setDeals(updatedDeals);
            api.updateDeal(Number(dealId), { stage: newStage as LeadStage });
        }
    };

    const columns = [LeadStage.Proposal, LeadStage.Negotiation, LeadStage.Won, LeadStage.Lost].map(stage => ({
        id: stage,
        title: stage,
        items: deals
            .filter(deal => deal.stage === stage)
            .map(deal => ({
                id: deal.id,
                title: deal.name,
                content: (
                    <>
                        <p>Value: ₹{deal.value.toLocaleString()}</p>
                        <p>Source: {deal.source}</p>
                        <div className="flex items-center mt-2">
                            <img src={deal.owner.avatar} alt={deal.owner.name} className="w-5 h-5 rounded-full mr-1.5" />
                            <span>{deal.owner.name}</span>
                        </div>
                    </>
                ),
            }))
    }));

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-between items-center">
                <h1 className="text-3xl font-bold text-text">Deals</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
                >
                    Add Deal
                </button>
            </div>
            {isLoading ? <div className="text-center p-10">Loading deals...</div> : <KanbanBoard columns={columns} onCardClick={handleCardClick} onItemMove={handleDealMove} />}

             <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingDeal ? 'Edit Deal' : 'Add New Deal'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Deal Name" id="name" name="name" type="text" placeholder="e.g., Cloud Migration Project" value={formState.name} onChange={handleInputChange} required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Source" id="source" name="source" type="text" placeholder="e.g., Partner" value={formState.source} onChange={handleInputChange} required />
                        <Input label="Value (₹)" id="value" name="value" type="number" placeholder="e.g., 180000" value={formState.value} onChange={handleInputChange} required />
                    </div>
                    <Select label="Stage" id="stage" options={stageOptions} value={formState.stage} onChange={(val) => handleSelectChange('stage', val as LeadStage)} />
                    <Textarea label="Notes" id="notes" name="notes" placeholder="Add any relevant notes here..." value={formState.notes || ''} onChange={handleInputChange} />

                    <div className="flex justify-end pt-4 gap-3">
                         <button type="button" onClick={handleCloseModal} className="bg-card text-text px-4 py-2 rounded-lg font-semibold hover:bg-background border border-border">
                            Cancel
                        </button>
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover">
                             {editingDeal ? 'Save Changes' : 'Save Deal'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default DealsPage;