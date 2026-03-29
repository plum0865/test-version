"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { DailyCost } from "@/lib/mockData";

interface DailyCostChartProps {
  data: DailyCost[];
}

// 커스텀 툴팁 (차트에 마우스를 올렸을 때 보이는 팝업)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-2xl">
        <p className="text-slate-400 text-xs mb-2 font-medium">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.name} className="flex items-center gap-2 text-sm">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-300">
              {entry.name === "cost" ? "실제 비용" : "예측 비용"}:
            </span>
            <span className="text-white font-semibold">
              ${entry.value?.toFixed(2) ?? "—"}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function DailyCostChart({ data }: DailyCostChartProps) {
  // 비용이 0인 날(미래)은 실제 비용 제거
  const chartData = data.map((d) => ({
    ...d,
    cost: d.cost > 0 ? d.cost : null,
  }));

  return (
    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5 shadow-xl">
      {/* 카드 헤더 */}
      <div className="mb-6">
        <h2 className="text-white font-semibold text-base">일별 비용 추이</h2>
        <p className="text-slate-400 text-sm mt-0.5">2025년 3월 · 일별 실제 및 예측 비용 (USD)</p>
      </div>

      {/* Recharts 차트 */}
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
          {/* 그라데이션 정의 */}
          <defs>
            <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F8EF7" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#4F8EF7" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34D399" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* 배경 격자선 */}
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.5} />

          {/* X축 (날짜) */}
          <XAxis
            dataKey="date"
            stroke="#64748B"
            tick={{ fill: "#94A3B8", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            interval={4}
          />

          {/* Y축 (비용) */}
          <YAxis
            stroke="#64748B"
            tick={{ fill: "#94A3B8", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `$${v}`}
            width={55}
          />

          {/* 툴팁 */}
          <Tooltip content={<CustomTooltip />} />

          {/* 범례 */}
          <Legend
            wrapperStyle={{ paddingTop: "16px" }}
            formatter={(value) =>
              value === "cost" ? (
                <span style={{ color: "#94A3B8", fontSize: "12px" }}>실제 비용</span>
              ) : (
                <span style={{ color: "#94A3B8", fontSize: "12px" }}>예측 비용</span>
              )
            }
          />

          {/* 예측 비용 Area */}
          <Area
            type="monotone"
            dataKey="forecast"
            stroke="#34D399"
            strokeWidth={1.5}
            strokeDasharray="5 3"
            fill="url(#forecastGradient)"
            dot={false}
            connectNulls
          />

          {/* 실제 비용 Area */}
          <Area
            type="monotone"
            dataKey="cost"
            stroke="#4F8EF7"
            strokeWidth={2}
            fill="url(#costGradient)"
            dot={false}
            connectNulls={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
