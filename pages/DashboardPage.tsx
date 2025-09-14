import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { api } from '../utils/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { Task, TaskStatus, Lead, Deal } from '../types';

const StatCard: React.FC<{ title: string; value: string; change?: string; changeType?: 'increase' | 'decrease' }> = ({ title, value, change, changeType }) => {
    const isIncrease = changeType === 'increase';
    return (
        <Card>
            <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
            <p className="text-3xl font-bold text-text mt-2">{value}</p>
            {change && changeType && (
                 <div className="flex items-center text-sm mt-2">
                    <span className={`flex items-center ${isIncrease ? 'text-green-400' : 'text-red-400'}`}>
                        {isIncrease ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        )}
                        {change}
                    </span>
                    <span className="text-text-secondary ml-1">vs last month</span>
                </div>
            )}
        </Card>
    );
};

const revenueData = [
    { name: 'Jan', revenue: 4000 }, { name: 'Feb', revenue: 3000 }, { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 4500 }, { name: 'May', revenue: 6000 }, { name: 'Jun', revenue: 5500 },
];

const DashboardPage: React.FC = () => {
    const [stats, setStats] = useState<{ totalRevenue: number, newLeads: number, dealsWon: number, openTasks: number } | null>(null);
    const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([]);
    const [leadSourceData, setLeadSourceData] = useState<{ name: string; value: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [dealsData, leadsData, tasksData] = await Promise.all([
                    api.getDeals(),
                    api.getLeads(),
                    api.getTasks()
                ]);

                const totalRevenue = dealsData.reduce((sum, deal) => sum + deal.value, 0);
                const dealsWon = dealsData.filter(d => d.stage === 'Won').length;
                const openTasks = tasksData.filter(t => t.status !== TaskStatus.Completed).length;
                
                setStats({
                    totalRevenue,
                    newLeads: leadsData.length,
                    dealsWon,
                    openTasks,
                });

                const sources = leadsData.reduce((acc, lead) => {
                    acc[lead.source] = (acc[lead.source] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>);
                setLeadSourceData(Object.entries(sources).map(([name, value]) => ({ name, value })));

                setUpcomingTasks(tasksData.filter(t => t.status !== TaskStatus.Completed).slice(0, 3));
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return <div className="text-center p-10">Loading dashboard...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={`₹${(stats?.totalRevenue || 0 / 1000).toFixed(1)}k`} change="12.5%" changeType="increase" />
                <StatCard title="New Leads" value={(stats?.newLeads || 0).toString()} change="8.2%" changeType="increase" />
                <StatCard title="Deals Won" value={(stats?.dealsWon || 0).toString()} change="2.1%" changeType="decrease" />
                <StatCard title="Open Tasks" value={(stats?.openTasks || 0).toString()} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <h3 className="font-semibold text-text mb-4">Reve</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis dataKey="name" stroke="#8b949e" />
                            <YAxis stroke="#8b949e" />
                            <Tooltip contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d' }} />
                            <Legend wrapperStyle={{ color: '#c9d1d9' }}/>
                            <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
                <Card>
                    <h3 className="font-semibold text-text mb-4">Lead Sources</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={leadSourceData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis type="number" hide />
                            <YAxis type="category" dataKey="name" width={80} stroke="#8b949e" />
                            <Tooltip contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d' }} cursor={{fill: '#30363d'}} />
                            <Bar dataKey="value" fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card>
                    <h3 className="font-semibold text-text mb-4">AI Suggestions</h3>
                    <ul className="space-y-3">
                        <li className="text-sm p-3 bg-blue-500/10 rounded-lg text-blue-300">💡 You have 5 leads with no follow-up in 7 days.</li>
                        <li className="text-sm p-3 bg-blue-500/10 rounded-lg text-blue-300">🚀 Lead "Mobile App Dev" has a 85% conversion probability. Prioritize it!</li>
                        <li className="text-sm p-3 bg-blue-500/10 rounded-lg text-blue-300">📅 Your calendar has a free slot tomorrow at 11 AM. Schedule a follow-up?</li>
                    </ul>
                </Card>
                <Card>
                    <h3 className="font-semibold text-text mb-4">Upcoming Tasks</h3>
                    <ul className="space-y-3">
                        {upcomingTasks.map(task => (
                            <li key={task.id} className="flex items-center justify-between text-sm p-3 bg-background rounded-lg">
                                <div>
                                    <p className="font-medium text-text">{task.title}</p>
                                    <p className="text-xs text-text-secondary">{new Date(task.dueDate).toLocaleDateString()}</p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${task.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{task.priority}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>

        </div>
    );
};

export default DashboardPage;
