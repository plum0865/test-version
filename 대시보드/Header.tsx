"use client";

import { Cloud, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      window.location.reload();
    }, 800);
  };

  return (
    <header className="border-b border-slate-700/60 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* 왼쪽: 로고 + 타이틀 */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg leading-none tracking-tight">
              GCP Billing Dashboard
            </h1>
            <p className="text-slate-400 text-xs mt-0.5">Google Cloud Platform · 비용 분석</p>
          </div>
        </div>

        {/* 오른쪽: 날짜 + 새로고침 */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-slate-300 text-sm font-medium">2025년 3월</p>
            <p className="text-slate-500 text-xs">마지막 업데이트: 방금 전</p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">새로고침</span>
          </button>
        </div>
      </div>
    </header>
  );
}
