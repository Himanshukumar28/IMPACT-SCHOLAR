import React from 'react';
import { ShieldCheck, Heart, ExternalLink, Milestone } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const { t } = useLanguage();

  const govtLinks = [
    { name: 'UIDAI Central Portal', url: 'https://uidai.gov.in' },
    { name: 'National Scholarship Portal', url: 'https://scholarships.gov.in' },
    { name: 'DBT Bharat Official', url: 'https://dbtbharat.gov.in' },
    { name: 'NPCI Mapper Registry', url: 'https://www.npci.org.in' },
  ];

  const appMap = [
    { name: t('nav_home'), id: 'home' },
    { name: t('nav_learn'), id: 'learn' },
    { name: t('nav_scholarships'), id: 'scholarships' },
    { name: t('nav_npci'), id: 'npci' },
    { name: t('nav_tracker'), id: 'tracker' },
    { name: t('nav_help'), id: 'help' },
  ];

  return (
    <footer className="bg-[#003366] text-blue-100 py-12 px-4 sm:px-6 lg:px-8 mt-20 relative overflow-hidden border-t-4 border-teal-500">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: System Branding */}
        <div className="space-y-4 font-sans">
          <div className="flex items-center gap-2">
            <Milestone className="w-5 h-5 text-teal-400" />
            <span className="font-display text-base font-extrabold text-white tracking-wider">
              IMPACT SCHOLAR
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-blue-200/80 font-sans font-medium">
            {t('guidelines_note')}
          </p>
          <div className="flex items-center gap-2 text-[10px] font-sans font-bold text-teal-400">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>SECURED NATIONAL PAYMENTS BRIDGE</span>
          </div>
        </div>

        {/* Col 2: App Modules */}
        <div className="space-y-3 font-sans text-xs">
          <span className="text-white font-extrabold text-xs tracking-wider uppercase block border-l-2 border-teal-400 pl-2">
            {t('system_core_map')}
          </span>
          <ul className="space-y-2 font-medium">
            {appMap.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className="hover:text-teal-300 transition-colors flex items-center gap-1 cursor-pointer text-left"
                >
                  <span className="text-teal-400">➔</span>
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Government Links */}
        <div className="space-y-3 font-sans text-xs">
          <span className="text-white font-extrabold text-xs tracking-wider uppercase block border-l-2 border-teal-400 pl-2">
            {t('gov_links_title')}
          </span>
          <ul className="space-y-2 font-medium">
            {govtLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-teal-300 transition-colors flex items-center gap-1"
                >
                  <span className="text-teal-400">➔</span>
                  <span>{link.name}</span>
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: National Emblem / Certifications info */}
        <div className="space-y-3">
          <span className="text-white font-extrabold text-xs tracking-wider uppercase block border-l-2 border-teal-400 pl-2 font-sans">
            {t('sovereign_security_seal')}
          </span>
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] text-blue-200/70 font-sans space-y-2">
            <div className="flex items-center justify-between text-teal-400 font-bold">
              <span>{t('pfms_integrity_online')}</span>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
            </div>
            <p className="leading-relaxed font-medium">
              {t('guidelines_note')}
            </p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[10px] text-blue-200/50 font-bold">
        <div>
          <span>{t('academic_initiative')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>{t('engineered_with')}</span>
          <Heart className="w-3 h-3 text-red-400 fill-current" />
          <span>{t('public_trust')}</span>
        </div>
      </div>

    </footer>
  );
}
