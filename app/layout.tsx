import type { Metadata } from "next";
import "./globals.css"; // 디자인 엔진(Tailwind)을 불러오는 핵심 줄!

export const metadata: Metadata = {
  title: "마케터의 밤 지출 현황",
  description: "실시간 구글 시트 연동 대시보드",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      {/* className="bg-slate-950"를 추가하여 전체 배경색을 어둡게 고정합니다 */}
      <body className="bg-slate-950 antialiased">
        {children}
      </body>
    </html>
  );
}
