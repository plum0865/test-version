// ============================================================
// mockData.ts
// 현재는 가짜 데이터를 사용합니다.
// 나중에 BigQuery API를 연결할 때는 fetchBillingData.ts를 수정하세요.
// ============================================================

// 타입 정의 (데이터의 생김새를 TypeScript에게 알려주는 것)
export interface DailyCost {
  date: string;       // 날짜 (예: "2025-01-01")
  cost: number;       // 해당 날 총 비용 (USD)
  forecast?: number;  // 예측 비용 (옵션)
}

export interface ServiceCost {
  service: string;    // 서비스 이름 (예: "BigQuery")
  cost: number;       // 해당 서비스 총 비용
  percentage: number; // 전체 대비 비중 (%)
  color: string;      // 차트에서 쓸 색상
}

export interface BillingSummary {
  totalCost: number;          // 이번 달 총 비용
  previousMonthCost: number;  // 지난 달 총 비용
  forecastedCost: number;     // 월말 예상 비용
  currency: string;           // 통화 단위
  month: string;              // 해당 월
}

// ─────────────────────────────────────────
// 일별 비용 데이터 (최근 30일)
// ─────────────────────────────────────────
export const dailyCostData: DailyCost[] = [
  { date: "03/01", cost: 142.50, forecast: 145 },
  { date: "03/02", cost: 138.20, forecast: 142 },
  { date: "03/03", cost: 165.80, forecast: 160 },
  { date: "03/04", cost: 158.40, forecast: 155 },
  { date: "03/05", cost: 172.60, forecast: 168 },
  { date: "03/06", cost: 189.30, forecast: 185 },
  { date: "03/07", cost: 145.70, forecast: 150 },
  { date: "03/08", cost: 201.40, forecast: 195 },
  { date: "03/09", cost: 218.90, forecast: 210 },
  { date: "03/10", cost: 195.20, forecast: 200 },
  { date: "03/11", cost: 223.50, forecast: 215 },
  { date: "03/12", cost: 241.80, forecast: 235 },
  { date: "03/13", cost: 198.30, forecast: 205 },
  { date: "03/14", cost: 176.40, forecast: 180 },
  { date: "03/15", cost: 256.70, forecast: 248 },
  { date: "03/16", cost: 234.20, forecast: 240 },
  { date: "03/17", cost: 267.90, forecast: 260 },
  { date: "03/18", cost: 289.50, forecast: 280 },
  { date: "03/19", cost: 312.40, forecast: 300 },
  { date: "03/20", cost: 278.60, forecast: 285 },
  { date: "03/21", cost: 245.30, forecast: 250 },
  { date: "03/22", cost: 301.80, forecast: 295 },
  { date: "03/23", cost: 334.20, forecast: 320 },
  { date: "03/24", cost: 298.70, forecast: 305 },
  { date: "03/25", cost: 356.40, forecast: 340 },
  { date: "03/26", cost: 378.90, forecast: 365 },
  { date: "03/27", cost: 342.60, forecast: 350 },
  { date: "03/28", cost: 389.20, forecast: 375 },
  { date: "03/29", cost: 401.50, forecast: 390 },
  { date: "03/30", cost: 0, forecast: 410 }, // 아직 오지 않은 날
];

// ─────────────────────────────────────────
// 서비스별 비용 데이터
// ─────────────────────────────────────────
export const serviceCostData: ServiceCost[] = [
  { service: "BigQuery",         cost: 2341.50, percentage: 34.2, color: "#4F8EF7" },
  { service: "Cloud Run",        cost: 1876.30, percentage: 27.4, color: "#34D399" },
  { service: "Cloud Storage",    cost: 987.60,  percentage: 14.4, color: "#A78BFA" },
  { service: "Compute Engine",   cost: 743.20,  percentage: 10.9, color: "#FB923C" },
  { service: "Cloud SQL",        cost: 521.80,  percentage: 7.6,  color: "#F472B6" },
  { service: "기타",              cost: 373.10,  percentage: 5.5,  color: "#94A3B8" },
];

// ─────────────────────────────────────────
// 요약 카드 데이터
// ─────────────────────────────────────────
export const billingSummary: BillingSummary = {
  totalCost: 6843.50,
  previousMonthCost: 5921.20,
  forecastedCost: 8200.00,
  currency: "USD",
  month: "2025년 3월",
};
