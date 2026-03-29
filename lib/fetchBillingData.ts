// ============================================================
// fetchBillingData.ts
// 데이터를 가져오는 함수들을 모아둔 파일입니다.
//
// 현재: mockData.ts의 가짜 데이터를 반환
// 나중에: 아래 TODO 부분을 BigQuery API 호출로 교체하세요.
// ============================================================

import {
  dailyCostData,
  serviceCostData,
  billingSummary,
  type DailyCost,
  type ServiceCost,
  type BillingSummary,
} from "./mockData";

// ─────────────────────────────────────────
// 일별 비용 데이터 가져오기
// ─────────────────────────────────────────
export async function getDailyCosts(): Promise<DailyCost[]> {
  // TODO: BigQuery 연결 시 아래 주석을 해제하고 mock 데이터 반환을 삭제하세요.
  //
  // const { BigQuery } = await import("@google-cloud/bigquery");
  // const bigquery = new BigQuery({ projectId: process.env.GCP_PROJECT_ID });
  //
  // const query = `
  //   SELECT
  //     DATE(usage_start_time) as date,
  //     SUM(cost) as cost
  //   FROM \`${process.env.BQ_DATASET}.${process.env.BQ_TABLE}\`
  //   WHERE DATE(usage_start_time) >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
  //   GROUP BY date
  //   ORDER BY date ASC
  // `;
  //
  // const [rows] = await bigquery.query(query);
  // return rows.map(row => ({ date: row.date, cost: row.cost }));

  // 현재는 가짜 데이터를 반환 (실제 API 호출처럼 약간의 딜레이 추가)
  await new Promise((resolve) => setTimeout(resolve, 300));
  return dailyCostData;
}

// ─────────────────────────────────────────
// 서비스별 비용 데이터 가져오기
// ─────────────────────────────────────────
export async function getServiceCosts(): Promise<ServiceCost[]> {
  // TODO: BigQuery 연결 시 이 부분을 교체하세요.
  //
  // const query = `
  //   SELECT
  //     service.description as service,
  //     SUM(cost) as cost
  //   FROM \`${process.env.BQ_DATASET}.${process.env.BQ_TABLE}\`
  //   WHERE DATE(usage_start_time) >= DATE_TRUNC(CURRENT_DATE(), MONTH)
  //   GROUP BY service
  //   ORDER BY cost DESC
  // `;

  await new Promise((resolve) => setTimeout(resolve, 300));
  return serviceCostData;
}

// ─────────────────────────────────────────
// 요약 정보 가져오기
// ─────────────────────────────────────────
export async function getBillingSummary(): Promise<BillingSummary> {
  // TODO: BigQuery 연결 시 이 부분을 교체하세요.

  await new Promise((resolve) => setTimeout(resolve, 200));
  return billingSummary;
}
