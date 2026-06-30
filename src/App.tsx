import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DBTComparison from './components/DBTComparison';
import NPCIMapping from './components/NPCIMapping';
import ScholarshipList from './components/ScholarshipList';
import ScholarshipTracker from './components/ScholarshipTracker';
import AIAssistant from './components/AIAssistant';
import NewsAndReports from './components/NewsAndReports';
import SupportForm from './components/SupportForm';
import Footer from './components/Footer';
import { FAQS } from './data';
import { 
  ArrowRight, CheckSquare, Square, Terminal, 
  ChevronDown, ChevronUp, AlertCircle, FileText, 
  Settings, Award, Sparkles, Network 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from './LanguageContext';

const HINDI_FAQS: Record<string, { id: string; question: string; answer: string; category: string }> = {
  "faq-1": {
    id: "faq-1",
    question: "आधार लिंकिंग और आधार सीडिंग में क्या अंतर है?",
    answer: "आधार लिंकिंग एक बैंक-स्तरीय प्रक्रिया है जहां आपका आधार केवल पहचान सत्यापन (KYC) के लिए सहेजा जाता है। आधार सीडिंग एक केंद्रीय प्रक्रिया है जहां बैंक आपके आधार को भारतीय राष्ट्रीय भुगतान निगम (NPCI) मैपर से जोड़ता है। सरकारी डीबीटी छात्रवृत्ति आधार भुगतान प्रणाली (APBS) के माध्यम से भेजी जाती है जो केवल आपके एनपीसीआई-सीडेड खाते में ही पैसा भेजती है, न कि किसी भी सामान्य जुड़े हुए खाते में।",
    category: "डीबीटी"
  },
  "faq-2": {
    id: "faq-2",
    question: "क्या मैं एक से अधिक बैंक खातों में आधार सीड करवा सकता हूँ?",
    answer: "नहीं। जबकि आपका आधार कई बैंक खातों में केवाईसी के लिए लिंक हो सकता है, लेकिन यह डीबीटी के लिए किसी भी समय केवल एक ही खाते में सीड किया जा सकता है। यदि आप नए बैंक में सीडिंग फॉर्म जमा करते हैं, तो आपकी मैपिंग पुराने बैंक से नए बैंक में स्थानांतरित हो जाएगी।",
    category: "एनपीसीआई"
  },
  "faq-3": {
    id: "faq-3",
    question: "मैं अपनी वर्तमान एनपीसीआई मैपर स्थिति की जांच कैसे करूं?",
    answer: "आप इसे यूआईडीएआई पोर्टल पर 'आधार/बैंक लिंकिंग स्थिति जांचें' के तहत देख सकते हैं, या सुरक्षित जांच के लिए हमारे पोर्टल पर उपलब्ध एनपीसीआई मैपिंग मॉड्यूल का उपयोग कर सकते हैं।",
    category: "एनपीसीआई"
  },
  "faq-4": {
    id: "faq-4",
    question: "मेरा आधार बैंक से लिंक होने के बावजूद छात्रवृत्ति का पैसा क्यों नहीं आया?",
    answer: "यह सबसे आम समस्या है। संभवतः आपका आधार केवाईसी के लिए बैंक से जुड़ा हुआ है, लेकिन या तो (1) बैंक ने इसे केंद्रीय एनपीसीआई मैपर डेटाबेस में सीड नहीं किया है, या (2) आपके खाते में डीबीटी का विकल्प बंद है, या (3) आपका सीडेड खाता ९०+ दिनों से निष्क्रिय है।",
    category: "आधार"
  },
  "faq-5": {
    id: "faq-5",
    question: "मुझे अपने खाते में डीबीटी सक्षम करने के लिए क्या कदम उठाने चाहिए?",
    answer: "1. अपनी बैंक शाखा में खुद जाएं। 2. 'आधार सीडिंग और डीबीटी सहमति फॉर्म' मांगें। 3. फॉर्म भरें और डीबीटी सहमति वाले बॉक्स को टिक करें। 4. सुनिश्चित करें कि बैंक इसे एनपीसीआई पोर्टल पर अपलोड कर दे, जो आमतौर पर 48-72 घंटों में अपडेट हो जाता है।",
    category: "डीबीटी"
  },
  "faq-6": {
    id: "faq-6",
    question: "क्या एनपीसीआई स्थिति जांचने से मेरे बैंक बैलेंस या क्रेडिट स्कोर पर कोई असर पड़ता है?",
    answer: "नहीं, एनपीसीआई मैपिंग स्थिति पूछताछ पूरी तरह सुरक्षित और केवल पढ़ने योग्य अनुरोध हैं। ये केवल सत्यापन के लिए मुख्य मैपर डेटाबेस से जानकारी प्राप्त करते हैं।",
    category: "सामान्य"
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const { language, t } = useLanguage();

  // Home interactive checklist states
  const [checklist, setChecklist] = useState({
    aadhaarValid: false,
    bankLinked: false,
    seedingConsent: false,
    activeAccount: false,
    incomeCert: false,
  });

  const toggleChecklist = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const checklistScore = Object.values(checklist).filter(Boolean).length;

  const getFaqItem = (faq: typeof FAQS[0]) => {
    if (language === 'hi' && HINDI_FAQS[faq.id]) {
      return HINDI_FAQS[faq.id];
    }
    return faq;
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return renderHome();
      case 'learn':
        return <DBTComparison />;
      case 'scholarships':
        return <ScholarshipList />;
      case 'npci':
        return <NPCIMapping />;
      case 'tracker':
        return <ScholarshipTracker />;
      case 'news':
        return <NewsAndReports />;
      case 'help':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div className="border border-[#06b6d4]/30 bg-[#071324]/85 p-5 rounded-lg">
                <span className="text-[9px] font-mono text-[#06b6d4] block uppercase">{t('checklist_subtitle')}</span>
                <h3 className="text-lg font-bold text-white mb-2">{t('faq_engine_title')}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {t('faq_engine_desc')}
                </p>
              </div>
              <AIAssistant />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="border border-[#06b6d4]/20 bg-[#0a0f1d]/90 p-5 rounded-xl">
                <h3 className="text-sm font-bold text-white uppercase font-mono pb-2 border-b border-[#06b6d4]/10 mb-4">
                  {t('contact_helpline')}
                </h3>
                <div className="space-y-4 text-xs font-mono">
                  <div className="p-3.5 bg-[#050b14] border border-[#06b6d4]/10 rounded">
                    <span className="text-gray-500 text-[9px] block">{t('nsp_number')}</span>
                    <span className="text-white text-sm font-semibold">0120-6619540</span>
                  </div>
                  <div className="p-3.5 bg-[#050b14] border border-[#06b6d4]/10 rounded">
                    <span className="text-gray-500 text-[9px] block">{t('uidai_number')}</span>
                    <span className="text-white text-sm font-semibold">1947 (Toll-Free)</span>
                  </div>
                </div>
              </div>
              <SupportForm />
            </div>
          </div>
        );
      default:
        return renderHome();
    }
  };

  const renderHome = () => {
    return (
      <div className="space-y-12">
        
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-[#004a8d] to-[#003366] p-8 md:p-12 rounded-3xl overflow-hidden shadow-xl text-white">
          {/* Tricolor border indicator on top */}
          <div className="absolute top-0 left-0 w-full h-1.5 flex">
            <div className="w-1/3 h-full bg-[#f97316]"></div>
            <div className="w-1/3 h-full bg-white"></div>
            <div className="w-1/3 h-full bg-[#22c55e]"></div>
          </div>

          <div className="absolute top-0 right-0 text-[10px] font-mono bg-white/10 text-white border-b border-l border-white/20 px-3 py-1.5 rounded-bl">
            DBT DIRECT BRIDGE v2026 // LIVE
          </div>

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-800/60 border border-blue-400/30 text-blue-100 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider">
              <Network className="w-3.5 h-3.5 text-teal-400" />
              <span>{t('hero_badge')}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              {t('hero_title_p1')}<br/>
              <span className="text-teal-300">
                {t('hero_title_p2')}
              </span>
            </h1>

            <p className="text-blue-100 text-sm md:text-base max-w-2xl leading-relaxed font-sans">
              {t('hero_desc')}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 font-semibold text-xs">
              <button
                onClick={() => setCurrentPage('learn')}
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl cursor-pointer transition-colors flex items-center gap-2 shadow-md"
              >
                <span>{t('hero_btn_learn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPage('npci')}
                className="px-6 py-3 bg-blue-800/50 backdrop-blur-sm border border-blue-400/30 text-white rounded-xl cursor-pointer transition-colors hover:bg-blue-800/80 flex items-center gap-2"
              >
                <span>{t('hero_btn_check')}</span>
                <Terminal className="w-4 h-4 text-teal-300" />
              </button>
            </div>
          </div>

          {/* Abstract SVG wireframe vector graphic representing the digital bridge */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 hidden lg:block pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ffffff" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="#ffffff" strokeWidth="1" />
              <line x1="100" y1="20" x2="100" y2="180" stroke="#ffffff" strokeWidth="0.5" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="#ffffff" strokeWidth="0.5" />
            </svg>
          </div>
        </div>

        {/* Feature Bento-Box Grid */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-2 pb-3 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-bold text-teal-600 tracking-wider block uppercase">{t('bento_subtitle')}</span>
              <h2 className="text-2xl font-display font-extrabold text-slate-800 tracking-tight">{t('bento_title')}</h2>
            </div>
            <span className="text-xs font-semibold text-slate-400">{t('bento_select')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-semibold text-xs">
            
            {/* Box 1: Learn about Seeding */}
            <div 
              onClick={() => setCurrentPage('learn')}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition-all space-y-4 group relative"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-bold">MODULE 01</span>
              </div>
              <div className="w-12 h-12 bg-teal-50 border border-teal-100 rounded-2xl flex items-center justify-center text-teal-600 group-hover:bg-teal-100 group-hover:text-teal-700 transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <div className="pt-2">
                <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-900 transition-colors">{t('bento_card1_title')}</h3>
                <p className="text-slate-500 text-xs font-normal leading-relaxed mt-1 font-sans">
                  {t('bento_card1_desc')}
                </p>
              </div>
            </div>

            {/* Box 2: NPCI Mapping Status */}
            <div 
              onClick={() => setCurrentPage('npci')}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition-all space-y-4 group relative"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-bold">MODULE 02</span>
              </div>
              <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                <Settings className="w-5 h-5" />
              </div>
              <div className="pt-2">
                <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-900 transition-colors">{t('bento_card2_title')}</h3>
                <p className="text-slate-500 text-xs font-normal leading-relaxed mt-1 font-sans">
                  {t('bento_card2_desc')}
                </p>
              </div>
            </div>

            {/* Box 3: Scholarship tracker */}
            <div 
              onClick={() => setCurrentPage('tracker')}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition-all space-y-4 group relative"
            >
              <div className="absolute top-4 right-4">
                <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-bold">MODULE 03</span>
              </div>
              <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center text-orange-600 group-hover:bg-orange-100 group-hover:text-orange-700 transition-colors">
                <Award className="w-5 h-5" />
              </div>
              <div className="pt-2">
                <h3 className="text-base font-bold text-slate-800 group-hover:text-blue-900 transition-colors">{t('bento_card3_title')}</h3>
                <p className="text-slate-500 text-xs font-normal leading-relaxed mt-1 font-sans">
                  {t('bento_card3_desc')}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Scholarship Readiness Checklist & Step-by-Step process */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Timeline Process */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <span className="text-[10px] font-bold text-teal-600 tracking-wider block uppercase">{t('timeline_subtitle')}</span>
              <h3 className="text-lg font-display font-extrabold text-slate-800">{t('timeline_title')}</h3>
            </div>

            <div className="relative text-xs text-slate-600 space-y-6 pl-6 border-l border-slate-200">
              
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-[29px] top-0 w-3.5 h-3.5 bg-white border-2 border-teal-500 rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                </div>
                <h4 className="font-bold text-slate-800 uppercase text-[11px]">{t('timeline_p1_title')}</h4>
                <p className="text-slate-500 text-[11px] font-normal mt-1 leading-relaxed">
                  {t('timeline_p1_desc')}
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-[29px] top-0 w-3.5 h-3.5 bg-white border-2 border-teal-500 rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                </div>
                <h4 className="font-bold text-slate-800 uppercase text-[11px]">{t('timeline_p2_title')}</h4>
                <p className="text-slate-500 text-[11px] font-normal mt-1 leading-relaxed">
                  {t('timeline_p2_desc')}
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-[29px] top-0 w-3.5 h-3.5 bg-white border-2 border-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
                </div>
                <h4 className="font-bold text-slate-800 uppercase text-[11px] flex items-center gap-1.5">
                  <span>{t('timeline_p3_title')}</span>
                  <span className="text-[9px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded font-bold border border-orange-100 uppercase">{t('critical_label')}</span>
                </h4>
                <p className="text-slate-500 text-[11px] font-normal mt-1 leading-relaxed">
                  {t('timeline_p3_desc')}
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="absolute -left-[29px] top-0 w-3.5 h-3.5 bg-white border-2 border-emerald-500 rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                </div>
                <h4 className="font-bold text-slate-800 uppercase text-[11px]">{t('timeline_p4_title')}</h4>
                <p className="text-slate-500 text-[11px] font-normal mt-1 leading-relaxed">
                  {t('timeline_p4_desc')}
                </p>
              </div>

            </div>
          </div>

          {/* Interactive Readiness Checklist */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-200 pb-4 flex justify-between items-baseline">
              <div>
                <span className="text-[10px] font-bold text-blue-600 tracking-wider block uppercase">{t('checklist_subtitle')}</span>
                <h3 className="text-lg font-display font-extrabold text-slate-800">{t('checklist_title')}</h3>
              </div>
              <span className="text-xs font-bold text-slate-500">{t('checklist_score')}: {checklistScore}/5</span>
            </div>

            <p className="text-slate-500 text-xs font-normal leading-relaxed">
              {t('checklist_desc')}
            </p>

            <div className="space-y-3 text-xs">
              
              {/* Check 1 */}
              <div 
                onClick={() => toggleChecklist('aadhaarValid')}
                className="flex items-center justify-between p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-100/80 rounded-2xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3 pr-4">
                  {checklist.aadhaarValid ? (
                    <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 shrink-0" />
                  )}
                  <div>
                    <span className="text-slate-800 font-bold block">{t('checklist_item1')}</span>
                    <p className="text-[10px] text-slate-500 font-normal mt-0.5">{t('checklist_item1_sub')}</p>
                  </div>
                </div>
              </div>

              {/* Check 2 */}
              <div 
                onClick={() => toggleChecklist('bankLinked')}
                className="flex items-center justify-between p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-100/80 rounded-2xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3 pr-4">
                  {checklist.bankLinked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 shrink-0" />
                  )}
                  <div>
                    <span className="text-slate-800 font-bold block">{t('checklist_item2')}</span>
                    <p className="text-[10px] text-slate-500 font-normal mt-0.5">{t('checklist_item2_sub')}</p>
                  </div>
                </div>
              </div>

              {/* Check 3 */}
              <div 
                onClick={() => toggleChecklist('seedingConsent')}
                className="flex items-center justify-between p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-100/80 rounded-2xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3 pr-4">
                  {checklist.seedingConsent ? (
                    <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 shrink-0" />
                  )}
                  <div>
                    <span className="text-slate-800 font-bold block">{t('checklist_item3')}</span>
                    <p className="text-[10px] text-slate-500 font-normal mt-0.5">{t('checklist_item3_sub')}</p>
                  </div>
                </div>
              </div>

              {/* Check 4 */}
              <div 
                onClick={() => toggleChecklist('activeAccount')}
                className="flex items-center justify-between p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-100/80 rounded-2xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3 pr-4">
                  {checklist.activeAccount ? (
                    <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 shrink-0" />
                  )}
                  <div>
                    <span className="text-slate-800 font-bold block">{t('checklist_item4')}</span>
                    <p className="text-[10px] text-slate-500 font-normal mt-0.5">{t('checklist_item4_sub')}</p>
                  </div>
                </div>
              </div>

              {/* Check 5 */}
              <div 
                onClick={() => toggleChecklist('incomeCert')}
                className="flex items-center justify-between p-3.5 border border-slate-100 bg-slate-50 hover:bg-slate-100/80 rounded-2xl cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3 pr-4">
                  {checklist.incomeCert ? (
                    <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300 shrink-0" />
                  )}
                  <div>
                    <span className="text-slate-800 font-bold block">{t('checklist_item5')}</span>
                    <p className="text-[10px] text-slate-500 font-normal mt-0.5">{t('checklist_item5_sub')}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Score rating alerts */}
            <div className="pt-2">
              {checklistScore === 5 ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-800">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">{t('score_excel')}</span>
                </div>
              ) : checklistScore >= 3 ? (
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-center gap-2.5 text-xs text-orange-800">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  <span className="font-bold">{t('score_warn')}</span>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-2.5 text-xs text-red-800">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="font-bold">{t('score_alert')}</span>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4 flex justify-between items-baseline">
            <div>
              <span className="text-[10px] font-bold text-teal-600 tracking-wider block uppercase">{t('faq_subtitle')}</span>
              <h3 className="text-lg font-display font-extrabold text-slate-800">{t('faq_title')}</h3>
            </div>
            <span className="text-xs font-bold text-slate-400">{t('faq_loaded')}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((faq) => {
              const isOpen = activeFaq === faq.id;
              const translatedFaq = getFaqItem(faq);
              return (
                <div 
                  key={faq.id}
                  className="border border-slate-100 bg-slate-50 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full p-4 text-left flex justify-between items-start gap-4 cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        {translatedFaq.category}
                      </span>
                      <h4 className="text-xs font-sans font-bold text-slate-800 leading-snug">{translatedFaq.question}</h4>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-teal-600 mt-1 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="p-4 pt-0 border-t border-slate-200 text-xs text-slate-600 font-sans leading-relaxed bg-slate-50">
                          {translatedFaq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  };


  return (
    <div className="min-h-screen bg-[#f0f4f8] relative selection:bg-teal-500 selection:text-white">
      {/* Tricolor strip */}
      <div className="h-1 bg-gradient-to-r from-[#f97316] via-white to-[#22c55e] shadow-sm"></div>

      {/* Navigation */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
