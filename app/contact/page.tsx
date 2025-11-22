'use client';

import { useState } from 'react';
import Section from '@/components/Section';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="pt-24 min-h-screen bg-gradient-to-b from-Blue-50 to-white">
            <Section>
                <Container className="max-w-4xl">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold text-Blue-700 mb-6 tracking-tight">
                            Plan Your Visit
                        </h1>
                        <p className="text-xl text-Blue-700/60 max-w-2xl mx-auto">
                            Tell us when you'd like to come, how big your group is, and which experiences call to you. We'll craft a perfect day for you.
                        </p>
                    </div>

                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-float border border-Blue-100 relative overflow-hidden">
                        {/* Decorative gradient top bar */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-Blue-400 to-Blue-500"></div>

                        {status === 'success' ? (
                            <div className="text-center py-16 animate-in fade-in zoom-in duration-500">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h3 className="text-3xl font-bold text-Blue-700 mb-3">Message Sent!</h3>
                                <p className="text-Blue-700/60 text-lg max-w-md mx-auto">
                                    Thank you for reaching out. We'll get back to you shortly to plan your  experience.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-8 text-Blue-500 font-bold hover:text-Blue-400 transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="block text-sm font-bold text-Blue-700 uppercase tracking-wide">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl bg-Blue-50/30 border border-Blue-100 focus:border-Blue-400 focus:ring-4 focus:ring-Blue-100 outline-none transition-all text-Blue-900 placeholder-Blue-300"
                                            placeholder="Jane Doe"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-bold text-Blue-700 uppercase tracking-wide">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl bg-Blue-50/30 border border-Blue-100 focus:border-Blue-400 focus:ring-4 focus:ring-Blue-100 outline-none transition-all text-Blue-900 placeholder-Blue-300"
                                            placeholder="jane@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="block text-sm font-bold text-Blue-700 uppercase tracking-wide">
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 rounded-xl bg-Blue-50/30 border border-Blue-100 focus:border-Blue-400 focus:ring-4 focus:ring-Blue-100 outline-none transition-all resize-none text-Blue-900 placeholder-Blue-300"
                                        placeholder="I'd love to visit next weekend with my family of 4. We're interested in the weaving circle..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    size="lg"
                                    className="w-full py-5 h-auto text-lg shadow-float hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                                </Button>

                                {status === 'error' && (
                                    <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center text-sm font-medium">
                                        Something went wrong. Please try again.
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                </Container>
            </Section>
        </div>
    );
}
