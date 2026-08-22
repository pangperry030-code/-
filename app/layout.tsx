import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '在答案出现以前｜遵义会议历史情境数字展',
  description:
    '以权威史料与社会实践调查为基础，理解遵义会议这一伟大转折何以发生。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
