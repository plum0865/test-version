import React from 'react';

export default function SummaryCard({ summary }: any) {
  const s = summary || { totalCost: 0, monthlyForecast: 0, activeServices: 0 };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 shadow-xl">
        <p className="text-slate-400 text-sm mb-1">총 지출 현황</p>
        <p className="text-3xl font-bold text-white">₩{(s.totalCost || 0).toLocaleString()}</p>
      </div>
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 shadow-xl">
        <p className="text-slate-400 text-sm mb-1">이번 달 예상</p>
        <p className="text-3xl font-bold text-white">₩{(s.monthlyForecast || 0).toLocaleString()}</p>
      </div>
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 shadow-xl">
        <p className="text-slate-400 text-sm mb-1">지출 항목 수</p>
        <p className="text-3xl font-bold text-white">{(s.activeServices || 0)}개</p>
      </div>
    </div>
  );
}
