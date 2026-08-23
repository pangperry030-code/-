import type { Metadata } from 'next';
import './globals.css';

const siteUrl = new URL('https://zunyi-turning-point-1935.pangperry030.chatgpt.site');
const title = '在答案出现以前｜遵义会议历史情境数字展';
const description =
  '通过八座互动展厅、便签内纵向深读与独立革命文物特别展，自主探索遵义会议这一生死攸关的伟大转折。';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: '遵义·决策现场',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1733,
        height: 907,
        alt: '在答案出现以前——遵义会议历史情境数字展',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og.png'],
  },
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
