import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Modal from '../components/Modal';
import Input from '../components/form/Input';
import { Contact } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { api } from '../utils/api';

const emptyContact: Omit<Contact, 'id' | 'avatar' | 'tags'> & { tags: string } = {
    name: '',
    email: '',
    phone: '',
    company: '',
    tags: '',
};

const ContactsPage: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    const [formState, setFormState] = useLocalStorage('contactFormDraft', emptyContact);

    useEffect(() => {
        const fetchContacts = async () => {
            setIsLoading(true);
            try {
                const data = await api.getContacts();
                setContacts(data);
            } catch (error) {
                console.error("Failed to fetch contacts", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchContacts();
    }, []);

    useEffect(() => {
        if (editingContact) {
            setFormState({
                name: editingContact.name,
                email: editingContact.email,
                phone: editingContact.phone,
                company: editingContact.company,
                tags: editingContact.tags.join(', '),
            });
        }
    }, [editingContact, setFormState]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleOpenModal = (contact: Contact | null = null) => {
        setEditingContact(contact);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingContact(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const contactData = { ...formState, tags: formState.tags.split(',').map(t => t.trim()) };

        if (editingContact) {
            setContacts(contacts.map(c => c.id === editingContact.id ? { ...editingContact, ...contactData } : c));
            handleCloseModal();
            await api.updateContact(editingContact.id, contactData);
        } else {
            const tempId = Date.now();
            const newContact: Contact = { ...contactData, id: tempId, avatar: `https://picsum.photos/seed/${tempId}/40/40` };
            setContacts([newContact, ...contacts]);
            handleCloseModal();
            const savedContact = await api.createContact(contactData);
            setContacts(prev => prev.map(c => c.id === tempId ? savedContact : c));
        }
        setFormState(emptyContact);
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-between items-center">
                <h1 className="text-3xl font-bold text-text">Contacts</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
                >
                    Add Contact
                </button>
            </div>

            <Card>
                <div className="mb-4">
                    <Input
                        label=""
                        id="search"
                        type="text"
                        placeholder="Search contacts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {isLoading ? <div className="text-center p-10">Loading contacts...</div> : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-text-secondary">
                        <thead className="text-xs text-text-secondary uppercase bg-background">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3 hidden md:table-cell">Email</th>
                                <th scope="col" className="px-6 py-3 hidden lg:table-cell">Company</th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredContacts.map(contact => (
                                <tr key={contact.id} className="border-b border-border hover:bg-background">
                                    <th scope="row" className="px-6 py-4 font-medium text-text whitespace-nowrap flex items-center">
                                        <img className="w-8 h-8 rounded-full mr-3" src={contact.avatar} alt={contact.name} />
                                        {contact.name}
                                    </th>
                                    <td className="px-6 py-4 hidden md:table-cell">{contact.email}</td>
                                    <td className="px-6 py-4 hidden lg:table-cell">{contact.company}</td>
                                    <td className="px-6 py-4 text-right space-x-4">
                                        <Link to={`/contacts/${contact.id}`} className="font-medium text-primary hover:underline">
                                            View
                                        </Link>
                                         <button onClick={() => handleOpenModal(contact)} className="font-medium text-primary hover:underline">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
            </Card>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingContact ? 'Edit Contact' : 'Add New Contact'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Full Name" id="name" name="name" type="text" placeholder="e.g., John Doe" value={formState.name} onChange={handleInputChange} required />
                    <Input label="Email" id="email" name="email" type="email" placeholder="e.g., john.doe@example.com" value={formState.email} onChange={handleInputChange} required/>
                    <Input label="Phone" id="phone" name="phone" type="tel" placeholder="e.g., 9876543210" value={formState.phone} onChange={handleInputChange} />
                    <Input label="Company" id="company" name="company" type="text" placeholder="e.g., InnovateTech" value={formState.company} onChange={handleInputChange} />
                     <Input label="Tags (comma separated)" id="tags" name="tags" type="text" placeholder="e.g., developer, vip" value={formState.tags} onChange={handleInputChange} />
                    <div className="flex justify-end pt-4 gap-3">
                         <button
                            type="button"
                            onClick={handleCloseModal}
                            className="bg-card text-text px-4 py-2 rounded-lg font-semibold hover:bg-background border border-border"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover"
                        >
                            {editingContact ? 'Save Changes' : 'Save Contact'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ContactsPage;