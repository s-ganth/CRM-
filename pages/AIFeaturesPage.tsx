import React, { useState } from 'react';
import Card from '../components/Card';
import { AIIcon } from '../components/icons';

const AIFeaturesPage: React.FC = () => {
    const [emailPrompt, setEmailPrompt] = useState('Write a follow-up email to a new lead named "John Doe" from "Tech Solutions" about our web design services.');
    const [generatedEmail, setGeneratedEmail] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateEmail = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setGeneratedEmail(`Subject: Following up on your web design inquiry

Hi John,

Hope you're having a great week.

I'm writing to follow up on your recent inquiry about our web design services at Gemini CRM. We specialize in creating modern, responsive, and user-friendly websites that help businesses like Tech Solutions grow their online presence.

I'd love to learn more about your project and discuss how we can help you achieve your goals. Are you available for a quick 15-minute call sometime next week?

Best regards,

Priya Sharma
Symphony CRM`);
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-text">AI Features</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="font-semibold text-text mb-4">AI Email Draft Generator</h3>
                    <div className="space-y-4">
                        <textarea
                            className="w-full h-32 p-3 bg-input-bg border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                            value={emailPrompt}
                            onChange={(e) => setEmailPrompt(e.target.value)}
                            placeholder="Enter your prompt..."
                        />
                        <button
                            onClick={handleGenerateEmail}
                            disabled={isGenerating}
                            className="w-full bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:bg-gray-500 flex items-center justify-center"
                        >
                            <AIIcon className="w-5 h-5 mr-2" />
                            {isGenerating ? 'Generating...' : 'Generate Email'}
                        </button>
                        {generatedEmail && (
                             <div className="p-4 bg-background rounded-lg border border-border">
                                <h4 className="font-semibold text-sm mb-2">Generated Email:</h4>
                                <pre className="whitespace-pre-wrap text-sm text-text-secondary font-sans">{generatedEmail}</pre>
                            </div>
                        )}
                    </div>
                </Card>
                <Card>
                    <h3 className="font-semibold text-text mb-4">AI Chat Assistant</h3>
                    <div className="flex flex-col h-96 bg-background rounded-lg p-4 border border-border">
                        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                            <div className="flex justify-start">
                                <div className="bg-card p-3 rounded-lg max-w-xs text-text">Show me all leads from last week.</div>
                            </div>
                            <div className="flex justify-end">
                                <div className="bg-primary text-white p-3 rounded-lg max-w-xs">Sure, here are the 3 leads from last week: Website Redesign, Content Marketing, UI/UX Consulting.</div>
                            </div>
                        </div>
                        <div className="mt-4 flex">
                            <input type="text" placeholder="Ask me anything..." className="flex-1 px-3 py-2 bg-input-bg border border-border rounded-l-lg text-text focus:outline-none focus:ring-2 focus:ring-primary" />
                            <button className="bg-primary text-white px-4 py-2 rounded-r-lg font-semibold hover:bg-primary-hover">Send</button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default AIFeaturesPage;