import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';

export default function Hero() {
    return (
        <section className="relative overflow-hidden flex items-center min-h-[90vh] pt-32 pb-24">
            {/* Background Blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-Blue-100/50 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-Blue-50/80 rounded-full blur-3xl" />
            </div>

            <Container className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Content */}
                <div className="space-y-8">
                    <span className="inline-block bg-white/60 backdrop-blur-sm border border-Blue-100 text-Blue-700 text-sm font-semibold px-4 py-1.5 rounded-full shadow-sm">
                        Immersive northern village stays • Sri Lanka
                    </span>

                    <h1 className="text-5xl md:text-7xl font-bold text-Blue-700 leading-[1.1] tracking-tight text-balance">
                        Feel the village breathe, <span className="text-Blue-400">not just pose for it.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-Blue-700/70 max-w-lg leading-relaxed">
                        invites you to slow down and connect. Experience authentic crafts, real stories, and the gentle rhythm of northern life.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button asChild variant="primary" size="lg" className="text-lg px-8 py-6 h-auto">
                            <Link href="/contact">Plan my  day</Link>
                        </Button>
                        <Button asChild variant="ghost" size="lg" className="text-lg px-8 py-6 h-auto group">
                            <Link href="/#experiences">
                                Browse experiences
                                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Right Floating Card */}
                <div className="relative hidden md:block perspective-1000">
                    <div className="bg-white/90 rounded-3xl p-8 shadow-float animate-float hover:rotate-1 transition-transform duration-500 border border-white/50 backdrop-blur-md relative z-20 max-w-md ml-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-Blue-50 rounded-full flex items-center justify-center p-2.5 shadow-inner">
                                <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
                            </div>
                            <div>
                                <h3 className="font-bold text-Blue-700 text-lg"> Village</h3>
                                <p className="text-sm text-Blue-700/60">Jaffna, Sri Lanka</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-Blue-50/50 p-4 rounded-2xl">
                                <p className="text-xs text-Blue-700/50 uppercase tracking-wider font-bold mb-2">Today's Mood</p>
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]"></span>
                                    <span className="text-Blue-700 font-semibold">Calm & Breezy</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-Blue-700/50 uppercase tracking-wider font-bold mb-3">Ideal For</p>
                                <div className="flex flex-wrap gap-2">
                                    {['Slow Travel', 'Culture', 'Crafts'].map((tag) => (
                                        <Badge key={tag} variant="secondary" className="bg-white border-Blue-100">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-Blue-700/50 uppercase tracking-wider font-bold mb-3">Palette</p>
                                <div className="h-20 rounded-2xl bg-gradient-to-r from-Blue-500 via-Blue-400 to-Blue-100 shadow-inner w-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative elements behind card */}
                    <div className="absolute top-8 right-8 w-full h-full bg-Blue-100/40 rounded-3xl -z-10 transform rotate-6 scale-95 blur-sm"></div>
                </div>
            </Container>
        </section>
    );
}
