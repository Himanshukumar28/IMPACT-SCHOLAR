import React from 'react';
import { NEWS } from '../data';
import { Newspaper, BellRing, TrendingUp, CircleAlert, FileChartPie, Radio, Landmark } from 'lucide-react';

export default function NewsAndReports() {
  const statistics = [
    { label: 'DISBURSEMENT RATE', value: '92.4%', change: '+3.1%', desc: 'Successful transfers via Aadhaar bridge.' },
    { label: 'PFMS TRANSIT REJECTIONS', value: '24.1%', change: '-4.8%', desc: 'Failures due to inactive bank seeding.' },
    { label: 'TOTAL DBT VALUE 2026', value: '₹3,400 Cr', change: 'Record High', desc: 'Sovereign funds released to scholars.' },
  ];

  return (
    <div className="space-y-10">
      
      {/* Banner */}
      <div className="bg-gradient-to-br from-[#004a8d] to-[#003366] p-8 rounded-3xl relative overflow-hidden shadow-xl text-white">
        <div className="absolute top-0 left-0 w-full h-1.5 flex">
          <div className="w-1/3 h-full bg-[#f97316]"></div>
          <div className="w-1/3 h-full bg-white"></div>
          <div className="w-1/3 h-full bg-[#22c55e]"></div>
        </div>
        <div className="absolute top-0 right-0 text-[10px] font-mono bg-white/10 text-white border-b border-l border-white/20 px-3 py-1.5 rounded-bl">
          NEWS TELEMETRY // STREAM
        </div>
        <h2 className="text-2xl font-display font-extrabold text-white mb-2 tracking-tight">
          Reports, News, & Public Telemetry
        </h2>
        <p className="text-blue-100 text-sm max-w-3xl leading-relaxed font-sans">
          National public statistics on Direct Benefit Transfer (DBT) implementation and news updates from the Reserve Bank of India, PFMS, and central scholarship bodies.
        </p>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        {statistics.map((stat, idx) => (
          <div 
            key={idx}
            className="bg-white border border-slate-200 p-6 rounded-3xl relative overflow-hidden shadow-sm"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal-500/5 to-transparent pointer-events-none"></div>
            
            <span className="text-[9px] text-slate-400 font-bold tracking-wider block uppercase">{stat.label}</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-display font-extrabold text-[#003366]">{stat.value}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                stat.change.startsWith('+') || stat.change.includes('Record')
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-medium font-sans leading-relaxed">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* Chart and Bulletins */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Custom SVG Data Visualization */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 rounded-3xl space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <FileChartPie className="w-5 h-5 text-teal-600" />
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans">
                Historical Rejection Source Matrix
              </span>
            </div>
            <span className="text-[9px] font-bold text-slate-400 font-sans uppercase">AUDITED PFMS 2025/2026 DATA</span>
          </div>

          {/* SVG Custom Graph */}
          <div className="space-y-4 font-sans text-xs text-slate-600">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <p className="text-[10px] text-teal-700 font-extrabold mb-3 flex items-center gap-1.5 font-sans uppercase">
                <Radio className="w-4 h-4 text-teal-600 animate-pulse" />
                <span>PRIMARY CAUSE FOR TRANSACTION REJECTIONS</span>
              </p>
              
              <div className="space-y-4 pt-2">
                
                {/* Stat 1 */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1.5 font-sans font-bold text-slate-700">
                    <span>Aadhaar Linked but Seeding Incomplete</span>
                    <span className="text-pink-600 font-extrabold">58%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>

                {/* Stat 2 */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1.5 font-sans font-bold text-slate-700">
                    <span>Inactive Bank Account (No transaction)</span>
                    <span className="text-blue-600 font-extrabold">22%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '22%' }}></div>
                  </div>
                </div>

                {/* Stat 3 */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1.5 font-sans font-bold text-slate-700">
                    <span>Explicit DBT flag locked by branch manager</span>
                    <span className="text-teal-600 font-extrabold">15%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>

                {/* Stat 4 */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1.5 font-sans font-bold text-slate-700">
                    <span>Incorrect Bank Routing (NSP vs Bank mismatch)</span>
                    <span className="text-slate-500 font-extrabold">5%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-slate-400 to-slate-500 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                </div>

              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-2 text-slate-600 shadow-inner">
              <CircleAlert className="w-4.5 h-4.5 text-blue-600 shrink-0" />
              <p className="text-[10px] leading-relaxed font-sans font-medium">
                <span className="font-extrabold text-blue-800 font-sans uppercase text-[9px] tracking-wider block">ANALYSIS RULING:</span> Over <span className="text-blue-700 font-extrabold">73% of transaction blocks</span> are entirely user-correctable by visiting branches and verifying active mapping status.
              </p>
            </div>
          </div>
        </div>

        {/* News & Bulletins list */}
        <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl space-y-6 shadow-sm">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-200">
            <Newspaper className="w-5 h-5 text-teal-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans">
              News bulletins & Alerts
            </span>
          </div>

          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin">
            {NEWS.map((item) => (
              <div 
                key={item.id}
                className="border border-slate-100 bg-slate-50/50 p-4 rounded-2xl space-y-2 relative"
              >
                <div className="flex items-center justify-between text-[10px] font-sans text-slate-400 font-bold">
                  <span>{item.source}</span>
                  <span>{item.date}</span>
                </div>

                <div className="flex items-start gap-2">
                  {item.category === 'Alert' ? (
                    <BellRing className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-teal-500 mt-1 flex-shrink-0" />
                  )}
                  <h4 className="text-xs font-extrabold text-slate-800 hover:text-teal-600 transition-colors leading-snug cursor-pointer font-sans">
                    {item.title}
                  </h4>
                </div>

                <p className="text-slate-500 text-[11px] leading-relaxed pl-6 font-medium font-sans">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
