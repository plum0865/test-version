export default function SummaryCard({ summary }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* 이번 달 누적 비용 */}
      <div className="bg-[#1e293b]/50 p-6 rounded-2xl border border-slate-700/50 relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <p className="text-slate-400 text-sm font-medium">이번 달 누적 비용</p>
          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
            <span className="text-xl">$</span> 
          </div>
        </div>
        <h3 className="text-3xl font-bold text-white mb-2">${summary.totalCost.toLocaleString()}</h3>
        <p className="text-red-400 text-sm flex items-center gap-1">
          ↑ 전월 대비 +15.6%
        </p>
      </div>
      
      {/* ... 나머지 카드들도 같은 패턴으로 작성 ... */}
    </div>
  );
}
