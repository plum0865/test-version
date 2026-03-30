"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-2xl">
        <p className="text-white font-semibold text-sm">{d.name || d.service || "항목"}</p>
        <p className="text-slate-300 text-sm mt-1">₩{Number(d.value || d.cost || 0).toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export default function ServicePieChart({ data = [] }: { data: any[] }) {
  const safeData = data.length > 0 ? data : [{ name: "데이터 없음", value: 1 }];

  return (
    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5 shadow-xl h-full">
      <div className="mb-4">
        <h2 className="text-white font-semibold text-base">지출 항목 비중</h2>
      </div>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={safeData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey={(d) => Number(d.value || d.cost || 0)}
            >
              {safeData.map((entry: any, index: number) => (
                <Cell key={index} fill={entry.color || "#3b82f6"} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
