import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Home, Heart, Brain, Percent, Shield, Zap, Users, Target, Activity, Lock, AlertTriangle, ThumbsUp, Loader } from 'lucide-react';
import { axiosInstance } from '../lib/axios';

const Card = ({ title, icon: Icon, children, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors ${className}`}
    >
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300">
                <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-white/90">{title}</h3>
        </div>
        <div className="text-white/70 leading-relaxed">
            {children}
        </div>
    </motion.div>
);

const ResponsePage = () => {
    const location = useLocation();
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // If data is passed via navigation state, use it
            if (location.state?.aiResponse) {
                setResponseData(location.state.aiResponse);
                setLoading(false);
                return;
            }

            // Otherwise fetch from the API
            try {
                const response = await axiosInstance.get('/user/response');
                setResponseData(response.data);
            } catch (err) {
                console.error("Failed to fetch response:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [location.state]);

    // Extract response data safely
    // The API might return the object directly, or wrapped in 'response' property
    const data = responseData?.response || responseData || {};

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-white bg-slate-950">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mb-4"
                >
                    <Loader className="w-10 h-10 text-blue-500" />
                </motion.div>
                <p className="text-white/60">Loading your result...</p>
            </div>
        );
    }

    if (!responseData || Object.keys(data).length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">No Result Found</h2>
                <p className="text-white/60 mb-8 max-w-md">
                    We couldn't find your analysis. Please try submitting the questionnaire again.
                </p>
                <Link to="/">
                    <button className="px-8 py-3 bg-blue-500 rounded-xl font-bold hover:bg-blue-600 transition-colors">
                        Go Home
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20 px-4 md:px-10 flex justify-center text-white">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full max-w-6xl"
            >
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-blue-300">Analysis Complete</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                        Your Relationship Blueprint
                    </h1>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Here is a deep dive into your compatibility profile based on your responses.
                    </p>
                </div>

                {/* Score Section */}
                {data.compatibilityScore && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-12"
                    >
                        <div className="relative bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                                <div className="text-center">
                                    <div className="text-6xl md:text-8xl font-black text-white mb-2 tracking-tighter">
                                        {data.compatibilityScore.score}%
                                    </div>
                                    <div className="text-blue-200 font-medium uppercase tracking-widest text-sm">Compatibility Score</div>
                                </div>
                                <div className="max-w-xl text-left">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <Activity className="w-6 h-6 text-green-400" />
                                        Assessment
                                    </h3>
                                    <p className="text-lg text-white/80 leading-relaxed">
                                        {data.compatibilityScore.reasoning}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">

                    {/* Core Personality */}
                    <Card title="Core Personality Traits" icon={Target} className="md:col-span-2">
                        <ul className="grid md:grid-cols-2 gap-4">
                            {data.corePersonalityTraits?.map((trait, i) => (
                                <li key={i} className="flex gap-3 text-white/80">
                                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2.5 flex-shrink-0" />
                                    {trait}
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Attachment Style */}
                    {data.attachmentStyle && (
                        <Card title="Attachment Style" icon={Heart}>
                            <div className="mb-3">
                                <span className="text-2xl font-bold text-white block mb-1">{data.attachmentStyle.type}</span>
                            </div>
                            <p>{data.attachmentStyle.justification}</p>
                        </Card>
                    )}

                    {/* Communication Style */}
                    {data.communicationStyle && (
                        <Card title="Communication Style" icon={Users}>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Expression</span>
                                    <p className="mt-1">{data.communicationStyle.expressionStyle}</p>
                                </div>
                                <div>
                                    <span className="text-blue-300 text-sm font-semibold uppercase tracking-wider">Listening</span>
                                    <p className="mt-1">{data.communicationStyle.listeningBehavior}</p>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Love Language */}
                    {data.loveLanguage && (
                        <Card title="Love Language" icon={Heart}>
                            <div className="mb-3">
                                <span className="text-2xl font-bold text-white block mb-1">{data.loveLanguage.type}</span>
                            </div>
                            <p>{data.loveLanguage.evidence}</p>
                        </Card>
                    )}

                    {/* Emotional Intelligence */}
                    {data.emotionalIntelligence && (
                        <Card title="Emotional Intelligence" icon={Brain}>
                            <ul className="space-y-3">
                                <li className="bg-white/5 p-3 rounded-lg">
                                    <span className="font-semibold text-blue-200 block text-sm mb-1">Awareness</span>
                                    {data.emotionalIntelligence.emotionalAwareness}
                                </li>
                                <li className="bg-white/5 p-3 rounded-lg">
                                    <span className="font-semibold text-blue-200 block text-sm mb-1">Regulation</span>
                                    {data.emotionalIntelligence.emotionalRegulation}
                                </li>
                            </ul>
                        </Card>
                    )}

                    {/* Conflict Resolution */}
                    {data.conflictResolution && (
                        <Card title="Conflict Resolution" icon={Shield}>
                            <p className="mb-4">{data.conflictResolution.avoidanceVsConfrontation}</p>
                            <p className="text-white/60 text-sm italic border-l-2 border-white/20 pl-3">
                                "{data.conflictResolution.reactionToDisagreements}"
                            </p>
                        </Card>
                    )}

                    {/* Long Term Outlook */}
                    {data.longTermOutlook && (
                        <Card title="Long Term Outlook" icon={Lock}>
                            <div className="grid gap-3">
                                <div className="p-3 border border-white/10 rounded-xl">
                                    <span className="text-sm text-purple-300 font-bold block mb-1">Growth</span>
                                    {data.longTermOutlook.growthPotential}
                                </div>
                                <div className="p-3 border border-white/10 rounded-xl">
                                    <span className="text-sm text-purple-300 font-bold block mb-1">Stability</span>
                                    {data.longTermOutlook.stability}
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Ideal Partner */}
                    {data.idealPartnerProfile && (
                        <Card title="Ideal Partner Profile" icon={Zap} className="md:col-span-2">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-semibold text-blue-300 mb-3 uppercase text-sm tracking-wider">Traits to Look For</h4>
                                    <ul className="space-y-2">
                                        {data.idealPartnerProfile.personalityTraits?.map((trait, i) => (
                                            <li key={i} className="flex gap-2 items-start text-sm">
                                                <span className="text-green-400 mt-0.5">✓</span>
                                                {trait}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-blue-300 mb-1 uppercase text-sm tracking-wider">Emotional Maturity</h4>
                                        <p className="text-sm opacity-80">{data.idealPartnerProfile.emotionalMaturityLevel}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-blue-300 mb-1 uppercase text-sm tracking-wider">Communication</h4>
                                        <p className="text-sm opacity-80">{data.idealPartnerProfile.communicationCompatibility}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Strengths */}
                    {data.relationshipStrengths && (
                        <Card title="Relationship Strengths" icon={ThumbsUp} className="bg-green-500/5 border-green-500/20">
                            <ul className="space-y-2">
                                {data.relationshipStrengths.map((str, i) => (
                                    <li key={i} className="flex gap-3">
                                        <span className="text-green-400 font-bold">•</span>
                                        {str}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    )}

                    {/* Risks */}
                    {data.relationshipRisks && (
                        <Card title="Potential Areas of Friction" icon={AlertTriangle} className="bg-orange-500/5 border-orange-500/20">
                            <ul className="space-y-2">
                                {data.relationshipRisks.map((risk, i) => (
                                    <li key={i} className="flex gap-3">
                                        <span className="text-orange-400 font-bold">!</span>
                                        {risk}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="w-full bg-slate-900/80 backdrop-blur-xl border-t border-white/10 p-6 mt-12 rounded-2xl flex justify-between items-center">
                    <span className="text-sm text-white/50 hidden md:block">
                        AI-generated insights based on your answers.
                    </span>
                    <Link to="/">
                        <button className="group flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-white text-slate-900 hover:bg-blue-50 transition-all shadow-lg hover:shadow-white/10">
                            <Home className="w-5 h-5" />
                            Back to Home
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ResponsePage;
