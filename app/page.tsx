// ============================================================
// app/page.tsx  ← 메인 대시보드 페이지
// Next.js App Router에서 이 파일이 "/" 경로를 담당합니다.
// ============================================================

import { getDailyCosts, getServiceCosts, getBillingSummary } from "@/lib/fetchBillingData";
import Header from '../components/Header';
import SummaryCard from '../components/SummaryCard';
import DailyCostChart from '../components/DailyCostChart';
import ServicePieChart from '../components/ServicePieChart';

// 서버 컴포넌트 (데이터 fetching은 서버에서)
export default async function DashboardPage() {
  // 세 가지 데이터를 동시에 가져옵니다 (Promise.all = 병렬 요청으로 빠름)
  const [dailyCosts, serviceCosts, summary] = await Promise.all([
    getDailyCosts(),
    getServiceCosts(),
    getBillingSummary(),
  ]);

  return (
    // 전체 페이지 배경
    <div className="min-h-screen bg-slate-950">
      {/* 배경 그라데이션 효과 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-cyan-600/8 blur-3xl" />
      </div>

      {/* 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* 데이터 출처 안내 배너 */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm w-fit">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          현재 Mock 데이터를 사용 중입니다 · BigQuery 연결 후 실제 데이터로 전환하세요
        </div>

        {/* 요약 카드 3개 */}
        <SummaryCard summary={summary} />

        {/* 차트 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* 일별 비용 추이 차트 (넓게) */}
          <div className="lg:col-span-3">
            <DailyCostChart data={dailyCosts} />
          </div>

          {/* 서비스별 비중 차트 (좁게) */}
          <div className="lg:col-span-2">
            <ServicePieChart data={serviceCosts} />
          </div>
        </div>

        {/* 서비스별 상세 테이블 */}
        <div className="rounded-2xl bg-slate-800/60 border border-slate-700/50 p-5 shadow-xl">
          <h2 className="text-white font-semibold text-base mb-4">서비스별 상세 내역</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 text-left border-b border-slate-700/50">
                  <th className="pb-3 pr-4 font-medium">서비스</th>
                  <th className="pb-3 pr-4 font-medium text-right">이번 달 비용</th>
                  <th className="pb-3 pr-4 font-medium text-right">비중</th>
                  <th className="pb-3 font-medium">비중 시각화</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {serviceCosts.map((item) => (
                  <tr key={item.service} className="hover:bg-slate-700/20 transition-colors">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-slate-200">{item.service}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-right text-white font-medium">
                      ${item.cost.toLocaleString()}
                    </td>
                    <td className="py-3 pr-4 text-right text-slate-400">
                      {item.percentage}%
                    </td>
                    <td className="py-3">
                      <div className="w-full bg-slate-700/50 rounded-full h-1.5 max-w-[150px]">
                        <div
                          className="h-1.5 rounded-full transition-all"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 푸터 */}
        <div className="text-center text-slate-600 text-xs pb-4">
          GCP Billing Dashboard · Mock Data Mode · {new Date().toLocaleDateString("ko-KR")}
        </div>
      </main>
    </div>
  );
}
