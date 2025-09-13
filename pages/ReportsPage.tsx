import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { api } from '../utils/api';

const COLORS = ['#10B981', '#EF4444', '#3B82F6'];

interface TeamPerformanceData {
    name: string;
    deals: number;
    revenue: number;
}

interface LeadConversionData {
    name: string;
    value: number;
}

const ReportsPage: React.FC = () => {
    const [teamData, setTeamData] = useState<TeamPerformanceData[]>([]);
    const [conversionData, setConversionData] = useState<LeadConversionData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            setIsLoading(true);
            try {
                const [team, conversion] = await Promise.all([
                    api.getReport('teamPerformance'),
                    api.getReport('leadConversion')
                ]);
                setTeamData(team);
                setConversionData(conversion);
            } catch (error) {
                console.error("Failed to fetch reports", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReports();
    }, []);

    if (isLoading) {
        return <div className="text-center p-10">Loading reports...</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-text">Reports & Analytics</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="font-semibold text-text mb-4">Team Performance</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={teamData}>
                            <XAxis dataKey="name" stroke="#8b949e" />
                            <YAxis stroke="#8b949e" />
                            <Tooltip contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d' }} cursor={{fill: '#30363d'}} />
                            <Legend wrapperStyle={{ color: '#c9d1d9' }}/>
                            <Bar dataKey="deals" fill="#8b5cf6" />
                            <Bar dataKey="revenue" fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
                <Card>
                    <h3 className="font-semibold text-text mb-4">Lead Conversion</h3>
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={conversionData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {conversionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#161b22', border: '1px solid #30363d' }} />
                            <Legend wrapperStyle={{ color: '#c9d1d9' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </div>
    );
};

export default ReportsPage;