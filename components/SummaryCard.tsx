import React from 'react';

interface SummaryProps {
  summary: {
    totalCost: number;
    monthlyForecast: number;
    activeServices: number;
    previousMonthComparison: number;
  };
}

const SummaryCard = ({ summary }: SummaryProps) => {
  // 데이터가 아예 안 넘어올 경우를 대비한 안전장치
  const data = summary || {
    totalCost: 0,
    monthlyForecast: 0,
    activeServices: 0,
    previousMonthComparison: 0
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 총 지출 */}
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
        <p className="text-slate-400 text-sm font-medium mb-1">총 지출 현황</p>
        <h3 className="text-2xl font-bold text-white">
          ₩{(data.totalCost || 0).toLocaleString()}
        </h3>
      </div>

      {/* 예상 지출 */}
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
        <p className="text-slate-400 text-sm font-medium mb-1">이번 달 예상</p>
        <h3 className="text-2xl font-bold text-white">
          ₩{(data.monthlyForecast || 0).toLocaleString()}
        </h3>
      </div>

      {/* 지출 항목 수 */}
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
        <p className="text-slate-400 text-sm font-medium mb-1">지출 항목 수</p>
        <h3 className="text-2xl font-bold text-white">
          {(data.activeServices || 0)}개
        </h3>
      </div>
    </div>
  );
};

export default SummaryCard;
