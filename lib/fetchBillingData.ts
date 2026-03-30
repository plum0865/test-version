// 구글 시트 데이터를 JSON으로 변환해서 가져오는 함수 예시
export async function getBillingSummary() {
  const SPREADSHEET_ID = 'https://docs.google.com/spreadsheets/d/1FBegzWOSgYkQIopTk5AzoMHkWsYdMymDq1LcmvtLScY/edit?gid=0#gid=0';
  const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:json`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    // 구글 시트 특유의 JSON 형식을 정리하는 과정이 필요합니다.
    const json = JSON.parse(text.substr(47).slice(0, -2));
    
    // 시트의 첫 번째 줄(데이터)을 가져와서 요약 정보로 반환
    const row = json.table.rows[0].c;
    return {
      totalCost: row[0].v, // A열: 총 비용
      monthlyForecast: row[1].v, // B열: 예측 비용
      activeServices: row[2].v, // C열: 서비스 수
      previousMonthComparison: row[3].v // D열: 전월 대비
    };
  } catch (error) {
    console.error("데이터 로드 실패:", error);
    return { totalCost: 0, monthlyForecast: 0, activeServices: 0, previousMonthComparison: 0 };
  }
}

// 나머지 getDailyCosts, getServiceCosts 함수도 비슷한 방식으로 수정 가능합니다.
