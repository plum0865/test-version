"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { ServiceCost } from "@/lib/mockData";

interface ServicePieChartProps {
  data: ServiceCost[];
}

// 커스텀 툴팁
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-2xl">
        <p className="text-white font-semibold text-sm">{d.service}</p>
        <p className="text-slate-300 text-sm mt-1">
          ${d.cost.toLocaleString()} ({d.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

// 커스텀 레이블 (파이 위에 % 표시)
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percentage < 6) return null; // 너무 작은 조각은 레이블 숨김

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
      {`${percentage}%`}
    </text>
  );
};

export default function ServicePieChart({ data }: ServicePieChartProps) {
  return (
    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5 shadow-xl">
      {/* 카드 헤더 */}
      <div className="mb-4">
        <h2 className="text-white font-semibold text-base">서비스별 비용 비중</h2>
        <p className="text-slate-400 text-sm mt-0.5">2025년 3월 · 누적 기준</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* 파이 차트 */}
        <div className="w-full lg:w-1/2 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={95}
                innerRadius={45}
                dataKey="cost"
                labelLine={false}
                label={renderLabel}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 범례 (서비스 목록) */}
        <div className="w-full lg:w-1/2 space-y-2.5">
          {data.map((item) => (
            <div key={item.service} className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {/* 색상 점 */}
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-300 text-sm">{item.service}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-xs">{item.percentage}%</span>
                <span className="text-white text-sm font-medium w-20 text-right">
                  ${item.cost.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
