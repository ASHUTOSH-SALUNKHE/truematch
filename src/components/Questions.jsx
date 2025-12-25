import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle2, Send, RotateCcw, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import mcqData from '../data/mcq.json';

const Questions = () => {
    const { questions } = mcqData;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [direction, setDirection] = useState(0);
    const navigate = useNavigate();

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;

    const handleOptionSelect = (option) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestion.id]: option
        });
    };

    const handleNext = () => {
        if (!selectedAnswers[currentQuestion.id]) {
            alert("Please select an option to proceed.");
            return;
        }
        if (currentIndex < totalQuestions - 1) {
            setDirection(1);
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleSubmit = () => {
        if (!selectedAnswers[currentQuestion.id]) {
            alert("Please select an option to submit.");
            return;
        }
        setIsSubmitted(true);
    };

    const handleFinalSubmit = async () => {
        setIsLoading(true);
        try {
            // Format the data according to backend requirements
            const formattedResponses = questions.map(q => ({
                questionId: q.id,
                section: q.section,
                question: q.question,
                selectedAnswer: selectedAnswers[q.id]
            })).filter(item => item.selectedAnswer); // Ensure we only send answered questions

            const response = await axiosInstance.post('/user/askai', { responses: formattedResponses });

            console.log('Success:', response.data);
            navigate('/response', { state: { aiResponse: response.data } });
        } catch (error) {
            console.error('Error:', error);
            alert("Submission Failed! Please check if the backend is running.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditAnswers = () => {
        setIsSubmitted(false);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0
        })
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen py-10 px-4 md:px-10 flex justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-4xl bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        Summary of Your Answers
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2 mb-10 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                        {questions.map((q, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                key={q.id}
                                className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                                        Question {idx + 1}
                                    </span>
                                </div>
                                <p className="mb-4 text-lg text-white/90 font-medium">{q.question}</p>
                                <div className="p-3 bg-black/20 rounded-xl border-l-4 border-blue-500">
                                    <p className="text-sm text-white/60 mb-1">Your Answer</p>
                                    <p className="font-semibold text-blue-200">
                                        {selectedAnswers[q.id] || <span className="text-red-400 italic">Not Answered</span>}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 border-t border-white/10">
                        <button
                            onClick={handleEditAnswers}
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all bg-white/5 text-white hover:bg-white/10 border border-white/10 hover:border-white/20"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Back to Form
                        </button>

                        <button
                            onClick={handleFinalSubmit}
                            disabled={isLoading}
                            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-wait disabled:scale-100"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Submit Final Answers
                                </>
                            )}
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {/* Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-2 bg-white/5">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>

            <div className="w-full max-w-2xl">
                <div className="mb-6 flex justify-between items-end px-2">
                    <div>
                        <span className="text-sm font-medium text-blue-400 uppercase tracking-widest">Question {currentIndex + 1}</span>
                        <span className="text-sm text-white/40 ml-2">/ {totalQuestions}</span>
                    </div>
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-medium text-white/70 border border-white/10">
                        {currentQuestion.section}
                    </span>
                </div>

                <AnimatePresence mode='wait' custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl"
                    >
                        <h3 className="text-2xl md:text-3xl font-semibold leading-relaxed mb-8 text-white">
                            {currentQuestion.question}
                        </h3>

                        <div className="flex flex-col gap-3 mb-10">
                            {currentQuestion.options.map((option, index) => {
                                const isSelected = selectedAnswers[currentQuestion.id] === option;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionSelect(option)}
                                        className={`group relative p-5 rounded-2xl text-left border transition-all duration-200 
                                            ${isSelected
                                                ? 'bg-blue-600 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className={`text-lg transition-colors ${isSelected ? 'text-white font-medium' : 'text-white/80'}`}>
                                                {option}
                                            </span>
                                            {isSelected && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="bg-white text-blue-600 rounded-full p-1"
                                                >
                                                    <CheckCircle2 className="w-5 h-5" />
                                                </motion.div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-white/5">
                            <button
                                onClick={handleBack}
                                disabled={currentIndex === 0}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                                    ${currentIndex === 0
                                        ? 'opacity-30 cursor-not-allowed text-white/50'
                                        : 'hover:bg-white/10 text-white'}`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Back
                            </button>

                            {currentIndex === totalQuestions - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={!selectedAnswers[currentQuestion.id]}
                                    className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-400 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    Submit
                                    <CheckCircle2 className="w-5 h-5" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    disabled={!selectedAnswers[currentQuestion.id]}
                                    className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-white text-slate-900 shadow-lg hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    Next
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Questions;
