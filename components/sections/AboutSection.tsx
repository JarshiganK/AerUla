import Section from '@/components/Section';

export default function AboutSection() {
    return (
        <Section id="about" className="bg-white relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-Blue-700 tracking-tight">
                        Beyond Surface Tourism
                    </h2>
                    <div className="space-y-6 text-lg text-Blue-700/70 leading-relaxed">
                        <p>
                            is more than a destination; it's a philosophy of slow travel. We believe in connecting visitors with the authentic rhythm of northern Sri Lankan village life, fostering genuine relationships, and preserving cultural heritage through shared experiences.
                        </p>
                        <p>
                            Here, you don't just watch; you participate. You learn. You belong.
                        </p>
                    </div>
                </div>

                <div className="bg-Blue-50 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden shadow-inner border border-Blue-100">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-Blue-700 mb-6">Our Promise</h3>
                        <ul className="space-y-5">
                            {[
                                "Direct benefit to local artisans and families.",
                                "Zero-plastic, low-carbon footprint experiences.",
                                "Respectful cultural exchange, not exploitation."
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <span className="w-8 h-8 rounded-full bg-Blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md">
                                        {i + 1}
                                    </span>
                                    <span className="text-Blue-700/80 font-medium pt-1">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Decorative blob */}
                    <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-Blue-100 rounded-full blur-3xl opacity-60"></div>
                </div>
            </div>
        </Section>
    );
}
