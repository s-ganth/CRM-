import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { Task, TaskPriority, TaskStatus } from '../types';
import Modal from '../components/Modal';
import Input from '../components/form/Input';
import Select, { SelectOption } from '../components/form/Select';
import { EditIcon } from '../components/icons';
import { api } from '../utils/api';

const emptyTask: Omit<Task, 'id' | 'contactId'> = {
    title: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: TaskPriority.Medium,
    status: TaskStatus.Pending,
};

const priorityOptions: SelectOption[] = Object.values(TaskPriority).map(p => ({ value: p, label: p }));
const statusOptions: SelectOption[] = Object.values(TaskStatus).map(s => ({ value: s, label: s }));

const getPriorityPill = (priority: TaskPriority) => {
    switch (priority) {
        case TaskPriority.High: return <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">{priority}</span>;
        case TaskPriority.Medium: return <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">{priority}</span>;
        case TaskPriority.Low: return <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">{priority}</span>;
    }
};

const getStatusPill = (status: TaskStatus) => {
     switch (status) {
        case TaskStatus.Completed: return <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">{status}</span>;
        case TaskStatus.InProgress: return <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400">{status}</span>;
        case TaskStatus.Pending: return <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-400">{status}</span>;
    }
};

const TasksPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [formState, setFormState] = useState(emptyTask);

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            try {
                const data = await api.getTasks();
                setTasks(data);
            } catch (error) {
                console.error("Failed to fetch tasks", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        if (editingTask) {
            setFormState({
                title: editingTask.title,
                dueDate: new Date(editingTask.dueDate).toISOString().split('T')[0],
                priority: editingTask.priority,
                status: editingTask.status,
            });
        } else {
            setFormState(emptyTask);
        }
    }, [editingTask]);

    const handleOpenModal = (task: Task | null = null) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: keyof typeof formState, value: string | number) => {
        setFormState(prev => ({ ...prev, [name]: value as TaskPriority | TaskStatus }));
    };
    
    const handleToggleStatus = (taskId: number) => {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;
        
        const newStatus = task.status === TaskStatus.Completed ? TaskStatus.Pending : TaskStatus.Completed;
        const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t);
        setTasks(updatedTasks);
        api.updateTask(taskId, { status: newStatus });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const taskData = { ...formState, dueDate: new Date(formState.dueDate).toISOString() };

        if (editingTask) {
            const updatedTask = { ...editingTask, ...taskData };
            setTasks(tasks.map(t => t.id === editingTask.id ? updatedTask : t));
            handleCloseModal();
            await api.updateTask(editingTask.id, taskData);
        } else {
            const tempId = Date.now();
            const newTask: Task = { id: tempId, ...taskData };
            setTasks([newTask, ...tasks]);
            handleCloseModal();
            const savedTask = await api.createTask(taskData);
            setTasks(prev => prev.map(t => t.id === tempId ? savedTask : t));
        }
    };

    return (
        <div className="space-y-6">
             <div className="flex flex-wrap gap-4 justify-between items-center">
                <h1 className="text-3xl font-bold text-text">Tasks</h1>
                 <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
                >
                    Add Task
                </button>
            </div>
            <Card>
                 {isLoading ? <div className="text-center p-10">Loading tasks...</div> : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-text-secondary">
                        <thead className="text-xs text-text-secondary uppercase bg-background">
                            <tr>
                                <th scope="col" className="px-6 py-3 w-12"><span className="sr-only">Status</span></th>
                                <th scope="col" className="px-6 py-3">Task</th>
                                <th scope="col" className="px-6 py-3">Due Date</th>
                                <th scope="col" className="px-6 py-3">Priority</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">Edit</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task: Task) => (
                                <tr key={task.id} className="border-b border-border hover:bg-background">
                                    <td className="px-6 py-4">
                                        <input 
                                            type="checkbox" 
                                            className="h-4 w-4 rounded bg-input-bg border-border text-primary focus:ring-primary"
                                            checked={task.status === TaskStatus.Completed}
                                            onChange={() => handleToggleStatus(task.id)}
                                        />
                                    </td>
                                    <th scope="row" className={`px-6 py-4 font-medium whitespace-nowrap ${task.status === TaskStatus.Completed ? 'text-text-secondary line-through' : 'text-text'}`}>
                                        {task.title}
                                    </th>
                                    <td className="px-6 py-4">{new Date(task.dueDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">{getPriorityPill(task.priority)}</td>
                                    <td className="px-6 py-4">{getStatusPill(task.status)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleOpenModal(task)} className="p-1 text-text-secondary hover:text-primary">
                                            <EditIcon className="w-5 h-5"/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
            </Card>

             <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingTask ? 'Edit Task' : 'Add New Task'}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input label="Title" id="title" name="title" type="text" placeholder="e.g., Follow up with client" value={formState.title} onChange={handleInputChange} required />
                    <Input label="Due Date" id="dueDate" name="dueDate" type="date" value={formState.dueDate} onChange={handleInputChange} required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <Select label="Priority" id="priority" options={priorityOptions} value={formState.priority} onChange={(val) => handleSelectChange('priority', val as TaskPriority)} />
                       <Select label="Status" id="status" options={statusOptions} value={formState.status} onChange={(val) => handleSelectChange('status', val as TaskStatus)} />
                    </div>
                    <div className="flex justify-end pt-4 gap-3">
                         <button type="button" onClick={handleCloseModal} className="bg-card text-text px-4 py-2 rounded-lg font-semibold hover:bg-background border border-border">
                            Cancel
                        </button>
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover">
                             {editingTask ? 'Save Changes' : 'Save Task'}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default TasksPage;