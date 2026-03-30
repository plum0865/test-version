import { getDailyCosts, getServiceCosts, getBillingSummary } from "../lib/fetchBillingData";
import Header from '../components/Header';
import SummaryCard from '../components/SummaryCard';
import DailyCostChart from '../components/DailyCostChart';
import ServicePieChart from '../components/ServicePieChart';

export default async function DashboardPage() {
  // 데이터를 가져옵니다.
  const [dailyCosts, serviceCosts, summary] = await Promise.all([
    getDailyCosts(),
    getServiceCosts(),
    getBillingSummary(),
  ]);

  // [중요] 데이터 에러 방어: summary가 없을 경우 기본값 설정
  const safeSummary = summary || { 
    totalCost: 0, 
    monthlyForecast: 0, 
    activeServices: 0, 
    previousMonthComparison: 0 
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* 배경 효과 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-cyan-600/8 blur-3xl" />
      </div>

      <Header />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* 안내 배너 */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm w-fit">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          구글 스프레드시트 실시간 데이터 연결됨
        </div>

        {/* 요약 카드 */}
        <SummaryCard summary={safeSummary} />

        {/* 차트 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <DailyCostChart data={dailyCosts || []} />
          </div>
          <div className="lg:col-span-2">
            <ServicePieChart data={serviceCosts || []} />
          </div>
        </div>

        {/* 상세 테이블 */}
        <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5 shadow-xl">
          <h2 className="text-white font-semibold text-base mb-4">지출 상세 내역</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 text-left border-b border-slate-700/50">
                  <th className="pb-3 pr-4 font-medium">항목</th>
                  <th className="pb-3 pr-4 font-medium text-right">금액</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {(serviceCosts || []).map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-slate-700/20 transition-colors">
                    <td className="py-3 pr-4">
                      <span className="text-slate-200">{item.name || item.service || '미분류'}</span>
                    </td>
                    <td className="py-3 pr-4 text-right text-white font-medium">
                      ₩{(Number(item.value || item.cost || 0)).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center text-slate-600 text-xs pb-4">
          마케터의 밤 지출 현황 대시보드 · {new Date().toLocaleDateString("ko-KR")}
        </div>
      </main>
    </div>
  );
}
