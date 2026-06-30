import React, { useState } from 'react';
import { SCHOLARSHIPS } from '../data';
import { Search, Calendar, Landmark, Coins, GraduationCap, CheckCircle, AlertTriangle, Cpu } from 'lucide-react';
import { Scholarship } from '../types';

export default function ScholarshipList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [eligibilityCheckId, setEligibilityCheckId] = useState<string | null>(null);
  
  // Eligibility wizard states
  const [familyIncome, setFamilyIncome] = useState('');
  const [academicMarks, setAcademicMarks] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('General');
  const [hasAadhaarSeeded, setHasAadhaarSeeded] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<'eligible' | 'not_eligible' | 'warning' | null>(null);

  const filteredScholarships = SCHOLARSHIPS.filter((sch) => {
    const matchesSearch = sch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sch.ministry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || sch.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const runEligibilityWizard = (sch: Scholarship) => {
    const incomeNum = parseFloat(familyIncome);
    const marksNum = parseFloat(academicMarks);

    if (isNaN(incomeNum) || isNaN(marksNum)) {
      alert('Please fill out all technical evaluation inputs.');
      return;
    }

    // SC check
    if (sch.id === 'NSP-PM-001') {
      if (selectedCommunity === 'SC' && incomeNum <= 250000) {
        setEvaluationResult(hasAadhaarSeeded ? 'eligible' : 'warning');
      } else {
        setEvaluationResult('not_eligible');
      }
    } 
    // Minority checks
    else if (sch.id === 'NSP-PR-002') {
      if (selectedCommunity !== 'General' && selectedCommunity !== 'SC' && selectedCommunity !== 'OBC' && incomeNum <= 100000 && marksNum >= 50) {
        setEvaluationResult(hasAadhaarSeeded ? 'eligible' : 'warning');
      } else {
        setEvaluationResult('not_eligible');
      }
    } else if (sch.id === 'NSP-MCM-003') {
      if (selectedCommunity !== 'General' && selectedCommunity !== 'SC' && selectedCommunity !== 'OBC' && incomeNum <= 250000) {
        setEvaluationResult(hasAadhaarSeeded ? 'eligible' : 'warning');
      } else {
        setEvaluationResult('not_eligible');
      }
    } 
    // Central Sector CSS
    else if (sch.id === 'NSP-HE-004') {
      if (incomeNum <= 450000 && marksNum >= 80) {
        setEvaluationResult(hasAadhaarSeeded ? 'eligible' : 'warning');
      } else {
        setEvaluationResult('not_eligible');
      }
    } 
    // NER special
    else if (sch.id === 'NSP-IS-005') {
      if (incomeNum <= 450000) {
        setEvaluationResult(hasAadhaarSeeded ? 'eligible' : 'warning');
      } else {
        setEvaluationResult('not_eligible');
      }
    }
  };

  const openEligibilityChecker = (sch: Scholarship) => {
    setEligibilityCheckId(sch.id);
    setFamilyIncome('');
    setAcademicMarks('');
    setSelectedCommunity('General');
    setHasAadhaarSeeded(false);
    setEvaluationResult(null);
  };

  return (
    <div className="space-y-8">
      
      {/* Search Header banner */}
      <div className="bg-gradient-to-br from-[#004a8d] to-[#003366] p-8 rounded-3xl relative overflow-hidden shadow-xl text-white">
        <div className="absolute top-0 left-0 w-full h-1.5 flex">
          <div className="w-1/3 h-full bg-[#f97316]"></div>
          <div className="w-1/3 h-full bg-white"></div>
          <div className="w-1/3 h-full bg-[#22c55e]"></div>
        </div>
        <div className="absolute top-0 right-0 text-[10px] font-mono bg-white/10 text-white border-b border-l border-white/20 px-3 py-1.5 rounded-bl">
          NATIONAL REGISTRY // SECURE CORE
        </div>
        <h2 className="text-2xl font-display font-extrabold text-white mb-2 tracking-tight">
          Active Central Scholarships (2026 Academic Cycle)
        </h2>
        <p className="text-blue-100 text-sm max-w-3xl leading-relaxed font-sans">
          Search national merit and means-based scholarships. Access the live compatibility eligibility advisor to pre-verify income limits, community quotas, and Aadhaar-seeding readiness.
        </p>
      </div>

      {/* Query Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by title or ministry..."
            className="w-full bg-white border border-slate-200 text-slate-800 placeholder-slate-400 font-sans text-xs px-10 py-3.5 rounded-2xl outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
        </div>

        <div className="flex bg-slate-200/50 border border-slate-200 p-1 rounded-2xl gap-1 font-sans text-xs md:col-span-2">
          {['all', 'pre-matric', 'post-matric', 'merit-cum-means', 'special'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-1 py-1.5 px-3 rounded-xl transition-all cursor-pointer font-semibold ${
                selectedCategory === cat
                  ? 'bg-[#003366] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* List / Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Scholarship cards list */}
        <div className="lg:col-span-7 space-y-4">
          {filteredScholarships.length > 0 ? (
            filteredScholarships.map((sch) => (
              <div
                key={sch.id}
                className="bg-white border border-slate-200 p-6 rounded-3xl hover:border-blue-200 hover:shadow-md transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 px-3 py-1 bg-blue-50 border-l border-b border-slate-200 font-mono text-[10px] text-[#003366] font-extrabold rounded-bl-xl">
                  {sch.id}
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-4.5 h-4.5 text-teal-600" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">{sch.ministry}</span>
                </div>

                <h3 className="text-lg font-display font-extrabold text-slate-800 mb-2 leading-tight pr-16">{sch.name}</h3>
                <p className="text-slate-600 text-xs mb-4 leading-relaxed font-sans">{sch.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 border-t border-slate-100 pt-4 font-sans text-[11px] text-slate-500">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 font-bold uppercase">DISBURSEMENT ESTIMATE</span>
                    <span className="text-teal-600 font-extrabold flex items-center gap-1 text-xs mt-0.5">
                      <Coins className="w-3.5 h-3.5" />
                      {sch.amount}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 font-bold uppercase">DEADLINE TIMESTAMP</span>
                    <span className="text-slate-700 font-semibold flex items-center gap-1 text-xs mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {sch.deadline}
                    </span>
                  </div>

                  <button
                    onClick={() => openEligibilityChecker(sch)}
                    className="col-span-2 md:col-span-1 border border-slate-200 hover:border-teal-300 hover:bg-teal-50 text-[#003366] font-extrabold rounded-xl py-1.5 px-3 transition-all cursor-pointer text-center text-[10px] font-sans"
                  >
                    PRE-CHECK ELIGIBILITY
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 border border-dashed border-slate-300 bg-white rounded-3xl text-center">
              <p className="text-slate-400 font-semibold text-xs font-sans">NO CENTRAL RECORDS MATCH YOUR QUERY.</p>
            </div>
          )}
        </div>

        {/* Live Advisor Panel */}
        <div className="lg:col-span-5">
          {eligibilityCheckId ? (
            (() => {
              const sch = SCHOLARSHIPS.find(s => s.id === eligibilityCheckId)!;
              return (
                <div className="bg-white border border-slate-200 p-6 rounded-3xl sticky top-24 shadow-sm space-y-5">
                  <div className="flex justify-between items-start pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-[9px] font-bold text-teal-600 block uppercase font-sans">ELIGIBILITY DESK ADVISOR</span>
                      <h4 className="text-sm font-display font-extrabold text-slate-800 uppercase truncate max-w-[220px]">{sch.name}</h4>
                    </div>
                    <button
                      onClick={() => setEligibilityCheckId(null)}
                      className="text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer font-sans"
                    >
                      [CLOSE]
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs">
                    <span className="text-slate-400 font-bold text-[9px] block mb-1 uppercase font-sans">OFFICIAL ELIGIBILITY MANDATE</span>
                    <p className="text-slate-600 leading-normal font-sans text-xs font-medium">{sch.eligibility}</p>
                  </div>

                  {/* Wizard Inputs */}
                  <div className="space-y-4 text-xs pt-1">
                    <div>
                      <label className="text-slate-500 font-bold text-[10px] block mb-1 uppercase">ANNUAL FAMILY INCOME (₹)</label>
                      <input
                        type="number"
                        placeholder="e.g. 150000"
                        value={familyIncome}
                        onChange={(e) => {
                          setFamilyIncome(e.target.value);
                          setEvaluationResult(null);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-teal-400 text-slate-800 px-3 py-2.5 rounded-xl font-sans text-xs outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-500 font-bold text-[10px] block mb-1 uppercase">ACADEMIC SCORE MARKS (%)</label>
                      <input
                        type="number"
                        placeholder="e.g. 85"
                        value={academicMarks}
                        onChange={(e) => {
                          setAcademicMarks(e.target.value);
                          setEvaluationResult(null);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-teal-400 text-slate-800 px-3 py-2.5 rounded-xl font-sans text-xs outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-slate-500 font-bold text-[10px] block mb-1 uppercase">SOCIAL COMMUNITY GROUP</label>
                      <select
                        value={selectedCommunity}
                        onChange={(e) => {
                          setSelectedCommunity(e.target.value);
                          setEvaluationResult(null);
                        }}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-teal-400 text-slate-800 px-3 py-2.5 rounded-xl font-sans text-xs outline-none cursor-pointer"
                      >
                        <option value="General">General Category</option>
                        <option value="OBC">OBC Group</option>
                        <option value="SC">Scheduled Caste (SC)</option>
                        <option value="ST">Scheduled Tribe (ST)</option>
                        <option value="Minority">Minority (Muslim/Sikh/Christian/Jain)</option>
                      </select>
                    </div>

                    {/* Aadhaar Seeding Switch (Crucial DBT warning piece) */}
                    <div className="flex items-center justify-between p-4 bg-teal-50/50 border border-teal-100/80 rounded-2xl">
                      <div>
                        <span className="text-slate-800 block font-bold text-[11px] font-sans">Aadhaar Seeded on NPCI?</span>
                        <span className="text-slate-500 block text-[9px] font-sans">Check if you have authorized bank seeding</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={hasAadhaarSeeded}
                        onChange={(e) => {
                          setHasAadhaarSeeded(e.target.checked);
                          setEvaluationResult(null);
                        }}
                        className="w-4 h-4 accent-teal-600 cursor-pointer"
                      />
                    </div>

                    <button
                      onClick={() => runEligibilityWizard(sch)}
                      className="w-full bg-teal-500 hover:bg-[#003366] text-white font-extrabold py-3 rounded-xl shadow-sm transition-all cursor-pointer text-center uppercase tracking-wider font-sans text-xs"
                    >
                      EXECUTE ASSESSMENT RULING
                    </button>
                  </div>

                  {/* Evaluation Outputs */}
                  {evaluationResult && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      {evaluationResult === 'eligible' && (
                        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-2.5">
                          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <div className="text-xs">
                            <span className="text-emerald-700 font-extrabold block">✓ PASSED BOTH ELIGIBILITY & DBT COMPATIBILITY</span>
                            <span className="text-emerald-600 text-[11px] leading-relaxed block mt-1 font-sans font-medium">
                              Your educational and financial profile meets standard guidelines, and your active NPCI Aadhaar seeding will ensure swift scholarship transfer!
                            </span>
                          </div>
                        </div>
                      )}

                      {evaluationResult === 'warning' && (
                        <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-2.5">
                          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                          <div className="text-xs">
                            <span className="text-amber-700 font-extrabold block">⚠️ ELIGIBLE FOR AID but INACTIVE DBT STATUS</span>
                            <span className="text-amber-600 text-[11px] leading-relaxed block mt-1 font-sans font-medium">
                              Your credentials match, but because your Aadhaar is NOT seeded on the central NPCI database, your payment <span className="font-bold underline">WILL FAIL</span> on PFMS. Seed your account at once!
                            </span>
                          </div>
                        </div>
                      )}

                      {evaluationResult === 'not_eligible' && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-2.5">
                          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                          <div className="text-xs">
                            <span className="text-red-700 font-extrabold block">❌ EVALUATION FAILED: NOT ELIGIBLE</span>
                            <span className="text-red-600 text-[11px] leading-relaxed block mt-1 font-sans font-medium">
                              You do not satisfy the Ministry's specific quota, income ceiling thresholds, or class marks mandate for this scheme.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })()
          ) : (
            <div className="border border-dashed border-slate-200 bg-white p-8 rounded-3xl text-center h-full flex flex-col justify-center items-center gap-2 min-h-[300px]">
              <Cpu className="w-10 h-10 text-slate-300 animate-pulse" />
              <span className="text-xs font-sans font-bold text-slate-400">READY FOR ANALYSIS</span>
              <p className="text-[11px] text-slate-500 max-w-[240px] font-sans leading-relaxed">
                Click "PRE-CHECK ELIGIBILITY" on any scholarship listed to activate the live matching evaluator.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
