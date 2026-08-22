'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

type HallId =
  | 'crisis'
  | 'people'
  | 'meeting'
  | 'decision'
  | 'practice'
  | 'spirit'
  | 'site'
  | 'relic'
  | 'archive';

type NotePage = {
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
    title: '危局如何走到遵义',
    instruction: '沿路线点亮六个节点，理解会议为何必须召开。',
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
  {
    id: 'relic',
    number: '08',
    label: '文物·辨识',
    eyebrow: 'READING OBJECTS AS EVIDENCE',
    title: '先辨性质，再读历史',
    instruction: '选择一件物证，缩放观察细节，并分清旧址本体、复原陈列、文献档案与解释性展项。',
    background: '/zunyi-meeting-room.jpg',
  },
  {
    id: 'archive',
    number: '09',
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
    title: '政治局成员',
    count: '10人',
    summary: '政治局委员和候补委员构成会议讨论与决策的主体。',
    members: [
      ['毛泽东', '中央政治局委员'],
      ['张闻天', '中央政治局成员'],
      ['周恩来', '中央政治局成员'],
      ['朱德', '中央政治局成员、红军总司令'],
      ['陈云', '中央政治局成员'],
      ['博古', '中央政治局成员'],
      ['王稼祥', '中央政治局成员'],
      ['刘少奇', '中央政治局成员'],
      ['邓发', '中央政治局成员'],
      ['何克全（凯丰）', '中央政治局成员'],
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
    prompt: '地图不是装饰，它帮助观众看见“根据实际作出决策”的具体含义。',
  },
  {
    details: ['会址院落与周边街区', '纪念空间与城市日常并存', '公共参观持续连接历史记忆'],
    prompt: '一处旧址如何成为一座城市共同维护、不断讲述的精神坐标？',
  },
  {
    details: ['九十周年纪念标识', '不同年龄参观者共同到访', '纪念活动连接历史与当代'],
    prompt: '纪念不是停留在回望，而是把历史经验转化为继续前进的力量。',
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
    use: '用于本站会议室、会址全景和展陈地图等历史场景图片。',
    related: ['今日·会址', '封面'],
  },
  {
    level: '中国共产党新闻网',
    use: '用于“坚定信念、坚持真理、独立自主、团结统一”的精神内涵。',
    related: ['精神·灯塔', '实践·检验'],
  },
];

const relics = [
  {
    number: 'W-01',
    title: '遵义会议会址主楼',
    category: '旧址本体',
    status: '全国第一批重点文物保护单位',
    image: '/zunyi-meeting-site-2025.jpg',
    focus: '50% 52%',
    summary: '这座中西合璧的两层建筑，是遵义会议发生地，也是理解会议真实空间尺度的首要物证。',
    observe: ['两层建筑与坡屋顶形制', '主楼入口及院落关系', '旧址与遵义老城街区的连接'],
    evidence: '旧址本体能够证明历史事件发生的空间位置及建筑环境；它与党史文献共同构成理解会议的基础证据。',
    boundary: '建筑经历过保护维修。今天的观看应同时尊重旧址真实性和文物保护、复原陈列的历史过程。',
    source: '贵州省地方金融管理局《遵义会议会址》',
    href: 'https://jr.guizhou.gov.cn/ztzl/zdzt/dsxx_1/202105/t20210519_68869197.html',
  },
  {
    number: 'W-02',
    title: '二楼会议室',
    category: '旧址空间',
    status: '旧址内部空间与复原陈列',
    image: '/zunyi-meeting-room.jpg',
    focus: '54% 52%',
    summary: '会议在主楼二楼东面的小客厅举行。有限的室内尺度，使“危急关头的集体讨论”获得可以感知的空间参照。',
    observe: ['长桌与围合式座椅形成的讨论关系', '窗户、墙面和房间尺度', '吊灯、挂钟等陈设在空间中的位置'],
    evidence: '会议室空间帮助观众理解20余人在有限场所连续讨论三天的现场条件，也能与参会人员和会议记录相互印证。',
    boundary: '照片呈现的是依据调查研究进行的复原陈列。长桌、藤椅和吊灯等不能未经说明就一概认定为会议当时使用的原件。',
    source: '广西壮族自治区自然资源厅《遵义会议会址的确定及复原经过》',
    href: 'https://dnr.gxzf.gov.cn/ygd/dshg/t16051610.shtml',
  },
  {
    number: 'W-03',
    title: '会议室挂钟',
    category: '馆藏线索',
    status: '馆藏目录记载的珍贵藏品',
    image: '/zunyi-meeting-room.jpg',
    focus: '0% 9%',
    summary: '贵州省公开资料记载，遵义会议纪念馆收藏有“遵义会议会议室挂钟”。在会场照片中，挂钟也构成观察历史空间的一处细节。',
    observe: ['挂钟位于会议室左侧墙面高处', '木质钟壳与室内家具色调相近', '计时物件与三天会议的时间叙事形成联系'],
    evidence: '馆藏目录提供物件身份线索，现场照片提供陈列位置线索；两类信息结合，才能形成较完整的文物阅读。',
    boundary: '本站没有获得该挂钟的独立高清原件图和完整鉴定档案，因此只作馆藏线索与空间观察，不凭照片追加年代、流传经历等结论。',
    source: '贵州省地方金融管理局《遵义会议会址》',
    href: 'https://jr.guizhou.gov.cn/ztzl/zdzt/dsxx_1/202105/t20210519_68869197.html',
  },
  {
    number: 'W-04',
    title: '《遵义政治局扩大会议传达提纲》手稿',
    category: '文献档案',
    status: '中央档案馆馆藏手稿',
    image: '/chen-yun-zunyi-manuscript.jpg',
    focus: '50% 48%',
    summary: '陈云同志在遵义会议后为传达会议精神写成这份提纲。手稿保存了会议目的、参加人员和重要决定等关键历史信息。',
    observe: ['钢笔书写在活页纸上', '从右向左竖写、左侧装订', '现存手稿只有“乙”部分，并不完整'],
    evidence: '手稿全文4600余字，是研究遵义会议历史细节的重要文献档案。其作者、形成时间和用途经过长期辨认与考证。',
    boundary: '数字展览只展示公开资料图片和经权威研究确认的信息，不把缺失部分补写出来，也不把后来的编定标题等同于手稿原题。',
    source: '中共中央党史和文献研究院《〈遵义政治局扩大会议传达提纲〉手稿》',
    href: 'https://www.dswxyjy.org.cn/n1/2024/0129/c427167-40168395.html',
  },
  {
    number: 'W-05',
    title: '长征路线图展项',
    category: '解释性展项',
    status: '帮助理解历史的展陈工具',
    image: '/zunyi-exhibition-map.jpg',
    focus: '50% 50%',
    summary: '路线图把遵义会议放回中央红军长征的整体进程，帮助观众理解会议前后的行动方向和战略处境。',
    observe: ['路线节点与时间顺序', '遵义在长征路线中的位置', '图例、态势和文字说明之间的关系'],
    evidence: '解释性展项把多种史料重新组织为可视关系，价值在于帮助理解，而不是替代原始档案或专业军事地图。',
    boundary: '它不是1935年的会议原件，也不是精确复原所有兵力态势的专业地图。阅读时必须区分“原始文物”和“后设解释”。',
    source: '新华社《数智技术助力红色文化焕新彩》',
    href: 'https://www.news.cn/ci/20250407/549e9ce776114a548dc586473e0f110b/c.html',
  },
];

export default function Home() {
  const [activeHall, setActiveHall] = useState<HallId>('crisis');
  const [activeRoute, setActiveRoute] = useState(0);
  const [activeParticipantGroup, setActiveParticipantGroup] = useState(0);
  const [activeRecord, setActiveRecord] = useState(0);
  const [activeDecision, setActiveDecision] = useState(0);
  const [activePractice, setActivePractice] = useState(0);
  const [activeSpirit, setActiveSpirit] = useState(0);
  const [litSpirits, setLitSpirits] = useState<number[]>([0]);
  const [activePhoto, setActivePhoto] = useState(0);
  const [activeRelic, setActiveRelic] = useState(0);
  const [relicZoom, setRelicZoom] = useState(1.25);
  const [activeArchive, setActiveArchive] = useState(0);
  const [noteMode, setNoteMode] = useState<'summary' | 'detail'>('summary');
  const [notePage, setNotePage] = useState(0);
  const [noteAuto, setNoteAuto] = useState(false);
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

  const noteSelectionKey = [
    activeHall,
    activeRoute,
    activeParticipantGroup,
    activeRecord,
    activeDecision,
    activePractice,
    activeSpirit,
    activePhoto,
    activeRelic,
    activeArchive,
  ].join(':');

  useEffect(() => {
    setNoteMode('summary');
    setNotePage(0);
    setNoteAuto(false);
  }, [noteSelectionKey]);

  useEffect(() => {
    if (noteMode !== 'detail' || !noteAuto) return;
    const timer = window.setInterval(() => {
      setNotePage((current) => (current + 1) % 4);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [noteAuto, noteMode, noteSelectionKey]);

  const renderNote = (summary: ReactNode, pages: NotePage[]) => {
    if (noteMode === 'summary') {
      return (
        <>
          {summary}
          <button
            className="open-in-note"
            onClick={() => {
              setNoteMode('detail');
              setNotePage(0);
              setNoteAuto(true);
            }}
            type="button"
          >
            <span><b>详细版</b>在当前便签内展开，4页内容将自动切换</span>
            <i>打开 →</i>
          </button>
        </>
      );
    }

    const page = pages[notePage] || pages[0];
    return (
      <div className="in-note-detail">
        <header>
          <button onClick={() => setNoteMode('summary')} type="button">← 返回概述</button>
          <span>详细版 {String(notePage + 1).padStart(2, '0')} / 04</span>
          <button onClick={() => setNoteAuto((current) => !current)} type="button">
            {noteAuto ? '暂停自动切换' : '继续自动切换'}
          </button>
        </header>
        <div className="note-auto-progress" aria-hidden="true">
          <i className={noteAuto ? 'running' : ''} key={notePage + '-' + noteAuto} />
        </div>
        <article key={page.title}>
          <small>{page.eyebrow}</small>
          <h4>{page.title}</h4>
          {page.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {page.facts && (
            <div className="note-detail-facts">
              {page.facts.map((fact) => <span key={fact}>{fact}</span>)}
            </div>
          )}
          {page.source && (
            <a href={page.source.href} target="_blank" rel="noreferrer">权威来源：{page.source.label} ↗</a>
          )}
        </article>
        <footer>
          <button onClick={() => setNotePage((notePage + 3) % 4)} type="button" aria-label="上一页">←</button>
          <div>
            {pages.map((item, index) => (
              <button
                aria-label={'打开详细版第' + (index + 1) + '页：' + item.title}
                className={notePage === index ? 'active' : ''}
                key={item.title}
                onClick={() => setNotePage(index)}
                type="button"
              />
            ))}
          </div>
          <button onClick={() => setNotePage((notePage + 1) % 4)} type="button" aria-label="下一页">→</button>
        </footer>
      </div>
    );
  };

  const renderCrisis = () => {
    const node = routeNodes[activeRoute];
    const layer = routeLayers[activeRoute];
    const pages: NotePage[] = [
      {
        eyebrow: '01 / 历史处境',
        title: node.title,
        paragraphs: [
          node.body,
          layer.situation + '这一节点不能只当作路线上的地名观看，它反映的是原有军事指导不断受到战场事实检验的过程。危机越严峻，重新判断行动方向和领导方式就越迫切。',
        ],
        facts: [node.date, node.short, '长征关键节点'],
      },
      {
        eyebrow: '02 / 问题与选择',
        title: '当时真正需要回答什么',
        paragraphs: [
          layer.choice,
          '这里呈现的“选择”不是让今天的观众改写历史，而是还原当时决策必须面对的实际条件。敌情、地形、兵力和此前行动结果共同构成判断依据，正确主张也正是在同实际结果的比较中逐渐获得支持。',
        ],
      },
      {
        eyebrow: '03 / 变化与后果',
        title: '局部调整怎样走向集中讨论',
        paragraphs: [
          layer.consequence,
          node.meaning + '从通道、黎平、猴场到遵义，思想认识和组织条件逐步积累，分散在行军途中的反思最终进入政治局扩大会议的正式讨论。',
        ],
        facts: [layer.thread],
      },
      {
        eyebrow: '04 / 史料与阅读边界',
        title: '路线图能够说明什么',
        paragraphs: [
          '本展用节点和连线梳理历史关系，重点说明“危局—反思—调整—召开会议”的连续过程。节点位置是关系示意，不是精确军事测绘，也不替代专业长征路线图。',
          '时间、事件与历史评价均以公开权威资料为依据。对无法由公开材料确认的具体行军细节、人物即时心理和未记录对白，本展不作补写。',
        ],
        source: { label: node.source, href: node.href },
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
    const pages: NotePage[] = [
      {
        eyebrow: '01 / 人员构成',
        title: group.title,
        paragraphs: [
          group.summary,
          '遵义会议是中央政治局扩大会议。人员构成既包括承担中央领导责任的政治局成员，也包括红军总部、总政治部和主要军团负责人。前线实践由此进入中央层面的集中讨论，使军事指导的是非能够接受真实战局检验。',
        ],
        facts: [group.count, '出席与列席共20人', '公开党史资料确认'],
      },
      {
        eyebrow: '02 / 名单与职责',
        title: '逐人核对，而不是模糊群像',
        paragraphs: [
          '名单不仅用于记忆姓名，更用于理解不同职责如何进入会场。政治局成员承担讨论与决策责任，红军负责人带来总部和军团层面的作战经验，中央机关与列席人员共同构成会议记录中的完整在场关系。',
          '本站保留公开资料中的当时职务表述，不以人物后来的职务替代1935年1月的历史身份。',
        ],
        facts: group.members.map(([name, role]) => name + '｜' + role),
      },
      {
        eyebrow: '03 / 集体讨论',
        title: '为什么不能把会议讲成个人独白',
        paragraphs: [
          group.insight,
          '会议通过报告、发言、批评和讨论逐步形成认识。强调集体讨论并不削弱正确主张的重要作用，而是说明正确意见如何在党内政治生活和战争实践的共同检验中得到支持，并最终转化为组织决定。',
        ],
      },
      {
        eyebrow: '04 / 考证边界',
        title: '名单可以确认，座次不能想象',
        paragraphs: [
          '本展只呈现权威公开资料能够确认的出席、列席身份与职务，不根据影视画面或后来的艺术创作推演具体座次、发言语气和人物心理。',
          '群像关系图按身份分组，是帮助阅读人员结构的数字示意，不是会场座次复原。对名单与身份有疑问时，应回到党史研究资料逐项核验。',
        ],
        source: {
          label: '中共中央党史和文献研究院《参加遵义会议的人员都有谁》',
          href: 'https://www.dswxyjy.org.cn/n1/2025/0307/c423726-40433382.html',
        },
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
              <a href="https://www.dswxyjy.org.cn/n1/2025/0307/c423726-40433382.html" target="_blank" rel="noreferrer">
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
    const pages: NotePage[] = [
      {
        eyebrow: '01 / 会前条件',
        title: '问题如何进入会场',
        paragraphs: [
          layer.before,
          record.body + '会议议题来自此前作战和行军中已经暴露的真实问题，并非脱离长征实践的抽象讨论。理解会前条件，才能看清为什么军事问题和组织问题会成为会议最迫切的中心。',
        ],
      },
      {
        eyebrow: '02 / 会场进程',
        title: record.title,
        paragraphs: [
          layer.inside,
          '会议连续举行三天。报告、发言、反对意见与批评并不是彼此割裂的片段，而是围绕失败原因、军事指导和领导责任逐步展开的讨论过程。正确意见在同战场事实的对照中获得更多支持。',
        ],
        facts: layer.keywords,
      },
      {
        eyebrow: '03 / 会后影响',
        title: '决定怎样继续发生作用',
        paragraphs: [
          layer.after,
          record.note + '会议完成的是关键转折，领导分工、决议起草与新的军事指挥机制还要结合此后的行军和作战继续落实，因此不能把历史变化压缩成会议结束时的一个瞬间。',
        ],
      },
      {
        eyebrow: '04 / 史料核验',
        title: '会场叙事从哪里来',
        paragraphs: [
          '本展综合中央党史资料中的会议时间、地点、议题、决定和会后进程进行分层展示。长桌交互用于组织信息，不表示五份独立存在的“会议记录原件”。',
          '会场平面、桌椅位置和封签均为数字叙事设计，不推演具体座次，不虚构逐字发言；能够确认的历史结论以权威公开文献为准。',
        ],
        source: {
          label: '中共中央党史和文献研究院《党史上的重要会议：遵义会议》',
          href: 'https://www.dswxyjy.org.cn/BIG5/n1/2022/1110/c448623-32563152.html',
        },
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
    const pages: NotePage[] = [
      {
        eyebrow: '01 / 提出问题',
        title: item.question,
        paragraphs: [
          item.main,
          '文献阅读首先要辨明它试图解决的问题。遵义会议并非泛泛总结，而是集中审查第五次反“围剿”和长征初期军事指导的是非得失，把已经造成严重后果的问题放到政治局扩大会议中正面讨论。',
        ],
      },
      {
        eyebrow: '02 / 形成决定',
        title: '讨论如何获得组织效力',
        paragraphs: [
          item.points.join('；') + '。',
          '会议中的正确认识必须转化为明确决定，才能改变领导和指挥实践。组织调整、常委分工与军事指挥机制的变化彼此联系，不能只理解为孤立的人事变动。',
        ],
        facts: item.points,
      },
      {
        eyebrow: '03 / 起草与传达',
        title: '从会场意见到正式文献',
        paragraphs: [
          '会议指定张闻天同志起草有关决议，并安排中央政治局常委审查后发到支部讨论。起草把讨论形成的认识转化为文本，审查体现集体把关，组织传达又把会议成果带入更广泛的党内学习和行动。',
          item.note + '理解这一形成链，可以避免把决议当作脱离会议过程、突然出现的一张文件。',
        ],
      },
      {
        eyebrow: '04 / 历史定位',
        title: '怎样准确理解“伟大转折”',
        paragraphs: [
          '遵义会议的历史地位需要放在领导地位、正确路线、领导集体和独立自主解决中国革命实际问题的进程中理解。它既有会议决定的直接内容，也有会后实践不断巩固的历史结果。',
          '本站不制作无法核验的“原稿复刻”，也不把展陈视觉当作文献原件；详细表述以中央历史决议和中央党史研究资料为依据。',
        ],
        source: { label: item.source, href: item.href },
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
          <span>本展不展示无法核验的“会议原稿复刻”，而是依据公开党史资料呈现文献形成过程。</span>
          <b>议题 → 讨论 → 决定 → 成文 → 传达 → 实践</b>
        </aside>
      </div>
    );
  };

  const renderPractice = () => {
    const item = practiceSteps[activePractice];
    const pages: NotePage[] = [
      {
        eyebrow: '01 / 战场条件',
        title: item.title + '之前',
        paragraphs: [
          item.context,
          '遵义会议以后，中央红军仍在强敌围追堵截和兵力悬殊的环境中行动。会议不会自动消除困难，新的领导和战略策略必须在不断变化的敌情、地形和行军条件中接受检验。',
        ],
        facts: [item.date, item.place],
      },
      {
        eyebrow: '02 / 实践行动',
        title: item.title,
        paragraphs: [
          item.action,
          '这一行动的关键不只是记住结果，更要观察决策如何根据实际变化。灵活机动意味着不断判断敌我态势、改变行动方向和争取主动，而不是机械执行脱离战场条件的固定方案。',
        ],
      },
      {
        eyebrow: '03 / 历史意义',
        title: '会议成果怎样被实践证明',
        paragraphs: [
          item.meaning,
          '认识纠偏、组织调整和军事行动构成连续链条。正确意见只有进入领导实践并产生符合实际的行动，才能真正改变局面；会后的实践成果也反过来显示遵义会议转折的历史分量。',
        ],
      },
      {
        eyebrow: '04 / 阅读边界',
        title: '事件关系图不是精确军事地图',
        paragraphs: [
          '本展选择会后领导调整、四渡赤水、三人军事指挥小组和渡过金沙江等节点，说明会议成果怎样继续落实。它梳理的是时间与逻辑关系，不呈现全部战斗序列。',
          '路线曲线和节点位置为数字示意。兵力部署、具体渡口和作战过程应以专业军史、地图和权威研究资料为准。',
        ],
        source: { label: item.source, href: item.href },
      },
    ];
    return (
      <div className="practice-room">
        <div className="practice-field">
          <div className="practice-map-label">
            <span>1935 / AFTER ZUNYI</span>
            <b>会议之后的实践轨迹</b>
          </div>
          <svg viewBox="0 0 800 430" aria-hidden="true">
            <path d="M80 348 C175 320 185 225 292 260 C404 297 376 125 494 163 C606 199 625 77 732 91" />
            <path className="practice-glow" d="M80 348 C175 320 185 225 292 260 C404 297 376 125 494 163 C606 199 625 77 732 91" />
          </svg>
          {practiceSteps.map((step, index) => (
            <button
              className={'practice-stop stop-' + (index + 1) + ' ' + (activePractice === index ? 'active' : '')}
              key={step.title}
              onClick={() => setActivePractice(index)}
              type="button"
            >
              <i>{String(index + 1).padStart(2, '0')}</i>
              <b>{step.title}</b>
              <span>{step.date}</span>
            </button>
          ))}
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
    const pages: NotePage[] = [
      {
        eyebrow: '01 / 历史坐标',
        title: spirit.title,
        paragraphs: [
          layer.history,
          spirit.body + '精神内涵必须落回具体历史处境。离开第五次反“围剿”失败、长征初期受挫和党在危局中纠正错误的过程，只留下口号，就无法理解它为什么具有力量。',
        ],
      },
      {
        eyebrow: '02 / 方法结构',
        title: spirit.subtitle,
        paragraphs: [
          layer.method,
          '坚定信念提供方向，坚持真理校正认识，独立自主确定解决问题的立足点，团结统一把共同认识转化为行动。四个方面彼此连接，不是可以任意拆开的标签。',
        ],
      },
      {
        eyebrow: '03 / 内在联系',
        title: '这一精神回答了什么问题',
        paragraphs: [
          layer.connection,
          '遵义会议精神之所以具有当代意义，不在于照搬具体历史条件，而在于学习面对问题的方法：尊重事实、敢于纠错、从实际出发形成判断，并在共同目标下形成行动合力。',
        ],
      },
      {
        eyebrow: '04 / 面向今天',
        title: '从历史经验到行动自觉',
        paragraphs: [
          spirit.today,
          '当代阐释必须建立在准确历史认识之上。本站不把精神内涵娱乐化为性格测试或阵营选择，也不制造虚构历史情境，而是通过历史依据、方法逻辑和现实启示三层阅读建立联系。',
        ],
        source: {
          label: '中国共产党新闻网《遵义会议精神永放光芒》',
          href: 'https://dangjian.people.com.cn/n1/2026/0522/c117092-40725457.html',
        },
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
    const pages: NotePage[] = [
      {
        eyebrow: '01 / 图像现场',
        title: photo.title,
        paragraphs: [
          photo.body,
          '新闻图片提供的是特定时间、机位和构图下的现场记录。阅读时既要观察画面内容，也要注意拍摄年份和报道语境，不能把今天的陈列状态直接当作1935年的原始影像。',
        ],
        facts: [photo.label, photo.credit],
      },
      {
        eyebrow: '02 / 观察清单',
        title: '先看细节，再形成判断',
        paragraphs: [
          layer.details.join('；') + '。',
          '观察建筑形制、室内尺度、展陈关系和城市环境，可以把抽象历史叙事重新放回真实空间。细节的意义不在于猎奇，而在于帮助确认事件发生的条件和纪念展示的方式。',
        ],
        facts: layer.details,
      },
      {
        eyebrow: '03 / 提出问题',
        title: layer.prompt,
        paragraphs: [
          '现场观察并不是只寻找一个预设答案。建筑、会议室、地图和参观者分别连接旧址本体、复原陈列、解释性展项与当代记忆，彼此承担不同的证据功能。',
          '把这些层次区分开，才能既感受现场氛围，又不把后来的陈列设计误认成未经说明的历史原貌。',
        ],
      },
      {
        eyebrow: '04 / 图片来源',
        title: '图像能够证明到什么程度',
        paragraphs: [
          '本站逐项标注图片的报道来源、摄影者与年份。图片用于观察会址、复原空间和展陈，不承担超出画面与报道说明范围的文物鉴定功能。',
          '对建筑身份、会议内容和历史地位的判断，还需与旧址保护资料、中央党史文献和档案研究相互核验。',
        ],
        source: { label: photo.credit + '原报道', href: photo.href },
      },
    ];
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
              <img src={item.image} alt="" />
              <span>{String(index + 1).padStart(2, '0')}</span>
              <b>{item.title}</b>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderRelic = () => {
    const item = relics[activeRelic];
    const evidenceIndex = item.category === '解释性展项' ? 2 : item.category.includes('旧址') ? 0 : 1;
    const pages: NotePage[] = [
      {
        eyebrow: '01 / 身份辨识',
        title: item.title,
        paragraphs: [
          item.summary,
          '文物阅读的第一步不是急于赋予意义，而是确认对象的性质：它是旧址本体、馆藏实物、文献档案，还是后来为了帮助理解而制作的展项。性质不同，能够支持的历史判断也不同。',
        ],
        facts: [item.category, item.status],
      },
      {
        eyebrow: '02 / 细节观察',
        title: '放大以后应该看什么',
        paragraphs: [
          item.observe.join('；') + '。',
          '缩放工具只帮助观察公开图片中的形制、位置和书写特征。观察记录应当先描述“看见什么”，再讨论“它说明什么”，避免把视觉印象直接变成未经核验的历史结论。',
        ],
        facts: item.observe,
      },
      {
        eyebrow: '03 / 证据能力',
        title: '这一物证能够告诉我们什么',
        paragraphs: [
          item.evidence,
          '单件物证通常不能独立说明全部历史过程。旧址需要文献确认事件，档案需要考证作者与形成时间，馆藏物件需要来源和鉴定记录，解释性展项则需要公开其资料依据。',
        ],
      },
      {
        eyebrow: '04 / 边界与来源',
        title: '不能从它推出什么',
        paragraphs: [
          item.boundary,
          '本站坚持把“看见的图像”“公开资料确认的身份”和“策展解释”分开标注。没有可靠依据的年代、流传经历、原件身份和人物故事，不因画面效果需要而补写。',
        ],
        source: { label: item.source, href: item.href },
      },
    ];

    return (
      <div className="relic-room">
        <nav className="relic-catalog" aria-label="文物与物证目录">
          <div><span>OBJECT INDEX</span><b>物证目录</b></div>
          {relics.map((relic, index) => (
            <button
              className={activeRelic === index ? 'active' : ''}
              key={relic.number}
              onClick={() => {
                setActiveRelic(index);
                setRelicZoom(1.25);
              }}
              type="button"
            >
              <span>{relic.number}</span>
              <b>{relic.title}</b>
              <i>{relic.category}</i>
            </button>
          ))}
        </nav>

        <div className="relic-workbench">
          <div
            className="relic-viewport"
            style={{
              backgroundImage: 'url("' + item.image + '")',
              backgroundPosition: item.focus,
              backgroundSize: Math.round(relicZoom * 100) + '%',
            }}
            role="img"
            aria-label={item.title + '观察图'}
          >
            <div className="relic-crosshair" aria-hidden="true"><i /><span /></div>
            <p><span>{item.number}</span>{item.category}</p>
          </div>
          <div className="relic-zoom-control">
            <button onClick={() => setRelicZoom((value) => Math.max(1, value - 0.25))} type="button">−</button>
            <label>
              <span>观察倍率 {Math.round(relicZoom * 100)}%</span>
              <input
                aria-label="文物图像观察倍率"
                max="2.5"
                min="1"
                onChange={(event) => setRelicZoom(Number(event.target.value))}
                step="0.05"
                type="range"
                value={relicZoom}
              />
            </label>
            <button onClick={() => setRelicZoom((value) => Math.min(2.5, value + 0.25))} type="button">＋</button>
          </div>
          <div className="evidence-ruler">
            <span className={evidenceIndex === 0 ? 'active' : ''}>现场空间</span>
            <span className={evidenceIndex === 1 ? 'active' : ''}>实物 / 档案</span>
            <span className={evidenceIndex === 2 ? 'active' : ''}>展陈解释</span>
          </div>
        </div>

        <article className="relic-reader" key={item.number}>
          {renderNote(
            <>
              <div className="relic-reader-head"><span>{item.number} / {item.category}</span><b>{item.status}</b></div>
              <h3>{item.title}</h3>
              <p className="relic-summary">{item.summary}</p>
              <div className="relic-observe">
                <small>观察点</small>
                {item.observe.map((point, index) => <span key={point}><i>0{index + 1}</i>{point}</span>)}
              </div>
              <div className="relic-evidence"><small>能够说明</small><p>{item.evidence}</p></div>
              <div className="relic-boundary"><small>不能越界</small><p>{item.boundary}</p></div>
              <a href={item.href} target="_blank" rel="noreferrer">核验资料：{item.source} ↗</a>
            </>,
            pages,
          )}
        </article>
      </div>
    );
  };

  const renderArchive = () => {
    const item = archives[activeArchive];
    const layer = archiveLayers[activeArchive];
    const pages: NotePage[] = [
      {
        eyebrow: '01 / 资料身份',
        title: item.title,
        paragraphs: [
          item.org + '发布或形成了这份资料。' + item.scope,
          '进入史料之前先辨明资料层级、形成机构和使用范围，能够避免把中央历史决议、研究文章、新闻报道和图片资料混成同一种证据。',
        ],
        facts: [item.number, layer.level],
      },
      {
        eyebrow: '02 / 本展用途',
        title: '这份资料支撑了哪些内容',
        paragraphs: [
          layer.use,
          '策展采用资料时遵循“只在其能够支撑的范围内使用”的原则。历史结论、会议细节、图片现场和精神阐释分别需要不同层级的资料，不能用一张新闻图片替代历史决议，也不能用视觉设计替代档案。',
        ],
        facts: layer.related,
      },
      {
        eyebrow: '03 / 交叉核验',
        title: '为什么不能只依赖单一来源',
        paragraphs: [
          '时间、地点和重要决定可以由中央党史资料核对；手稿等档案提供历史细节；旧址与新闻图像建立空间感；展陈资料说明纪念馆如何解释和传播历史。',
          '多种材料并置不是追求来源数量，而是让每一类证据承担合适的功能，并在相互印证时发现表述边界。',
        ],
      },
      {
        eyebrow: '04 / 策展边界',
        title: '有来源，也要说明不能推出什么',
        paragraphs: [
          '本站不虚构人物对白、座次和心理活动，不把关系示意当作专业地图，不把复原陈列自动认定为原始文物，也不设置改写历史的假设性选择。',
          '来源链接保留给观众继续核验。若权威资料对某一细节仍有考证过程，本展优先呈现已经确认的事实，并明确说明不确定部分。',
        ],
        source: { label: item.title, href: item.href },
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
              <div className="archive-stamp">已核</div>
              <p>资料抽屉 / {item.number}</p>
              <h3>{item.title}</h3>
              <strong>{item.org}</strong>
              <div className="archive-use"><small>本展采用范围</small><span>{item.scope}</span></div>
              <div className="archive-level"><small>资料层级</small><b>{layer.level}</b><p>{layer.use}</p></div>
              <div className="archive-related"><small>关联展厅</small><span>{layer.related.map((name) => <i key={name}>{name}</i>)}</span></div>
              <a href={item.href} target="_blank" rel="noreferrer">打开权威原文 ↗</a>
            </>,
            pages,
          )}
        </article>

        <aside className="curatorial-boundary">
          <p>策展说明</p>
          <div>
            <span><b>史实</b>历史结论、时间节点、会议内容均依据公开权威资料。</span>
            <span><b>示意</b>路线和会场交互用于梳理关系，不替代专业地图与原始档案。</span>
            <span><b>图像</b>新闻图片逐项标注来源；封面仅增强原照片吊灯光效，不把视觉处理当作文物信息。</span>
            <span><b>边界</b>不虚构人物对白，不设置改写历史、阵营选择或历史假设。</span>
          </div>
        </aside>
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
    if (activeHall === 'site') return renderSite();
    if (activeHall === 'relic') return renderRelic();
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
        <div className="topbar-motto">由危局的暗红，走向转折的朱红与光明</div>
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
            <p>九座互动展厅<br />概述与详细内容均在便签内切换</p>
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
            <span>DIGITAL SITE / 09 ROOMS</span>
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
              <span>/ 9</span>
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
            <span>{hall.number} / 09</span>
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
