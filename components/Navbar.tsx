'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/80 backdrop-blur border-b border-aerulaBlue-100 py-3"
                    : "bg-transparent py-6"
            )}
        >
            <Container className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
                        <Image
                            src="/images/logo.png"
                            alt=" Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-aerulaBlue-700">

                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-8">
                    {['About', 'Experiences', 'Community'].map((item) => (
                        <Link
                            key={item}
                            href={`/#${item.toLowerCase()}`}
                            className="text-slate-600 hover:text-aerulaBlue-500 transition-colors font-medium"
                        >
                            {item}
                        </Link>
                    ))}
                    <Button asChild variant="primary" size="pill">
                        <Link href="/contact">Plan a Visit</Link>
                    </Button>
                </nav>

                {/* Mobile Menu Button (Simplified) */}
                <Button asChild variant="primary" size="sm" className="md:hidden">
                    <Link href="/contact">Plan a Visit</Link>
                </Button>
            </Container>
        </header>
    );
}
