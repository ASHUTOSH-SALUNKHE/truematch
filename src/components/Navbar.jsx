import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BrainCircuit, Activity, Menu, X, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { path: '/', label: 'Home', icon: Home },
        ...(user ? [
            { path: '/questions', label: 'Analyze', icon: BrainCircuit, isPrimary: true },
            { path: '/response', label: 'Results', icon: Activity },
        ] : [])
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                // Changed from fixed to sticky to ensure it pushes content down
                className={`sticky top-0 z-50 w-full transition-all duration-300 border-b
                    ${scrolled
                        ? 'bg-[#02040a]/80 backdrop-blur-xl border-white/10 shadow-lg py-4'
                        : 'bg-[#02040a]/60 backdrop-blur-md border-transparent py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-indigo-500/20">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white hidden sm:block">
                                True<span className="font-light text-indigo-400">match</span>
                            </span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center gap-2">
                            {links.filter(l => !l.isPrimary).map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link key={link.path} to={link.path}>
                                        <div className="relative px-5 py-2 group">
                                            <span className={`relative z-10 text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                                                {link.label}
                                            </span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="nav-glow"
                                                    className="absolute inset-0 -z-10 bg-white/10 rounded-lg"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Actions */}
                        <div className="hidden md:flex items-center gap-4">
                            {user ? (
                                <>
                                    <Link to="/questions">
                                        <button className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-slate-200 transition-all hover:scale-105 active:scale-95">
                                            Analyze Now
                                        </button>
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="p-2.5 rounded-full text-slate-400 hover:bg-white/5 hover:text-white transition-all border border-transparent hover:border-white/10"
                                        title="Sign Out"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4">
                                        Log In
                                    </Link>
                                    <Link to="/signup">
                                        <button className="px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-600/20 transition-all hover:shadow-indigo-600/40 transform hover:-translate-y-0.5">
                                            Sign Up
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <button onClick={toggleMenu} className="md:hidden p-2 text-white/70 hover:text-white">
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-0 top-[70px] z-40 bg-[#02040a]/95 backdrop-blur-2xl border-b border-white/10 md:hidden shadow-2xl"
                    >
                        <div className="p-6 flex flex-col gap-4">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-98 transition-all border border-white/5"
                                >
                                    <div className="p-2 rounded-xl bg-indigo-500/20">
                                        <link.icon className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <span className="font-bold text-lg text-white">{link.label}</span>
                                </Link>
                            ))}

                            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

                            {user ? (
                                <button
                                    onClick={() => { logout(); setIsOpen(false); }}
                                    className="flex items-center gap-4 p-4 rounded-2xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all border border-red-500/20"
                                >
                                    <div className="p-2 rounded-xl bg-red-500/20">
                                        <LogOut className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-lg">Sign Out</span>
                                </button>
                            ) : (
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <Link to="/login" onClick={() => setIsOpen(false)}>
                                        <button className="w-full py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 text-lg">
                                            Log In
                                        </button>
                                    </Link>
                                    <Link to="/signup" onClick={() => setIsOpen(false)}>
                                        <button className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg shadow-lg shadow-indigo-600/20">
                                            Sign Up
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
