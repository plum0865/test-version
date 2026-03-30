import type { Metadata } from "next";
import "./globals.css"; // ⭐ 이 줄이 반드시 있어야 디자인이 입혀집니다!

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
      {/* 아래 body 태그에 className이 있는지 꼭 확인하세요! */}
      <body className="bg-slate-950 antialiased">
        {children}
      </body>
    </html>
  );
}
