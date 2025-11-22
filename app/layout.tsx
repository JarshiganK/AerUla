import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: " – Beyond Surface Tourism",
    description: "Eco-cultural northern village experience in Sri Lanka.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.className} flex flex-col min-h-screen`}>
                <Navbar />
                <main className="flex-grow flex flex-col">
                    {children}
                </main>
                <footer className="py-12 text-center text-Blue-700/60 text-sm bg-Blue-50 border-t border-Blue-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <p className="mb-4">© {new Date().getFullYear()} . All rights reserved.</p>
                        <div className="flex justify-center gap-6">
                            <a href="#" className="hover:text-Blue-500 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-Blue-500 transition-colors">Terms</a>
                            <a href="#" className="hover:text-Blue-500 transition-colors">Instagram</a>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
