'use client';

import { useState } from 'react';
import type { PointerEvent } from 'react';
import ShareQr from '../ShareQr';

type Artifact = {
  id: string;
  number: string;
  short: string;
  title: string;
  year: string;
  material: string;
  registration: string;
  grade: string;
  size: string;
  images: Array<{ src: string; label: string }>;
  lead: string;
  story: string[];
  reading: string;
  keywords: string[];
};

const artifacts: Artifact[] = [
  {
    id: 'flag',
    number: 'C-01',
    short: '军旗',
    title: '中国工农红军第六军团十八师五十四团军旗',
    year: '1934年',
    material: '丝绸',
    registration: '580781',
    grade: '一级文物',
    size: '长96厘米，宽94厘米',
    images: [{ src: '/artifacts/flag.png', label: '军旗全貌' }],
    lead: '火红葡萄纹丝绸、镰刀斧头与白色五角星，共同保存下一支红军部队的番号与行军记忆。',
    story: [
      '1934年9月26日，红六军团十八师西征到达剑河县属大广一带，与敌军遭遇并发生激战。战后，当地农民陈年贵在战场上获得这面军旗。',
      '1957年，遵义会议纪念馆征集组赴黔东南，从陈年贵手中征购此旗。馆方资料称，这是红军经过贵州保存下来的一面极为珍贵的军旗。',
    ],
    reading: '先观察旗面中央机缝拼贴的镰刀斧头，再看右侧白色旗杆套上的部队番号。磨损、褪色与不完整的边缘，并不削弱它的力量，反而留下长途行军和保存流传的真实痕迹。',
    keywords: ['部队番号', '红六军团', '黔东南', '军旗征集'],
  },
  {
    id: 'clock',
    number: 'C-02',
    short: '挂钟',
    title: '遵义会议室挂钟',
    year: '1935年',
    material: '木质',
    registration: '550319',
    grade: '一级文物',
    size: '长56厘米，宽25.4厘米，厚12厘米',
    images: [{ src: '/artifacts/clock.png', label: '挂钟正面' }],
    lead: '一架自鸣摆钟曾悬挂在会议室墙上，钟盘上的罗马数字，成为三天会议时间感最直观的物证。',
    story: [
      '挂钟采用木质外壳，钟顶饰有半浮雕植物图案，钟面使用罗马数字，底部连接倒梯形木座。它原为遵义会议召开地墙上的陈设。',
      '1950年筹备复原时，柏辉章家属等当事人确认该钟曾长期挂在原处。后来因家中孩子办学，挂钟一度搬到小学使用；会址确认后，由遵义行署调拨纪念馆收藏。',
    ],
    reading: '看钟体形制之外，也可以把目光移向“时间”：1935年1月15日至17日，报告、发言、批评和讨论在有限空间中持续展开。挂钟让抽象日期重新获得可以感知的尺度。',
    keywords: ['会议室原陈设', '自鸣摆钟', '会址复原', '三天会议'],
  },
  {
    id: 'shrapnel',
    number: 'C-03',
    short: '弹片',
    title: '停留在杨尚昆体内63年的弹片',
    year: '1935年4月',
    material: '合金质',
    registration: '20070803',
    grade: '一级文物',
    size: '长1.5厘米，宽1厘米，厚0.2厘米',
    images: [{ src: '/artifacts/shrapnel.png', label: '弹片及保存盒' }],
    lead: '一枚仅有指甲大小的弹片，在杨尚昆同志体内停留63年，保存着长征路上伤痛与坚持的生命记忆。',
    story: [
      '1935年4月，中央红军转战云南沾益县白水镇，杨尚昆同志小腿负伤。受当时医疗条件限制，伤口经简单包扎后，他继续随部队长征到达陕北。',
      '在延安接受治疗时，医生取出了小腿表层的数处弹片，扎入深部的一枚未能取出。1998年杨尚昆同志逝世，家人在捡拾骨灰时发现这枚花纹清晰的陈旧弹片；2007年由长子杨绍明捐赠给遵义会议纪念馆。',
    ],
    reading: '它的尺寸极小，却把个人身体、战地医疗和漫长行军连接在一起。观看时不妨先比较弹片与保存盒的尺度，再体会“63年”这一时间长度。',
    keywords: ['杨尚昆', '战地负伤', '长征记忆', '家属捐赠'],
  },
  {
    id: 'grenade',
    number: 'C-04',
    short: '手榴弹',
    title: '五星手榴弹',
    year: '1935年',
    material: '合金质',
    registration: '731224',
    grade: '三级文物',
    size: '长11厘米，宽6厘米',
    images: [{ src: '/artifacts/grenade.png', label: '五星手榴弹正面' }],
    lead: '弹体上的五角星纹样仍清晰可见，它来自娄山关战场，连接着遵义会议之后的首次大捷。',
    story: [
      '1935年，中央红军二渡赤水、回师黔北，攻克娄山关，随后取得遵义战役胜利。这一胜利是长征以来的一次重大胜利，显示了遵义会议后新的军事指挥。',
      '战斗结束后，当地居民侯正发在娄山关最高峰点灯山拾得这枚五星手榴弹，后来由遵义会议纪念馆收藏。',
    ],
    reading: '环形拉环、纵向棱线和中央五角星构成鲜明形制。斑驳锈蚀说明它不是象征性的图案，而是从真实战场保存下来的实物。',
    keywords: ['娄山关', '遵义战役', '战场拾得', '实践检验'],
  },
  {
    id: 'seal',
    number: 'C-05',
    short: '私章',
    title: '中国工农红军遵绥湄游击队政治委员王有发私章',
    year: '1935年',
    material: '木质',
    registration: '580782',
    grade: '一级文物',
    size: '长1.3厘米，宽1.1厘米，高2.6厘米',
    images: [{ src: '/artifacts/seal.png', label: '王有发私章及链饰' }],
    lead: '长方形木章的上半部刻五角星与星芒，下半部刻“王有发”三字，是红军长征经过贵州保存下来的珍贵干部私章。',
    story: [
      '王有发是中国工农红军九军团政治部地方工作部部长、遵绥湄游击队政治委员。1935年4月，他在湄潭关坎脚牺牲。',
      '馆方资料记载，王有发牺牲前曾托当地农民在部队通过时转交此章；因敌人搜捕未能送出。1957年，当地清理红军烈士遗骸时拾得私章，随后移交收藏。',
    ],
    reading: '木章只有两三厘米高。放大后可以观察印面中的五角星、放射纹与姓名文字；如此私密而日常的物件，使一位红军干部的身份重新变得具体。',
    keywords: ['王有发', '遵绥湄游击队', '干部私章', '烈士遗物'],
  },
  {
    id: 'leaflet',
    number: 'C-06',
    short: '宣传单',
    title: '《中国共产党中央委员会告民众书》宣传单',
    year: '1935年',
    material: '纸质',
    registration: '580826',
    grade: '二级文物',
    size: '长35.5厘米，宽24厘米',
    images: [
      { src: '/artifacts/leaflet-01.png', label: '《告民众书》' },
      { src: '/artifacts/leaflet-02.png', label: '另一份告民众书' },
    ],
    lead: '毛边纸铅印的文字穿过烽火，被群众收起、合订并藏入墙壁，保存下红军面向民众开展宣传的真实一页。',
    story: [
      '1935年3月，中央红军经过贵州时散发了许多宣传单。这份《告民众书》主要阐述推翻国民党统治、建立苏维埃政权等政治主张。',
      '当地群众薛正万收集数份宣传单，合订后放入竹筒，藏在住房墙壁内。1958年，其子薛元丰将竹筒和宣传单一并交给遵义会议纪念馆。',
    ],
    reading: '先看竖排版式、铅印字体与纸张折痕，再切换第二幅图像比较不同宣传材料。文字不仅是文献内容，也记录了它被阅读、收藏和秘密保存的过程。',
    keywords: ['群众工作', '政治宣传', '墙内保存', '纸质文献'],
  },
  {
    id: 'currency',
    number: 'C-07',
    short: '货币',
    title: '苏维埃货币一套（五张）',
    year: '1935年',
    material: '纸质',
    registration: '2010830',
    grade: '三级文物',
    size: '壹角9.6×6厘米；伍角10.04×6.8厘米；壹元11.8×6.8厘米；伍分8.4×5.2厘米；贰角9.7×7.1厘米',
    images: [
      { src: '/artifacts/currency-01.png', label: '伍分券' },
      { src: '/artifacts/currency-02.png', label: '壹角券' },
      { src: '/artifacts/currency-03.png', label: '壹元券' },
      { src: '/artifacts/currency-04.png', label: '贰角券' },
      { src: '/artifacts/currency-05.png', label: '伍角券' },
    ],
    lead: '五张不同面额的纸币，把革命政权的金融制度、印刷工艺和实际流通痕迹同时保留下来。',
    story: [
      '这套货币包括伍分、壹角、壹元、贰角和伍角五种面额。票面可见“中华苏维埃共和国国家银行”等文字，以及面额、图案、编号与签名。',
      '不同纸币在纸张、版色、图案和尺寸上各有差异，折痕、污渍与磨损则留下实际保存和使用的痕迹。',
    ],
    reading: '使用下方影像胶卷逐张比较：先找票面机构名称与面额，再观察编号、签名和边饰。五张纸币并置，比单张图像更能呈现一套货币的制度性与完整性。',
    keywords: ['苏维埃金融', '国家银行', '五种面额', '票面设计'],
  },
  {
    id: 'medal',
    number: 'C-08',
    short: '纪念章',
    title: '钟赤兵全国人民慰问解放军代表团纪念章',
    year: '1954年2月17日',
    material: '钢质',
    registration: '20982420',
    grade: '三级文物',
    size: '长7.6厘米，宽4.5厘米',
    images: [{ src: '/artifacts/medal.png', label: '纪念章正面' }],
    lead: '红色绶带与多层星芒组成一枚1954年的纪念章，把革命经历延伸到新中国成立后的军民记忆。',
    story: [
      '这枚纪念章属于钟赤兵同志，登记年代为1954年2月17日。章体由红色绶带、金属连接件和多层星形主体组成。',
      '它与1934、1935年的行军和战场文物并置，呈现革命历史如何在新中国成立后通过慰问、纪念和收藏得到延续。',
    ],
    reading: '观察绶带、别针、星芒和中央图案之间的层次。与战场拾得物相比，它是一件明确为纪念活动制作的物件，代表另一种历史记忆的形成方式。',
    keywords: ['钟赤兵', '1954年', '军民慰问', '纪念记忆'],
  },
];

type RelicExhibitionProps = {
  onBack?: () => void;
  onNext?: () => void;
};

export default function RelicExhibition({ onBack, onNext }: RelicExhibitionProps) {
  const [activeArtifact, setActiveArtifact] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [lensOn, setLensOn] = useState(false);
  const [lensVisible, setLensVisible] = useState(false);
  const [lens, setLens] = useState({ x: 50, y: 50 });
  const artifact = artifacts[activeArtifact];
  const image = artifact.images[activeImage] || artifact.images[0];

  const chooseArtifact = (index: number, scroll = false) => {
    setActiveArtifact(index);
    setActiveImage(0);
    setLensVisible(false);
    if (scroll) document.getElementById('artifact-desk')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const moveLens = (event: PointerEvent<HTMLDivElement>) => {
    if (!lensOn) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(96, Math.max(4, ((event.clientX - rect.left) / rect.width) * 100));
    const y = Math.min(94, Math.max(6, ((event.clientY - rect.top) / rect.height) * 100));
    setLens({ x, y });
    setLensVisible(true);
  };

  return (
    <main className="artifact-page experience-scene">
      <header className="artifact-topbar">
        {onBack ? (
          <button className="artifact-brand" onClick={onBack} type="button"><span>遵</span><b>遵义·决策现场</b></button>
        ) : (
          <a href="/" className="artifact-brand"><span>遵</span><b>遵义·决策现场</b></a>
        )}
        <p><span>01 数字会址</span><b>02 革命文物</b><span>03 权威档案</span><span>04 光明终章</span></p>
        {onBack ? <button onClick={onBack} type="button">返回数字会址 ←</button> : <a href="/">返回数字会址 ←</a>}
      </header>

      <section className="artifact-portal">
        <div className="artifact-portal-grid" aria-hidden="true" />
        <figure className="portal-object portal-object-clock"><img src="/artifacts/clock.png" alt="" /></figure>
        <figure className="portal-object portal-object-flag"><img src="/artifacts/flag.png" alt="" /></figure>
        <figure className="portal-object portal-object-seal"><img src="/artifacts/seal.png" alt="" /></figure>
        <div className="artifact-portal-copy">
          <p><span>遵义会议纪念馆馆藏</span><b>08 OBJECTS / 13 IMAGES</b></p>
          <h1><i>见物</i><br />见人</h1>
          <div>
            <strong>长征不是遥远的抽象叙事。</strong>
            <p>它留在一面褪色军旗、一架会议室挂钟、一枚弹片和一张被藏进墙壁的宣传单里。</p>
          </div>
          <a href="#artifact-desk">推开馆藏抽屉 <span>↓</span></a>
        </div>
        <aside><span>从形制开始</span><b>看材质与尺度</b><i>→</i><span>沿流传继续</span><b>看人与历史</b></aside>
      </section>

      <section className="artifact-desk" id="artifact-desk">
        <aside className="artifact-drawers" aria-label="馆藏文物抽屉">
          <div className="drawers-title"><span>COLLECTION CABINET</span><b>馆藏抽屉</b><p>拉开一只抽屉，案台随即更换。</p></div>
          {artifacts.map((item, index) => (
            <button
              className={activeArtifact === index ? 'active' : ''}
              key={item.id}
              onClick={() => chooseArtifact(index)}
              type="button"
            >
              <span>{item.number}</span><b>{item.short}</b><i>{item.year}</i><em />
            </button>
          ))}
        </aside>

        <div className="artifact-inspection">
          <div className="inspection-heading">
            <p><span>{artifact.number}</span>{image.label}</p>
            <button
              className={lensOn ? 'active' : ''}
              onClick={() => {
                setLensOn((current) => !current);
                setLensVisible(false);
              }}
              type="button"
            >
              {lensOn ? '关闭检视光镜' : '开启检视光镜'} <i>◎</i>
            </button>
          </div>
          <div
            className={'inspection-stage ' + (lensOn ? 'lens-on' : '')}
            onPointerEnter={() => lensOn && setLensVisible(true)}
            onPointerLeave={() => setLensVisible(false)}
            onPointerMove={moveLens}
          >
            <div className="inspection-scale scale-x" aria-hidden="true" />
            <div className="inspection-scale scale-y" aria-hidden="true" />
            <img src={image.src} alt={artifact.title + '，' + image.label} />
            {lensOn && lensVisible && (
              <div
                className="inspection-lens"
                style={{
                  left: lens.x + '%',
                  top: lens.y + '%',
                  backgroundImage: 'url("' + image.src + '")',
                  backgroundPosition: lens.x + '% ' + lens.y + '%',
                }}
                aria-hidden="true"
              ><span /></div>
            )}
            <p className="inspection-tip">{lensOn ? '移动指针检视局部细节' : '开启光镜后可移动检视细节'}</p>
          </div>
          <div className="artifact-film" aria-label="该文物其他图像">
            <p>IMAGE ROLL <span>{String(activeImage + 1).padStart(2, '0')} / {String(artifact.images.length).padStart(2, '0')}</span></p>
            <div>
              {artifact.images.map((variant, index) => (
                <button
                  className={activeImage === index ? 'active' : ''}
                  key={variant.src}
                  onClick={() => setActiveImage(index)}
                  type="button"
                >
                  <img src={variant.src} alt="" /><span>{variant.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <article className="artifact-file" key={artifact.id}>
          <header><span>馆藏档案签 / {artifact.number}</span><b>{artifact.grade}</b></header>
          <h2>{artifact.title}</h2>
          <p className="artifact-lead">{artifact.lead}</p>
          <dl>
            <div><dt>年代</dt><dd>{artifact.year}</dd></div>
            <div><dt>材质</dt><dd>{artifact.material}</dd></div>
            <div><dt>登记号</dt><dd>{artifact.registration}</dd></div>
            <div><dt>尺寸</dt><dd>{artifact.size}</dd></div>
          </dl>
          <section><small>流传经过</small>{artifact.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>
          <section className="artifact-reading"><small>观察提示</small><p>{artifact.reading}</p></section>
          <div className="artifact-keywords">{artifact.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
          <footer>图片与藏品登记信息据遵义会议纪念馆官方微信公众号公开内容整理。</footer>
        </article>
      </section>

      <section className="artifact-chronicle">
        <header><span>1934—1954</span><h2>物证穿过时间</h2><p>同一批馆藏中，既有行军与战场遗物，也有会议室陈设、纸质文献和新中国成立后的纪念物。</p></header>
        <div className="chronicle-line" aria-hidden="true" />
        <div className="chronicle-items">
          {artifacts.map((item, index) => (
            <button key={item.id} onClick={() => chooseArtifact(index, true)} type="button">
              <time>{item.year}</time><i /><b>{item.short}</b><span>{item.title}</span>
            </button>
          ))}
        </div>
      </section>

      {onNext && (
        <section className="artifact-handoff">
          <div><span>NEXT / 03</span><h2>文物让历史可以触摸，<br />档案让结论经得起追问。</h2></div>
          <p>沿着每件文物背后的史料线索进入权威档案馆，查看前文重要结论与图像的公开出处。</p>
          <button onClick={onNext} type="button">进入权威档案馆 <span>→</span></button>
        </section>
      )}

      <footer className="artifact-footer">
        <div><span>遵</span><p><b>见物，见人</b><small>遵义会议纪念馆革命文物特别展</small></p></div>
        <p>藏品名称、登记号、级别、年代、材质、尺寸与流传信息据遵义会议纪念馆官方微信公众号公开内容整理。</p>
        {onBack ? <button onClick={onBack} type="button">返回数字会址 ↑</button> : <a href="/">返回数字会址 ↑</a>}
      </footer>
      <ShareQr />
    </main>
  );
}
