// 1. 본인의 시트 ID를 여기에 넣으세요!
const SPREADSHEET_ID = '여기에_시트_ID_문자열만_넣으세요'; 
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json`;

async function fetchSheetData() {
  try {
    const response = await fetch(SHEET_URL, { cache: 'no-store' }); // 캐시 방지
    const text = await response.text();
    
    // 응답 데이터가 구글 시트 형식인지 확인
    if (!text.includes('google.visualization.Query.setResponse')) {
      console.error("데이터 형식 오류");
      return [];
    }

    const jsonText = text.substring(47).slice(0, -2);
    const json = JSON.parse(jsonText);
    return json.table.rows || [];
  } catch (e) {
    console.error("Fetch 에러:", e);
    return [];
  }
}

export async function getDailyCosts() {
  const rows = await fetchSheetData();
  if (rows.length < 2) return [{ date: '데이터 없음', amount: 0 }];
  
  // 첫 번째 줄이 제목일 수 있으므로 두 번째 줄(index 1)부터 가져오기
  return rows.slice(1).map((row: any) => ({
    date: row.c[0]?.v || 'N/A',
    amount: typeof row.c[1]?.v === 'number' ? row.c[1]?.v : 0
  }));
}

export async function getServiceCosts() {
  const rows = await fetchSheetData();
  if (rows.length < 2) return [{ name: '항목 없음', value: 1 }];
  
  return rows.slice(1).map((row: any) => ({
    name: row.c[2]?.v || '기타',
    value: typeof row.c[3]?.v === 'number' ? row.c[3]?.v : 0
  }));
}

export async function getBillingSummary() {
  const rows = await fetchSheetData();
  // 데이터가 없을 때 기본값 반환
  if (rows.length < 2) return { totalCost: 0, monthlyForecast: 0, activeServices: 0, previousMonthComparison: 0 };

  const total = rows.slice(1).reduce((acc: number, row: any) => {
    const val = row.c[1]?.v;
    return acc + (typeof val === 'number' ? val : 0);
  }, 0);
  
  return {
    totalCost: total,
    monthlyForecast: total,
    activeServices: new Set(rows.slice(1).map((r: any) => r.c[2]?.v)).size,
    previousMonthComparison: 0
  };
}
