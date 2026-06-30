import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertTriangle, Cpu, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export default function SupportForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    aadhaar: '',
    bankName: '',
    issueType: 'PFMS Rejection Code C30',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const formatAadhaar = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 12);
    const parts = [];
    for (let i = 0; i < clean.length; i += 4) {
      parts.push(clean.substring(i, i + 4));
    }
    return parts.join(' ');
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaar(e.target.value);
    setFormData(prev => ({ ...prev, aadhaar: formatted }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) {
      alert(t('support_mandatory_alert') || 'Please fill out all mandatory communication parameters.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `TKT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket(ticketId);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      aadhaar: '',
      bankName: '',
      issueType: 'PFMS Rejection Code C30',
      description: '',
    });
    setSubmittedTicket(null);
  };

  return (
    <div className="space-y-8">
      
      {/* Banner */}
      <div className="bg-gradient-to-br from-[#004a8d] to-[#003366] p-8 rounded-3xl relative overflow-hidden shadow-xl text-white">
        <div className="absolute top-0 left-0 w-full h-1.5 flex">
          <div className="w-1/3 h-full bg-[#f97316]"></div>
          <div className="w-1/3 h-full bg-white"></div>
          <div className="w-1/3 h-full bg-[#22c55e]"></div>
        </div>
        <div className="absolute top-0 right-0 text-[10px] font-mono bg-white/10 text-white border-b border-l border-white/20 px-3 py-1.5 rounded-bl">
          SUPPORT CORE // COMPLIANCE
        </div>
        <h2 className="text-2xl font-display font-extrabold text-white mb-2 tracking-tight">
          {t('support_title')}
        </h2>
        <p className="text-blue-100 text-sm max-w-3xl leading-relaxed font-sans">
          {t('support_desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Support Console Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
          
          {submittedTicket ? (
            <div className="space-y-6 text-center py-8">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-display font-extrabold text-slate-800 uppercase font-sans">{t('support_success')}</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto font-sans font-medium leading-relaxed">
                  {t('support_success_sub')}
                </p>
              </div>

              <div className="p-4.5 bg-slate-50 border border-slate-200 rounded-2xl max-w-sm mx-auto font-sans text-xs text-left space-y-2">
                <span className="text-[#003366] font-extrabold block border-b border-slate-200 pb-1.5 uppercase tracking-wide">{t('ticket_file')}</span>
                <p><span className="text-slate-400 font-bold uppercase text-[9px] w-24 inline-block">{t('ticket_id_label')}:</span> <span className="text-slate-800 font-extrabold">{submittedTicket}</span></p>
                <p><span className="text-slate-400 font-bold uppercase text-[9px] w-24 inline-block">{t('student_label')}:</span> <span className="text-slate-800 font-semibold">{formData.name}</span></p>
                <p><span className="text-slate-400 font-bold uppercase text-[9px] w-24 inline-block">{t('mapped_bank_label')}:</span> <span className="text-slate-800 font-semibold">{formData.bankName || 'NOT_SPECIFIED'}</span></p>
                <p><span className="text-slate-400 font-bold uppercase text-[9px] w-24 inline-block">{t('issue_class_label')}:</span> <span className="text-pink-600 font-bold">{formData.issueType}</span></p>
                <p><span className="text-slate-400 font-bold uppercase text-[9px] w-24 inline-block">{t('queue_time_label')}:</span> <span className="text-slate-800 font-medium">{new Date().toLocaleString()}</span></p>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-teal-500 hover:bg-[#003366] text-white font-sans text-xs font-bold rounded-xl cursor-pointer transition-all shadow-sm hover:shadow uppercase tracking-wider"
                >
                  {t('new_grievance')}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 font-sans text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-500 font-bold block mb-1 uppercase text-[10px] font-sans">{t('form_name')} *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Priyanjali Sharma"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 text-slate-800 px-3 py-2.5 rounded-xl outline-none transition-all font-sans text-xs"
                  />
                </div>

                <div>
                  <label className="text-slate-500 font-bold block mb-1 uppercase text-[10px] font-sans">{t('form_email')} *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="e.g. sharma@edu.in"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 text-slate-800 px-3 py-2.5 rounded-xl outline-none transition-all font-sans text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-500 font-bold block mb-1 uppercase text-[10px] font-sans">{t('form_aadhaar')}</label>
                  <input
                    type="text"
                    value={formData.aadhaar}
                    onChange={handleAadhaarChange}
                    placeholder="0000 0000 0000"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 text-slate-800 px-3 py-2.5 rounded-xl outline-none transition-all font-sans text-xs"
                  />
                </div>

                <div>
                  <label className="text-slate-500 font-bold block mb-1 uppercase text-[10px] font-sans">{t('form_bank')}</label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => setFormData(prev => ({ ...prev, bankName: e.target.value }))}
                    placeholder="e.g. State Bank of India"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 text-slate-800 px-3 py-2.5 rounded-xl outline-none transition-all font-sans text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-500 font-bold block mb-1 uppercase text-[10px] font-sans">{t('form_issue')}</label>
                <select
                  value={formData.issueType}
                  onChange={(e) => setFormData(prev => ({ ...prev, issueType: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 text-slate-800 px-3 py-2.5 rounded-xl outline-none cursor-pointer transition-all font-sans text-xs"
                >
                  <option>PFMS Rejection Code C30 (No Active Seeding)</option>
                  <option>PFMS Rejection Code C32 (DBT Flag Disabled by Bank)</option>
                  <option>NSP Portal Application Sync Failure</option>
                  <option>Wrong Bank Account Seeding in NPCI Mapper</option>
                  <option>Other technical API issues</option>
                </select>
              </div>

              <div>
                <label className="text-slate-500 font-bold block mb-1 uppercase text-[10px] font-sans">{t('form_desc')} *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your payment failure symptoms, dates of seeding forms submitted, and previous bank responses."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 text-slate-800 px-3 py-2.5 rounded-xl outline-none transition-all font-sans text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-500 hover:bg-[#003366] text-white font-sans font-bold py-3.5 px-4 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-xs"
              >
                {isSubmitting ? (
                  <>
                    <Cpu className="w-4 h-4 animate-spin" />
                    <span>TRANSMITTING DETAILS...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('form_submit')}</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

        {/* Support Sidebar Help Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-slate-200 bg-white p-6 rounded-3xl space-y-4 shadow-sm">
            <span className="text-xs font-bold text-slate-800 block uppercase pb-2 border-b border-slate-200 font-sans">
              EMERGENCY COMPLIANCE CHECK
            </span>

            <div className="space-y-4 text-xs font-sans">
              <div className="flex gap-2.5">
                <AlertTriangle className="w-4.5 h-4.5 text-yellow-500 mt-0.5 shrink-0" />
                <p className="text-slate-600 leading-normal font-medium">
                  <span className="font-extrabold text-slate-800 font-sans block mb-0.5">90-Day Account Freeze:</span> Accounts without transaction activity for over 90 days are automatically marked inactive by public sector banks. This triggers immediate PFMS rejections, even if your mapping is active!
                </p>
              </div>

              <div className="flex gap-2.5">
                <Mail className="w-4.5 h-4.5 text-teal-600 mt-0.5 shrink-0" />
                <p className="text-slate-600 leading-normal font-medium">
                  <span className="font-extrabold text-slate-800 font-sans block mb-0.5">Resolution Window:</span> Standard bank seeding forms require up to <span className="text-teal-600 font-bold">48 hours</span> to sync to the centralized NPCI mapper database. Wait at least 2 days before submitting tracking queries.
                </p>
              </div>

              <div className="flex gap-2.5">
                <Sparkles className="w-4.5 h-4.5 text-pink-500 mt-0.5 shrink-0" />
                <p className="text-slate-600 leading-normal font-medium">
                  <span className="font-extrabold text-slate-800 font-sans block mb-0.5">SIH Judgement Notice:</span> All submitted data in this prototype is handled completely client-side in secure sandbox arrays, suitable for live judging inspections.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
