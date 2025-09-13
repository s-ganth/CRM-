import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { Task, Contact, Deal } from '../types';
import Modal from '../components/Modal';
import Input from '../components/form/Input';
import { EditIcon } from '../components/icons';
import { api } from '../utils/api';

const ContactDetailsPage: React.FC = () => {
    const { contactId } = useParams<{ contactId: string }>();
    const navigate = useNavigate();
    
    const [contact, setContact] = useState<Contact | null>(null);
    const [relatedDeals, setRelatedDeals] = useState<Deal[]>([]);
    const [relatedTasks, setRelatedTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formState, setFormState] = useState({ name: '', email: '', phone: '', company: '', tags: '' });

     useEffect(() => {
        const fetchContactDetails = async () => {
            if (!contactId) return;
            setIsLoading(true);
            try {
                const [contactData, dealsData, tasksData] = await Promise.all([
                    api.getContact(Number(contactId)),
                    api.getDeals({ contactId: Number(contactId) }),
                    api.getTasks({ contactId: Number(contactId) })
                ]);
                
                if (contactData) {
                    setContact(contactData);
                    setFormState({
                        name: contactData.name,
                        email: contactData.email,
                        phone: contactData.phone,
                        company: contactData.company,
                        tags: contactData.tags.join(', '),
                    });
                }
                setRelatedDeals(dealsData);
                setRelatedTasks(tasksData);

            } catch (error) {
                console.error("Failed to fetch contact details", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContactDetails();
    }, [contactId]);

    if (isLoading) {
        return <div className="text-center p-10">Loading contact details...</div>
    }

    if (!contact) {
        return (
            <div className="text-center">
                <h1 className="text-2xl font-bold">Contact not found</h1>
                <Link to="/contacts" className="text-primary hover:underline mt-4 inline-block">
                    Back to Contacts
                </Link>
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData = {
            ...formState,
            tags: formState.tags.split(',').map(t => t.trim()),
        };
        
        const updatedContact = { ...contact, ...updatedData };
        setContact(updatedContact);
        setIsModalOpen(false);
        await api.updateContact(contact.id, updatedData);
        // Optionally refetch data here or rely on optimistic update
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-between items-start">
                <div className="flex items-center space-x-4">
                    <img src={contact.avatar} alt={contact.name} className="w-24 h-24 rounded-full" />
                    <div>
                        <h1 className="text-3xl font-bold text-text">{contact.name}</h1>
                        <p className="text-text-secondary">{contact.company}</p>
                    </div>
                </div>
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-card text-text px-4 py-2 rounded-lg font-semibold hover:bg-background border border-border flex items-center gap-2"
                >
                    <EditIcon className="w-4 h-4" />
                    Edit
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-6">
                    <Card>
                        <h3 className="font-semibold text-text mb-4">Contact Info</h3>
                        <div className="space-y-2 text-sm">
                            <p><strong>Email:</strong> <a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a></p>
                            <p><strong>Phone:</strong> {contact.phone}</p>
                            <div>
                                <strong>Tags:</strong>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {contact.tags.map(tag => (
                                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 capitalize">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                     <Card>
                        <h3 className="font-semibold text-text mb-4">AI Smart Insights</h3>
                        <ul className="space-y-3">
                            <li className="text-sm p-3 bg-blue-500/10 rounded-lg text-blue-300">
                                💡 This contact has not been contacted in 30 days. Consider a follow-up.
                            </li>
                            <li className="text-sm p-3 bg-blue-500/10 rounded-lg text-blue-300">
                                🚀 This contact is associated with a high-value deal. Explore cross-selling opportunities.
                            </li>
                        </ul>
                    </Card>
                </div>
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <h3 className="font-semibold text-text mb-4">Related Deals ({relatedDeals.length})</h3>
                        {relatedDeals.length > 0 ? (
                            <ul className="space-y-3">
                                {relatedDeals.map(deal => (
                                    <li key={deal.id} className="text-sm p-3 bg-background rounded-lg flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-text">{deal.name}</p>
                                            <p className="text-xs text-text-secondary">Value: ₹{deal.value.toLocaleString()}</p>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400`}>{deal.stage}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-text-secondary">No deals associated with this contact.</p>
                        )}
                    </Card>
                     <Card>
                        <h3 className="font-semibold text-text mb-4">Related Tasks ({relatedTasks.length})</h3>
                        {relatedTasks.length > 0 ? (
                            <ul className="space-y-3">
                                {relatedTasks.map((task: Task) => (
                                    <li key={task.id} className="flex items-center justify-between text-sm p-3 bg-background rounded-lg">
                                        <div>
                                            <p className="font-medium text-text">{task.title}</p>
                                            <p className="text-xs text-text-secondary">{new Date(task.dueDate).toLocaleDateString()}</p>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${task.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{task.priority}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-text-secondary">No tasks associated with this contact.</p>
                        )}
                    </Card>
                </div>
            </div>
             <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Contact">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Full Name" id="name" name="name" type="text" value={formState.name} onChange={handleInputChange} required />
                    <Input label="Email" id="email" name="email" type="email" value={formState.email} onChange={handleInputChange} required/>
                    <Input label="Phone" id="phone" name="phone" type="tel" value={formState.phone} onChange={handleInputChange} />
                    <Input label="Company" id="company" name="company" type="text" value={formState.company} onChange={handleInputChange} />
                    <Input label="Tags (comma separated)" id="tags" name="tags" type="text" value={formState.tags} onChange={handleInputChange} />
                    <div className="flex justify-end pt-4 gap-3">
                         <button type="button" onClick={() => setIsModalOpen(false)} className="bg-card text-text px-4 py-2 rounded-lg font-semibold hover:bg-background border border-border">
                            Cancel
                        </button>
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover">
                            Save Changes
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ContactDetailsPage;