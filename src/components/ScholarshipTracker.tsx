import React, { useState } from 'react';
import { TRACKING_RECORDS } from '../data';
import { Search, Loader2, RefreshCw, CheckCircle, AlertTriangle, HelpCircle, Landmark, ExternalLink } from 'lucide-react';
import { TrackingStatus } from '../types';

export default function ScholarshipTracker() {
  const [appIdInput, setAppIdInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<TrackingStatus | null>(null);
  const [hasQueried, setHasQueried] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appIdInput.trim()) {
      setErrorMsg('Please supply a valid Application ID.');
      return;
    }

    setLoading(true);
    setCurrentRecord(null);
    setHasQueried(true);
    setErrorMsg('');

    setTimeout(() => {
      setLoading(false);
      const match = TRACKING_RECORDS.find(
        r => r.applicationId.toLowerCase().replace(/\s/g, '') === appIdInput.toLowerCase().replace(/\s/g, '')
      );

      if (match) {
        setCurrentRecord(match);
      } else {
        setErrorMsg('No application found with that ID in the database.');
      }
    }, 1200);
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
          PFMS TRACKER // DIRECT SEEDING
        </div>
        <h2 className="text-2xl font-display font-extrabold text-white mb-2 tracking-tight">
          PFMS Direct Benefit Transfer Tracker
        </h2>
        <p className="text-blue-100 text-sm max-w-3xl leading-relaxed font-sans">
          Enter your Scholarship Application ID to monitor institution reviews, state welfare validations, and the final Direct Benefit Transfer (DBT) credit stage. Any failure points will detail diagnostic steps.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Search Module */}
        <div className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-3xl flex flex-col justify-between h-fit shadow-sm">
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-800 tracking-wider uppercase block pb-3 border-b border-slate-200 font-sans">
              SECURE TRACKER GATEWAY
            </span>

            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1 uppercase font-sans">
                  APPLICATION ID OR AADHAAR
                </label>
                <input
                  type="text"
                  value={appIdInput}
                  onChange={(e) => {
                    setAppIdInput(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="SCH-2026-XXXXX"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 text-slate-800 px-3 py-2.5 rounded-xl font-mono text-sm tracking-wide outline-none transition-all"
                />
                {errorMsg && (
                  <p className="text-red-600 font-sans text-xs mt-1.5 flex items-center gap-1 font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{errorMsg}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-500 hover:bg-[#003366] text-white font-sans font-bold py-3 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs uppercase tracking-wider"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>LOOKING UP DIRECTORY...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>QUERY PFMS STAGE</span>
                  </>
                )}
              </button>
            </form>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-xs text-slate-600 space-y-1.5 font-sans">
              <span className="text-[#003366] font-extrabold block">DEMO TESTING IDs:</span>
              <p className="font-semibold select-all">✓ SCH-2026-88741 <span className="text-emerald-600 font-medium">(Disbursed OK)</span></p>
              <p className="font-semibold select-all">✓ SCH-2026-44102 <span className="text-red-600 font-medium">(PFMS Rejected - No Seed)</span></p>
              <p className="font-semibold select-all">✓ SCH-2026-77312 <span className="text-orange-600 font-medium">(Bank Error - Flag Lock)</span></p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></span>
            <span>DATA ENCRYPTION: TLS 1.3 AES-256</span>
          </div>
        </div>

        {/* Right Tracking Visualizer */}
        <div className="lg:col-span-8 bg-white border border-slate-200 p-6 rounded-3xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-800 tracking-wider uppercase font-sans">
                APPLICATION STAGE PROGRESSION
              </span>
              {currentRecord && (
                <div className="text-right">
                  <span className="text-slate-400 font-sans text-[9px] font-bold block uppercase">SCHOLARSHIP FOR</span>
                  <span className="text-teal-600 font-sans text-xs font-extrabold">{currentRecord.studentName}</span>
                </div>
              )}
            </div>

            {loading ? (
              <div className="h-[300px] flex flex-col justify-center items-center gap-3">
                <Loader2 className="w-8 h-8 text-teal-500 animate-spin" />
                <span className="text-xs font-sans text-slate-500 animate-pulse font-medium">Connecting PFMS Gateway Core...</span>
              </div>
            ) : currentRecord ? (
              <div className="space-y-6">
                
                {/* Header overview box */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-slate-400 font-bold uppercase">SCHOLARSHIP NAME</span>
                    <h4 className="text-sm font-display font-extrabold text-slate-800 leading-tight">{currentRecord.scholarshipName}</h4>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-left md:text-right font-sans">
                      <span className="text-[9px] text-slate-400 font-bold block uppercase">TOTAL SUM</span>
                      <span className="text-emerald-600 text-sm font-extrabold">{currentRecord.amount}</span>
                    </div>
                    <div className="text-left md:text-right font-sans">
                      <span className="text-[9px] text-slate-400 font-bold block uppercase">APPLICATION ID</span>
                      <span className="text-slate-700 text-sm font-bold">{currentRecord.applicationId}</span>
                    </div>
                  </div>
                </div>

                {/* Progress bar visualizer */}
                <div className="relative font-sans pt-2">
                  <div className="absolute top-[16px] left-0 w-full h-[3px] bg-slate-100 z-0"></div>
                  
                  <div className="relative z-10 flex justify-between">
                    {currentRecord.stages.map((stage, idx) => {
                      const isCompleted = stage.status === 'completed';
                      const isFailed = stage.status === 'failed';

                      return (
                        <div key={idx} className="flex flex-col items-center max-w-[100px] text-center">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                            isCompleted ? 'border-emerald-500 bg-emerald-50 text-emerald-600 font-bold' :
                            isFailed ? 'border-red-500 bg-red-50 text-red-600 font-bold' :
                            'border-slate-200 bg-slate-50 text-slate-400'
                          }`}>
                            <span className="text-xs font-sans font-extrabold">{idx + 1}</span>
                          </div>
                          <span className={`text-[9px] font-sans font-bold mt-2 tracking-tight ${
                            isCompleted ? 'text-emerald-600' :
                            isFailed ? 'text-red-500' :
                            'text-slate-400'
                          }`}>
                            {stage.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Vertical Stage Breakdown */}
                <div className="space-y-3 pt-4">
                  <span className="text-xs font-bold text-slate-500 uppercase block font-sans">AUDIT REPORT STAMP FILE:</span>
                  
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2">
                    {currentRecord.stages.map((stage, idx) => {
                      const isCompleted = stage.status === 'completed';
                      const isFailed = stage.status === 'failed';

                      return (
                        <div 
                          key={idx} 
                          className={`p-3.5 border rounded-2xl text-xs flex justify-between items-center ${
                            isCompleted ? 'border-emerald-100 bg-emerald-50/20 text-slate-700' :
                            isFailed ? 'border-red-100 bg-red-50/20 text-slate-700' :
                            'border-slate-100 bg-slate-50/50 text-slate-400'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] text-slate-400 font-bold">[{idx+1}]</span>
                              <span className="font-sans font-extrabold text-slate-800">{stage.name}</span>
                            </div>
                            <p className="font-sans text-[11px] text-slate-500">{stage.details || 'Awaiting status resolution...'}</p>
                          </div>

                          <div className="text-right font-sans text-[10px]">
                            <span className="text-slate-400 block font-bold uppercase text-[8px]">STAMP TIME</span>
                            <span className={`font-semibold ${isCompleted ? 'text-emerald-600' : isFailed ? 'text-red-600' : 'text-slate-400'}`}>
                              {stage.date || 'PENDING'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Diagnostics and Failures resolver */}
                {currentRecord.stages.some(s => s.errorAlert) && (
                  (() => {
                    const failStage = currentRecord.stages.find(s => s.errorAlert)!;
                    return (
                      <div className="p-5 border border-red-200 bg-red-50 rounded-2xl space-y-3 shadow-sm">
                        <div className="flex items-center gap-2 text-red-600">
                          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                          <h5 className="text-xs font-bold uppercase font-sans tracking-wide">AUTOMATED SCHOLARSHIP REMEDIATION ALERT</h5>
                        </div>

                        <div className="text-xs space-y-2 text-slate-700 font-sans">
                          <p className="text-red-800 font-medium">
                            The PFMS central transaction has been <span className="font-bold underline">TERMINATED</span> due to:
                          </p>
                          <p className="font-extrabold text-slate-800">
                            {failStage.errorType === 'AadhaarSeeded' 
                              ? '→ PFMS Error Code C30: NO SEEDING FOUND IN CENTRAL NPCI MAPPER' 
                              : '→ PFMS Error Code C32: INACTIVE SEEDING AND EXPLICIT DBT LOCK'}
                          </p>
                          
                          <div className="p-4 bg-slate-900 border border-slate-800 text-slate-300 rounded-2xl mt-3 space-y-2 text-[11px] font-sans leading-relaxed">
                            <span className="text-teal-400 font-bold block uppercase tracking-wider text-[10px]">HOW TO RESOLVE THIS REJECTION IMMEDIATELY:</span>
                            {failStage.errorType === 'AadhaarSeeded' ? (
                              <p className="space-y-1">
                                1. Print out the DBT Aadhaar Seeding Consent Form.<br />
                                2. Bring your Aadhaar Card copy and visit your primary bank branch.<br />
                                3. Ask the clerk to seed your Aadhaar in the NPCI mapper registry. This takes 48 hours to update.
                              </p>
                            ) : (
                              <p className="space-y-1">
                                1. Visit your bank branch where your Aadhaar is linked.<br />
                                2. Request them to re-verify and toggle the "DBT Active Flag" or "APBS Flag" to TRUE.<br />
                                3. Perform a tiny transaction of ₹10 to reactivate accounts locked by inactivity.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()
                )}

              </div>
            ) : (
              <div className="h-[300px] flex flex-col justify-center items-center text-center gap-2">
                <HelpCircle className="w-12 h-12 text-slate-300 animate-pulse" />
                <span className="text-sm font-bold text-slate-400">TRACKING QUEUE VACANT</span>
                <p className="text-[11px] text-slate-500 max-w-sm font-sans leading-relaxed">
                  Supply a query using a testing Application ID on the left console to load real-time database state charts.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-sans text-slate-400 font-semibold">
            <span>PFMS LINK: DISPATCH v2.026</span>
            <span>SYSTEM NODE: ACTIVE</span>
          </div>
        </div>

      </div>

    </div>
  );
}
