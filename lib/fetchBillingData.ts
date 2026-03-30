// 1. ID 양옆에 공백이나 /edit 가 없는지 꼭 확인!
const SPREADSHEET_ID = '1FBegzWOSgYkQIopTk5AzoMHkWsYdMymDq1LcmvtLScY'; 
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json`;

async function fetchSheetData() {
  try {
    const response = await fetch(SHEET_URL, { next: { revalidate: 0 } }); 
    const text = await response.text();
    
    if (!text.includes('google.visualization.Query.setResponse')) {
      return [];
    }

    const jsonText = text.substring(47).slice(0, -2);
    const json = JSON.parse(jsonText);
    return json.table.rows || [];
  } catch (e) {
    return [];
  }
}

export async function getDailyCosts() {
  const rows = await fetchSheetData();
  if (!rows || rows.length === 0) return [{ date: '데이터 없음', amount: 0 }];
  
  return rows.map((row: any) => ({
    date: String(row.c[0]?.v || 'N/A'),
    amount: Number(row.c[1]?.v || 0)
  }));
}

export async function getServiceCosts() {
  const rows = await fetchSheetData();
  if (!rows || rows.length === 0) return [{ name: '항목 없음', value: 1 }];
  
  return rows.map((row: any) => ({
    name: String(row.c[2]?.v || '기타'),
    value: Number(row.c[3]?.v || 0)
  }));
}

export async function getBillingSummary() {
  const rows = await fetchSheetData();
  
  const total = rows.reduce((acc: number, row: any) => {
    const val = Number(row.c[1]?.v);
    return acc + (isNaN(val) ? 0 : val);
  }, 0);
  
  return {
    totalCost: total || 0,
    monthlyForecast: total || 0,
    activeServices: rows.length > 0 ? new Set(rows.map((r: any) => r.c[2]?.v)).size : 0,
    previousMonthComparison: 0
  };
}
