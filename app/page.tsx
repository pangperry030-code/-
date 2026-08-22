'use client';

import { useEffect, useState } from 'react';

const chapterLinks = [
  { id: 'top', label: '序章', number: '00' },
  { id: 'before', label: '转折之前', number: '01' },
  { id: 'meeting', label: '会议现场', number: '02' },
  { id: 'outcome', label: '伟大转折', number: '03' },
  { id: 'fieldwork', label: '我们抵达', number: '04' },
  { id: 'sources', label: '史料索引', number: '05' },
];

const pressureFiles = [
  {
    date: '1934.10',
    tag: '战略转移',
    title: '第五次反“围剿”失利',
    text: '受“左”倾教条主义错误领导影响，中央革命根据地第五次反“围剿”失败，中央红军被迫开始长征。',
    source: '《中共中央关于党的百年奋斗重大成就和历史经验的决议》',
    href: 'https://www.mem.gov.cn/jjz/ywgz/202111/t20211122_403307.shtml',
  },
  {
    date: '1934.11',
    tag: '严重受挫',
    title: '湘江血战之后',
    text: '长征初期，中央红军遭受严重损失。怎样摆脱被动局面、改变不符合实际的指挥方式，成为关系前途命运的问题。',
    source: '新华社《历史的回响 前行的力量》',
    href: 'https://www.news.cn/politics/20250114/e29525440110466fb81f5799b2fba906/c.html',
  },
  {
    date: '1934.12—1935.01',
    tag: '逐步酝酿',
    title: '从质疑到集中解决',
    text: '通道、黎平、猴场等会议推动对行军方向和军事指挥的反思，为遵义会议集中解决问题创造了条件。',
    source: '教育部《遵义会议精神：独立自主勇闯新路》',
    href: 'https://www.moe.gov.cn/jyb_xwfb/moe_2082/2021/2021_zl26/zunyihuiyi/202105/t20210506_529913.html',
  },
];

const meetingRecords = [
  {
    number: '01',
    label: '会议主题',
    title: '集中解决军事和组织问题',
    text: '1935年1月15日至17日，中共中央政治局在遵义召开扩大会议，集中解决当时具有决定意义的军事和组织问题。',
  },
  {
    number: '02',
    label: '组织调整',
    title: '增选毛泽东为中央政治局常委',
    text: '会议在充分讨论基础上作出重要组织调整，为形成正确领导和改变军事指挥创造了条件。',
  },
  {
    number: '03',
    label: '形成决议',
    title: '总结第五次反“围剿”的经验教训',
    text: '会议委托张闻天起草相关决议，以事实和实践检验此前的军事领导，明确新的战略方向。',
  },
  {
    number: '04',
    label: '领导机制',
    title: '取消长征前成立的“三人团”',
    text: '会后又根据斗争实际继续调整中央领导分工和军事指挥机制，遵义会议的历史成果得到巩固与发展。',
  },
];

const outcomes = [
  ['领导地位', '事实上确立毛泽东同志在党中央和红军的领导地位'],
  ['正确路线', '以毛泽东同志为主要代表的马克思主义正确路线开始确立领导地位'],
  ['领导集体', '以毛泽东同志为核心的党的第一代中央领导集体开始形成'],
  ['独立自主', '开启党独立自主解决中国革命实际问题的新阶段'],
];

const surveyFindings = [
  { value: 89.9, label: '真实史料', text: '最被原物原件与历史照片打动' },
  { value: 50.7, label: '叙事阻碍', text: '认为“重复结论多、鲜活故事少”是主要阻碍' },
  { value: 90.6, label: '数字期待', text: '期待或非常期待AR军事地图推演' },
  { value: 64.5, label: '创作尺度', text: '有兴趣尝试二次创作，或担心尺度把握' },
];

const designResponses = [
  ['真实史料最有吸引力', '每一幕由权威史料卡进入，图片逐张标注来源，不用虚构对白代替事实。'],
  ['鲜活故事不足', '把“结论”还原为危机、讨论、调整和实践检验的过程，避免重复口号。'],
  ['期待数字化体验', '采用路线推演、时间轴与证据选择；不设置历史人物扮演和改写历史选项。'],
  ['担心创作尺度', '公开史料索引、研究口径和审核原则，让创意边界本身成为作品的一部分。'],
];

const sources = [
  {
    index: '01',
    title: '中共中央关于党的百年奋斗重大成就和历史经验的决议',
    org: '中国共产党第十九届中央委员会第六次全体会议 · 2021',
    href: 'https://www.mem.gov.cn/jjz/ywgz/202111/t20211122_403307.shtml',
  },
  {
    index: '02',
    title: '《党史上的重要会议》：遵义会议',
    org: '中共中央党史和文献研究院 · 2022',
    href: 'https://www.dswxyjy.org.cn/BIG5/n1/2022/1110/c448623-32563152.html',
  },
  {
    index: '03',
    title: '历史的回响 前行的力量——写在遵义会议召开90周年之际',
    org: '新华社 · 2025',
    href: 'https://www.news.cn/politics/20250114/e29525440110466fb81f5799b2fba906/c.html',
  },
  {
    index: '04',
    title: '伟大转折是怎样发生的——重回遵义会议现场',
    org: '新华社 · 2019（本站会址及会议室图片来源）',
    href: 'https://fms.news.cn/swf/2019_qmtt/7_14_2019_qm_z/index.html',
  },
  {
    index: '05',
    title: '遵义会议精神永放光芒',
    org: '中国共产党新闻网 · 2026',
    href: 'https://dangjian.people.com.cn/n1/2026/0522/c117092-40725457.html',
  },
];

export default function Home() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [readProgress, setReadProgress] = useState(0);
  const [activePressure, setActivePressure] = useState(0);
  const [activeRecord, setActiveRecord] = useState(0);
  const [researchView, setResearchView] = useState<'finding' | 'response'>('finding');

  useEffect(() => {
    const updateProgress = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(total > 0 ? Math.min(100, (window.scrollY / total) * 100) : 0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveChapter(Number(visible.target.getAttribute('data-chapter')) || 0);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.15, 0.4] },
    );

    document.querySelectorAll('[data-chapter]').forEach((section) => observer.observe(section));
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="site-shell">
      <div className="read-progress" aria-hidden="true">
        <span style={{ width: `${readProgress}%` }} />
      </div>

      <header className="topbar">
        <button className="brand" onClick={() => scrollTo('top')} type="button" aria-label="返回序章">
          <span className="brand-seal">遵</span>
          <span className="brand-copy">
            <strong>遵义·决策现场</strong>
            <small>历史情境数字展</small>
          </span>
        </button>
        <nav className="chapter-nav" aria-label="展览章节">
          {chapterLinks.map((chapter, index) => (
            <button
              className={activeChapter === index ? 'active' : ''}
              key={chapter.id}
              onClick={() => scrollTo(chapter.id)}
              type="button"
            >
              <span>{chapter.number}</span>{chapter.label}
            </button>
          ))}
        </nav>
        <div className="topbar-status"><i />史料审核版</div>
      </header>

      <section className="cinematic-hero" id="top" data-chapter="0">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-red-wash" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-year" aria-hidden="true">1935</div>
        <div className="hero-coordinate" aria-hidden="true">
          <span>27°41′ N</span><span>106°55′ E</span>
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow"><span>中央红军长征途中</span><b>档案编号 ZY-1935-01</b></p>
          <h1>
            <span>在答案</span>
            <em>出现以前</em>
          </h1>
          <div className="hero-subtitle">
            <b>遵义会议历史情境数字展</b>
            <p>伟大转折不是突然降临，而是在最危急的关头，坚持真理、修正错误作出的历史抉择。</p>
          </div>
          <div className="hero-actions">
            <button className="hero-primary" onClick={() => scrollTo('before')} type="button">
              进入1935年的历史现场 <span>↓</span>
            </button>
            <a href="https://www.mem.gov.cn/jjz/ywgz/202111/t20211122_403307.shtml" target="_blank" rel="noreferrer">
              查阅权威结论 ↗
            </a>
          </div>
        </div>

        <aside className="hero-dossier">
          <p>遵义 / 1935.01.15—17</p>
          <strong>生死攸关的转折点</strong>
          <span>挽救了党 · 挽救了红军 · 挽救了中国革命</span>
          <div className="dossier-stamp">伟大转折</div>
        </aside>

        <p className="hero-credit">资料图：遵义会议会议室，新华社记者 陶亮 摄（2019）</p>
      </section>

      <section className="chapter-section crisis-scene" id="before" data-chapter="1">
        <div className="section-number">01</div>
        <header className="section-heading light-heading">
          <p>THE CRISIS BEFORE THE TURN</p>
          <h2>转折，不是<br />突然发生的</h2>
          <span>先理解压力如何累积，才可能理解遵义会议为何成为历史转折。</span>
        </header>

        <div className="pressure-layout">
          <div className="pressure-tabs" role="tablist" aria-label="转折前的历史线索">
            {pressureFiles.map((item, index) => (
              <button
                aria-selected={activePressure === index}
                className={activePressure === index ? 'active' : ''}
                key={item.date}
                onClick={() => setActivePressure(index)}
                role="tab"
                type="button"
              >
                <span>{item.date}</span>
                <b>{item.title}</b>
                <i>{String(index + 1).padStart(2, '0')}</i>
              </button>
            ))}
          </div>

          <article className="pressure-file" role="tabpanel">
            <div className="file-meta"><span>{pressureFiles[activePressure].tag}</span><b>证据卡 {String(activePressure + 1).padStart(2, '0')}</b></div>
            <p className="file-date">{pressureFiles[activePressure].date}</p>
            <h3>{pressureFiles[activePressure].title}</h3>
            <p className="file-body">{pressureFiles[activePressure].text}</p>
            <a href={pressureFiles[activePressure].href} target="_blank" rel="noreferrer">
              来源：{pressureFiles[activePressure].source} ↗
            </a>
          </article>

          <div className="route-sketch" aria-label="长征转折前路线示意">
            <span className="route-label route-label-a">瑞金</span>
            <span className="route-label route-label-b">湘江</span>
            <span className="route-label route-label-c">通道</span>
            <span className="route-label route-label-d">遵义</span>
            <i className="route-segment segment-a" /><i className="route-segment segment-b" /><i className="route-segment segment-c" />
            <b className="route-dot dot-a" /><b className="route-dot dot-b" /><b className="route-dot dot-c" /><b className="route-dot dot-d" />
          </div>
        </div>
      </section>

      <section className="chapter-section meeting-scene" id="meeting" data-chapter="2">
        <div className="meeting-photo-panel">
          <img src="/zunyi-meeting-room.jpg" alt="遵义会议会议室，中央为长方桌，四周摆放藤椅" />
          <div className="photo-shade" />
          <p>会场复原 · 二楼东头小客厅 · 约27平方米</p>
        </div>

        <div className="meeting-content">
          <header className="section-heading">
            <p>15—17 JANUARY 1935</p>
            <h2>一张长桌，<br />一次历史性会议</h2>
            <span>这里不虚构人物对话。点击四份“会议记录”，查看权威党史材料确认的会议内容。</span>
          </header>

          <div className="record-selector" role="tablist" aria-label="会议记录">
            {meetingRecords.map((record, index) => (
              <button
                aria-selected={activeRecord === index}
                className={activeRecord === index ? 'active' : ''}
                key={record.number}
                onClick={() => setActiveRecord(index)}
                role="tab"
                type="button"
              >
                <span>{record.number}</span>{record.label}
              </button>
            ))}
          </div>

          <article className="record-card" role="tabpanel">
            <div className="record-binding" aria-hidden="true" />
            <p>会议记录 / {meetingRecords[activeRecord].number}</p>
            <h3>{meetingRecords[activeRecord].title}</h3>
            <span>{meetingRecords[activeRecord].text}</span>
            <a href="https://www.dswxyjy.org.cn/BIG5/n1/2022/1110/c448623-32563152.html" target="_blank" rel="noreferrer">
              中共中央党史和文献研究院资料 ↗
            </a>
          </article>
        </div>
      </section>

      <section className="chapter-section outcome-scene" id="outcome" data-chapter="3">
        <div className="outcome-radiance" aria-hidden="true" />
        <p className="outcome-kicker">中央历史决议权威定位</p>
        <div className="outcome-title">
          <span>一个</span>
          <strong>生死攸关</strong>
          <em>的转折点</em>
        </div>

        <div className="outcome-grid">
          {outcomes.map(([title, text], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <div className="three-saves">
          <p>在最危急关头</p>
          <div><span>挽救了党</span><span>挽救了红军</span><span>挽救了中国革命</span></div>
        </div>

        <div className="spirit-panel">
          <p>遵义会议精神的基本内涵</p>
          <div>
            {['坚定信念', '坚持真理', '独立自主', '团结统一'].map((word, index) => (
              <article key={word}><span>0{index + 1}</span><strong>{word}</strong></article>
            ))}
          </div>
          <a href="https://dangjian.people.com.cn/n1/2026/0522/c117092-40725457.html" target="_blank" rel="noreferrer">
            来源：中国共产党新闻网《遵义会议精神永放光芒》 ↗
          </a>
        </div>
      </section>

      <section className="chapter-section field-scene" id="fieldwork" data-chapter="4">
        <header className="section-heading field-heading">
          <p>OUR FIELD RESEARCH</p>
          <h2>我们抵达遵义，<br />也带回了一组不那么“好听”的数据</h2>
          <span>真正的实践成果，不是只展示高分，而是让数据约束我们的结论和设计。</span>
        </header>

        <figure className="site-figure">
          <img src="/zunyi-site-aerial.jpg" alt="从空中俯瞰遵义会议会址及周边院落" />
          <figcaption><span>遵义会议会址（2019年7月4日无人机拍摄）</span><b>新华社记者 陶亮 摄</b></figcaption>
        </figure>

        <div className="research-summary">
          <div className="sample-card"><span>入口有效样本</span><strong>150</strong><small>排除3份近时重复记录后</small></div>
          <div className="sample-card"><span>出口有效样本</span><strong>138</strong><small>两组并非个体配对</small></div>
          <div className="sample-card accent"><span>主分析合计</span><strong>288</strong><small>便利样本，不作总体推断</small></div>

          <article className="honest-result">
            <p className="research-label">核心认知得分 / 入口—出口比较</p>
            <h3>没有发现明确的组间差异</h3>
            <div className="score-pair">
              <div><span>入口</span><strong>79.43</strong></div>
              <i>→</i>
              <div><span>出口</span><strong>79.33</strong></div>
              <b>差值 −0.10</b>
            </div>
            <div className="ci-chart" aria-label="认知得分差值为负0.10分，95%置信区间负5.11至4.91">
              <span className="ci-zero" /><span className="ci-line" /><span className="ci-point" />
              <div className="ci-labels"><i>−12</i><i>−8</i><i>−4</i><i>0</i><i>4</i><i>8</i><i>12</i></div>
            </div>
            <p className="result-note">95%CI：−5.11～4.91，p=0.969。它不证明参观“没有作用”，只说明本次非配对调查不能宣称认知显著提升。</p>
          </article>
        </div>

        <div className="research-explorer">
          <div className="explorer-head">
            <div><p>从调查到设计</p><h3>数据怎样改变了这个网站</h3></div>
            <div className="view-toggle" role="tablist" aria-label="调查发现与设计回应">
              <button className={researchView === 'finding' ? 'active' : ''} onClick={() => setResearchView('finding')} role="tab" type="button">调查发现</button>
              <button className={researchView === 'response' ? 'active' : ''} onClick={() => setResearchView('response')} role="tab" type="button">设计回应</button>
            </div>
          </div>

          {researchView === 'finding' ? (
            <div className="finding-grid" role="tabpanel">
              {surveyFindings.map((finding) => (
                <article key={finding.label}>
                  <span>{finding.label}</span>
                  <strong>{finding.value.toFixed(1)}<small>%</small></strong>
                  <div className="finding-bar"><i style={{ width: `${finding.value}%` }} /></div>
                  <p>{finding.text}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="response-list" role="tabpanel">
              {designResponses.map(([finding, response], index) => (
                <article key={finding}><span>0{index + 1}</span><b>{finding}</b><i>→</i><p>{response}</p></article>
              ))}
            </div>
          )}

          <p className="data-source-note">数据来源：团队入口、出口问卷主分析样本。比例与统计结果采用清洗后的研究口径；原始问卷保持不变，网站不展示IP等个人信息。</p>
        </div>
      </section>

      <section className="editorial-scene">
        <p>创意的边界</p>
        <h2>让技术服务于正确党史观，<br />而不是替历史制造戏剧性。</h2>
        <div className="editorial-grid">
          <article><span>01</span><h3>不虚构</h3><p>不生成历史人物对白、声音和心理活动。</p></article>
          <article><span>02</span><h3>不改写</h3><p>不设置阵营、胜负和“如果历史重来”的选项。</p></article>
          <article><span>03</span><h3>可追溯</h3><p>历史结论、会议内容、资料图片逐项标注来源。</p></article>
          <article><span>04</span><h3>可审核</h3><p>史料与团队调查分层呈现，研究局限不隐藏。</p></article>
        </div>
      </section>

      <section className="source-scene" id="sources" data-chapter="5">
        <header>
          <p>VERIFIED SOURCES</p>
          <h2>史料索引</h2>
          <span>正式上线前，历史文案可据此逐条复核。</span>
        </header>
        <div className="source-list">
          {sources.map((source) => (
            <a href={source.href} key={source.index} target="_blank" rel="noreferrer">
              <span>{source.index}</span><div><strong>{source.title}</strong><small>{source.org}</small></div><b>↗</b>
            </a>
          ))}
          <div className="local-source"><span>06</span><div><strong>遵义会议会址红色文化传承与青年认知认同调查</strong><small>团队社会实践数据 · 2026 · 主分析样本288份</small></div><b>本地资料</b></div>
        </div>
      </section>

      <footer className="site-footer">
        <div><span className="brand-seal">遵</span><strong>在答案出现以前</strong></div>
        <p>遵义会议历史情境数字展 · 社会实践数字成果</p>
        <button onClick={() => scrollTo('top')} type="button">回到序章 ↑</button>
      </footer>
    </main>
  );
}
