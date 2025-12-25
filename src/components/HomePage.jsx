import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Sparkles, ArrowRight, ShieldCheck, Zap, Brain, Activity, Play, Lock, ChevronRight
} from "lucide-react";

// Subcomponents for cleaner code
const Section = ({ children, className = "" }) => (
    <section className={`relative w-full max-w-6xl mx-auto px-6 md:px-12 py-32 ${className}`}>
        {children}
    </section>
);

const FeatureCard = ({ icon: Icon, title, desc, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="group relative p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 hover:border-violet-500/20 transition-all duration-300 backdrop-blur-sm overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-violet-500/10 group-hover:border-violet-500/20 transition-all duration-300">
                <Icon className="w-6 h-6 text-violet-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{title}</h3>
            <p className="text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed font-light">{desc}</p>
        </div>
    </motion.div>
);

const StepCard = ({ number, title, desc, align = "left" }) => (
    <motion.div
        initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={`flex items-start gap-8 ${align === "right" ? "flex-row-reverse text-right" : "text-left"}`}
    >
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] mt-1">
            {number}
        </div>
        <div className="space-y-2">
            <h4 className="text-xl font-bold text-white">{title}</h4>
            <p className="text-slate-400 leading-relaxed font-light">{desc}</p>
        </div>
    </motion.div>
);

const HomePage = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <div ref={containerRef} className="relative min-h-screen bg-[#02040a] text-white overflow-hidden selection:bg-violet-500/30">

            {/* --- AESTHETIC BACKGROUND SYSTEM --- */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Clean, deep base gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/50 via-[#02040a] to-[#02040a]" />

                <motion.div style={{ y: backgroundY }} className="absolute inset-0">
                    {/* Main Aura - Top Left */}
                    <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen opacity-60" />
                    {/* Secondary Aura - Bottom Right */}
                    <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-violet-900/10 rounded-full blur-[120px] mix-blend-screen opacity-40" />
                    {/* Accent Spark - Center */}
                    <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] opacity-30 animate-pulse" style={{ animationDuration: '8s' }} />
                </motion.div>

                {/* Ultra-fine Grain for Texture */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
                }} />
            </div>

            {/* --- HERO SECTION --- */}
            <div className="relative pt-20 pb-32 px-6">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-10 backdrop-blur-md hover:bg-white/[0.05] transition-colors cursor-default"
                    >
                        <Sparkles className="w-3 h-3 text-violet-400" />
                        <span className="text-xs font-semibold text-slate-300 tracking-widest uppercase">The Future of Connection</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-10 leading-[0.9] text-white drop-shadow-2xl"
                    >
                        True
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-violet-300 to-indigo-400">match</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-14 leading-relaxed font-light"
                    >
                        Experience connection on a neural level. Our AI analyzes <span className="text-white font-medium">50+ psychological traits</span> to find your perfect equilibrium.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link to="/questions" className="w-full sm:w-auto">
                            <button className="group w-full sm:w-auto relative px-10 py-5 bg-white text-black rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-100 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:-translate-y-1">
                                Start Analysis
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <button className="w-full sm:w-auto px-10 py-5 rounded-full border border-white/10 font-bold text-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
                            <Play className="w-4 h-4 fill-current" />
                            See How It Works
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* --- TRUST STRIP --- */}
            <div className="w-full border-y border-white/[0.04] bg-white/[0.01]">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                        {['End-to-End Encrypted', 'Psychometric Validated', 'No Hidden Fees', 'Data Private'].map((item) => (
                            <div key={item} className="flex items-center gap-3 font-semibold tracking-wider uppercase text-xs text-slate-300">
                                <ShieldCheck className="w-4 h-4" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- VALUE SECTION --- */}
            <Section>
                <div className="grid md:grid-cols-2 gap-10 md:gap-24 mb-32 items-center">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black mb-8 leading-[1]"
                        >
                            Beyond <br />
                            <span className="text-violet-400">Surface Level.</span>
                        </motion.h2>
                        <p className="text-slate-400 text-lg leading-relaxed font-light mb-8">
                            Traditional apps rely on shared hobbies. We rely on shared cognitive structures.
                            Our algorithms decode the invisible threads of personality that determine true long-term compatibility.
                        </p>
                        <Link to="/questions" className="text-white font-semibold flex items-center gap-2 hover:gap-4 transition-all group">
                            Learn about our science <ChevronRight className="w-4 h-4 text-violet-400 group-hover:text-white transition-colors" />
                        </Link>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-violet-500/10 rounded-full blur-[80px]" />
                        <div className="relative grid grid-cols-2 gap-4">
                            <div className="space-y-4 translate-y-8">
                                <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                                    <Brain className="w-8 h-8 text-violet-300 mb-4" />
                                    <div className="h-2 w-12 bg-white/20 rounded-full mb-2" />
                                    <div className="h-2 w-20 bg-white/10 rounded-full" />
                                </div>
                                <div className="p-6 rounded-3xl bg-indigo-500/20 border border-indigo-500/30 backdrop-blur-md">
                                    <Activity className="w-8 h-8 text-white mb-4" />
                                    <div className="h-2 w-16 bg-white/40 rounded-full mb-2" />
                                    <div className="h-2 w-24 bg-white/20 rounded-full" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="p-6 rounded-3xl bg-slate-800/50 border border-white/10 backdrop-blur-md">
                                    <Lock className="w-8 h-8 text-slate-300 mb-4" />
                                    <div className="h-2 w-16 bg-white/20 rounded-full mb-2" />
                                    <div className="h-2 w-20 bg-white/10 rounded-full" />
                                </div>
                                <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                                    <Zap className="w-8 h-8 text-amber-300 mb-4" />
                                    <div className="h-2 w-10 bg-white/20 rounded-full mb-2" />
                                    <div className="h-2 w-14 bg-white/10 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mb-16">
                    <span className="text-violet-400 font-semibold tracking-wider text-sm uppercase">Core Features</span>
                    <h3 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Engineered for connection</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={Brain}
                        title="Cognitive Mapping"
                        desc="50-point psychometric analysis mapping your personality structure in high definition."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={Zap}
                        title="Neural Sync"
                        desc="Advanced matching algorithms that predict emotional resonance before you even meet."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={Lock}
                        title="Privacy First"
                        desc="Your psychological profile is encrypted with military-grade protocols. Your mind is yours."
                        delay={0.3}
                    />
                </div>
            </Section>

            {/* --- HOW IT WORKS --- */}
            <Section className="bg-gradient-to-b from-white/[0.02] to-transparent rounded-[3rem] border border-white/5 my-20">
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div className="order-2 md:order-1 relative h-[500px] w-full bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-[#0a0a0a] to-[#0a0a0a]" />

                        {/* Interactive UI Viz */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-64 space-y-6">
                                {/* Match Card */}
                                <div className="bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="text-xs font-mono text-slate-400">ANALYSIS_COMPLETE</div>
                                        <div className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-[10px] font-bold">98.5% MATCH</div>
                                    </div>
                                    <div className="space-y-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${80 + i * 5}%` }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                    className="h-full bg-violet-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/5 flex gap-3">
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-violet-500 to-indigo-500" />
                                        <div className="flex-1">
                                            <div className="h-2 w-20 bg-white/20 rounded mb-1" />
                                            <div className="h-2 w-12 bg-white/10 rounded" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <h2 className="text-3xl md:text-5xl font-bold mb-10 tracking-tight">The Science of You.</h2>
                        <div className="space-y-10">
                            <StepCard
                                number="1"
                                title="The Assessment"
                                desc="Take our adaptive, visual-based questionnaire. It bypasses conscious bias to reveal your true preferences."
                            />
                            <StepCard
                                number="2"
                                title="The Analysis"
                                desc="We compare your cognitive structures against our database of successful high-longevity couples."
                            />
                            <StepCard
                                number="3"
                                title="The Connection"
                                desc="Receive curated matches that complement your specific psychological needs and growth areas."
                            />
                        </div>
                    </div>
                </div>
            </Section>

            {/* --- FINAL CTA --- */}
            <section className="relative py-40 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/10 to-transparent pointer-events-none" />
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter loading-none">
                        Ready to meet your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">True Match?</span>
                    </h2>
                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
                        Join the first dating platform powered by cognitive science.
                    </p>
                    <Link to="/questions">
                        <button className="px-12 py-6 bg-white text-black hover:bg-slate-200 rounded-full font-bold text-xl transition-all hover:scale-105 shadow-[0_0_60px_-15px_rgba(255,255,255,0.2)]">
                            Start Free Analysis
                        </button>
                    </Link>
                </div>
            </section>


        </div>
    );
};

export default HomePage;
