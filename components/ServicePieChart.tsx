"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// 데이터 인터페이스 정의 (mockData 의존성 제거하여 더 안전하게 만듦)
interface ServiceCost {
  service?: string;
  name?: string;
  cost?: number;
  value?: number;
  percentage?: number;
  color?: string;
}

interface ServicePieChartProps {
  data: ServiceCost[];
}

// 커스텀 툴팁 (데이터 유무 확인 로직 추가)
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    const name = d.name || d.service || "미분류";
    const cost = Number(d.value || d.cost || 0);
    
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-2xl">
        <p className="text-white font-semibold text-sm">{name}</p>
        <p className="text-slate-300 text-sm mt-1">
          ₩{cost.toLocaleString()} ({d.percentage || 0}%)
        </p>
      </div>
    );
  }
  return null;
};

// 커스텀 레이블
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const displayPercent = percentage || 0;
  if (displayPercent < 6) return null;

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={600}>
      {`${displayPercent}%`}
    </text>
  );
};

export default function ServicePieChart({ data = [] }: ServicePieChartProps) {
  // 데이터가 없을 경우 표시할 기본값
  const safeData = data.length > 0 ? data : [{ name: "데이터 없음", value: 0, color: "#334155" }];

  return (
    <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5 shadow-xl h-full">
      <div className="mb-4">
        <h2 className="text-white font-semibold text-base">항목별 지출 비중</h2>
        <p className="text-slate-400 text-sm mt-0.5">실시간 구글 시트 데이터</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* 파이 차트 */}
        <div className="w-full h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={safeData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                dataKey={(d) => Number(d.value || d.cost || 0)} // 데이터 키 안전하게 지정
                labelLine={false}
                label={renderLabel}
              >
                {safeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || "#3b82f6"} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 범례 리스트 */}
        <div className="w-full space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
          {safeData.map((item, index) => {
            const name = item.name || item.service || "미분류";
            const cost = Number(item.value || item.cost || 0);
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color || "#3b82f6" }}
                  />
                  <span className="text-slate-300 text-xs truncate max
