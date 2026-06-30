import React, { useState } from 'react';
import { Search, ShieldCheck, ShieldX, RefreshCw, AlertCircle, FileSpreadsheet, Landmark, Key, HelpCircle } from 'lucide-react';

interface MappingResult {
  aadhaarNumber: string;
  isSeeded: boolean;
  bankName: string;
  seedingDate: string;
  status: 'ACTIVE' | 'INACTIVE' | 'NOT_FOUND';
  dbtConsentFlag: boolean;
  custodianCode: string;
}

export default function NPCIMapping() {
  const [aadhaarInput, setAadhaarInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MappingResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const formatAadhaar = (value: string) => {
    const clean = value.replace(/\D/g, '').slice(0, 12);
    const parts = [];
    for (let i = 0; i < clean.length; i += 4) {
      parts.push(clean.substring(i, i + 4));
    }
    return parts.join(' ');
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaar(e.target.value);
    setAadhaarInput(formatted);
    setErrorMsg('');
  };

  const queryNPCIMapper = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanNum = aadhaarInput.replace(/\s/g, '');

    if (cleanNum.length !== 12) {
      setErrorMsg('Aadhaar number must be exactly 12 digits.');
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate querying UIDAI and NPCI databases
    setTimeout(() => {
      setLoading(false);
      
      // Let's seed some deterministic outputs depending on the last digit for educational variety
      const lastDigit = parseInt(cleanNum[11]);

      if (lastDigit === 0 || lastDigit === 1) {
        // Not found
        setResult({
          aadhaarNumber: aadhaarInput,
          isSeeded: false,
          bankName: 'N/A',
          seedingDate: 'N/A',
          status: 'NOT_FOUND',
          dbtConsentFlag: false,
          custodianCode: 'N/A'
        });
      } else if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) {
        // Inactive seeding
        setResult({
          aadhaarNumber: aadhaarInput,
          isSeeded: true,
          bankName: 'Punjab National Bank',
          seedingDate: '2024-03-12',
          status: 'INACTIVE',
          dbtConsentFlag: false,
          custodianCode: 'PNB0091'
        });
      } else {
        // Active Seeding
        const banks = [
          'State Bank of India',
          'HDFC Bank Ltd',
          'Bank of Baroda',
          'Canara Bank',
          'Union Bank of India'
        ];
        const selectedBank = banks[lastDigit % banks.length];
        const years = ['2023', '2024', '2025'];
        const seedYear = years[lastDigit % years.length];

        setResult({
          aadhaarNumber: aadhaarInput,
          isSeeded: true,
          bankName: selectedBank,
          seedingDate: `${seedYear}-08-22`,
          status: 'ACTIVE',
          dbtConsentFlag: true,
          custodianCode: `CBK0${lastDigit}02`
        });
      }
    }, 1500);
  };

  // Enable/Consent simulation
  const toggleConsent = () => {
    if (!result) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult(prev => {
        if (!prev) return null;
        return {
          ...prev,
          isSeeded: true,
          status: prev.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
          dbtConsentFlag: !prev.dbtConsentFlag,
          seedingDate: new Date().toISOString().split('T')[0],
          bankName: prev.bankName === 'N/A' ? 'State Bank of India' : prev.bankName
        };
      });
    }, 1200);
  };

  return (
    <div className="space-y-8">
      
      {/* Banner info */}
      <div className="bg-gradient-to-br from-[#004a8d] to-[#003366] p-8 rounded-3xl relative overflow-hidden shadow-xl text-white">
        <div className="absolute top-0 left-0 w-full h-1.5 flex">
          <div className="w-1/3 h-full bg-[#f97316]"></div>
          <div className="w-1/3 h-full bg-white"></div>
          <div className="w-1/3 h-full bg-[#22c55e]"></div>
        </div>
        <div className="absolute top-0 right-0 text-[10px] font-mono bg-white/10 text-white border-b border-l border-white/20 px-3 py-1.5 rounded-bl">
          NPCI CENTRAL // GATEWAY SIM
        </div>
        <h2 className="text-2xl font-display font-extrabold text-white mb-2 tracking-tight">
          NPCI Aadhaar Mapping Status Checker
        </h2>
        <p className="text-blue-100 text-sm max-w-3xl leading-relaxed font-sans">
          National Payments Corporation of India (NPCI) operates the central routing gateway. 
          Use this interactive portal to query the current mapping status of an Aadhaar card. 
          This simulates the real-time API query triggered by the PFMS system during payment cycles.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Terminal Panel */}
        <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200">
              <Key className="w-5 h-5 text-teal-600" />
              <span className="text-xs font-bold text-slate-800 tracking-wider uppercase font-sans">
                QUERY TERMINAL INPUT
              </span>
            </div>

            <form onSubmit={queryNPCIMapper} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 block mb-1.5 uppercase font-sans">
                  ENTER 12-DIGIT AADHAAR CARD
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={aadhaarInput}
                    onChange={handleAadhaarChange}
                    placeholder="0000 0000 0000"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 text-slate-800 px-4 py-3 rounded-xl text-lg font-mono tracking-widest outline-none transition-all"
                  />
                  <div className="absolute right-3.5 top-3.5 text-[10px] font-mono text-slate-400 font-bold">
                    {aadhaarInput.replace(/\s/g, '').length}/12
                  </div>
                </div>
                {errorMsg && (
                  <p className="text-red-600 font-sans text-xs mt-1.5 flex items-center gap-1 font-semibold">
                    <AlertCircle className="w-3.5 h-3.5 animate-bounce" />
                    <span>{errorMsg}</span>
                  </p>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-xs text-slate-600 space-y-1.5 font-sans">
                <span className="text-[#003366] font-extrabold block mb-1 font-sans">PROTIP (DETERMINISTIC CODES):</span>
                <p>• Aadhaar ending in <span className="text-slate-800 font-bold">0 or 1</span>: Simulation for <span className="text-red-600 font-bold">NO MAPPING</span></p>
                <p>• Aadhaar ending in <span className="text-slate-800 font-bold">2, 3 or 4</span>: Simulation for <span className="text-orange-600 font-bold">INACTIVE</span></p>
                <p>• Aadhaar ending in <span className="text-slate-800 font-bold">5 to 9</span>: Simulation for <span className="text-emerald-600 font-bold">ACTIVE MAPPING</span></p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-500 hover:bg-[#003366] disabled:bg-slate-200 text-white font-sans font-bold py-3.5 px-4 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-xs"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>CONNECTING CENTRAL REGISTRY...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>FETCH MAPPING RECORDS</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="mt-6 p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></span>
            <span>APBS-GW-v2.026 // READ-ONLY SHIELD ACTIVE</span>
          </div>
        </div>

        {/* Output Terminal Result */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-3xl flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-teal-600" />
                <span className="text-xs font-bold text-slate-800 tracking-wider uppercase font-sans">
                  NPCI DATABASE RECORD OUTPUT
                </span>
              </div>
              {result && (
                <span className={`text-[10px] font-sans font-bold px-2.5 py-1 rounded-full border ${
                  result.status === 'ACTIVE' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' :
                  result.status === 'INACTIVE' ? 'border-orange-200 bg-orange-50 text-orange-700' :
                  'border-red-200 bg-red-50 text-red-700'
                }`}>
                  {result.status}
                </span>
              )}
            </div>

            {loading ? (
              <div className="h-[250px] flex flex-col justify-center items-center gap-3">
                <RefreshCw className="w-8 h-8 text-teal-500 animate-spin" />
                <span className="text-xs font-sans text-slate-500 animate-pulse font-medium">Querying central NPCI mapper registry...</span>
              </div>
            ) : result ? (
              <div className="space-y-4">
                
                {/* Result header box */}
                <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
                  result.status === 'ACTIVE' ? 'border-emerald-100 bg-emerald-50/40 text-emerald-800' :
                  result.status === 'INACTIVE' ? 'border-orange-100 bg-orange-50/40 text-orange-800' :
                  'border-red-100 bg-red-50/40 text-red-800'
                }`}>
                  {result.status === 'ACTIVE' ? (
                    <ShieldCheck className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <ShieldX className="w-8 h-8 text-red-500 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-800 font-sans">
                      {result.status === 'ACTIVE' ? 'Aadhaar Seeding Status: Verified Active' :
                       result.status === 'INACTIVE' ? 'Aadhaar Seeding Status: Mapped Inactive' :
                       'Aadhaar Seeding Status: No Record Found'}
                    </h4>
                    <p className="text-xs text-slate-500 font-sans mt-0.5 font-medium leading-relaxed">
                      {result.status === 'ACTIVE' ? 'Your bank account is fully seeding-enabled and ready for prompt DBT transfer.' :
                       result.status === 'INACTIVE' ? 'Your Aadhaar mapping exists, but bank has disabled the DBT incoming flag.' :
                       'You must submit an Aadhaar Seeding consent form to your bank immediately.'}
                    </p>
                  </div>
                </div>

                {/* Table details */}
                <div className="grid grid-cols-2 gap-4 font-sans text-xs pt-2">
                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-slate-400 block text-[9px] font-bold uppercase">TARGET AADHAAR</span>
                    <span className="text-slate-800 text-sm font-semibold">{result.aadhaarNumber}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-slate-400 block text-[9px] font-bold uppercase">SEEDED BANK</span>
                    <span className="text-slate-800 text-sm font-semibold flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-teal-600" />
                      {result.bankName}
                    </span>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-slate-400 block text-[9px] font-bold uppercase">MAPPING STAMP DATE</span>
                    <span className="text-slate-800 text-sm font-semibold">{result.seedingDate}</span>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-slate-400 block text-[9px] font-bold uppercase">CUSTODIAN GATEWAY ID</span>
                    <span className="text-slate-800 text-sm font-semibold">{result.custodianCode}</span>
                  </div>
                </div>

                {/* Simulated Bank Update Workflow */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="p-4 bg-teal-50/50 border border-teal-100/50 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 block uppercase font-sans">EDUCATION SIMULATOR ACTION</span>
                      <h5 className="text-xs font-bold text-slate-800 uppercase font-sans">Simulate Local Bank Seeding Form Request</h5>
                      <p className="text-[10px] text-slate-500 font-sans mt-0.5 font-medium leading-relaxed">
                        Toggle the electronic DBT Flag representing a student visiting the branch to change consent.
                      </p>
                    </div>

                    <button
                      onClick={toggleConsent}
                      className="px-4 py-2 bg-teal-600 hover:bg-[#003366] text-white font-sans text-xs font-bold rounded-xl cursor-pointer transition-all shadow-sm shrink-0"
                    >
                      {result.status === 'ACTIVE' ? 'DISABLE DBT FLAGS' : 'SUBMIT SEEDING FORM'}
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-[250px] flex flex-col justify-center items-center text-center gap-2">
                <HelpCircle className="w-12 h-12 text-slate-300 animate-pulse" />
                <span className="text-sm font-bold text-slate-400">Database Shield Idle</span>
                <span className="text-xs text-slate-500 max-w-sm font-sans leading-relaxed">
                  Please submit a 12-digit Aadhaar query on the left console to retrieve active clearing-house mapping records.
                </span>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-sans text-slate-400 font-semibold">
            <span>MAPPER QUERY COUNT: 009212/DAY</span>
            <span>LAST SYNCHRONIZATION: JUST NOW</span>
          </div>
        </div>

      </div>

    </div>
  );
}
