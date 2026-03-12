/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, 
  Monitor, 
  Cpu, 
  Shield, 
  ChevronRight, 
  Command as CommandIcon, 
  AlertTriangle,
  Menu,
  X,
  Search,
  Calendar,
  Layers,
  Code,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_MODULES } from './data/sessions';
import { Session, Module } from './types';
import { COURSE_CONFIG } from './config';

export default function App() {
  useEffect(() => {
    document.title = COURSE_CONFIG.appName;
  }, []);

  const [activeSession, setActiveSession] = useState<Session>(ALL_MODULES[0].sessions[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedSessions, setCompletedSessions] = useState<Set<string>>(new Set());
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({});
  const [submittedQuizzes, setSubmittedQuizzes] = useState<Set<number>>(new Set());

  const handleSessionChange = (session: Session) => {
    setActiveSession(session);
    setSelectedOptions({});
    setSubmittedQuizzes(new Set());
  };

  const toggleCompletion = (sessionId: string) => {
    setCompletedSessions(prev => {
      const next = new Set(prev);
      if (next.has(sessionId)) {
        next.delete(sessionId);
      } else {
        next.add(sessionId);
      }
      return next;
    });
  };

  const totalSessions = useMemo(() => ALL_MODULES.reduce((acc, mod) => acc + mod.sessions.length, 0), []);
  const progressPercentage = Math.round((completedSessions.size / totalSessions) * 100);

  const filteredModules = useMemo(() => {
    if (!searchQuery) return ALL_MODULES;
    return ALL_MODULES.map(module => ({
      ...module,
      sessions: module.sessions.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(module => module.sessions.length > 0);
  }, [searchQuery]);

  const handleShare = async () => {
    const shareData = {
      title: COURSE_CONFIG.appName,
      text: `Cùng học ${COURSE_CONFIG.appName} với mình nhé!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Đã sao chép đường dẫn vào clipboard!');
      }
    } catch (err) {
      console.error('Lỗi khi chia sẻ:', err);
    }
  };

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-[#E0E0E0] font-mono overflow-hidden relative">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed lg:relative w-80 h-full border-r border-[#1F1F1F] bg-[#0F0F0F] flex flex-col z-40 lg:z-20"
          >
            <div className="p-6 border-b border-[#1F1F1F] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: COURSE_CONFIG.themeColor }}>
                  <COURSE_CONFIG.appIcon size={20} className="text-black" />
                </div>
                <h1 className="font-bold text-sm tracking-tighter uppercase">{COURSE_CONFIG.appName}</h1>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 border-b border-[#1F1F1F]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                <input 
                  type="text"
                  placeholder={COURSE_CONFIG.labels.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black border border-[#1F1F1F] rounded-md py-2 pl-9 pr-4 text-xs focus:outline-none transition-colors"
                  style={{ '--tw-ring-color': COURSE_CONFIG.themeColor, outlineColor: COURSE_CONFIG.themeColor } as React.CSSProperties}
                />
              </div>
            </div>

            <nav className="flex-1 overflow-y-auto p-2 space-y-4 custom-scrollbar">
              {filteredModules.map((module) => (
                <div key={module.id} className="space-y-1">
                  <div className="px-3 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Layers size={12} />
                    {module.title}
                  </div>
                  <div className="space-y-0.5">
                    {module.sessions.map((session) => (
                      <button 
                        key={session.id}
                        onClick={() => handleSessionChange(session)}
                        className={`w-full flex items-center gap-3 p-2.5 rounded text-left transition-all ${
                          activeSession.id === session.id 
                            ? 'bg-white/5 border-l-2' 
                            : 'hover:bg-[#1A1A1A] text-gray-400 border-l-2 border-transparent'
                        }`}
                        style={activeSession.id === session.id ? { color: COURSE_CONFIG.themeColor, borderColor: COURSE_CONFIG.themeColor } : {}}
                      >
                        <div className={`w-8 h-8 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          activeSession.id === session.id ? 'text-black' : 'bg-[#1F1F1F] text-gray-500'
                        }`}
                        style={activeSession.id === session.id ? { backgroundColor: COURSE_CONFIG.themeColor } : {}}
                        >
                          {session.day}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-bold truncate">{session.title}</div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[9px] opacity-60 flex items-center gap-1">
                              {COURSE_CONFIG.getCategoryIcon(session.category)}
                              {session.category}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            <div className="p-4 border-t border-[#1F1F1F] bg-[#0A0A0A]">
              <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-widest mb-2">
                <span>{COURSE_CONFIG.labels.progress}</span>
                <span>{progressPercentage}%</span>
              </div>
              <div className="w-full h-1 bg-[#1F1F1F] rounded-full overflow-hidden">
                <div className="h-full transition-all duration-500" style={{ width: `${progressPercentage}%`, backgroundColor: COURSE_CONFIG.themeColor }} />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-[#1F1F1F] bg-[#0F0F0F]/80 backdrop-blur flex items-center px-4 md:px-6 justify-between shrink-0">
          <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
            {!isSidebarOpen && (
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-[#1F1F1F] rounded shrink-0" style={{ color: COURSE_CONFIG.themeColor }}>
                <Menu size={20} />
              </button>
            )}
            <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-400 overflow-hidden">
              <Calendar size={14} className="shrink-0 hidden xs:block" />
              <span className="font-bold shrink-0" style={{ color: COURSE_CONFIG.themeColor }}>{COURSE_CONFIG.labels.sessionPrefix} {activeSession.day}</span>
              <ChevronRight size={14} className="shrink-0" />
              <span className="truncate">{activeSession.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <button 
              onClick={handleShare}
              className="hidden sm:block px-3 py-1.5 bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#333] rounded text-[10px] font-bold uppercase tracking-widest transition-all"
            >
              {COURSE_CONFIG.labels.actionButton}
            </button>
            <div className="hidden sm:block w-px h-4 bg-[#1F1F1F]" />
            <div className="flex items-center gap-2 px-2 md:px-3 py-1 bg-[#1F1F1F] rounded-full">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full" style={{ backgroundColor: COURSE_CONFIG.themeColor }} />
              <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-gray-400">{COURSE_CONFIG.labels.status}</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 md:space-y-12 custom-scrollbar">
          <motion.div 
            key={activeSession.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8 md:space-y-12"
          >
            {/* Hero Section */}
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest" style={{ color: COURSE_CONFIG.themeColor, borderColor: `${COURSE_CONFIG.themeColor}33`, backgroundColor: `${COURSE_CONFIG.themeColor}1A` }}>
                {COURSE_CONFIG.getCategoryIcon(activeSession.category)}
                {activeSession.category}
              </div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-white leading-tight">
                {activeSession.day}. {activeSession.title}
              </h2>
              <p className="text-sm md:text-lg text-gray-400 leading-relaxed max-w-2xl">
                {activeSession.description}
              </p>
            </div>

            {/* Main Content Body */}
            <div className="prose prose-invert prose-sm max-w-none">
              <div className="p-4 md:p-6 bg-[#151515] border border-[#1F1F1F] rounded-xl text-gray-300 text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
                {activeSession.content}
              </div>
            </div>

            {/* Commands */}
            {activeSession.commands && activeSession.commands.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3" style={{ color: COURSE_CONFIG.themeColor }}>
                  <CommandIcon size={20} />
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em]">{COURSE_CONFIG.labels.commands}</h3>
                </div>
                <div className="grid gap-4">
                  {activeSession.commands.map((cmd, idx) => (
                    <div key={idx} className="group bg-[#0F0F0F] border border-[#1F1F1F] rounded-lg overflow-hidden transition-all" style={{ '--tw-border-opacity': 0.3 } as React.CSSProperties}>
                      <div className="p-3 bg-[#151515] border-b border-[#1F1F1F] flex justify-between items-center">
                        <span className="text-xs font-bold" style={{ color: COURSE_CONFIG.themeColor }}>{cmd.name}</span>
                        <span className="text-[10px] text-gray-500 italic">{cmd.description}</span>
                      </div>
                      <div className="p-5 bg-black font-mono text-sm text-gray-300 relative">
                        <code className="block">$ {cmd.usage}</code>
                        <button 
                          onClick={() => navigator.clipboard.writeText(cmd.usage)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 bg-[#1F1F1F] rounded transition-all"
                          style={{ color: COURSE_CONFIG.themeColor }}
                        >
                          <Code size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exercises */}
            {activeSession.exercises && activeSession.exercises.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-yellow-500">
                  <Shield size={20} />
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em]">{COURSE_CONFIG.labels.exercises}</h3>
                </div>
                {activeSession.exercises.map((ex, idx) => (
                  <div key={idx} className="bg-[#151515] border border-yellow-900/20 rounded-2xl p-4 md:p-8 space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-lg md:text-xl font-bold text-white">{ex.title}</h4>
                      <p className="text-xs md:text-sm text-gray-400">{ex.description}</p>
                    </div>
                    <div className="grid gap-3">
                      {ex.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-black/40 rounded-xl border border-white/5 group transition-all">
                          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#1F1F1F] group-hover:text-black flex items-center justify-center text-[9px] md:text-[10px] font-bold shrink-0 transition-all"
                               style={{ '--tw-bg-opacity': 1 } as React.CSSProperties}
                               onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COURSE_CONFIG.themeColor}
                               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1F1F1F'}
                          >
                            {sIdx + 1}
                          </div>
                          <span className="text-xs md:text-sm text-gray-300 leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => toggleCompletion(activeSession.id)}
                      className={`w-full py-4 border rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all`}
                      style={completedSessions.has(activeSession.id) 
                        ? { backgroundColor: COURSE_CONFIG.themeColor, color: 'black', borderColor: COURSE_CONFIG.themeColor }
                        : { backgroundColor: `${COURSE_CONFIG.themeColor}0D`, color: COURSE_CONFIG.themeColor, borderColor: `${COURSE_CONFIG.themeColor}33` }
                      }
                    >
                      {completedSessions.has(activeSession.id) ? COURSE_CONFIG.labels.exerciseCompleted : COURSE_CONFIG.labels.exerciseComplete}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Quizzes */}
            {activeSession.quizzes && activeSession.quizzes.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-purple-500">
                  <HelpCircle size={20} />
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em]">{COURSE_CONFIG.labels.quizzes}</h3>
                </div>
                {activeSession.quizzes.map((quiz, qIdx) => {
                  const isSubmitted = submittedQuizzes.has(qIdx);
                  const selectedOptionId = selectedOptions[qIdx];
                  const selectedOption = quiz.options.find(o => o.id === selectedOptionId);
                  const isCorrect = selectedOption?.isCorrect;

                  return (
                    <div key={qIdx} className="bg-[#151515] border border-purple-900/20 rounded-2xl p-4 md:p-8 space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-lg md:text-xl font-bold text-white">{quiz.question}</h4>
                      </div>
                      <div className="grid gap-3">
                        {quiz.options.map((option) => {
                          let optionStyle = "bg-black/40 border-white/5 hover:border-purple-500/30";
                          if (isSubmitted) {
                            if (option.isCorrect) {
                              optionStyle = "bg-green-500/10 border-green-500/50 text-green-400";
                            } else if (selectedOptionId === option.id) {
                              optionStyle = "bg-red-500/10 border-red-500/50 text-red-400";
                            } else {
                              optionStyle = "bg-black/40 border-white/5 opacity-50";
                            }
                          } else if (selectedOptionId === option.id) {
                            optionStyle = "bg-purple-500/10 border-purple-500/50 text-purple-400";
                          }

                          return (
                            <button
                              key={option.id}
                              disabled={isSubmitted}
                              onClick={() => setSelectedOptions(prev => ({ ...prev, [qIdx]: option.id }))}
                              className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${optionStyle}`}
                            >
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 border ${
                                selectedOptionId === option.id ? 'border-current' : 'border-white/10'
                              }`}>
                                {option.id}
                              </div>
                              <span className="text-sm leading-relaxed">{option.text}</span>
                              {isSubmitted && option.isCorrect && (
                                <CheckCircle2 size={16} className="ml-auto text-green-500" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                      
                      {!isSubmitted ? (
                        <button
                          disabled={!selectedOptionId}
                          onClick={() => setSubmittedQuizzes(prev => new Set(prev).add(qIdx))}
                          className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 text-white rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all"
                        >
                          {COURSE_CONFIG.labels.quizCheck}
                        </button>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-xl text-sm ${isCorrect ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}
                        >
                          <div className="font-bold mb-1">
                            {isCorrect ? COURSE_CONFIG.labels.quizCorrect : COURSE_CONFIG.labels.quizIncorrect}
                          </div>
                          {quiz.explanation && (
                            <div className="text-gray-400 text-xs mt-2 leading-relaxed">
                              {quiz.explanation}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Warning Footer */}
            {COURSE_CONFIG.warning.enabled && (
              <div className="p-6 bg-red-950/10 border border-red-900/20 rounded-2xl flex gap-4 items-start">
                <AlertTriangle size={24} className="text-red-500 shrink-0" />
                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-red-500 uppercase tracking-widest">{COURSE_CONFIG.warning.title}</h5>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    {COURSE_CONFIG.warning.message}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
