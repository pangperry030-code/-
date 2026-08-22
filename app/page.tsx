'use client';

import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';

type HallId = 'crisis' | 'meeting' | 'decision' | 'spirit' | 'site' | 'archive';

const halls: Array<{
  id: HallId;
  number: string;
  label: string;
  eyebrow: string;
  title: string;
  instruction: string;
  background: string;
}> = [
  {
    id: 'crisis',
    number: '01',
    label: '前夜·路线',
    eyebrow: 'THE ROAD TO ZUNYI',
    title: '危局如何走到遵义',
    instruction: '沿路线点亮六个节点，理解会议为何必须召开。',
    background: '/zunyi-site-aerial.jpg',
  },
  {
    id: 'meeting',
    number: '02',
    label: '会场·长桌',
    eyebrow: 'INSIDE THE MEETING',
    title: '长桌上的五份记录',
    instruction: '点击桌边封签，从时间、议题、方法、决定与会后进程进入现场。',
    background: '/zunyi-meeting-room.jpg',
  },
  {
    id: 'decision',
    number: '03',
    label: '决议·转折',
    eyebrow: 'HOW THE TURN HAPPENED',
    title: '转折不是一句结论',
    instruction: '转动四枚“决策印章”，查看从纠错到新局的逻辑链。',
    background: '/zunyi-exhibition-map.jpg',
  },
  {
    id: 'spirit',
    number: '04',
    label: '精神·灯塔',
    eyebrow: 'THE SPIRIT LIVES ON',
    title: '点亮遵义会议精神',
    instruction: '依次点亮四束光，读懂伟大转折留给今天的精神力量。',
    background: '/visit-2025-03.jpg',
  },
  {
    id: 'site',
    number: '05',
    label: '今日·会址',
    eyebrow: 'THE SITE TODAY',
    title: '从会址走进历史',
    instruction: '切换五个观察点，以建筑、场景与展陈建立现场感。',
    background: '/zunyi-meeting-site-2025.jpg',
  },
  {
    id: 'archive',
    number: '06',
    label: '档案·索引',
    eyebrow: 'VERIFIED ARCHIVE',
    title: '每一条结论，都有来处',
    instruction: '拉开资料抽屉，查看本展使用的权威史料与策展边界。',
    background: '/zunyi-meeting-room.jpg',
  },
];

const routeNodes = [
  {
    date: '1934.10',
    short: '瑞金',
    title: '中央红军开始长征',
    body: '第五次反“围剿”失败后，中央红军被迫实行战略转移。原有军事指挥上的错误，在严酷实践中暴露得越来越充分。',
    meaning: '改变错误领导和军事指挥，已经成为关系党和红军前途命运的紧迫问题。',
    source: '《中共中央关于党的百年奋斗重大成就和历史经验的决议》',
    href: 'https://www.mem.gov.cn/jjz/ywgz/202111/t20211122_403307.shtml',
    x: 9,
    y: 82,
  },
  {
    date: '1934.11',
    short: '湘江',
    title: '长征初期严重受挫',
    body: '湘江战役后，中央红军处境十分严峻。事实迫使越来越多的同志重新思考既定行军方向和军事指挥方式。',
    meaning: '危机不只来自外部压力，也要求党从自身寻找原因、总结教训。',
    source: '新华社《历史的回响 前行的力量》',
    href: 'https://www.news.cn/politics/20250114/e29525440110466fb81f5799b2fba906/c.html',
    x: 25,
    y: 70,
  },
  {
    date: '1934.12',
    short: '通道',
    title: '转兵贵州的意见受到重视',
    body: '通道会议对红军前进方向进行讨论。毛泽东同志关于改变原定计划、向敌人力量薄弱的贵州前进的主张，推动局面发生变化。',
    meaning: '从照搬既定方案，转向依据敌情与实际条件作出判断。',
    source: '教育部《遵义会议精神：独立自主勇闯新路》',
    href: 'https://www.moe.gov.cn/jyb_xwfb/moe_2082/2021/2021_zl26/zunyihuiyi/202105/t20210506_529913.html',
    x: 41,
    y: 58,
  },
  {
    date: '1934.12',
    short: '黎平',
    title: '向贵州北部进军',
    body: '黎平会议根据实际情况，通过新的行动方针，放弃到湘西北与红二、红六军团会合的原定计划，转向贵州北部。',
    meaning: '独立思考与实事求是，开始在关键军事决策中发挥更大作用。',
    source: '国家林业和草原局《弘扬遵义会议精神 走好新时代长征路》',
    href: 'https://www.forestry.gov.cn/c/www/xxyd/5566.jhtml',
    x: 57,
    y: 45,
  },
  {
    date: '1935.01',
    short: '猴场',
    title: '政治局加强军事领导',
    body: '猴场会议进一步讨论行动方针，并对重大军事决策程序作出规定，为纠正军事上个人包办的状况创造条件。',
    meaning: '重要问题回到集体讨论和政治局领导之下，会议条件逐步成熟。',
    source: '人民网相关党史资料',
    href: 'https://politics.people.com.cn/n1/2025/0115/c1001-40402533.html',
    x: 73,
    y: 31,
  },
  {
    date: '1935.01.07',
    short: '遵义',
    title: '红军进入遵义',
    body: '红军攻克黔北重镇遵义。中央大部分领导同志对军事指挥错误已形成更多共识，召开政治局会议、集中总结经验教训的条件成熟。',
    meaning: '历史转折即将在这座城市的一间小客厅里展开。',
    source: '国家林业和草原局党史学习资料',
    href: 'https://www.forestry.gov.cn/c/www/xxyd/5566.jhtml',
    x: 89,
    y: 17,
  },
];

const meetingRecords = [
  {
    number: '01',
    label: '时间与地点',
    title: '1935年1月15日至17日',
    body: '中共中央政治局扩大会议在遵义召开。会场位于当时红军总司令部驻地——“柏公馆”二楼小客厅。',
    note: '今天复原陈列中的长桌、藤椅与吊灯，共同构成公众进入这段历史的空间入口。',
  },
  {
    number: '02',
    label: '核心议题',
    title: '军事问题与组织问题',
    body: '会议集中解决当时具有决定意义的军事和组织问题，重点总结第五次反“围剿”失败和长征初期受挫的经验教训。',
    note: '它没有处理所有问题，而是首先抓住危急关头最迫切、最具有决定意义的问题。',
  },
  {
    number: '03',
    label: '讨论方法',
    title: '用实践检验是非得失',
    body: '与会同志围绕军事指挥问题展开讨论，以战争实践为依据分析失败原因，开展批评和自我批评，使正确意见得到支持。',
    note: '坚持真理、修正错误，不是抽象口号，而是在重大失败面前敢于正视问题。',
  },
  {
    number: '04',
    label: '重要决定',
    title: '调整中央领导和军事指挥',
    body: '会议增选毛泽东同志为中央政治局常委，委托张闻天同志起草相关决议，取消长征前成立的“三人团”。',
    note: '这些决定为形成正确领导、改变军事指挥创造了重要条件。',
  },
  {
    number: '05',
    label: '会后进程',
    title: '成果在实践中继续巩固',
    body: '会后，中央根据实际继续调整领导分工，后成立由毛泽东、周恩来、王稼祥同志组成的三人军事指挥小组。',
    note: '遵义会议的转折意义，既体现在会议决定中，也体现在此后的领导实践和军事行动中。',
  },
];

const decisionLinks = [
  {
    number: '01',
    verb: '正视失败',
    title: '纠正错误',
    lead: '从失败的军事实践出发总结经验教训。',
    detail: '会议改变了把失败主要归于客观原因的错误认识，严肃分析军事领导上的问题，让事实成为检验路线和指挥的尺度。',
    result: '坚持真理、修正错误有了组织基础。',
  },
  {
    number: '02',
    verb: '形成共识',
    title: '调整领导',
    lead: '在充分讨论基础上作出组织调整。',
    detail: '通过增选中央政治局常委、改变军事指挥机制等决定，正确主张逐步转化为党中央和红军的领导实践。',
    result: '党中央和红军有了能够应对危局的正确领导。',
  },
  {
    number: '03',
    verb: '立足实际',
    title: '独立自主',
    lead: '把马克思主义基本原理同中国革命具体实际相结合。',
    detail: '会议是党独立自主解决中国革命和革命战争重大问题的重要标志，体现了从中国实际出发探索革命道路的政治自觉。',
    result: '中国共产党在政治上开始走向成熟。',
  },
  {
    number: '04',
    verb: '实践检验',
    title: '打开新局',
    lead: '正确领导在此后长征实践中经受检验。',
    detail: '会议后，中央红军灵活变换作战方向，逐步摆脱被动局面。遵义会议的成果在新的实践中得到巩固和发展。',
    result: '党和革命事业实现由危转安、不断打开新局面。',
  },
];

const spirits = [
  {
    number: '01',
    title: '坚定信念',
    subtitle: '越是艰险，越要认清方向',
    body: '面对严重挫折和生死考验，中国共产党人没有动摇理想信念，而是在危局中寻找正确道路、凝聚前进力量。',
    today: '把坚定理想信念转化为攻坚克难、接续奋斗的行动自觉。',
  },
  {
    number: '02',
    title: '坚持真理',
    subtitle: '让实践成为检验的尺度',
    body: '遵义会议敢于正视错误、总结教训，支持符合实际的正确主张，体现了坚持真理和修正错误的政治勇气。',
    today: '坚持实事求是，发现问题不回避，形成认识后坚决落实。',
  },
  {
    number: '03',
    title: '独立自主',
    subtitle: '从中国实际出发走自己的路',
    body: '党开始独立自主地运用马克思主义基本原理解决中国革命和革命战争的重大问题，开启新的历史阶段。',
    today: '立足实际、自立自强，在实践探索中掌握发展主动权。',
  },
  {
    number: '04',
    title: '团结统一',
    subtitle: '在共同目标下形成行动合力',
    body: '会议通过充分讨论统一思想，形成坚强领导核心，为红军摆脱危局、继续前进提供了重要保证。',
    today: '坚持党中央集中统一领导，把共同认识转化为团结奋斗的力量。',
  },
];

const gallery = [
  {
    image: '/zunyi-meeting-site-2025.jpg',
    label: '观察点 01 / 会址主楼',
    title: '历史发生的建筑',
    body: '中西合璧的两层建筑静立在遵义老城。进入这里，历史首先以真实空间建立尺度。',
    credit: '新华社记者 刘续 摄，2025',
    href: 'https://www.news.cn/photo/20250115/cc5f6f9e504a41a3a44cc76f7758cb38/c.html',
  },
  {
    image: '/zunyi-meeting-room.jpg',
    label: '观察点 02 / 二楼小客厅',
    title: '一张长桌的历史分量',
    body: '复原会场没有宏大的舞台。有限的空间与朴素陈设，反而让“危急关头的集体抉择”更可感。',
    credit: '新华社记者 陶亮 摄，2019',
    href: 'https://fms.news.cn/swf/2019_qmtt/7_14_2019_qm_z/index.html',
  },
  {
    image: '/zunyi-exhibition-map.jpg',
    label: '观察点 03 / 基本陈列',
    title: '把军事行动放回地图',
    body: '路线、敌我态势和行动方向，让观众看到会议不是孤立事件，而是长征实践中的关键节点。',
    credit: '新华社记者 陶亮 摄，2019',
    href: 'https://fms.news.cn/swf/2019_qmtt/7_14_2019_qm_z/index.html',
  },
  {
    image: '/zunyi-site-aerial.jpg',
    label: '观察点 04 / 城市与会址',
    title: '历史空间仍在当代生活中',
    body: '从空中俯瞰，会址与遵义城市肌理彼此相连。红色文化不是被封存的标本，而是持续被认识和传承的记忆。',
    credit: '新华社记者 陶亮 摄，2019',
    href: 'https://fms.news.cn/swf/2019_qmtt/7_14_2019_qm_z/index.html',
  },
  {
    image: '/visit-2025-03.jpg',
    label: '观察点 05 / 九十周年',
    title: '一代代人走近这段历史',
    body: '纪念节点让会址再次成为公共记忆的汇聚地。今天的到访，是对伟大转折的回望，也是对精神力量的接续。',
    credit: '新华社记者 刘续 摄，2025',
    href: 'https://www.news.cn/photo/20250115/cc5f6f9e504a41a3a44cc76f7758cb38/c.html',
  },
];

const archives = [
  {
    number: 'A-01',
    title: '党的第三个历史决议',
    org: '中国共产党第十九届中央委员会第六次全体会议',
    scope: '本展关于遵义会议历史地位的最高层级权威表述。',
    href: 'https://www.mem.gov.cn/jjz/ywgz/202111/t20211122_403307.shtml',
  },
  {
    number: 'A-02',
    title: '《党史上的重要会议》：遵义会议',
    org: '中共中央党史和文献研究院',
    scope: '会议背景、议程、重要决定及会后领导调整。',
    href: 'https://www.dswxyjy.org.cn/BIG5/n1/2022/1110/c448623-32563152.html',
  },
  {
    number: 'A-03',
    title: '历史的回响 前行的力量',
    org: '新华社 · 遵义会议召开90周年专题报道',
    scope: '以历史现场与当代回望连接危局、转折和精神传承。',
    href: 'https://www.news.cn/politics/20250114/e29525440110466fb81f5799b2fba906/c.html',
  },
  {
    number: 'A-04',
    title: '走近革命文物 重温遵义记忆',
    org: '中华人民共和国国防部',
    scope: '会址空间、革命文物和会议重大历史意义。',
    href: 'https://www.mod.gov.cn/gfbw/gfjy_index/js_214151/16365244.html',
  },
  {
    number: 'A-05',
    title: '伟大转折是怎样发生的',
    org: '新华社 · 重回遵义会议现场',
    scope: '本站历史场景图片、会址图片与展陈图片来源。',
    href: 'https://fms.news.cn/swf/2019_qmtt/7_14_2019_qm_z/index.html',
  },
  {
    number: 'A-06',
    title: '遵义会议精神永放光芒',
    org: '中国共产党新闻网',
    scope: '“坚定信念、坚持真理、独立自主、团结统一”的精神内涵。',
    href: 'https://dangjian.people.com.cn/n1/2026/0522/c117092-40725457.html',
  },
];

export default function Home() {
  const [activeHall, setActiveHall] = useState<HallId>('crisis');
  const [activeRoute, setActiveRoute] = useState(0);
  const [activeRecord, setActiveRecord] = useState(0);
  const [activeDecision, setActiveDecision] = useState(0);
  const [activeSpirit, setActiveSpirit] = useState(0);
  const [litSpirits, setLitSpirits] = useState<number[]>([0]);
  const [activePhoto, setActivePhoto] = useState(0);
  const [activeArchive, setActiveArchive] = useState(0);
  const [visitedHalls, setVisitedHalls] = useState<HallId[]>(['crisis']);

  const hall = useMemo(
    () => halls.find((item) => item.id === activeHall) || halls[0],
    [activeHall],
  );

  const chooseHall = (id: HallId) => {
    setActiveHall(id);
    setVisitedHalls((current) => (current.includes(id) ? current : [...current, id]));
  };

  const enterExhibition = () => {
    document.getElementById('museum')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const moveHall = (direction: -1 | 1) => {
    const current = halls.findIndex((item) => item.id === activeHall);
    const next = (current + direction + halls.length) % halls.length;
    chooseHall(halls[next].id);
  };

  const lightSpirit = (index: number) => {
    setActiveSpirit(index);
    setLitSpirits((current) => (current.includes(index) ? current : [...current, index]));
  };

  const renderCrisis = () => {
    const node = routeNodes[activeRoute];
    return (
      <div className="route-room">
        <div className="route-map">
          <div className="map-grid" aria-hidden="true" />
          <div className="map-mountain mountain-a" aria-hidden="true" />
          <div className="map-mountain mountain-b" aria-hidden="true" />
          <svg className="route-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M9 82 C15 80 19 74 25 70 S35 63 41 58 S50 51 57 45 S66 36 73 31 S82 22 89 17" />
            <path className="route-line-glow" d="M9 82 C15 80 19 74 25 70 S35 63 41 58 S50 51 57 45 S66 36 73 31 S82 22 89 17" />
          </svg>
          {routeNodes.map((item, index) => (
            <button
              className={'map-node ' + (activeRoute === index ? 'active' : '')}
              key={item.short}
              onClick={() => setActiveRoute(index)}
              style={{ left: item.x + '%', top: item.y + '%' }}
              type="button"
              aria-label={'查看' + item.short + '节点'}
            >
              <i />
              <b>{item.short}</b>
              <span>{item.date}</span>
            </button>
          ))}
          <p className="schematic-note">长征关键节点关系示意 · 非精确地理地图</p>
        </div>

        <article className="route-file" key={node.title}>
          <div className="file-corner">密</div>
          <p className="file-index">行军档案 / {String(activeRoute + 1).padStart(2, '0')}</p>
          <time>{node.date}</time>
          <h3>{node.title}</h3>
          <p className="file-main">{node.body}</p>
          <div className="file-meaning">
            <span>这一节点意味着</span>
            <strong>{node.meaning}</strong>
          </div>
          <a href={node.href} target="_blank" rel="noreferrer">
            核验史料：{node.source} ↗
          </a>
        </article>
      </div>
    );
  };

  const renderMeeting = () => {
    const record = meetingRecords[activeRecord];
    return (
      <div className="meeting-room">
        <div className="meeting-table-zone">
          <div className="meeting-facts">
            <span><b>1935</b> / 01 / 15—17</span>
            <span>中共中央政治局扩大会议</span>
            <span>贵州 · 遵义</span>
          </div>
          <div className="table-plan" aria-label="交互式会议长桌">
            <div className="table-surface">
              <span>遵义会议</span>
              <b>点击封签<br />打开记录</b>
            </div>
            {meetingRecords.map((item, index) => (
              <button
                className={'table-tag tag-' + (index + 1) + ' ' + (activeRecord === index ? 'active' : '')}
                key={item.number}
                onClick={() => setActiveRecord(index)}
                type="button"
              >
                <span>{item.number}</span>
                {item.label}
              </button>
            ))}
            <div className="chair chair-1" /><div className="chair chair-2" />
            <div className="chair chair-3" /><div className="chair chair-4" />
            <div className="chair chair-5" /><div className="chair chair-6" />
            <div className="chair chair-7" /><div className="chair chair-8" />
          </div>
          <p className="table-disclaimer">空间交互为会场结构示意，不对应具体座次。</p>
        </div>

        <article className="meeting-record" key={record.number}>
          <div className="record-thread" aria-hidden="true" />
          <div className="record-head">
            <span>会议记录</span>
            <b>{record.number} / 05</b>
          </div>
          <p>{record.label}</p>
          <h3>{record.title}</h3>
          <div className="record-rule" />
          <p className="record-body">{record.body}</p>
          <blockquote>{record.note}</blockquote>
          <a
            href="https://www.dswxyjy.org.cn/BIG5/n1/2022/1110/c448623-32563152.html"
            target="_blank"
            rel="noreferrer"
          >
            中共中央党史和文献研究院资料 ↗
          </a>
        </article>
      </div>
    );
  };

  const renderDecision = () => {
    const item = decisionLinks[activeDecision];
    return (
      <div className="decision-room">
        <div className="decision-console">
          <div className="decision-core">
            <p>最危急关头</p>
            <strong>伟大<br />转折</strong>
            <span>挽救了党<br />挽救了红军<br />挽救了中国革命</span>
          </div>
          <div className="decision-track" aria-hidden="true" />
          {decisionLinks.map((decision, index) => (
            <button
              className={'decision-seal seal-' + (index + 1) + ' ' + (activeDecision === index ? 'active' : '')}
              key={decision.title}
              onClick={() => setActiveDecision(index)}
              type="button"
            >
              <i>{decision.number}</i>
              <b>{decision.title}</b>
              <span>{decision.verb}</span>
            </button>
          ))}
        </div>

        <article className="decision-file" key={item.title}>
          <p>转折机制 / {item.number}</p>
          <h3>{item.title}</h3>
          <strong>{item.lead}</strong>
          <span>{item.detail}</span>
          <div>
            <small>由此带来的改变</small>
            <b>{item.result}</b>
          </div>
          <a
            href="https://www.mem.gov.cn/jjz/ywgz/202111/t20211122_403307.shtml"
            target="_blank"
            rel="noreferrer"
          >
            查看中央历史决议中的权威定位 ↗
          </a>
        </article>

        <p className="official-position">
          <span>中央历史决议</span>
          事实上确立了毛泽东同志在党中央和红军的领导地位，开始确立了以毛泽东同志为主要代表的马克思主义正确路线在党中央的领导地位，开始形成以毛泽东同志为核心的党的第一代中央领导集体，开启了党独立自主解决中国革命实际问题新阶段。
        </p>
      </div>
    );
  };

  const renderSpirit = () => {
    const spirit = spirits[activeSpirit];
    return (
      <div className="spirit-room">
        <div className="spirit-lights">
          <div className="light-beam beam-1" /><div className="light-beam beam-2" />
          <div className="light-beam beam-3" /><div className="light-beam beam-4" />
          <div className="spirit-center">
            <span>已点亮</span>
            <strong>{litSpirits.length}<small>/4</small></strong>
            <p>{litSpirits.length === 4 ? '四束精神之光已经汇合' : '点击四个精神坐标'}</p>
          </div>
          {spirits.map((item, index) => (
            <button
              className={
                'spirit-key spirit-' +
                (index + 1) +
                ' ' +
                (activeSpirit === index ? 'active ' : '') +
                (litSpirits.includes(index) ? 'lit' : '')
              }
              key={item.title}
              onClick={() => lightSpirit(index)}
              type="button"
            >
              <span>{item.number}</span>
              <b>{item.title}</b>
            </button>
          ))}
        </div>

        <article className="spirit-reading" key={spirit.title}>
          <p>遵义会议精神 / {spirit.number}</p>
          <h3>{spirit.title}</h3>
          <strong>{spirit.subtitle}</strong>
          <span>{spirit.body}</span>
          <div>
            <small>面向今天</small>
            <b>{spirit.today}</b>
          </div>
          <a
            href="https://dangjian.people.com.cn/n1/2026/0522/c117092-40725457.html"
            target="_blank"
            rel="noreferrer"
          >
            查阅精神内涵权威阐释 ↗
          </a>
        </article>
      </div>
    );
  };

  const renderSite = () => {
    const photo = gallery[activePhoto];
    return (
      <div className="site-room">
        <figure className="site-main-photo" key={photo.image}>
          <img src={photo.image} alt={photo.title} />
          <div className="photo-vignette" />
          <figcaption>
            <span>{photo.label}</span>
            <h3>{photo.title}</h3>
            <p>{photo.body}</p>
            <a href={photo.href} target="_blank" rel="noreferrer">
              {photo.credit} · 查看原报道 ↗
            </a>
          </figcaption>
        </figure>
        <div className="photo-filmstrip" aria-label="会址观察点">
          {gallery.map((item, index) => (
            <button
              className={activePhoto === index ? 'active' : ''}
              key={item.label}
              onClick={() => setActivePhoto(index)}
              type="button"
            >
              <img src={item.image} alt="" />
              <span>{String(index + 1).padStart(2, '0')}</span>
              <b>{item.title}</b>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderArchive = () => {
    const item = archives[activeArchive];
    return (
      <div className="archive-room">
        <div className="archive-cabinet" aria-label="权威史料抽屉">
          <div className="cabinet-title"><span>ZY / VERIFIED</span><b>权威史料柜</b></div>
          {archives.map((archive, index) => (
            <button
              className={activeArchive === index ? 'active' : ''}
              key={archive.number}
              onClick={() => setActiveArchive(index)}
              type="button"
            >
              <span>{archive.number}</span>
              <b>{archive.title}</b>
              <i />
            </button>
          ))}
        </div>

        <article className="archive-reader" key={item.number}>
          <div className="archive-stamp">已核</div>
          <p>资料抽屉 / {item.number}</p>
          <h3>{item.title}</h3>
          <strong>{item.org}</strong>
          <div>
            <small>本展采用范围</small>
            <span>{item.scope}</span>
          </div>
          <a href={item.href} target="_blank" rel="noreferrer">
            打开权威原文 ↗
          </a>
        </article>

        <aside className="curatorial-boundary">
          <p>策展说明</p>
          <div>
            <span><b>史实</b>历史结论、时间节点、会议内容均依据公开权威资料。</span>
            <span><b>示意</b>路线和会场交互用于梳理关系，不替代专业地图与原始档案。</span>
            <span><b>图像</b>新闻图片逐项标注来源；封面灯具为氛围意象，不作为文物原件。</span>
            <span><b>边界</b>不虚构人物对白，不设置改写历史、阵营选择或历史假设。</span>
          </div>
        </aside>
      </div>
    );
  };

  const renderHall = () => {
    if (activeHall === 'crisis') return renderCrisis();
    if (activeHall === 'meeting') return renderMeeting();
    if (activeHall === 'decision') return renderDecision();
    if (activeHall === 'spirit') return renderSpirit();
    if (activeHall === 'site') return renderSite();
    return renderArchive();
  };

  return (
    <main className="site-shell">
      <header className="topbar">
        <button
          className="brand"
          onClick={() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })}
          type="button"
          aria-label="返回封面"
        >
          <span className="brand-seal">遵</span>
          <span>
            <b>遵义·决策现场</b>
            <small>历史情境数字展</small>
          </span>
        </button>
        <div className="topbar-motto">在危局中坚持真理 · 在实践中修正错误</div>
        <button className="topbar-enter" onClick={enterExhibition} type="button">
          打开展厅地图 <i>⌘</i>
        </button>
      </header>

      <section className="cinematic-hero" id="top">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-red" aria-hidden="true" />
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-light-cone" aria-hidden="true" />
        <div className="hero-year" aria-hidden="true">1935</div>
        <div className="hero-coordinates" aria-hidden="true">
          <span>27°41′ N</span>
          <span>106°55′ E</span>
        </div>

        <div className="hero-copy">
          <p className="hero-fileline"><span>中央红军长征途中</span><b>档案编号 ZY-1935-01</b></p>
          <h1><span>在答案</span><em>出现以前</em></h1>
          <div className="hero-intro">
            <strong>遵义会议历史情境数字展</strong>
            <p>伟大转折不是突然降临，而是在最危急的关头，坚持真理、修正错误作出的历史抉择。</p>
          </div>
          <div className="hero-actions">
            <button onClick={enterExhibition} type="button">
              推门进入数字会址 <span>→</span>
            </button>
            <p>不是逐页观看<br />请在展厅中主动探索</p>
          </div>
        </div>

        <aside className="hero-dossier">
          <p>遵义 / 1935.01.15—17</p>
          <strong>生死攸关的转折点</strong>
          <span>挽救了党 · 挽救了红军 · 挽救了中国革命</span>
          <i>伟大转折</i>
        </aside>

        <div className="hero-lamp" aria-label="煤油灯氛围意象">
          <div className="lamp-aura" />
          <img src="/kerosene-lamp.png" alt="" />
          <span>灯具为氛围视觉意象</span>
        </div>
        <p className="hero-credit">背景资料图：遵义会议会议室，新华社记者 陶亮 摄（2019）</p>
      </section>

      <section className={'museum hall-' + activeHall} id="museum">
        <aside className="museum-map">
          <div className="map-heading">
            <span>DIGITAL SITE / 06 ROOMS</span>
            <h2>数字会址</h2>
            <p>请选择入口，自主决定参观顺序。</p>
          </div>

          <nav aria-label="数字展厅导航">
            {halls.map((item) => (
              <button
                className={
                  (activeHall === item.id ? 'active ' : '') +
                  (visitedHalls.includes(item.id) ? 'visited' : '')
                }
                key={item.id}
                onClick={() => chooseHall(item.id)}
                type="button"
              >
                <span>{item.number}</span>
                <b>{item.label}</b>
                <i>{visitedHalls.includes(item.id) ? '•' : '○'}</i>
              </button>
            ))}
          </nav>

          <div className="visit-progress">
            <div style={{ '--progress': visitedHalls.length / halls.length } as CSSProperties}>
              <strong>{visitedHalls.length}</strong>
              <span>/ 6</span>
            </div>
            <p>已进入展厅</p>
          </div>
        </aside>

        <div className="hall-stage">
          <div
            className="hall-backdrop"
            style={{ backgroundImage: 'url(' + hall.background + ')' }}
            aria-hidden="true"
          />
          <div className="hall-overlay" aria-hidden="true" />
          <header className="scene-heading">
            <div>
              <span>{hall.eyebrow}</span>
              <h2>{hall.title}</h2>
            </div>
            <p><i />{hall.instruction}</p>
          </header>

          <div className="hall-content" key={activeHall}>
            {renderHall()}
          </div>

          <div className="hall-switcher">
            <button onClick={() => moveHall(-1)} type="button" aria-label="上一个展厅">←</button>
            <span>{hall.number} / 06</span>
            <button onClick={() => moveHall(1)} type="button" aria-label="下一个展厅">→</button>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <span className="brand-seal">遵</span>
          <p><strong>遵义·决策现场</strong><small>基于公开权威史料制作的补充性数字传播作品</small></p>
        </div>
        <blockquote>“要运用好遵义会议历史经验，让遵义会议精神永放光芒。”</blockquote>
        <button
          onClick={() => {
            chooseHall('archive');
            document.getElementById('museum')?.scrollIntoView({ behavior: 'smooth' });
          }}
          type="button"
        >
          返回史料柜 ↑
        </button>
      </footer>
    </main>
  );
}
