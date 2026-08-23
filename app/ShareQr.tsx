'use client';

import { useEffect, useState } from 'react';

const publicUrl = 'https://zunyi-turning-point-1935.pangperry030.chatgpt.site/';

export default function ShareQr() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <button className="share-qr-launcher" onClick={() => setOpen(true)} type="button" aria-label="打开扫码参观二维码">
        <span aria-hidden="true"><i /><i /><i /></span>
        <b>扫码参观</b>
      </button>

      {open && (
        <div className="share-qr-overlay" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
          <section className="share-qr-dialog" role="dialog" aria-modal="true" aria-labelledby="share-qr-title">
            <button className="share-qr-close" onClick={() => setOpen(false)} type="button" aria-label="关闭二维码">×</button>
            <figure>
              <img src="/share-qr.png" alt="扫码进入遵义会议历史情境数字展" />
            </figure>
            <div className="share-qr-copy">
              <p><span>SCAN TO VISIT</span>手机扫码进入</p>
              <h2 id="share-qr-title">让历史现场，<br />抵达更多屏幕。</h2>
              <p>打开微信扫一扫或手机相机，对准左侧二维码，即可进入“遵义·决策现场”数字展览。</p>
              <div>
                <a href="/share-qr.png" download="遵义决策现场-扫码参观.png">下载高清二维码海报 <span>↓</span></a>
                <button onClick={copyLink} type="button">{copied ? '公开链接已复制' : '复制公开链接'} <span>↗</span></button>
              </div>
              <small>{publicUrl}</small>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
