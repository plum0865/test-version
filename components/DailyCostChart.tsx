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

interface DailyCostChartProps {
  data: any[]; // 타입을 유연하게 변경
}

// 커스텀 툴팁 (비용이 없을 때 방어 코드 추가)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-2xl">
        <p className="text-slate-400 text-xs mb-2 font-medium">{label}</p>
        {payload.map((entry: any) => {
          const val = Number(entry.value || 0);
          return (
            <div key={entry.name} className="flex items-center gap-2 text-sm">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-300">
                {entry.name === "cost" ? "실제 지출" : "예측 지출"}:
              </span>
              <span className="text-white font-semibold">
                ₩{val.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export default function DailyCostChart({ data = [] }: DailyCostChartProps) {
  // 데이터 가공: 값이 숫자인지 확인하고 안전하게 변환
  const chartData = (data || []).map((d) => {
    const rawCost = Number(d.amount || d.cost || 0);
    const rawForecast = Number(d.forecast || rawCost * 1.05); // 예측값이 없으면 5% 증액 가정

    return {
      date: d.date || "미정",
      cost: rawCost > 0 ? rawCost : null,
      forecast: rawForecast,
    };
  });

  return (
    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5 shadow-xl">
      <div className="mb-6">
        <h2 className="text-white font-semibold text-base">일별 지출 추이</h2>
        <p className="text-slate-400 text-sm mt-0.5">구글 시트 실시간 데이터 반영 (KRW)</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
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

          <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.5} />

          <XAxis
            dataKey="date"
            stroke="#64748B"
            tick={{ fill: "#
