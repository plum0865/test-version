"use client";

import { TrendingUp, TrendingDown, DollarSign, BarChart3, Calendar } from "lucide-react";
import type { BillingSummary } from "@/lib/mockData";

// 숫자를 달러 형식으로 포맷하는 함수
function formatCost(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

interface SummaryCardProps {
  summary: BillingSummary;
}

export default function SummaryCard({ summary }: SummaryCardProps) {
  // 전월 대비 증감률 계산
  const changePercent =
    ((summary.totalCost - summary.previousMonthCost) / summary.previousMonthCost) * 100;
  const isIncrease = changePercent > 0;

  const cards = [
    {
      label: "이번 달 누적 비용",
      value: formatCost(summary.totalCost),
      sub: `전월 대비 ${isIncrease ? "+" : ""}${changePercent.toFixed(1)}%`,
      icon: DollarSign,
      trend: isIncrease ? "up" : "down",
      color: "from-blue-600 to-blue-500",
      glow: "shadow-blue-500/20",
    },
    {
      label: "전월 청구 금액",
      value: formatCost(summary.previousMonthCost),
      sub: "2025년 2월 최종 확정",
      icon: Calendar,
      trend: "neutral",
      color: "from-slate-600 to-slate-500",
      glow: "shadow-slate-500/10",
    },
    {
      label: "월말 예상 비용",
      value: formatCost(summary.forecastedCost),
      sub: "현재 추세 기반 예측",
      icon: BarChart3,
      trend: "warn",
      color: "from-amber-600 to-orange-500",
      glow: "shadow-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className={`relative overflow-hidden rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5 shadow-xl ${card.glow}`}
          >
            {/* 배경 그라데이션 광택 */}
            <div
              className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${card.color} opacity-10 blur-xl`}
            />

            <div className="flex items-start justify-between mb-4">
              <p className="text-slate-400 text-sm font-medium">{card.label}</p>
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
            </div>

            <p className="text-white text-2xl font-bold tracking-tight mb-1">{card.value}</p>

            <div className="flex items-center gap-1.5 mt-2">
              {card.trend === "up" && <TrendingUp className="w-3.5 h-3.5 text-red-400" />}
              {card.trend === "down" && <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />}
              <p className={`text-xs ${
                card.trend === "up" ? "text-red-400" :
                card.trend === "down" ? "text-emerald-400" :
                card.trend === "warn" ? "text-amber-400" :
                "text-slate-400"
              }`}>
                {card.sub}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
