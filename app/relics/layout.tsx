import type { Metadata } from 'next';
import { assetPath } from '../paths';

const title = '见物，见人｜遵义会议纪念馆革命文物特别展';
const description = '以馆藏抽屉、检视光镜、文物档案签与历史时间轴，阅读八件遵义会议纪念馆革命文物。';
const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zunyi-turning-point-1935.pangperry030.chatgpt.site/',
);
const image = new URL(assetPath('/artifacts/clock.png'), siteUrl).toString();

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    images: [{ url: image, alt: '遵义会议室挂钟' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [image],
  },
};

export default function RelicsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
