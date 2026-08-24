'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import RelicExhibition from './relics/RelicExhibition';
import { assetPath } from './paths';

type HallId =
  | 'crisis'
  | 'people'
  | 'meeting'
  | 'decision'
  | 'practice'
  | 'spirit'
  | 'site';

type ExperienceView = 'site' | 'artifacts' | 'archive' | 'finale';

type NoteSection = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  facts?: string[];
  source?: { label: string; href: string };
};

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
    title: '遵义会议之前的危局',
    instruction: '沿六个关键节点，梳理遵义会议召开前的危局与转兵历程。',
    background: '/zunyi-site-aerial.jpg',
  },
  {
    id: 'people',
    number: '02',
    label: '在场·群像',
    eyebrow: 'WHO WAS IN THE ROOM',
    title: '二十位在场者',
    instruction: '切换三组身份，理解这场政治局扩大会议的人员构成与集体讨论。',
    background: '/zunyi-meeting-room.jpg',
  },
  {
    id: 'meeting',
    number: '03',
    label: '会场·长桌',
    eyebrow: 'INSIDE THE MEETING',
    title: '长桌上的五份记录',
    instruction: '点击桌边封签，从时间、议题、方法、决定与会后进程进入现场。',
    background: '/zunyi-meeting-room.jpg',
  },
  {
    id: 'decision',
    number: '04',
    label: '文献·决议',
    eyebrow: 'FROM DEBATE TO DOCUMENT',
    title: '一份决议怎样形成',
    instruction: '打开四层文献，查看议题、决定、起草与历史评价之间的关系。',
    background: '/zunyi-exhibition-map.jpg',
  },
  {
    id: 'practice',
    number: '05',
    label: '实践·检验',
    eyebrow: 'TESTED BY PRACTICE',
    title: '转折之后，实践作答',
    instruction: '推动时间标尺，观察会议成果如何在此后的长征实践中得到检验。',
    background: '/zunyi-exhibition-map.jpg',
  },
  {
    id: 'spirit',
    number: '06',
    label: '精神·灯塔',
    eyebrow: 'THE SPIRIT LIVES ON',
    title: '点亮遵义会议精神',
    instruction: '依次点亮四束光，读懂伟大转折留给今天的精神力量。',
    background: '/visit-2025-03.jpg',
  },
  {
    id: 'site',
    number: '07',
    label: '今日·会址',
    eyebrow: 'THE SITE TODAY',
    title: '从会址走进历史',
    instruction: '切换五个观察点，以建筑、场景与展陈建立现场感。',
    background: '/zunyi-meeting-site-2025.jpg',
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

const routeLayers = [
  {
    situation: '第五次反“围剿”失败，中央红军被迫离开中央革命根据地，战略转移在强敌围追堵截中展开。',
    choice: '仍按原有方式行动，还是从失败中重新检验军事指导？这是长征一开始就必须面对的问题。',
    consequence: '军事失利逐渐转化为党内对错误领导和指挥方式的深刻反思。',
    thread: '下一节点：湘江战役进一步放大危机。',
  },
  {
    situation: '突破湘江封锁线付出重大牺牲，红军力量严重受损，原定行动方案面临事实检验。',
    choice: '继续前往敌人已设重兵的湘西，还是选择新的前进方向？',
    consequence: '越来越多同志认识到，必须改变不符合实际的指挥和行动路线。',
    thread: '下一节点：通道会议开始讨论转兵贵州。',
  },
  {
    situation: '敌军已判断红军原定会合方向并布置重兵，继续按原计划行动风险极大。',
    choice: '毛泽东同志提出避开强敌、向敌人力量薄弱的贵州前进。',
    consequence: '红军行动方向发生重要变化，实事求是的主张开始获得更多支持。',
    thread: '下一节点：黎平会议以集体决定明确新的行动方针。',
  },
  {
    situation: '中央政治局需要把行军途中的讨论转化为正式、明确的集体决策。',
    choice: '会议放弃到湘西北会合的原定计划，决定转向贵州北部。',
    consequence: '新的行动方向使红军摆脱被动，为进入遵义和集中总结经验创造条件。',
    thread: '下一节点：猴场会议进一步加强政治局对军事决策的领导。',
  },
  {
    situation: '重大军事行动需要摆脱个人包办，使政治局能够真正承担集体领导责任。',
    choice: '会议对作战方针以及作战时间、地点的决定程序作出新的要求。',
    consequence: '政治局对军事问题的领导得到加强，召开一次集中总结会议的组织条件更加成熟。',
    thread: '下一节点：红军进入遵义，历史转折即将发生。',
  },
  {
    situation: '遵义为中央提供了相对稳定的环境；对军事指挥错误的认识也在此前讨论中逐渐集中。',
    choice: '召开中央政治局扩大会议，正面总结第五次反“围剿”和长征初期的经验教训。',
    consequence: '分散在行军途中的反思，终于进入一次正式、充分的集体讨论。',
    thread: '进入“会场·长桌”，查看会议如何展开。',
  },
];

const participantGroups = [
  {
    number: '01',
    title: '政治局委员与候补委员',
    count: '10人',
    summary: '政治局委员和候补委员构成会议讨论与决策的主体。',
    members: [
      ['毛泽东', '中央政治局委员'],
      ['张闻天', '中央政治局委员'],
      ['周恩来', '中央政治局委员'],
      ['朱德', '中央政治局委员、红军总司令'],
      ['陈云', '中央政治局委员'],
      ['博古', '中央政治局委员'],
      ['王稼祥', '中央政治局候补委员'],
      ['刘少奇', '中央政治局候补委员'],
      ['邓发', '中央政治局候补委员'],
      ['何克全（凯丰）', '中央政治局候补委员'],
    ],
    insight: '遵义会议是中央政治局扩大会议。重大意见通过报告、发言、批评和讨论形成，不是个人在会场中的单向决定。',
  },
  {
    number: '02',
    title: '红军负责人',
    count: '7人',
    summary: '总部、总政治部和各军团主要负责人把前线实践带入中央讨论。',
    members: [
      ['刘伯承', '红军总参谋长'],
      ['李富春', '红军总政治部代理主任'],
      ['林彪', '红一军团军团长'],
      ['聂荣臻', '红一军团政治委员'],
      ['彭德怀', '红三军团总指挥'],
      ['杨尚昆', '红三军团政治委员'],
      ['李卓然', '红五军团政治委员'],
    ],
    insight: '军事指挥的是非不能脱离战场。来自总部和军团的实践经验，使会议能够围绕真实战局检验此前的战略战术。',
  },
  {
    number: '03',
    title: '中央机关与列席',
    count: '3人',
    summary: '中央秘书长以及列席人员共同构成会议的完整在场者名单。',
    members: [
      ['邓小平', '中共中央秘书长'],
      ['李德', '共产国际驻中国军事顾问，列席'],
      ['伍修权', '翻译，列席'],
    ],
    insight: '对在场者的呈现只说明公开党史资料确认的身份和参会关系，不推演座次，不虚构未被史料记录的对话。',
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

const meetingLayers = [
  {
    before: '1月7日红军进入遵义，为中央集中召开会议提供了相对稳定的空间条件。',
    inside: '会议连续举行三天。公开党史资料确认会场位于二楼东面客厅，可容纳20余人。',
    after: '会场后来按历史资料复原，成为公众理解遵义会议最直观的空间证据。',
    keywords: ['柏公馆', '二楼客厅', '1月15—17日'],
  },
  {
    before: '第五次反“围剿”失败和长征初期严重受挫，使军事领导问题无法回避。',
    inside: '会议审查黎平会议决定，并把总结第五次反“围剿”以来的经验教训作为核心议题。',
    after: '抓住最迫切的军事与组织问题，为红军摆脱被动局面建立新的领导条件。',
    keywords: ['经验教训', '军事问题', '组织问题'],
  },
  {
    before: '此前军事领导将失败过多归因于客观困难，没有正视战略战术上的错误。',
    inside: '与会同志围绕报告和反报告充分发言，以战场事实分析错误，并开展批评与自我批评。',
    after: '符合实际的正确意见获得支持，体现了坚持真理、修正错误的鲜明品格。',
    keywords: ['实践标准', '充分讨论', '批评与自我批评'],
  },
  {
    before: '认识上的转变必须落实为组织领导和军事指挥机制的实际变化。',
    inside: '会议增选毛泽东同志为中央政治局常委，委托张闻天同志起草决议，取消长征前成立的“三人团”。',
    after: '正确主张逐步转化为党中央和红军的领导实践，为形成坚强领导集体奠定基础。',
    keywords: ['增选常委', '起草决议', '取消“三人团”'],
  },
  {
    before: '会议作出的是关键决定，具体领导分工还需要结合行军和作战实际继续完善。',
    inside: '会议决定常委重新分工，并明确后续起草、审查和传达决议的安排。',
    after: '会后形成新的领导分工，后成立毛泽东、周恩来、王稼祥组成的三人小组负责全军军事行动。',
    keywords: ['常委分工', '三人小组', '实践巩固'],
  },
];

const documentLayers = [
  {
    number: '卷一',
    label: '议题',
    title: '为什么必须总结失败',
    question: '一次政治局扩大会议，首先要回答什么？',
    main: '会议集中解决当时具有决定意义的军事和组织问题，重点是总结第五次反“围剿”失败和长征初期受挫的经验教训。',
    points: [
      '审查此前军事指导的是非得失',
      '辨明失败的主观原因与客观条件',
      '为改变领导和指挥方式形成认识基础',
    ],
    note: '转折的起点不是回避失败，而是准确说明失败为什么发生。',
    source: '中共中央党史和文献研究院《遵义会议》',
    href: 'https://www.dswxyjy.org.cn/BIG5/n/2013/1030/c244520-23368739.html',
  },
  {
    number: '卷二',
    label: '决定',
    title: '讨论怎样转化为组织决定',
    question: '正确意见怎样进入党的领导实践？',
    main: '会议增选毛泽东同志为中央政治局常委，决定常委重新分工，取消长征前成立的“三人团”，仍由最高军事首长负责军事指挥。',
    points: [
      '增选毛泽东同志为中央政治局常委',
      '中央政治局常委重新进行适当分工',
      '改变不符合实际的军事指挥机制',
    ],
    note: '组织调整不是孤立的人事变化，而是为贯彻正确路线提供领导保证。',
    source: '中共中央党史和文献研究院党史资料',
    href: 'https://www.dswxyjy.org.cn/n/2015/0202/c244522-26490943.html',
  },
  {
    number: '卷三',
    label: '成文',
    title: '从会议意见到正式决议',
    question: '会议成果怎样被保存、审查和传达？',
    main: '会议指定张闻天同志起草《中央关于反对敌人五次“围剿”的总结的决议》，委托中央政治局常委审查后，发到支部讨论。',
    points: [
      '起草：把讨论形成的认识转化为文献',
      '审查：由中央政治局常委集体把关',
      '传达：通过组织体系形成共同认识',
    ],
    note: '一份决议连接会场讨论、组织程序和全党全军的行动。',
    source: '中共中央党史和文献研究院《遵义会议》',
    href: 'https://www.dswxyjy.org.cn/BIG5/n/2013/1030/c244520-23368739.html',
  },
  {
    number: '卷四',
    label: '定位',
    title: '历史为什么称它为伟大转折',
    question: '今天应当怎样准确评价遵义会议？',
    main: '中央历史决议从领导地位、正确路线、领导集体和独立自主四个层面，权威概括了遵义会议的重大历史贡献。',
    points: [
      '事实上确立毛泽东同志在党中央和红军的领导地位',
      '开始形成以毛泽东同志为核心的党的第一代中央领导集体',
      '开启党独立自主解决中国革命实际问题新阶段',
    ],
    note: '“生死攸关的转折点”既是对会议决定的评价，也是对其后实践结果的历史概括。',
    source: '《中共中央关于党的百年奋斗重大成就和历史经验的决议》',
    href: 'https://www.mem.gov.cn/jjz/ywgz/202111/t20211122_403307.shtml',
  },
];

const practiceSteps = [
  {
    date: '会后不久',
    place: '继续长征途中',
    title: '领导分工继续调整',
    context: '遵义会议决定常委重新分工。会后，中央根据行军和作战实际继续完善领导分工。',
    action: '张闻天同志代替博古负总的责任，毛泽东同志成为周恩来同志在军事指挥上的帮助者。',
    meaning: '会议形成的正确认识开始转化为稳定、有效的领导实践。',
    source: '中共中央党史和文献研究院《党史上的重要会议：遵义会议》',
    href: 'https://www.dswxyjy.org.cn/BIG5/n1/2022/1110/c448623-32563152.html',
  },
  {
    date: '1935.01末—03下旬',
    place: '赤水河流域',
    title: '四渡赤水',
    context: '敌军重兵围堵，红军需要在高度不利的态势中争取主动。',
    action: '中央红军灵活变换作战方向，迂回穿插于敌人重兵之间，四次渡过赤水河。',
    meaning: '新的军事领导和符合实际的战略策略，在复杂战局中展现出主动性与灵活性。',
    source: '国家林业和草原局《弘扬遵义会议精神 走好新时代长征路》',
    href: 'https://www.forestry.gov.cn/c/www/xxyd/5566.jhtml',
  },
  {
    date: '1935.03',
    place: '长征途中',
    title: '形成新的军事指挥小组',
    context: '瞬息万变的战场需要更加集中有力、能够快速决断的军事指挥。',
    action: '中央决定由毛泽东、周恩来、王稼祥同志组成三人小组，负责全军的军事行动。',
    meaning: '遵义会议开启的领导调整进一步巩固，正确领导核心在实践中形成。',
    source: '中共中央党史和文献研究院相关研究资料',
    href: 'https://www.dswxyjy.org.cn/n1/2019/0228/c423725-30931815.html',
  },
  {
    date: '1935.05上旬',
    place: '金沙江',
    title: '摆脱围追堵截',
    context: '中央红军继续机动作战，寻找跳出敌军包围圈的战略机会。',
    action: '红军渡过金沙江，摆脱数十万敌军的围追堵截。',
    meaning: '取得战略转移中具有决定意义的胜利，遵义会议的历史成果经受了实践检验。',
    source: '国家林业和草原局《弘扬遵义会议精神 走好新时代长征路》',
    href: 'https://www.forestry.gov.cn/c/www/xxyd/5566.jhtml',
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

const spiritLayers = [
  {
    history: '在红军力量严重受损、前途命运受到严峻考验时，党和红军没有动摇革命理想与胜利信念。',
    method: '信念不是盲目乐观，而是在认清困难的基础上仍然坚持目标、主动寻找出路。',
    connection: '它回答“为什么在危局中仍能前进”。',
  },
  {
    history: '会议以第五次反“围剿”和长征初期的实际结果检验军事领导，敢于承认并纠正错误。',
    method: '尊重事实、开展批评和自我批评，让符合实际的正确主张得到支持。',
    connection: '它回答“怎样从失败中找到正确方向”。',
  },
  {
    history: '会议在与共产国际联系中断的情况下召开，独立自主解决中国革命和革命战争重大问题。',
    method: '坚持把马克思主义基本原理同中国具体实际相结合，从国情、敌情和军情出发作出决策。',
    connection: '它回答“中国革命的道路由谁来探索”。',
  },
  {
    history: '充分讨论后形成共同认识，通过组织调整建立坚强领导，保证思想统一、政治团结和行动一致。',
    method: '团结不是取消讨论，而是在坚持真理基础上形成统一意志与行动。',
    connection: '它回答“怎样把正确认识转化为集体力量”。',
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
    body: '路线、敌我态势和行动方向彼此交织：遵义会议不是孤立事件，而是长征实践中的关键节点。',
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

const galleryLayers = [
  {
    details: ['观察中西合璧的建筑形制', '从主楼入口建立历史空间方位', '理解会址与遵义老城的关系'],
    prompt: '先看建筑，再进入事件：历史不是抽象背景，它发生在可以抵达的真实空间。',
  },
  {
    details: ['长方桌与围合式藤椅', '墙面、窗户和室内尺度', '吊灯等复原陈设形成的时代感'],
    prompt: '朴素空间与重大决策之间的反差，是会址最有力量的叙事之一。',
  },
  {
    details: ['把会议放回长征整体路线', '对照敌我态势理解行动选择', '从地图观察战略主动权的变化'],
    prompt: '沿地图对照行动方向与敌我态势，“根据实际作出决策”的具体含义便清晰可见。',
  },
  {
    details: ['会址院落与周边街区', '纪念空间与城市日常并存', '公共参观持续连接历史记忆'],
    prompt: '一处旧址如何成为一座城市共同维护、不断讲述的精神坐标？',
  },
  {
    details: ['九十周年纪念标识', '不同年龄的人们共同到访', '纪念活动连接历史与当代'],
    prompt: '纪念不是停留在回望，而是把历史经验转化为继续前进的力量。',
  },
];

const archives = [
  {
    number: 'A-01',
    title: '党的第三个历史决议',
    org: '中国共产党第十九届中央委员会第六次全体会议',
    scope: '用于确定遵义会议历史地位的最高层级权威表述。',
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
    scope: '会议室、会址全景与展陈图片的资料来源。',
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

const archiveLayers = [
  {
    level: '中央历史决议',
    use: '用于确定遵义会议的历史地位与规范表述，是全展最高层级的结论依据。',
    related: ['文献·决议', '精神·灯塔'],
  },
  {
    level: '中央党史研究资料',
    use: '用于核对会议时间、核心议题、重要决定和会后领导分工。',
    related: ['会场·长桌', '文献·决议'],
  },
  {
    level: '中央新闻机构专题',
    use: '用于连接历史叙事、会址现场和遵义会议召开90周年的当代纪念。',
    related: ['前夜·路线', '今日·会址'],
  },
  {
    level: '国家机关国防教育资料',
    use: '用于理解革命文物、会址空间以及党在政治上开始走向成熟的意义。',
    related: ['在场·群像', '会场·长桌'],
  },
  {
    level: '新华社现场报道',
    use: '用于会议室、会址全景和展陈地图等历史场景图片。',
    related: ['今日·会址', '封面'],
  },
  {
    level: '中国共产党新闻网',
    use: '用于“坚定信念、坚持真理、独立自主、团结统一”的精神内涵。',
    related: ['精神·灯塔', '实践·检验'],
  },
];

export default function Home() {
  const [experienceView, setExperienceView] = useState<ExperienceView>('site');
  const [activeHall, setActiveHall] = useState<HallId>('crisis');
  const [activeRoute, setActiveRoute] = useState(0);
  const [activeParticipantGroup, setActiveParticipantGroup] = useState(0);
  const [activeRecord, setActiveRecord] = useState(0);
  const [activeDecision, setActiveDecision] = useState(0);
  const [activePractice, setActivePractice] = useState(0);
  const [activeSpirit, setActiveSpirit] = useState(0);
  const [litSpirits, setLitSpirits] = useState<number[]>([0]);
  const [activePhoto, setActivePhoto] = useState(0);
  const [activeArchive, setActiveArchive] = useState(0);
  const [noteMode, setNoteMode] = useState<'summary' | 'detail'>('summary');
  const [visitedHalls, setVisitedHalls] = useState<HallId[]>(['crisis']);
  const meetingRoomBackground = {
    '--meeting-room-image': `url("${assetPath('/zunyi-meeting-room.jpg')}")`,
  } as CSSProperties;

  const hall = useMemo(
    () => halls.find((item) => item.id === activeHall) || halls[0],
    [activeHall],
  );

  const chooseHall = (id: HallId) => {
    setActiveHall(id);
    setVisitedHalls((current) => (current.includes(id) ? current : [...current, id]));
  };

  const switchExperience = (view: ExperienceView, targetId?: string) => {
    setExperienceView(view);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (targetId) {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' });
        }
      });
    });
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

  const noteSelectionKey = [
    experienceView,
    activeHall,
    activeRoute,
    activeParticipantGroup,
    activeRecord,
    activeDecision,
    activePractice,
    activeSpirit,
    activePhoto,
    activeArchive,
  ].join(':');

  useEffect(() => {
    setNoteMode('summary');
  }, [noteSelectionKey]);

  const renderNote = (summary: ReactNode, sections: NoteSection[]) => {
    if (noteMode === 'summary') {
      return (
        <>
          {summary}
          <button
            className="open-in-note"
            onClick={() => setNoteMode('detail')}
            type="button"
          >
            <span><b>展开本条完整解读</b>在当前便签内纵向滚动阅读</span>
            <i>向下展开 ↓</i>
          </button>
        </>
      );
    }

    return (
      <div className="in-note-detail">
        <header>
          <button onClick={() => setNoteMode('summary')} type="button">← 返回概述</button>
          <span>本条完整解读</span>
        </header>
        <div className="note-detail-scroll">
          {sections.map((section) => (
            <section key={section.title}>
              <small>{section.eyebrow}</small>
              <h4>{section.title}</h4>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.facts && (
                <div className="note-detail-facts">
                  {section.facts.map((fact) => <span key={fact}>{fact}</span>)}
                </div>
              )}
              {section.source && (
                <a href={section.source.href} target="_blank" rel="noreferrer">权威来源：{section.source.label} ↗</a>
              )}
            </section>
          ))}
        </div>
      </div>
    );
  };

  const renderCrisis = () => {
    const node = routeNodes[activeRoute];
    const layer = routeLayers[activeRoute];
    const pages: NoteSection[] = [
      {
        eyebrow: '01 / 历史处境',
        title: node.title,
        paragraphs: [
          node.body,
          layer.situation,
          '理解这一节点，既要看到强敌围追堵截形成的外部压力，也要看到此前军事指挥方式在战争实践中暴露出的问题。危局因此不仅表现为行军受阻，更表现为原有判断和领导方式必须接受事实检验。',
        ],
        facts: [node.date, node.short, '长征关键节点'],
      },
      {
        eyebrow: '02 / 关键转向',
        title: '从' + node.short + '看到的选择',
        paragraphs: [
          layer.choice,
          node.meaning,
          '关键变化在于判断依据发生转向：不再机械沿用既定方案，而是把敌情、地形、兵力和此前行动结果放在一起分析。新的主张也正是在与实际结果的反复比较中逐渐获得更多支持。',
        ],
      },
      {
        eyebrow: '03 / 前后联系',
        title: '这一节点怎样连接下一步',
        paragraphs: [
          layer.consequence,
          layer.thread,
          '六个节点不是一条预先写好的直线。每一次方向调整、会议讨论和行动结果，都为下一次判断提供新的事实条件；从分散在行军途中的反思，到遵义会议上的集中总结，认识变化和组织准备由此逐步积累。',
        ],
      },
      {
        eyebrow: '04 / 相关史料',
        title: node.short + '节点的资料出处',
        paragraphs: [
          node.source + '对这一节点的时间、事件及其在长征进程中的意义作出了公开记载。',
          '沿着原文继续阅读，可以把当前节点同前后的军事行动、政治局会议和领导方式变化联系起来。',
          '阅读时可依次核对时间、地点、会议或行动内容以及后续影响，避免只凭路线示意图判断精确地理位置，也避免把后来形成的历史结论提前套入当时尚在发展的具体局势。',
        ],
        source: { label: node.source, href: node.href },
      },
      {
        eyebrow: '05 / 阅读线索',
        title: '把危局读成一个逐步转变的过程',
        paragraphs: [
          '从瑞金到遵义，最值得把握的不是地点数量，而是“实践暴露问题—讨论提出选择—行动检验判断—认识逐渐集中”的连续过程。路线变化与党内认识变化彼此关联，却不能简单画成单一因果箭头。',
          '将当前节点同前一节点和后一节点对照，可以看到哪些问题尚未解决、哪些意见开始获得支持、哪些组织条件正在形成。这样才能理解遵义会议为何能够在1935年1月成为集中总结经验教训的重要历史关头。',
        ],
      },
    ];
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
          {renderNote(
            <>
              <div className="file-corner">密</div>
              <p className="file-index">行军档案 / {String(activeRoute + 1).padStart(2, '0')}</p>
              <time>{node.date}</time>
              <h3>{node.title}</h3>
              <p className="file-main">{node.body}</p>
              <div className="route-analysis">
                <section><span>01 / 历史处境</span><p>{layer.situation}</p></section>
                <section><span>02 / 面临选择</span><p>{layer.choice}</p></section>
                <section><span>03 / 变化发生</span><p>{layer.consequence}</p></section>
              </div>
              <div className="file-meaning"><span>这一节点意味着</span><strong>{node.meaning}</strong></div>
              <p className="file-thread">{layer.thread}</p>
              <a href={node.href} target="_blank" rel="noreferrer">核验史料：{node.source} ↗</a>
            </>,
            pages,
          )}
        </article>
      </div>
    );
  };

  const renderPeople = () => {
    const group = participantGroups[activeParticipantGroup];
    const pages: NoteSection[] = [
      {
        eyebrow: '01 / 人员构成',
        title: group.title,
        paragraphs: [
          group.summary,
          '这一组共有' + group.count + '。把姓名同1935年1月时的职责结合起来，可以看见他们从各自岗位进入会议讨论的具体位置。',
          '遵义会议作为中央政治局扩大会议，既有政治局委员和候补委员，也吸收红军总部、各军团负责人以及中央机关有关人员参加或列席。这样的人员构成，使中央领导层能够直接听取来自军事指挥和前线实践的信息。',
        ],
        facts: [group.count, '出席与列席共20人', '公开党史资料确认'],
      },
      {
        eyebrow: '02 / 名单与职责',
        title: group.title + '的职责关系',
        paragraphs: [
          group.members.map(([name, role]) => name + '（' + role + '）').join('；') + '。',
          '这些职务说明了这组成员所承担的领导、军事或工作责任，也说明会议讨论能够汇集中央与前线不同层面的情况。',
          '名单中的职务是理解发言背景和责任范围的线索，但不能据此推演未经史料确认的具体座次、发言顺序或个人对白。人物关系应放在会议议题、组织程序和当时职责之中理解。',
        ],
        facts: group.members.map(([name, role]) => name + '｜' + role),
      },
      {
        eyebrow: '03 / 会场作用',
        title: group.title + '带入会场的经验',
        paragraphs: [
          group.insight,
          '报告、发言、批评和讨论把各自掌握的情况汇集到同一议题之下。正确意见在真实战局和集体讨论中获得支持，并进一步转化为会议决定。',
          '因此，群像展示的重点不是罗列姓名，而是说明遵义会议怎样把中央决策、红军总部工作和各军团的战场经验带到同一张讨论桌前。会议的历史作用建立在充分讨论、实事求是和组织决定相互衔接的过程之中。',
        ],
      },
      {
        eyebrow: '04 / 名单来源',
        title: '查阅这组在场者的完整资料',
        paragraphs: [
          '共产党员网公开党史资料逐项列明出席、扩大参加和列席人员及其当时身份，可同陈云有关会议的早期记录相互参照。',
          '结合完整名单阅读' + group.title + '，可以更准确地理解这组成员同其他在场者之间的职责联系。',
          '原始记录、回忆资料和后来的研究文章在材料性质上并不相同。展览采用公开权威资料确认的20人名单，并在涉及具体身份时保留“出席”“扩大参加”“列席”等差别。',
        ],
        source: {
          label: '共产党员网《中国共产党的历史上一个生死攸关的转折点——遵义会议》',
          href: 'https://news.12371.cn/2015/01/07/ARTI1420595886046625.shtml',
        },
      },
      {
        eyebrow: '05 / 群像视角',
        title: '从20位在场者理解集体讨论',
        paragraphs: [
          '把20位在场者放在一起观察，可以看见会议并不是脱离战争实践的抽象议论。中央领导成员、总部负责人和各军团负责人分别掌握不同层面的情况，重大意见需要在共同议题下接受事实比较和集体讨论。',
          '这种群像视角既突出毛泽东同志正确主张所发挥的关键作用，也准确呈现周恩来、张闻天、王稼祥、朱德等同志以及与会多数同志在形成正确意见、推动组织调整中的历史作用。',
        ],
      },
    ];
    return (
      <div className="people-room">
        <div className="people-wall">
          <div className="people-total">
            <span>公开党史资料确认</span>
            <strong>20<small>位</small></strong>
            <p>出席与列席人员</p>
          </div>
          <div className="people-lines" aria-hidden="true" />
          {participantGroups.map((item, index) => (
            <button
              className={'people-group group-' + (index + 1) + ' ' + (activeParticipantGroup === index ? 'active' : '')}
              key={item.title}
              onClick={() => setActiveParticipantGroup(index)}
              type="button"
            >
              <span>{item.number}</span>
              <b>{item.title}</b>
              <i>{item.count}</i>
            </button>
          ))}
          <p className="people-note">群像关系图只呈现身份分组，不推演具体座次。</p>
        </div>

        <article className="people-dossier" key={group.title}>
          {renderNote(
            <>
              <div className="people-dossier-head"><span>在场者档案 / {group.number}</span><b>{group.count}</b></div>
              <h3>{group.title}</h3>
              <p className="people-summary">{group.summary}</p>
              <div className="member-ledger">
                {group.members.map(([name, role], index) => (
                  <div key={name}><span>{String(index + 1).padStart(2, '0')}</span><b>{name}</b><p>{role}</p></div>
                ))}
              </div>
              <blockquote>{group.insight}</blockquote>
              <a href="https://news.12371.cn/2015/01/07/ARTI1420595886046625.shtml" target="_blank" rel="noreferrer">
                核验出席与列席人员名单 ↗
              </a>
            </>,
            pages,
          )}
        </article>
      </div>
    );
  };

  const renderMeeting = () => {
    const record = meetingRecords[activeRecord];
    const layer = meetingLayers[activeRecord];
    const pages: NoteSection[] = [
      {
        eyebrow: '01 / 形成背景',
        title: record.label + '的历史背景',
        paragraphs: [
          layer.before,
          record.body,
          '这条记录所涉及的议题，直接来自此前作战和行军中已经暴露的实际问题。理解会场内容，需要先把它放回第五次反“围剿”失败、长征初期受挫以及通道、黎平、猴场等会议逐步转变认识的历史背景中。',
        ],
      },
      {
        eyebrow: '02 / 会场展开',
        title: record.title + '如何展开',
        paragraphs: [
          layer.inside,
          '会议连续举行三天，相关报告、发言和讨论围绕这一问题逐步深入。来自战场的事实，使不同意见能够在具体实践中得到比较和检验。',
          '公开党史资料表明，会议集中全力解决当时具有决定意义的军事和组织问题。报告、反报告、长篇发言以及与会同志的讨论，构成了从总结失败原因到形成正确意见的重要过程。',
        ],
        facts: layer.keywords,
      },
      {
        eyebrow: '03 / 后续影响',
        title: '从' + record.label + '继续向后看',
        paragraphs: [
          layer.after,
          record.note,
          '会议形成的认识和决定并非在1月17日一次完成全部落实，而是随后通过常委分工、决议起草审查、组织传达以及新的军事实践继续展开。区分“会议当场决定”与“会后逐步形成”，有助于准确理解伟大转折的历史过程。',
        ],
      },
      {
        eyebrow: '04 / 相关史料',
        title: record.label + '的党史资料',
        paragraphs: [
          '中共中央党史和文献研究院资料系统记载了会议时间、地点、主要议题、重要决定及会后进程。',
          '对照原文阅读，可以把当前这条记录放回遵义会议三天讨论的整体过程之中。',
          '会场复原能够帮助建立空间尺度，但复原陈列并不等同于逐字逐句保存下来的会议现场。对具体发言、决定和会后分工的理解，应以公开档案、传达提纲和权威党史研究为依据。',
        ],
        source: {
          label: '中共中央党史和文献研究院《党史上的重要会议：遵义会议》',
          href: 'https://www.dswxyjy.org.cn/BIG5/n1/2022/1110/c448623-32563152.html',
        },
      },
      {
        eyebrow: '05 / 时间层次',
        title: '会议三天与转折进程怎样衔接',
        paragraphs: [
          '遵义会议在三天内完成了集中讨论和关键组织决定，但其历史作用是在会前认识准备、会议决定和会后实践巩固的连续过程中显现出来的。通道、黎平、猴场等会议提供准备，遵义会议成为根本标志，会后的领导分工和军事行动继续巩固成果。',
          '因而，既不能把伟大转折缩减为某一瞬间，也不能淡化遵义会议的根本性、决定性作用。把“会前—会中—会后”三个层次结合起来，才能完整理解会议何以成为党的历史上一个生死攸关的转折点。',
        ],
      },
    ];
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
          {renderNote(
            <>
              <div className="record-thread" aria-hidden="true" />
              <div className="record-head"><span>会议记录</span><b>{record.number} / 05</b></div>
              <p>{record.label}</p>
              <h3>{record.title}</h3>
              <div className="record-rule" />
              <p className="record-body">{record.body}</p>
              <blockquote>{record.note}</blockquote>
              <div className="record-timeline">
                <section><span>会前条件</span><p>{layer.before}</p></section>
                <section><span>会场之中</span><p>{layer.inside}</p></section>
                <section><span>会后影响</span><p>{layer.after}</p></section>
              </div>
              <div className="record-keywords">{layer.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
              <a href="https://www.dswxyjy.org.cn/BIG5/n1/2022/1110/c448623-32563152.html" target="_blank" rel="noreferrer">
                中共中央党史和文献研究院资料 ↗
              </a>
            </>,
            pages,
          )}
        </article>
      </div>
    );
  };

  const renderDecision = () => {
    const item = documentLayers[activeDecision];
    const pages: NoteSection[] = [
      {
        eyebrow: '01 / 当前文献层',
        title: item.title,
        paragraphs: [
          item.question,
          item.main,
          '这一层不是孤立的一张文书，而是会议进程中的一个环节。它承接此前战争实践提出的问题，又为组织决定、决议成文、党内传达和此后行动提供依据。',
        ],
      },
      {
        eyebrow: '02 / 核心内容',
        title: item.label + '包含的要点',
        paragraphs: [
          item.points.join('；') + '。',
          '这些要点把会场中的讨论转化为能够进入组织工作、军事指挥和党内传达的明确内容。',
          '阅读这些要点时，应注意“总结经验教训”“形成组织决定”“起草审查决议”“作出历史评价”属于不同层次。将它们区分开来，可以避免把后来的权威历史结论直接当成当时文件的原句。',
        ],
        facts: item.points,
      },
      {
        eyebrow: '03 / 前后衔接',
        title: item.title + '怎样进入下一环节',
        paragraphs: [
          item.note,
          '从提出问题、形成决定到起草审查和组织传达，每一环节都使会议成果获得更加明确的表达，并进入后续实践。',
          '会议指定张闻天同志起草决议，交由中央政治局常委审查，并在此后传达到部队和党组织。成文和传达使会场形成的正确认识能够超出有限的会议空间，转化为更广泛的统一认识和行动依据。',
        ],
      },
      {
        eyebrow: '04 / 历史位置',
        title: item.title + '在形成链中的位置',
        paragraphs: [
          '这一环节连接着会议讨论与会后落实。会议决定的直接内容，同此后领导实践和军事行动相互衔接，共同构成遵义会议伟大转折的历史进程。',
          item.source + '提供了这一环节的相关记载和历史评价。',
          '权威历史决议对遵义会议历史地位的概括，建立在会议决定及其后实践成果之上。展览将当时形成的文件、会后组织变化和后来作出的历史评价分层呈现，以保持时间顺序和表述层级的准确。',
        ],
        source: { label: item.source, href: item.href },
      },
      {
        eyebrow: '05 / 文献读法',
        title: '从问题、决定到历史评价',
        paragraphs: [
          '文献形成链可以沿六个动作理解：实践提出问题，会场展开讨论，会议形成决定，专人负责起草，组织进行审查传达，新的行动接受实践检验。每一步都承担不同功能，不能用其中任何一步代替全过程。',
          '这种读法既能看见遵义会议解决最迫切军事和组织问题的历史担当，也能看见中国共产党开始独立自主解决中国革命实际问题的政治成熟。',
        ],
      },
    ];
    return (
      <div className="document-room">
        <div className="document-shelf">
          <div className="document-shelf-head">
            <span>ZY / 1935 / DOCUMENT</span>
            <b>会议文献形成链</b>
          </div>
          {documentLayers.map((document, index) => (
            <button
              className={activeDecision === index ? 'active' : ''}
              key={document.number}
              onClick={() => setActiveDecision(index)}
              type="button"
            >
              <span>{document.number}</span>
              <div><small>{document.label}</small><b>{document.title}</b></div>
              <i>{activeDecision === index ? '打开' : '封存'}</i>
            </button>
          ))}
          <div className="document-process">
            <span>会场讨论</span><i>→</i><span>形成决定</span><i>→</i><span>起草审查</span><i>→</i><span>历史检验</span>
          </div>
        </div>

        <article className="document-reader" key={item.title}>
          {renderNote(
            <>
              <div className="document-watermark">遵义</div>
              <div className="document-reader-head"><span>{item.number} / {item.label}</span><b>史料解读件</b></div>
              <h3>{item.title}</h3>
              <strong>{item.question}</strong>
              <p className="document-main">{item.main}</p>
              <div className="document-points">
                {item.points.map((point, index) => <section key={point}><span>0{index + 1}</span><p>{point}</p></section>)}
              </div>
              <blockquote>{item.note}</blockquote>
              <a href={item.href} target="_blank" rel="noreferrer">来源：{item.source} ↗</a>
            </>,
            pages,
          )}
        </article>

        <aside className="document-footer">
          <span>公开党史资料记录了文献形成过程；四层卷册依次连接议题、决定、成文与历史定位。</span>
          <b>议题 → 讨论 → 决定 → 成文 → 传达 → 实践</b>
        </aside>
      </div>
    );
  };

  const renderPractice = () => {
    const item = practiceSteps[activePractice];
    const pages: NoteSection[] = [
      {
        eyebrow: '01 / 战场处境',
        title: item.place + '所面对的局势',
        paragraphs: [
          item.context,
          '遵义会议以后，中央红军仍处在强敌围追堵截之中。不断变化的敌情、地形与行军条件，构成了这一行动的现实背景。',
          '会议解决了最迫切的军事和组织问题，但并没有让困难自动消失。此后的每一次行动仍需在兵力悬殊、信息有限和敌情快速变化的条件下作出判断，这正是检验新的领导和指挥方式的重要环境。',
        ],
        facts: [item.date, item.place],
      },
      {
        eyebrow: '02 / 实践行动',
        title: item.title,
        paragraphs: [
          item.action,
          '这一行动显示，新的军事指挥更加注重根据敌我态势判断时机、调整方向，在运动中争取主动。',
          '这里所说的“实践行动”，既包括具体作战和行军选择，也包括领导分工、指挥机制和决策方法的继续完善。军事上的机动灵活，同实事求是地分析实际情况密切相连。',
        ],
      },
      {
        eyebrow: '03 / 实际影响',
        title: item.title + '带来的变化',
        paragraphs: [
          item.meaning,
          '认识上的纠偏、组织上的调整与军事行动彼此连接。会后的实践进展，使遵义会议形成的正确主张进一步显示出历史作用。',
          '这种影响不是用一次行动简单证明一次会议，而是体现在红军逐步摆脱被动、增强战略主动以及新的领导核心在实践中形成和巩固。观察节点之间的前后变化，比只看单次胜负更能说明“实践检验”的含义。',
        ],
      },
      {
        eyebrow: '04 / 相关史料',
        title: item.title + '与遵义会议成果的联系',
        paragraphs: [
          item.source + '记载了这一行动及其在长征进程中的意义。',
          '把这一节点同前后的领导调整和军事行动对照阅读，可以看到会议成果如何在不断变化的实践中得到落实和巩固。',
          '轨迹图只表示事件之间的叙事关系，并不是精确军事地图。有关日期、地点、行动经过和历史评价，应以链接的权威资料及专业党史、军史研究为准。',
        ],
        source: { label: item.source, href: item.href },
      },
      {
        eyebrow: '05 / 检验逻辑',
        title: '怎样理解“实践作答”',
        paragraphs: [
          '实践检验并不是把会后每一次行动都直接归结为会议决定，而是观察新的认识、领导分工和军事指挥原则能否回应实际问题。行动结果又会反过来修正判断、完善分工并巩固正确领导。',
          '从领导分工继续调整，到四渡赤水、形成新的军事指挥小组，再到渡过金沙江摆脱围追堵截，这条轨迹呈现的是会议成果在动态战局中逐步落实和巩固的过程。',
        ],
      },
    ];
    return (
      <div className="practice-room">
        <div className="practice-field">
          <div className="practice-map-label">
            <span>1935 / AFTER ZUNYI</span>
            <b>会议之后的实践轨迹</b>
          </div>
          <div className="practice-track">
            <svg viewBox="0 0 800 430" preserveAspectRatio="none" aria-hidden="true">
              <path className="practice-route-shadow" d="M80 348 C175 320 185 225 292 260 C404 297 376 125 494 163 C606 199 625 77 732 91" />
              <path d="M80 348 C175 320 185 225 292 260 C404 297 376 125 494 163 C606 199 625 77 732 91" />
              <path className="practice-glow" d="M80 348 C175 320 185 225 292 260 C404 297 376 125 494 163 C606 199 625 77 732 91" />
            </svg>
            {practiceSteps.map((step, index) => (
              <button
                className={'practice-stop stop-' + (index + 1) + ' ' + (activePractice === index ? 'active' : '')}
                key={step.title}
                onClick={() => setActivePractice(index)}
                type="button"
                aria-label={'查看' + step.title}
              >
                <span className="practice-pin" aria-hidden="true" />
                <span className="practice-stop-card">
                  <i>{String(index + 1).padStart(2, '0')}</i>
                  <b>{step.title}</b>
                  <small>{step.date}</small>
                </span>
              </button>
            ))}
          </div>
          <p>轨迹为事件关系示意，不作为精确军事地图。</p>
        </div>

        <article className="practice-board" key={item.title}>
          {renderNote(
            <>
              <div className="practice-date"><span>{item.date}</span><b>{item.place}</b></div>
              <h3>{item.title}</h3>
              <div className="practice-layers">
                <section><span>当时面对</span><p>{item.context}</p></section>
                <section><span>实践行动</span><p>{item.action}</p></section>
                <section><span>历史意义</span><p>{item.meaning}</p></section>
              </div>
              <blockquote>遵义会议的成果不是停留在会场中的结论，而是在新的领导实践和军事行动中不断巩固。</blockquote>
              <a href={item.href} target="_blank" rel="noreferrer">核验史料：{item.source} ↗</a>
            </>,
            pages,
          )}
        </article>
      </div>
    );
  };

  const renderSpirit = () => {
    const spirit = spirits[activeSpirit];
    const layer = spiritLayers[activeSpirit];
    const pages: NoteSection[] = [
      {
        eyebrow: '01 / 历史根基',
        title: spirit.title + '从何而来',
        paragraphs: [
          layer.history,
          spirit.body,
          '这一精神内涵形成于长征危局、纠正错误和开辟新局的历史进程，具有鲜明的实践基础。它不是离开具体史实另加的一句口号，而是可以在会议前后的判断、讨论、组织决定和行动结果中找到依据。',
        ],
      },
      {
        eyebrow: '02 / 具体内涵',
        title: spirit.subtitle,
        paragraphs: [
          layer.method,
          spirit.title + '在遵义会议历史中不是抽象口号，而是通过面对问题、形成判断和付诸行动得到体现。',
          '把精神内涵落到方法上，可以看到中国共产党人怎样正视失败、依据事实辨明是非、在充分讨论中形成正确意见，并把共同认识转化为统一行动。历史精神因此同解决实际问题的能力紧密相连。',
        ],
      },
      {
        eyebrow: '03 / 内在联系',
        title: spirit.title + '与其他精神内涵的联系',
        paragraphs: [
          layer.connection,
          '坚定信念提供方向，坚持真理校正认识，独立自主明确解决问题的立足点，团结统一把共同认识转化为行动。四个方面在历史实践中彼此支撑。',
          '四个方面不能彼此割裂：没有坚定信念，危局中难以保持方向；没有坚持真理，错误难以及时纠正；没有独立自主，难以从中国实际出发；没有团结统一，正确认识也难以转化为有力行动。',
        ],
      },
      {
        eyebrow: '04 / 当代启示',
        title: spirit.title + '留给今天的启示',
        paragraphs: [
          spirit.today,
          '今天回望这段历史，重要的是把信念、真理、实际与团结统一起来，在共同目标下正视问题、形成认识并推动实践。',
          '当代启示不是照搬当年的具体办法，而是学习其中立足实际、勇于纠错、独立思考和维护团结统一的思想方法。只有把历史经验同今天面对的实际任务结合起来，精神传承才具有真实内容。',
        ],
        source: {
          label: '中国共产党新闻网《遵义会议精神永放光芒》',
          href: 'https://dangjian.people.com.cn/n1/2026/0522/c117092-40725457.html',
        },
      },
      {
        eyebrow: '05 / 精神与史实',
        title: '让精神阐释回到历史现场',
        paragraphs: [
          '理解遵义会议精神，可以沿“危局中的问题—会议中的讨论—组织上的决定—实践中的检验”寻找具体支点。每一个精神关键词都应由史实支撑，而不能只停留在抽象赞颂。',
          '展览把四束精神之光放在会议全过程中阅读，目的正是说明精神力量如何从历史实践中生长，又如何在新的时代条件下转化为坚定信念、坚持真理、独立自主和团结统一的行动自觉。',
        ],
      },
    ];
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
          {renderNote(
            <>
              <p>遵义会议精神 / {spirit.number}</p>
              <h3>{spirit.title}</h3>
              <strong>{spirit.subtitle}</strong>
              <span>{spirit.body}</span>
              <div className="spirit-depth">
                <section><small>历史坐标</small><p>{layer.history}</p></section>
                <section><small>精神方法</small><p>{layer.method}</p></section>
                <section><small>逻辑连接</small><p>{layer.connection}</p></section>
              </div>
              <div><small>面向今天</small><b>{spirit.today}</b></div>
              <a href="https://dangjian.people.com.cn/n1/2026/0522/c117092-40725457.html" target="_blank" rel="noreferrer">
                查阅精神内涵权威阐释 ↗
              </a>
            </>,
            pages,
          )}
        </article>
      </div>
    );
  };

  const renderSite = () => {
    const photo = gallery[activePhoto];
    const layer = galleryLayers[activePhoto];
    const pages: NoteSection[] = [
      {
        eyebrow: '01 / 当前观察点',
        title: photo.title,
        paragraphs: [
          photo.body,
          '这张图片记录了' + photo.label.replace('观察点 ', '') + '。结合拍摄年份和报道背景，可以看见会址保护、复原陈列或当代参观的具体状态。',
          '会址提供了可以抵达、观察和测量的真实空间。建筑尺度、房间位置、门窗关系以及陈列环境，使1935年1月的历史事件不再只是文字中的抽象地点。',
        ],
        facts: [photo.label, photo.credit],
      },
      {
        eyebrow: '02 / 画面细节',
        title: '从' + photo.title + '中可以看见什么',
        paragraphs: [
          layer.details.join('；') + '。',
          '这些细节把建筑形制、室内尺度、展陈关系或城市环境呈现在同一画面中，使历史事件重新获得具体的空间参照。',
          '观察图片时，可以先辨认整体空间，再寻找会议室、展陈物件和参观动线等局部线索；同时注意拍摄角度、复原陈列与历史原貌之间的区别，不把今天的展示状态直接等同于1935年的全部现场。',
        ],
        facts: layer.details,
      },
      {
        eyebrow: '03 / 现场思考',
        title: layer.prompt,
        paragraphs: [
          photo.body,
          '建筑、会议室、地图和一代代到访者，分别连接历史空间、复原陈列、展览解释与当代纪念。五个观察点共同构成今天认识遵义会议会址的路径。',
          '从主楼外观进入室内，再由室内陈列回到长征路线与当代纪念，可以形成“建筑—事件—历史进程—精神传承”的观察顺序。空间在这里不是装饰背景，而是理解会议规模、条件和历史影响的重要证据。',
        ],
      },
      {
        eyebrow: '04 / 报道来源',
        title: photo.credit + '的现场记录',
        paragraphs: [
          '这张图片来自新华社公开报道，记录了会址、室内复原空间、基本陈列或纪念活动中的一个现场切面。',
          '打开原报道，可以继续查看同组图片与文字说明，了解图片所处的完整报道语境。',
          '新闻照片能够保存特定时刻的现场状态，但一张照片不能涵盖会址全部历史。将不同年份、不同视角的图片与会址介绍、文物资料和党史文献对照，可以获得更完整的认识。',
        ],
        source: { label: photo.credit + '原报道', href: photo.href },
      },
      {
        eyebrow: '05 / 空间阅读',
        title: '从真实会址走进历史过程',
        paragraphs: [
          '遵义会议会址的价值，不仅在于保存一座建筑，也在于它把中央红军总司令部、二楼会议空间以及遵义老城的历史环境联系在一起。真实地点为理解会议提供了空间尺度和物质依据。',
          '今天参观会址，应把建筑保护、复原陈列、革命文物和权威史料结合起来阅读。由物见人、由空间见事件、由事件见历史进程，才能从“到此一游”进一步走向有依据的历史理解。',
        ],
      },
    ];
    return (
      <div className="site-room">
        <figure className="site-main-photo" key={photo.image}>
          <img src={assetPath(photo.image)} alt={photo.title} />
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
        <aside className="site-observation">
          {renderNote(
            <>
              <p>现场观察清单</p>
              {layer.details.map((detail, index) => <span key={detail}><i>0{index + 1}</i>{detail}</span>)}
              <blockquote>{layer.prompt}</blockquote>
            </>,
            pages,
          )}
        </aside>
        <div className="photo-filmstrip" aria-label="会址观察点">
          {gallery.map((item, index) => (
            <button
              className={activePhoto === index ? 'active' : ''}
              key={item.label}
              onClick={() => setActivePhoto(index)}
              type="button"
            >
              <img src={assetPath(item.image)} alt="" />
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
    const layer = archiveLayers[activeArchive];
    const pages: NoteSection[] = [
      {
        eyebrow: '01 / 资料身份',
        title: item.title,
        paragraphs: [
          item.org + '发布或形成了这份资料。' + item.scope,
          '资料层级标注为“' + layer.level + '”。沿此出处可核对相关结论，并继续阅读更完整的历史语境。',
          '判断一份资料的作用，需要同时查看发布机构、形成时间、材料类型和它能够回答的问题。历史决议、党史资料、新闻报道与现场图片各有功能，不能彼此替代。',
        ],
        facts: [item.number, layer.level],
      },
      {
        eyebrow: '02 / 记录重点',
        title: item.title + '提供了哪些内容',
        paragraphs: [
          layer.use,
          item.scope + '这一范围使它能够同展厅中的具体时间、事件、图像或精神阐释建立对应关系。',
          '核对时可以先找到展厅中的具体表述，再在原文中确认它出现的上下文和表述层级。对于时间、人员、会议决定等具体史实，还应注意材料是否直接记录、后人回忆或后来的研究概括。',
        ],
        facts: layer.related,
      },
      {
        eyebrow: '03 / 关联展厅',
        title: '从这份资料返回展览现场',
        paragraphs: [
          '这份资料主要关联“' + layer.related.join('”和“') + '”展厅。',
          '对照展厅中的节点、记录或图片阅读原文，可以把简要信息放回更加完整的历史叙述之中。',
          '关联展厅不是简单的跳转标签，而是一条核验路径：路线节点回答会议怎样发生，会场记录回答会议讨论什么，文献与实践回答决定怎样形成并接受历史检验，现场图片则提供空间和当代传播的证据。',
        ],
      },
      {
        eyebrow: '04 / 继续阅读',
        title: '打开' + item.title + '原文',
        paragraphs: [
          item.org + '公开发布的原文保留了更完整的上下文、表述层级和相关资料。',
          '从原文继续阅读，可以进一步理解当前资料同遵义会议历史背景、会议进程与会后实践之间的联系。',
          '引用其中的结论时，应尽量保留原文的主语、时间范围和语境，避免截取个别词语后扩大含义。对同一问题存在不同材料时，可以优先采用层级更高、证据更直接、表述更规范的权威资料。',
        ],
        source: { label: item.title, href: item.href },
      },
      {
        eyebrow: '05 / 核验方法',
        title: '从一条结论回到证据链',
        paragraphs: [
          '一条可靠的历史表述通常可以沿“结论—出处—上下文—相关材料”四步核验。先确认展览说了什么，再打开直接出处，阅读前后段落，最后用同层级或不同类型的权威材料交叉参照。',
          '权威史料柜保留原文入口，既是为了说明展览内容从何而来，也方便继续追问材料能够证明什么、不能证明什么。证据边界越清楚，历史叙述就越有力量。',
        ],
      },
    ];
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
          {renderNote(
            <>
              <p>资料抽屉 / {item.number}</p>
              <h3>{item.title}</h3>
              <strong>{item.org}</strong>
              <div className="archive-use"><small>可核对内容</small><span>{item.scope}</span></div>
              <div className="archive-level"><small>资料层级</small><b>{layer.level}</b><p>{layer.use}</p></div>
              <div className="archive-related"><small>关联展厅</small><span>{layer.related.map((name) => <i key={name}>{name}</i>)}</span></div>
              <a href={item.href} target="_blank" rel="noreferrer">打开权威原文 ↗</a>
            </>,
            pages,
          )}
        </article>

        <aside className="curatorial-boundary">
          <p>阅读依据</p>
          <div>
            <span><b>史实</b>历史结论、时间节点、会议内容均依据公开权威资料。</span>
            <span><b>示意</b>路线与会场关系图用于梳理历史脉络，精确地理与原始记录以权威资料为准。</span>
            <span><b>图像</b>新闻图片均注明来源，视觉化示意与历史照片明确区分。</span>
            <span><b>边界</b>人物对白、具体座次等无确证细节不作虚构，史实与关系示意明确区分。</span>
          </div>
        </aside>
      </div>
    );
  };

  const renderHallAtmosphere = () => {
    if (activeHall === 'crisis') {
      return (
        <div className="hall-object-layer hall-object-crisis" aria-hidden="true">
          <div className="motion-compass"><span /><i /><b>1935</b></div>
          <div className="motion-march"><i /><i /><i /></div>
        </div>
      );
    }

    if (activeHall === 'people') {
      return (
        <div className="hall-object-layer hall-object-people" aria-hidden="true">
          <div className="motion-roster"><i /><i /><i /><i /></div>
        </div>
      );
    }

    if (activeHall === 'meeting') {
      return (
        <div className="hall-object-layer hall-object-meeting" aria-hidden="true">
          <div className="motion-lamp"><i /><span /><b /><em /></div>
        </div>
      );
    }

    if (activeHall === 'decision') {
      return (
        <div className="hall-object-layer hall-object-decision" aria-hidden="true">
          <div className="motion-documents"><i /><i /><i /><b>决</b></div>
        </div>
      );
    }

    if (activeHall === 'practice') {
      return (
        <div className="hall-object-layer hall-object-practice" aria-hidden="true">
          <div className="motion-route-object"><span /><i /><i /><i /><b /></div>
        </div>
      );
    }

    if (activeHall === 'spirit') {
      return (
        <div className="hall-object-layer hall-object-spirit" aria-hidden="true">
          <div className="motion-torch">
            <span /><i />
            <b className="torch-ray ray-one" /><b className="torch-ray ray-two" />
            <b className="torch-ray ray-three" /><b className="torch-ray ray-four" />
          </div>
        </div>
      );
    }

    return (
      <div className="hall-object-layer hall-object-site" aria-hidden="true">
        <div className="motion-red-ribbon"><span /><i /></div>
      </div>
    );
  };

  const renderHall = () => {
    if (activeHall === 'crisis') return renderCrisis();
    if (activeHall === 'people') return renderPeople();
    if (activeHall === 'meeting') return renderMeeting();
    if (activeHall === 'decision') return renderDecision();
    if (activeHall === 'practice') return renderPractice();
    if (activeHall === 'spirit') return renderSpirit();
    return renderSite();
  };

  if (experienceView === 'artifacts') {
    return (
      <RelicExhibition
        onBack={() => switchExperience('site', 'museum')}
        onNext={() => switchExperience('archive')}
      />
    );
  }

  if (experienceView === 'archive') {
    return (
      <main className="archive-page experience-scene" style={meetingRoomBackground}>
        <header className="chapter-topbar archive-chapter-topbar">
          <button className="chapter-brand" onClick={() => switchExperience('site', 'museum')} type="button">
            <span>遵</span><b>遵义·决策现场</b>
          </button>
          <nav aria-label="参观章节">
            <button onClick={() => switchExperience('site', 'museum')} type="button">01 数字会址</button>
            <button onClick={() => switchExperience('artifacts')} type="button">02 革命文物</button>
            <b>03 权威档案</b>
            <span>04 光明终章</span>
          </nav>
          <button onClick={() => switchExperience('artifacts')} type="button">返回文物特展 ←</button>
        </header>

        <section className="archive-hero">
          <div className="archive-hero-grid" aria-hidden="true" />
          <div className="archive-hero-mark" aria-hidden="true"><span>星星之火</span><b>可以燎原</b></div>
          <div className="archive-fire-scene" aria-hidden="true">
            <div className="archive-fire-horizon" />
            <div className="archive-fireline" />
            <div className="archive-fire-seed"><i /><i /><b /></div>
            <div className="archive-ember-field">
              {Array.from({ length: 16 }, (_, index) => <i key={index} />)}
            </div>
          </div>
          <div className="archive-hero-copy">
            <p><span>VERIFIED ARCHIVE</span><b>06 组权威公开资料</b></p>
            <h1>每一条结论，<br /><em>都有来处。</em></h1>
            <div>
              <strong>从历史结论，到会议细节，再到现场图像。</strong>
              <p>六组出处对应历史结论、会议细节与现场图像，可逐项核对，也可打开原文继续阅读。</p>
            </div>
            <button onClick={() => document.getElementById('archive-reading')?.scrollIntoView({ behavior: 'smooth' })} type="button">
              拉开权威史料柜 <span>↓</span>
            </button>
          </div>
          <aside>
            <div><span>01</span><b>中央历史决议</b></div>
            <div><span>02</span><b>中央党史资料</b></div>
            <div><span>03</span><b>中央新闻报道</b></div>
          </aside>
        </section>

        <section className="archive-page-reader" id="archive-reading">
          <header>
            <p>ARCHIVE READING ROOM / 资料核验室</p>
            <h2>沿着出处，回到更完整的历史叙述</h2>
            <span>选择一份资料，沿概述、原文与关联展厅继续阅读。</span>
          </header>
          {renderArchive()}
        </section>

        <section className="archive-to-finale">
          <div className="archive-to-finale-number">04</div>
          <div>
            <span>EPILOGUE / 终章</span>
            <h2>合上档案，不是结束。<br />历史的光，正照向今天。</h2>
          </div>
          <p>从危局中坚持真理，在实践中修正错误，在共同目标下团结统一——遵义会议的历史经验仍在照亮新的征程。</p>
          <button onClick={() => switchExperience('finale')} type="button">进入光明终章 <span>→</span></button>
        </section>
      </main>
    );
  }

  if (experienceView === 'finale') {
    return (
      <main className="finale-page experience-scene">
        <header className="finale-topbar">
          <button onClick={() => switchExperience('site', 'top')} type="button"><span>遵</span><b>遵义·决策现场</b></button>
          <p>04 / EPILOGUE · 光明终章</p>
          <button onClick={() => switchExperience('archive')} type="button">返回权威档案 ←</button>
        </header>

        <section className="finale-stage">
          <div className="finale-rays" aria-hidden="true" />
          <div className="finale-sun-core" aria-hidden="true" />
          <div className="finale-orbit orbit-one" aria-hidden="true" />
          <div className="finale-orbit orbit-two" aria-hidden="true" />
          <p className="finale-kicker"><span>1935 · 遵义</span><b>从伟大转折走向光明前程</b></p>
          <div className="finale-title">
            <small>遵义会议精神</small>
            <h1>永放<em>光芒</em></h1>
            <p>伟大转折不是被动等待的结果，而是在最危急的关头，以对真理的坚持、对实际的尊重和全党的团结奋斗开辟出的新路。</p>
          </div>

          <div className="finale-values" aria-label="遵义会议精神">
            <div><span>01</span><b>坚定信念</b><small>守住前进方向</small></div>
            <div><span>02</span><b>坚持真理</b><small>勇于修正错误</small></div>
            <div><span>03</span><b>独立自主</b><small>从中国实际出发</small></div>
            <div><span>04</span><b>团结统一</b><small>凝聚共同力量</small></div>
          </div>

          <blockquote>
            <span>历史结论</span>
            <p>遵义会议是党的历史上一个生死攸关的转折点，开启了党独立自主解决中国革命实际问题新阶段。</p>
          </blockquote>

          <div className="finale-actions">
            <button onClick={() => switchExperience('site', 'museum')} type="button">重返数字会址 <span>↗</span></button>
            <button onClick={() => switchExperience('site', 'top')} type="button">从封面重新参观 <span>↺</span></button>
          </div>
          <p className="finale-source">历史结论据《中共中央关于党的百年奋斗重大成就和历史经验的决议》。</p>
        </section>
      </main>
    );
  }

  return (
    <main className="site-shell experience-scene" style={meetingRoomBackground}>
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
        <div className="topbar-motto">从危局中转折，在实践中走向光明</div>
        <button className="topbar-enter" onClick={enterExhibition} type="button">
          打开展厅地图 <i>⌘</i>
        </button>
      </header>

      <section className="cinematic-hero" id="top">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-red" aria-hidden="true" />
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-existing-lamp" aria-hidden="true"><i /><span /></div>
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
            <p>七座互动展厅<br />之后进入文物、档案与光明终章</p>
          </div>
        </div>

        <aside className="hero-dossier">
          <p>遵义 / 1935.01.15—17</p>
          <strong>生死攸关的转折点</strong>
          <span>挽救了党 · 挽救了红军 · 挽救了中国革命</span>
          <i>伟大转折</i>
        </aside>

        <p className="hero-credit">背景资料图：遵义会议会议室，新华社记者 陶亮 摄（2019）</p>
      </section>

      <section className={'museum hall-' + activeHall} id="museum">
        <aside className="museum-map">
          <div className="map-heading">
            <span>DIGITAL SITE / 07 ROOMS</span>
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
              <span>/ 7</span>
            </div>
            <p>已进入展厅</p>
          </div>
        </aside>

        <div className="hall-stage">
          <div
            className="hall-backdrop"
            style={{ backgroundImage: 'url(' + assetPath(hall.background) + ')' }}
            aria-hidden="true"
          />
          <div className="hall-overlay" aria-hidden="true" />
          {renderHallAtmosphere()}
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
            <span>{hall.number} / 07</span>
            <button onClick={() => moveHall(1)} type="button" aria-label="下一个展厅">→</button>
          </div>
        </div>
      </section>

      <section className="artifact-entry" aria-labelledby="artifact-entry-title">
        <div className="artifact-entry-collage" aria-hidden="true">
          <figure><img src={assetPath('/artifacts/clock.png')} alt="" /></figure>
          <figure><img src={assetPath('/artifacts/flag.png')} alt="" /></figure>
          <figure><img src={assetPath('/artifacts/shrapnel.png')} alt="" /></figure>
        </div>
        <div className="artifact-entry-copy">
          <p><span>SCENE 02</span>遵义会议纪念馆革命文物特别展</p>
          <h2 id="artifact-entry-title">见物，见人，<br />见一段真实的长征。</h2>
          <div>
            <p>进入特展，可从馆藏抽屉逐件查看文物形制、细节、流传经过与历史坐标。</p>
            <button onClick={() => switchExperience('artifacts')} type="button">进入革命文物特展 <span>→</span></button>
          </div>
        </div>
        <aside><span>08</span><p>件馆藏文物<br />13幅官方图像节选</p></aside>
      </section>

      <footer className="site-footer">
        <div>
          <span className="brand-seal">遵</span>
          <p><strong>遵义·决策现场</strong><small>依据公开权威史料策展的遵义会议数字专题展</small></p>
        </div>
        <blockquote>“要运用好遵义会议历史经验，让遵义会议精神永放光芒。”</blockquote>
        <button onClick={() => switchExperience('artifacts')} type="button">继续：革命文物特展 →</button>
      </footer>
    </main>
  );
}
