const SPREADSHEET_ID = 'https://docs.google.com/spreadsheets/d/1FBegzWOSgYkQIopTk5AzoMHkWsYdMymDq1LcmvtLScY/edit?gid=0'; 
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json`;

async function fetchSheetData() {
  try {
    const response = await fetch(SHEET_URL);
    const text = await response.text();
    
    // 데이터가 정상적인지 확인 (구글 시트 응답은 항상 이 문구로 시작함)
    if (!text.includes('google.visualization.Query.setResponse')) {
        throw new Error("시트가 공개되지 않았거나 ID가 틀립니다.");
    }

    const jsonText = text.substring(47).slice(0, -2);
    const json = JSON.parse(jsonText);
    return json.table.rows;
  } catch (e) {
    console.error(e);
    return []; // 에러 시 빈 배열 반환
  }
}

// 1. 일별 지출 현황 (데이터 없을 시 가짜 데이터라도 보여줌)
export async function getDailyCosts() {
  const rows = await fetchSheetData();
  if (rows.length === 0) return [{ date: '데이터 없음', amount: 0 }];
  return rows.map((row: any) => ({
    date: row.c[0]?.v || '',
    amount: row.c[1]?.v || 0
  }));
}

// 2. 항목별 지출 비율
export async function getServiceCosts() {
  const rows = await fetchSheetData();
  if (rows.length === 0) return [{ name: '데이터 없음', value: 1 }];
  return rows.map((row: any) => ({
    name: row.c[2]?.v || '기타',
    value: row.c[3]?.v || 0
  }));
}

// 3. 상단 요약 정보
export async function getBillingSummary() {
  const rows = await fetchSheetData();
  const total = rows.reduce((acc: number, row: any) => acc + (Number(row.c[1]?.v) || 0), 0);
  
  return {
    totalCost: total,
    monthlyForecast: total,
    activeServices: rows.length > 0 ? new Set(rows.map((r: any) => r.c[2]?.v)).size : 0,
    previousMonthComparison: 0
  };
}
