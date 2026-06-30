import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, RefreshCw, Cpu } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export default function AIAssistant() {
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Set initial welcome message depending on language
  useEffect(() => {
    const welcomeText = language === 'hi' 
      ? 'सिस्टम कनेक्टेड। नमस्कार। मैं इम्पैक्ट-बॉट v2.0 हूं, एक स्वचालित क्लीयरिंग-हाउस सहायता सहायक। मुझसे एनपीसीआई मैपिंग, बैंक सीडिंग विफलताओं, डीबीटी सहमति प्रोटोकॉल या पीएफएमएस स्थिति रिपोर्ट के बारे में प्रश्न पूछें।'
      : 'SYSTEM LINKED. Greetings. I am IMPACT-BOT v2.0, an automated clearing-house support assistant. Ask me questions about NPCI mapping, bank seeding failures, DBT consent protocols, or PFMS status reports.';
    setMessages([
      {
        sender: 'ai',
        text: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [language]);

  const presetQueries = language === 'hi' ? [
    'आधार सीडिंग और लिंकिंग में क्या अंतर है?',
    'मेरा पीएफएमएस ट्रांसफर क्यों विफल हुआ?',
    'मैं अपना बैंक खाता कैसे सीड करूं?',
    'एनपीसीआई मैपर क्या है?'
  ] : [
    'What is Aadhaar Seeding vs Linking?',
    'Why did my PFMS transfer fail?',
    'How do I seed my bank account?',
    'What is the NPCI mapper?'
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: Message = { sender: 'user', text: textToSend, timestamp };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI computing
    setTimeout(() => {
      setIsTyping(false);
      let reply = '';
      const query = textToSend.toLowerCase();

      if (language === 'hi') {
        if (query.includes('सीडिंग') || query.includes('लिंकिंग') || query.includes('अंतर')) {
          reply = 'आधार लिंकिंग केवल बैंक केवाईसी (पहचान) प्रक्रिया है। आधार सीडिंग आपके खाते को केंद्रीय भारतीय राष्ट्रीय भुगतान निगम (NPCI) रजिस्ट्री से जोड़ना है। डीबीटी ट्रांसफर केवल सीडेड खाते में ही भेजे जाते हैं। इसलिए, केवल लिंकिंग काफी नहीं है; सीडिंग अनिवार्य है।';
        } else if (query.includes('विफल') || query.includes('पीएफएमएस') || query.includes('ट्रांसफर')) {
          reply = 'भुगतान विफलता आमतौर पर पीएफएमएस त्रुटि C30 (आधार सीड नहीं है) या C32 (बैंक द्वारा डीबीटी सहमति बंद है) के कारण होती है। इसे ठीक करने के लिए, अपनी बैंक शाखा में जाएं, "डीबीटी / आधार सीडिंग फॉर्म" मांगें, और उनसे स्थिति को सक्रिय करने का अनुरोध करें।';
        } else if (query.includes('कैसे') || query.includes('चरण') || query.includes('तरीका')) {
          reply = 'खाते को सीड करने के लिए: 1. अपनी बैंक शाखा में जाएं। 2. "आधार सीडिंग और डीबीटी सहमति फॉर्म" जमा करें। 3. आधार की फोटोकॉपी प्रदान करें। 4. बैंक द्वारा इसे केंद्रीय एनपीसीआई क्लीयरिंग-हाउस मैपर पर अपलोड करने के लिए 48 घंटे प्रतीक्षा करें।';
        } else if (query.includes('एनपीसीआई') || query.includes('मैपर') || query.includes('जांच')) {
          reply = 'एनपीसीआई मैपर एक राष्ट्रीय डेटाबेस है जो नागरिक के आधार नंबर को उनके डीबीटी-सीडेड बैंक खाते से जोड़ता है। सरकारी एजेंसियां भुगतान से पहले इस मैपर से खाते का पता लगाती हैं।';
        } else if (query.includes('नमस्कार') || query.includes('नमस्ते') || query.includes('हेलो')) {
          reply = 'नमस्कार। सहायता केंद्र पूरी तरह चालू है। कृपया अपना प्रश्न पूछें।';
        } else {
          reply = 'प्रश्न दर्ज कर लिया गया है। कृपया ध्यान दें कि आपका आधार एनपीसीआई पर सीड होना, बैंक खाते का सक्रिय होना और पिछले 90 दिनों में कोई लेन-देन होना छात्रवृत्ति विफलता को 99% तक रोकता है।';
        }
      } else {
        if (query.includes('seeding') || query.includes('linking') || query.includes('difference')) {
          reply = 'Aadhaar Linking is purely a bank KYC (identity) process. Aadhaar Seeding is mapping your account on the central National Payments Corporation of India (NPCI) registry. DBT transfers ONLY route to the single seeded account. Thus, linking is not enough; seeding is mandatory.';
        } else if (query.includes('fail') || query.includes('pfms') || query.includes('reject')) {
          reply = 'Payment failure is usually due to PFMS Error C30 (Aadhaar not seeded) or C32 (DBT consent flag locked by bank branch). To remediate this, visit your branch, request the "DBT / Aadhaar Seeding Form", and ask the teller to set your APBS status flag to ACTIVE.';
        } else if (query.includes('how to seed') || query.includes('steps') || query.includes('form')) {
          reply = 'To seed your account: 1. Visit your bank branch. 2. Submit the physical "Aadhaar Seeding and DBT Consent Form". 3. Provide an Aadhaar photocopy. 4. Wait 48 hours for the bank to synchronize this state to the central NPCI clearing-house mapper.';
        } else if (query.includes('npci') || query.includes('mapper') || query.includes('check')) {
          reply = 'The NPCI Mapper is a national database that connects a citizen’s Aadhaar number with their single designated DBT-seeded bank account. Government agencies query this mapper automatically prior to any disbursement to obtain routing coordinates.';
        } else if (query.includes('hello') || query.includes('hi') || query.includes('greet')) {
          reply = 'Greetings. Support node is fully operational. Please specify your query regarding Direct Benefit Transfer or bank seeding procedures.';
        } else {
          reply = 'Query captured. While this falls outside basic parameters, note that ensuring your Aadhaar is seeded on NPCI, maintaining a positive bank account balance, and completing active transactions prevents 99% of scholarship disbursement rejections.';
        }
      }

      setMessages(prev => [...prev, {
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  const onPresetClick = (query: string) => {
    handleSend(query);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col h-[520px] shadow-sm">
      
      {/* Bot Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center text-xs font-sans">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-teal-50 border border-teal-100 rounded-xl text-teal-600">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <span className="text-slate-800 font-extrabold block text-sm font-sans">IMPACT-BOT v2.0</span>
            <span className="text-slate-500 text-[10px] font-medium font-sans">{t('bot_specialist_label') || 'DBT HELP DESK SPECIALIST AI'}</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-slate-400 font-sans font-bold">
          <Cpu className="w-4 h-4 text-teal-500 animate-pulse" />
          <span>{language === 'hi' ? 'सहायता एजेंट सक्रिय' : 'SUPPORT AGENT STABLE'}</span>
        </div>
      </div>

      {/* Chat Messages Panel */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 scrollbar-thin">
        {messages.map((msg, i) => {
          const isAi = msg.sender === 'ai';
          return (
            <div
              key={i}
              className={`flex items-start gap-2.5 max-w-[85%] ${
                isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'
              }`}
            >
              <div className={`p-2 rounded-xl border shrink-0 ${
                isAi 
                  ? 'border-slate-200 bg-white text-slate-500 shadow-sm' 
                  : 'border-blue-400 bg-blue-600 text-white shadow-sm'
              }`}>
                {isAi ? <Cpu className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              </div>

              <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                isAi 
                  ? 'bg-white border border-slate-200 text-slate-700 font-sans shadow-sm' 
                  : 'bg-blue-500 text-white font-sans shadow-sm'
              }`}>
                <p className="font-sans font-medium">{msg.text}</p>
                <span className={`text-[8px] block mt-1.5 text-right font-sans ${
                  isAi ? 'text-slate-400' : 'text-blue-100'
                }`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2.5 mr-auto animate-pulse">
            <div className="p-2 border border-slate-200 bg-white text-slate-500 rounded-xl shrink-0">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-2xl text-xs text-slate-500 font-sans shadow-sm">
              {language === 'hi' ? 'सिस्टम राउटिंग निर्देशों का विश्लेषण कर रहा है...' : 'Analyzing system routing directives...'}
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Preset Queries Area */}
      <div className="bg-slate-50 border-t border-slate-200/60 p-3">
        <span className="text-[9px] font-bold text-slate-400 tracking-wider block mb-2 uppercase font-sans">{language === 'hi' ? 'त्वरित प्रश्न' : 'INTELLIGENT PRESETS'}</span>
        <div className="flex flex-wrap gap-2">
          {presetQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onPresetClick(q)}
              className="text-[10px] font-sans border border-slate-200 hover:border-teal-500 bg-white text-slate-600 hover:text-teal-700 hover:bg-teal-50 px-3 py-1.5 rounded-full cursor-pointer transition-all shadow-sm font-semibold"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input box */}
      <div className="bg-white border-t border-slate-200 p-3 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend(inputText);
          }}
          placeholder={language === 'hi' ? 'क्लीयरिंग हाउस ज्ञानकोष से प्रश्न पूछें...' : 'Query clearing house knowledge...'}
          className="flex-1 bg-slate-50 border border-slate-200 focus:border-teal-500 text-slate-800 font-sans text-xs px-3.5 py-3 rounded-xl outline-none"
        />
        <button
          onClick={() => handleSend(inputText)}
          className="bg-teal-500 hover:bg-[#003366] text-white p-3 rounded-xl transition-all cursor-pointer shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
