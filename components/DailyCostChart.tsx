"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-2xl">
        <p className="text-slate-400 text-xs mb-2 font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-300">{entry.name === "cost" ? "실제" : "예측"}:</span>
            <span className="text-white font-semibold">₩{Number(entry.value || 0).toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DailyCostChart({ data = [] }: { data: any[] }) {
  const chartData = (data || []).map((d) => ({
    date: d.date || "미정",
    cost: Number(d.amount || d.cost) > 0 ? Number(d.amount || d.cost) : null,
    forecast: Number(d.forecast || (d.amount || d.cost || 0) * 1.1),
  }));

  return (
    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5 shadow-xl">
      <div className="mb-6">
        <h2 className="text-white font-semibold text-base">일별 지출 추이</h2>
        <p className="text-slate-400 text-sm mt-0.5">구글 시트 실시간 반영 (KRW)</p>
      </div>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₩${(v/10000).toFixed(0)}만`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="cost" stroke="#4F8EF7" fillOpacity={0.1} fill="#4F8EF7" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
