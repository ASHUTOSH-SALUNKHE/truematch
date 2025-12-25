import React from 'react';
import { Sparkles } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="border-t border-white/[0.05] bg-[#010205] py-16 relative z-10">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">Truematch</span>
                </div>
                <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-400">
                    <a href="#" className="hover:text-white transition-colors">Methodology</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>
                <div className="text-slate-600 text-sm">© 2024 TrueMatch Inc.</div>
            </div>
        </footer>
    );
};

export default Footer;
