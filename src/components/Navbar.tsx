import React, { useState } from 'react';
import { Menu, X, Cpu, Terminal as TerminalIcon } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { id: 'home', label: 'nav_home' },
    { id: 'learn', label: 'nav_learn' },
    { id: 'scholarships', label: 'nav_scholarships' },
    { id: 'npci', label: 'nav_npci' },
    { id: 'tracker', label: 'nav_tracker' },
    { id: 'news', label: 'nav_news' },
    { id: 'help', label: 'nav_help' },
  ];

  const externalLinks = [
    { name: 'UIDAI', url: 'https://uidai.gov.in' },
    { name: 'DBT Portal', url: 'https://dbtbharat.gov.in' },
    { name: 'National Scholarship Portal', url: 'https://scholarships.gov.in' },
  ];

  return (
    <nav className="bg-[#003366] text-white sticky top-0 z-50 shadow-md transition-all">
      {/* Status Banner */}
      <div className="bg-[#002244] text-[10px] font-mono py-1.5 px-6 border-b border-blue-900/40 flex justify-between items-center text-blue-200 tracking-wider">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse"></span>
          <span>ImpactScholar Portal 2026 | National Informatics Centre</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>Secure PFMS Link | APBS Active</span>
          <span className="bg-blue-800 text-[9px] px-2 py-0.5 rounded uppercase font-bold text-blue-200">{t('official')}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          
          {/* Left Side: Hamburger & Brand Logo */}
          <div className="flex items-center gap-3">
            {/* Hamburger Button - Always visible as requested */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-cyan-400 hover:text-pink-500 hover:bg-blue-900 rounded-lg border border-cyan-500/50 cursor-pointer flex items-center gap-1.5 transition-all font-mono text-xs uppercase"
            >
              {isOpen ? <X className="w-4 h-4 text-pink-500" /> : <Menu className="w-4 h-4 text-cyan-400" />}
              <span className="hidden sm:inline-block tracking-wider font-extrabold">{isOpen ? 'CLOSE' : 'MENU'}</span>
            </button>

            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md shrink-0">
                <div className="w-6 h-6 border-4 border-[#003366] border-t-orange-500 border-b-green-600 rounded-full"></div>
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="bg-blue-800 text-[9px] px-2 py-0.5 rounded uppercase font-bold text-blue-200">
                    {t('portal_2026')}
                  </span>
                </div>
                <span className="text-xl font-bold tracking-tight text-white leading-tight font-display">
                  ImpactScholar
                </span>
              </div>
            </div>
          </div>

          {/* Desktop inline navigation is hidden to always route through the Menu Button */}
          <div className="hidden">
            {/* Kept hidden to fully transfer all navigation into the central menu dropdown */}
          </div>

          {/* Right Side: Action Button & Language Switcher */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentPage('npci')}
              className="hidden md:flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-sm"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{t('nav_verify_npci')}</span>
            </button>

            {/* Dual Language Switcher Toggle */}
            <div className="flex items-center border border-blue-800 rounded-xl bg-blue-950/40 p-1 overflow-hidden shadow-sm">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold tracking-wide transition-all uppercase cursor-pointer ${
                  language === 'en'
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold tracking-wide transition-all uppercase cursor-pointer ${
                  language === 'hi'
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'text-blue-200 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Menu Dropdown - Available on all screen sizes */}
      {isOpen && (
        <div className="border-t border-blue-900 bg-[#003366]/95 backdrop-blur-md shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Navigation Items Link List */}
              <div className="space-y-1">
                <span className="text-[10px] text-blue-300 font-bold tracking-wider block mb-2 uppercase">{t('system_core_map') || 'SYSTEM MAP'}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {navItems.map((item) => {
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setCurrentPage(item.id);
                          setIsOpen(false);
                        }}
                        className={`text-left px-4 py-3 rounded-xl text-xs uppercase tracking-wide flex justify-between items-center transition-all cursor-pointer ${
                          isActive 
                            ? 'bg-teal-500/10 text-teal-300 font-extrabold border-l-4 border-teal-400' 
                            : 'text-blue-200 hover:text-white hover:bg-blue-900/50 border-l-4 border-transparent'
                        }`}
                      >
                        <span>{t(item.label)}</span>
                        <TerminalIcon className="w-3.5 h-3.5 text-cyan-400/50" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* External Links Section */}
              <div className="border-t border-blue-900 md:border-t-0 md:border-l md:border-blue-900 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-blue-300 font-bold tracking-wider block mb-2 uppercase">{t('gov_links')}</span>
                  <div className="grid grid-cols-1 gap-2">
                    {externalLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-teal-300 hover:text-teal-200 transition-all py-1.5 px-3 rounded-lg hover:bg-blue-900/40 flex items-center gap-2 font-semibold"
                      >
                        <span className="text-cyan-400">➔</span>
                        <span>{link.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-blue-900/60 flex items-center justify-between text-[10px] font-mono text-blue-300/60">
                  <span>TERMINAL_ID: NIC_DBT_NODE_A</span>
                  <span className="text-emerald-400">● MAPPING_SYNCHRONIZED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
