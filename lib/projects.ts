import portfolio from './portfolio.json';
export type ProjectCategory =
  | '文化公共'
  | '商务会展'
  | '交通建筑'
  | '体育建筑'
  | '教育建筑'
  | '酒店住宅'
  | '其他项目';

export type Project = {
  slug: string;
  name: string;
  subtitle: string;
  location: string;
  category: ProjectCategory;
  image: string;
  summary: string;
  tags: string[];
  service: string;
  background: string;
  responsibility: string;
  challenge: string;
  methods: { title: string; description: string }[];
  delivery: string;
  outcomes: string[];
  sourcePages: string;
  sourcePage: number;
  images?: string[];
  isArchiveOnly?: boolean;
  brochurePage?: number;
};

export const projectCategories: ProjectCategory[] = [
  '文化公共',
  '商务会展',
  '交通建筑',
  '体育建筑',
  '教育建筑',
  '酒店住宅',
  '其他项目',
];

const featuredProjects: Project[] = [
  {
    slug: 'deqing',
    name: '德清科技新城',
    subtitle: '联合国地信大会永久会址',
    location: '浙江 · 德清',
    category: '商务会展',
    image: '/images/deqing.jpg',
    summary:
      '围绕异形装饰构架与屋面系统，将建筑效果、材料特性和建造条件共同纳入技术方案。',
    tags: ['异形表皮', '材料选型', '屋面系统'],
    service: '幕墙全过程技术服务',
    background:
      '德清科技新城是联合国地信大会永久会址。项目的异形装饰构架和屋面系统，是建筑表皮技术工作的重点。',
    responsibility:
      '彼慕智造在该项目提供幕墙全过程技术服务。公司宣传册具体介绍了表皮材料选用，以及彼慕智造自研屋面系统的应用。',
    challenge:
      '异形装饰构架需要兼顾建筑效果与材料性能；屋面系统的选择，还需要综合考虑结构安全、施工条件与后期维护。',
    methods: [
      {
        title: '以材料特性回应建筑效果',
        description:
          '异形装饰构架采用 4 mm 双层不锈钢压花复合板。材料选型将表皮效果、材料特性与施工条件放在同一技术判断中。',
      },
      {
        title: '以系统方案组织屋面',
        description:
          '采用彼慕智造自研的自适应半抱箍独立板块屋面系统，为建筑屋面提供对应的系统方案。',
      },
    ],
    delivery: '宣传册公开的项目成果聚焦于材料和系统两个层面。',
    outcomes: [
      '异形装饰构架的双层不锈钢压花复合板材料方案',
      '自适应半抱箍独立板块屋面系统',
    ],
    sourcePages: '11–12、42',
    sourcePage: 11,
  },
  {
    slug: 'fuyang',
    name: '阜阳科技文化中心',
    subtitle: '有序分割，回应复杂曲面',
    location: '安徽 · 阜阳',
    category: '文化公共',
    image: '/images/fuyang.jpg',
    summary:
      '结合建筑效果、系统形式与材料特性，对双曲冲孔铝板和双曲玻璃进行有序化渐变分割。',
    tags: ['双曲表皮', '渐变分割', '材料适配'],
    service: '幕墙全过程技术服务',
    background:
      '阜阳科技文化中心的异形建筑表皮包含双曲冲孔铝板和双曲玻璃。两类材料共同构成了表皮分割的技术对象。',
    responsibility:
      '彼慕智造提供幕墙全过程技术服务，宣传册以该项目说明异形表皮的有序化分割方法。',
    challenge:
      '复杂曲面的分割需要同时回应建筑效果、系统形式与材料特性，并将板材原始尺寸、材料损耗和仓储运输等条件纳入考虑。',
    methods: [
      {
        title: '双曲冲孔铝板渐变分割',
        description:
          '对异形双曲冲孔铝板进行有序化渐变分割，使复杂表皮获得可表达、可组织的几何秩序。',
      },
      {
        title: '双曲玻璃渐变分割',
        description:
          '对异形双曲玻璃进行有序化渐变分割，结合玻璃材料特性与建筑系统形式组织表皮方案。',
      },
    ],
    delivery:
      '公开资料展示了两类材料各自的表皮分割成果，为理解建筑表皮的数字化建造方法提供实例。',
    outcomes: [
      '异形双曲冲孔铝板有序化渐变分割方案',
      '异形双曲玻璃有序化渐变分割方案',
    ],
    sourcePages: '13、43',
    sourcePage: 13,
  },
  {
    slug: 'wenling',
    name: '温岭博物馆',
    subtitle: '从曲面分析到表皮拟合',
    location: '浙江 · 温岭',
    category: '文化公共',
    image: '/images/wenling.jpg',
    summary:
      '以折线钻石型拟合对复杂曲面进行有序化处理，让建筑表皮的几何表达与材料条件相互对应。',
    tags: ['曲面分析', '折线拟合', '表皮有序化'],
    service: '幕墙全过程技术服务',
    background:
      '温岭博物馆是彼慕智造宣传册中的建筑表皮分析案例。项目以折线钻石型拟合展示复杂曲面的有序化处理。',
    responsibility:
      '彼慕智造提供幕墙全过程技术服务，并围绕建筑效果与材料物理特性开展表皮曲面分析和拟合。',
    challenge:
      '将复杂曲面转化为有序的表皮，需要在建筑效果与材料物理特性之间建立对应关系，同时考虑加工周期、损耗等条件。',
    methods: [
      {
        title: '从曲面分析确定拟合方式',
        description:
          '根据建筑效果与材料条件判断表皮几何的表达方式，为后续有序化处理建立依据。',
      },
      {
        title: '采用折线钻石型拟合',
        description:
          '以折线钻石型拟合组织表皮，将无序曲面转化为具备规律的几何表达。',
      },
    ],
    delivery: '宣传册展示了该项目的折线钻石型拟合方法及建筑表皮成果。',
    outcomes: ['折线钻石型表皮拟合', '面向建筑效果与材料特性的曲面有序化方案'],
    sourcePages: '10、44',
    sourcePage: 10,
  },
  {
    slug: 'shenzhen',
    name: '深圳机场卫星厅',
    subtitle: '大型交通建筑的工程实践',
    location: '广东 · 深圳',
    category: '交通建筑',
    image: '/images/shenzhen.jpg',
    summary:
      '彼慕智造公司宣传册收录的交通建筑案例，服务范围为幕墙全过程技术服务。',
    tags: ['交通建筑', '全过程技术服务'],
    service: '幕墙全过程技术服务',
    background:
      '深圳机场卫星厅是大型交通建筑项目，收录于《彼慕智造 2026》公司宣传册的项目业绩部分。',
    responsibility: '宣传册记载彼慕智造在该项目提供幕墙全过程技术服务。',
    challenge:
      '现有公开资料以项目业绩和建筑影像为主，未展开专项工程难点与技术方法。',
    methods: [],
    delivery:
      '本页依据已公开的服务范围介绍项目。具体专项成果与可分享资料，可在项目交流时进一步确认。',
    outcomes: [],
    sourcePages: '38',
    sourcePage: 38,
  },
];

export const projects: Project[] = portfolio.map((item) => {
  const featured = featuredProjects.find((p) => p.slug === item.featuredSlug);
  const base: Project = {
    slug: item.slug,
    name: item.name,
    subtitle: item.service,
    location: item.location || '资料未注明',
    category: item.category as ProjectCategory,
    image: item.images[0],
    summary: item.service,
    tags: [item.service],
    service: item.service,
    background: '宣传册收录工程',
    responsibility: item.service,
    challenge: '',
    methods: [],
    delivery: '',
    outcomes: [],
    sourcePages: String(item.page),
    sourcePage: item.page,
    isArchiveOnly: !featured,
  };
  return {
    ...base,
    ...featured,
    slug: item.slug,
    category: item.category as ProjectCategory,
    service: item.service,
    images: item.images,
    image: item.images[0],
    brochurePage: item.page,
  };
});

export function getProject(slug: string): Project {
  const project = projects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}
