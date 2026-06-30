import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle, AlertTriangle, Play, RefreshCw, HelpCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function DBTComparison() {
  const [simulationAccountType, setSimulationAccountType] = useState<'linked' | 'seeded' | 'none'>('linked');
  const [simulationState, setSimulationState] = useState<'idle' | 'checking' | 'failed' | 'success'>('idle');
  const [logs, setLogs] = useState<string[]>([]);

  const runSimulation = () => {
    setSimulationState('checking');
    setLogs(['Initiating APBS Scholarship Transfer... [SYS_ID: 90021]', 'Source: Ministry of Higher Education Central Treasury', 'Amount: ₹12,000 INR']);
    
    setTimeout(() => {
      setLogs(prev => [...prev, 'Accessing central National Payments Corporation of India (NPCI) Mapper...']);
    }, 800);

    setTimeout(() => {
      if (simulationAccountType === 'none') {
        setLogs(prev => [
          ...prev,
          '❌ ERROR: No bank accounts mapped to Aadhaar card in NPCI database.',
          '❌ PFMS TRANSACTION REJECTED'
        ]);
        setSimulationState('failed');
      } else if (simulationAccountType === 'linked') {
        setLogs(prev => [
          ...prev,
          '⚠️ WARNING: Bank accounts are linked for KYC, but NOT seeded on NPCI.',
          '❌ Error Code: PFMS_REJ_09 - No Active Aadhaar Seeding Consent.',
          '❌ PFMS TRANSACTION REJECTED (Disbursement Failure)'
        ]);
        setSimulationState('failed');
      } else {
        setLogs(prev => [
          ...prev,
          '✓ MATCH FOUND: State Bank of India (A/C ending in *4829) is active & seeded.',
          '✓ Handshake Complete with APBS Gateway.',
          '✓ Transferred ₹12,000 INR securely to student.',
          '✓ DBT STATUS: SUCCESSFUL DISBURSEMENT'
        ]);
        setSimulationState('success');
      }
    }, 2200);
  };

  const resetSimulation = () => {
    setSimulationState('idle');
    setLogs([]);
  };

  return (
    <div className="space-y-10">
      
      {/* Header and Core Concept */}
      <div className="bg-gradient-to-br from-[#004a8d] to-[#003366] p-8 rounded-3xl relative overflow-hidden shadow-xl text-white">
        <div className="absolute top-0 left-0 w-full h-1.5 flex">
          <div className="w-1/3 h-full bg-[#f97316]"></div>
          <div className="w-1/3 h-full bg-white"></div>
          <div className="w-1/3 h-full bg-[#22c55e]"></div>
        </div>
        <div className="absolute top-0 right-0 text-[10px] font-mono bg-white/10 text-white border-b border-l border-white/20 px-3 py-1.5 rounded-bl">
          EDUCATIONAL MODULE // SIH2026
        </div>
        
        <h2 className="text-2xl font-display font-extrabold text-white mb-2 tracking-tight">
          Understanding the DBT Pipeline
        </h2>
        <p className="text-blue-100 text-sm max-w-3xl leading-relaxed font-sans">
          Over <span className="text-teal-300 font-bold">24%</span> of scholarship payment failures occur because students confuse 
          simple <span className="text-white font-bold underline decoration-orange-400">Aadhaar KYC Linking</span> with active <span className="text-teal-300 font-bold underline decoration-teal-300">NPCI Aadhaar Seeding</span>. 
          Learn the technical difference below to guarantee your funds arrive securely.
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Card 1: Aadhaar Linked Only */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-red-50 border border-red-100 rounded-2xl text-red-500">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-red-600 tracking-wider block font-bold">LEVEL 1 STATUS</span>
                <h3 className="text-xl font-bold text-slate-800">Aadhaar Linked (KYC Only)</h3>
              </div>
            </div>

            <p className="text-slate-500 text-xs mb-6 leading-relaxed">
              Your Aadhaar details are saved in the bank's local database merely to verify your identity (Know Your Customer). 
              This is a standard regulatory requirement for running an account.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></span>
                <p className="text-xs text-slate-600">
                  <span className="text-slate-800 font-bold">DBT Compatibility:</span> <span className="text-red-600 font-bold">INCOMPATIBLE</span>. Money cannot be pushed using your Aadhaar number alone.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></span>
                <p className="text-xs text-slate-600">
                  <span className="text-slate-800 font-bold">NPCI Registry:</span> The bank has not uploaded your account details to the central mapper.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></span>
                <p className="text-xs text-slate-600">
                  <span className="text-slate-800 font-bold">Account Count:</span> Can be linked to multiple accounts across banks.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span className="text-[11px] text-red-800 leading-normal">
              Scholarships routed via APBS (Aadhaar Payment Bridge System) will fail under this state.
            </span>
          </div>
        </div>

        {/* Card 2: DBT Enabled & Seeded */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600">
                <ShieldCheck className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-600 tracking-wider block font-bold">LEVEL 2 STATUS</span>
                <h3 className="text-xl font-bold text-slate-800">DBT-Enabled Aadhaar Seeded</h3>
              </div>
            </div>

            <p className="text-slate-500 text-xs mb-6 leading-relaxed">
              Your Aadhaar is mapped to this specific bank account in the central registry at NPCI. 
              The account is flagged with explicit electronic consent to receive all direct government transfers.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></span>
                <p className="text-xs text-slate-600">
                  <span className="text-slate-800 font-bold">DBT Compatibility:</span> <span className="text-emerald-600 font-bold">100% COMPATIBLE</span>. All funds will route instantly.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></span>
                <p className="text-xs text-slate-600">
                  <span className="text-slate-800 font-bold">NPCI Registry:</span> Actively synchronized in the central national clearinghouse database.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2"></span>
                <p className="text-xs text-slate-600">
                  <span className="text-slate-800 font-bold">Account Count:</span> Can only be seeded to <span className="text-slate-800 font-bold">ONE</span> bank account at a time.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="text-[11px] text-emerald-800 leading-normal">
              APBS transactions will execute with 100% routing success.
            </span>
          </div>
        </div>

      </div>

      {/* Interactive Simulator Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-bold text-teal-600 tracking-wider block uppercase">SECURE SIMULATOR</span>
            <h3 className="text-lg font-display font-extrabold text-slate-800">APBS Scholarship Transfer Simulator</h3>
          </div>
          <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase">
            Test Environment
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1: Pick Status */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-500 block uppercase">1. Set Student Account State</span>
            <div className="space-y-2.5">
              <button
                onClick={() => {
                  setSimulationAccountType('none');
                  resetSimulation();
                }}
                className={`w-full p-4 rounded-2xl text-left border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                  simulationAccountType === 'none'
                    ? 'border-red-400 bg-red-50 text-red-700'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span>No Bank Account Linked</span>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              </button>

              <button
                onClick={() => {
                  setSimulationAccountType('linked');
                  resetSimulation();
                }}
                className={`w-full p-4 rounded-2xl text-left border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                  simulationAccountType === 'linked'
                    ? 'border-orange-400 bg-orange-50 text-orange-700'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span>Aadhaar Linked (KYC Only)</span>
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
              </button>

              <button
                onClick={() => {
                  setSimulationAccountType('seeded');
                  resetSimulation();
                }}
                className={`w-full p-4 rounded-2xl text-left border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                  simulationAccountType === 'seeded'
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span>DBT-Seeded (NPCI Mapped)</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </button>
            </div>
          </div>

          {/* Step 2: Run & Terminal Outputs */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-500 block uppercase mb-2">2. Central Server Log Monitor</span>
            
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl font-mono text-xs flex-1 min-h-[160px] flex flex-col justify-between overflow-hidden">
              <div className="space-y-1.5 overflow-y-auto max-h-[120px] text-slate-400 pr-2">
                {simulationState === 'idle' && (
                  <span className="text-slate-500 italic block">SYSTEM IDLE. Awaiting Transfer Signal...</span>
                )}
                {logs.map((log, i) => (
                  <div key={i} className={`flex gap-1.5 leading-relaxed ${
                    log.includes('❌') ? 'text-red-400 font-bold' :
                    log.includes('✓') ? 'text-emerald-400 font-bold' :
                    log.includes('⚠️') ? 'text-yellow-400 font-bold' : 'text-slate-300'
                  }`}>
                    <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>
                    <span>{log}</span>
                  </div>
                ))}
                {simulationState === 'checking' && (
                  <div className="flex items-center gap-2 text-teal-400 mt-1">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing transaction packets...</span>
                  </div>
                )}
              </div>

              {/* Status Indicator */}
              <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center">
                <div className="flex gap-1.5">
                  <span className="text-[10px] text-slate-500 font-bold">TRANSACTION STATUS:</span>
                  <span className={`text-[10px] font-bold ${
                    simulationState === 'idle' ? 'text-slate-500' :
                    simulationState === 'checking' ? 'text-teal-400 animate-pulse' :
                    simulationState === 'success' ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {simulationState.toUpperCase()}
                  </span>
                </div>

                <div className="flex gap-2">
                  {simulationState !== 'idle' && (
                    <button 
                      onClick={resetSimulation}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] text-white rounded-lg cursor-pointer transition-colors"
                    >
                      CLEAR
                    </button>
                  )}
                  
                  <button
                    onClick={runSimulation}
                    disabled={simulationState === 'checking'}
                    className={`px-4 py-1.5 bg-teal-500 hover:bg-teal-600 text-[10px] text-white font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors ${
                      simulationState === 'checking' ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>DISBURSE FUNDS</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
