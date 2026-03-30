const SPREADSHEET_ID = '여기에_복사한_시트_ID를_넣으세요'; // 시트 ID로 교체!!
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json`;

async function fetchSheetData() {
  const response = await fetch(SHEET_URL);
  const text = await response.text();
  // 구글 시트 특유의 JSON 형식을 정리하는 코드입니다.
  const json = JSON.parse(text.substring(47).slice(0, -2));
  return json.table.rows;
}

// 1. 일별 지출 현황 가져오기
export async function getDailyCosts() {
  const rows = await fetchSheetData();
  // 시트의 A열(날짜), B열(금액)을 가져온다고 가정합니다.
  return rows.map((row: any) => ({
    date: row.c[0]?.v || '',
    amount: row.c[1]?.v || 0
  }));
}

// 2. 항목별 지출 비율 가져오기
export async function getServiceCosts() {
  const rows = await fetchSheetData();
  // 시트의 C열(항목), D열(금액)을 가져온다고 가정합니다.
  return rows.map((row: any) => ({
    name: row.c[2]?.v || '기타',
    value: row.c[3]?.v || 0
  }));
}

// 3. 상단 요약 정보 계산하기
export async function getBillingSummary() {
  const rows = await fetchSheetData();
  
  // 전체 금액 합계 계산 로직 (B열의 모든 값을 더함)
  const total = rows.reduce((acc: number, row: any) => acc + (row.c[1]?.v || 0), 0);
  
  return {
    totalCost: total,
    monthlyForecast: total * 1.1, // 예시: 현재 지출의 110% 예측
    activeServices: new Set(rows.map((r: any) => r.c[2]?.v)).size, // 항목 수
    previousMonthComparison: -5.4 // 전월 대비 (시트에 있다면 가져오기 가능)
  };
}
