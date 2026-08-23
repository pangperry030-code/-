import type { Metadata } from 'next';
import './globals.css';
import { assetPath } from './paths';

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zunyi-turning-point-1935.pangperry030.chatgpt.site/',
);
const socialImage = new URL(assetPath('/og.png'), siteUrl).toString();
const title = '在答案出现以前｜遵义会议历史情境数字展';
const description =
  '沿七座互动展厅、革命文物特展、权威档案馆与光明终章，在同一站点中自主探索遵义会议这一生死攸关的伟大转折。';

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
        url: socialImage,
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
    images: [socialImage],
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
