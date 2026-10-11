export interface ProductFeatureGroup {
  title: string;
  description: string;
  items: string[];
}

export interface Product {
  slug: 'bcdt' | 'bcdc' | 'bcv';
  id: 'BCDT' | 'BCDC' | 'BCV';
  name: string;
  tagline: string;
  summary: string;
  status: string;
  audience: string[];
  image: string;
  features: string[];
  action: { label: string; href: string };
  stage: string;
  workflowTitle: string;
  workflow: { title: string; description: string }[];
  groups: ProductFeatureGroup[];
  inputs: string[];
  outputs: string[];
  screenTitle: string;
  screenDescription: string;
  environment: string;
  version: string;
  versionNote: string;
  video: { src: string; poster: string; captions: string; duration: string };
  demoNote: string;
  faqs: { question: string; answer: string }[];
}

export const products: Product[] = [
  {
    slug: 'bcdt',
    id: 'BCDT',
    name: '幕墙设计工具',
    tagline: '从构件设计，到有据可查的加工资料。',
    summary:
      '在 Rhino 中连接项目、构件、材料与加工资料，帮助深化设计团队组织模型，核对工程信息，并按条件准备交付成果。',
    status: '可预约演示',
    audience: ['幕墙深化设计师', '技术负责人', '加工资料编制人员'],
    image: '/images/products/bcdt-ui.jpg',
    features: [
      '项目与几何检查',
      '构件库与实例身份',
      '多材料专业工具',
      '提料与加工资料',
    ],
    action: {
      label: '预约 BCDT 演示',
      href: '/contact?intent=demo&product=BCDT',
    },
    stage: '设计与加工资料',
    workflowTitle: '让模型中的构件，对应到交付中的资料。',
    workflow: [
      {
        title: '建立项目',
        description: '组织项目与楼栋，绑定设计模型，明确构件所属范围。',
      },
      {
        title: '组织构件',
        description: '复用项目资产，登记独立实例，按专业配置材料与加工信息。',
      },
      {
        title: '核对条件',
        description:
          '检查几何、属性和生产资料准备情况，处理缺项并完成所需审核。',
      },
      {
        title: '准备成果',
        description: '根据材料和审核状态，生成提料、加工单、图纸与受控模型。',
      },
    ],
    groups: [
      {
        title: '项目与检查',
        description: '先把模型与项目关系建立清楚，再进入深化工作。',
        items: [
          '项目、楼栋与模型绑定',
          '构件映射与几何检查',
          '指定对象之间的碰撞与净距核对',
          '曲线与轮廓检查、项目目录和备份',
        ],
      },
      {
        title: '构件库与身份',
        description: '复用几何的同时，保留每个安装实例的独立身份。',
        items: [
          '项目构件库与公司构件库',
          '构件资产选取与拼装',
          '实例登记、查找与分类',
          '加工型号归属与信息追溯',
        ],
      },
      {
        title: '材料专业工具',
        description: '围绕幕墙材料的不同设计和加工要求组织工具。',
        items: [
          '铝型材截面、路径与开孔',
          '玻璃构造、轮廓、开孔与曲面信息',
          '金属板成品、折边及角部避让',
          '石材加工特征、陶板基准、钢件及辅材',
        ],
      },
      {
        title: '生产资料与交付',
        description: '按资料完整性与审核条件准备各专业成果。',
        items: [
          '型材提料、加工任务与加工单',
          '原材切割方案、套裁与余料台账',
          '各专业加工图与材料用量',
          '版本化资料及模型、JSON、XLSX 输出',
        ],
      },
    ],
    inputs: [
      'Rhino 设计模型与项目、楼栋信息',
      '经过确认的截面、构件资产和材料要求',
      '加工参数、图纸依据及必要的审核记录',
    ],
    outputs: [
      '具有独立实例身份的项目模型',
      '按专业和状态组织的提料、加工单与图纸',
      '用于核对与追溯的模型和结构化资料',
    ],
    screenTitle: '在熟悉的 Rhino 工作环境中开展深化。',
    screenDescription:
      '工作台集中组织项目、构件库、材料专业和加工资料入口。实际可执行的操作随当前项目、所选构件及审核条件变化，演示可结合您的典型模型展开。',
    environment: 'Windows x64 · Rhino 7.34 · .NET Framework 4.8',
    version: '参考版本 1.249.2',
    versionNote:
      '已形成部署与安装包记录。适用材料、命令和交付流程需要结合项目确认，当前版本完整实机验证与全链路覆盖仍在推进。',
    video: {
      src: '/media/bcdt-demo.mp4',
      poster: '/media/bcdt-poster.jpg',
      captions: '/media/bcdt-demo.vtt',
      duration: '3 分 50 秒',
    },
    demoNote:
      '演示录制于 2026-09-06，展示工作台与典型成果。后续版本已有调整，各专业支持范围以演示沟通时确认为准。',
    faqs: [
      {
        question: '现有 Rhino 模型能否直接使用？',
        answer:
          '可先用具有代表性的模型评估。项目绑定、构件身份、材料和加工参数的完整程度，会影响后续操作；预约时可说明 Rhino 版本、主要材料与期望成果。',
      },
      {
        question: '是否所有材料都能直接生成正式加工资料？',
        answer:
          '各材料的支持范围与发布条件不同。正式加工单、图纸需要具备相应的生产信息和审核依据；标为候选或待审的成果应继续核对，不能直接用于下单。',
      },
      {
        question: '是否包含车间生产管理？',
        answer:
          'BCDT 聚焦深化设计与加工资料，正式成果范围截至加工单和加工图。车间派工、质检及执行回写需要按独立业务需求另行评估。',
      },
      {
        question: '如何评估适配并获取软件？',
        answer:
          '通过预约演示说明项目、材料类型和工作环境。我们会结合典型构件确认适用范围、版本与安装方式，再安排后续使用。',
      },
    ],
  },
  {
    slug: 'bcdc',
    id: 'BCDC',
    name: '工程数据中心',
    tagline: '围绕项目，把工程资料组织起来。',
    summary:
      '以材料、文件、知识和项目信息四个中心组织日常资料，让料单复核、版本查阅和项目协作拥有清晰的工作入口。',
    status: '申请开通',
    audience: ['项目管理人员', '材料与资料管理人员', '设计及复核人员'],
    image: '/images/products/bcdc-ui.jpg',
    features: [
      '料单与材料查询',
      '文件与版本组织',
      '项目知识归集',
      '项目与人员信息',
    ],
    action: {
      label: '申请 BCDC 开通',
      href: '/contact?intent=access&product=BCDC',
    },
    stage: '项目数据组织',
    workflowTitle: '从一份料单开始，保留资料流转的上下文。',
    workflow: [
      {
        title: '进入项目',
        description: '选择项目工作区，按工作角色查找所需材料与文件入口。',
      },
      {
        title: '整理资料',
        description: '从模板建单或组织已有资料，关联来源并查看解析结果。',
      },
      {
        title: '复核版本',
        description: '处理需人工确认的问题，核对版本和审批信息，准备后续流转。',
      },
      {
        title: '查询与积累',
        description: '查找材料、文件和项目知识，为后续工作保留可用依据。',
      },
    ],
    groups: [
      {
        title: '料单与材料',
        description: '把建单、查找与人工复核放在同一个材料工作入口。',
        items: [
          '标准料单模板与料单台账',
          '解析问题查看与人工复核',
          '版本、审批信息及下发准备',
          '跨料单材料查询与待用材料管理',
        ],
      },
      {
        title: '工程文件',
        description: '围绕项目组织文件，使资料查阅更有条理。',
        items: [
          '工程文件上传与归档入口',
          '文件库分类与资料查阅',
          '版本相关信息的集中查看',
          '邮件及附件归档入口',
        ],
      },
      {
        title: '知识资料',
        description: '让日常积累的技术资料成为团队可查阅的知识。',
        items: [
          '知识中心与分类资料库',
          '资料预览与知识查阅',
          '项目经验与常用资料归集',
          '小幕辅助分析入口',
        ],
      },
      {
        title: '项目与人员',
        description: '以项目为单位呈现组织信息和工作上下文。',
        items: [
          '项目列表与独立工作区',
          '材料、文件、知识和项目信息四中心',
          '参建组织及项目角色信息',
          '按项目需求确认使用权限与流程',
        ],
      },
    ],
    inputs: [
      '项目基础信息、参与组织与使用角色',
      '料单、材料记录及相关工程文件',
      '需归集的技术资料与项目知识',
    ],
    outputs: [
      '按项目组织的材料台账与查询结果',
      '可查阅的文件、版本及复核记录',
      '团队可持续积累的项目知识资料',
    ],
    screenTitle: '常用资料与业务入口，回到项目工作台。',
    screenDescription:
      '材料、文件、知识与项目信息构成当前工作台的主要范围。演示呈现真实界面与业务入口，具体权限、审批和归档方式按开通项目配置确认。',
    environment: '浏览器访问 · 项目工作区 · 按需配置权限',
    version: '当前公开范围：四个业务中心',
    versionNote:
      '开通前确认服务地址、使用角色、功能范围与资料组织方式。模型、现场、协同及独立 AI 中心处于规划阶段。',
    video: {
      src: '/media/bcdc-demo.mp4',
      poster: '/media/bcdc-poster.jpg',
      captions: '/media/bcdc-demo.vtt',
      duration: '2 分 40 秒',
    },
    demoNote:
      '演示录制于 2026-09-06，涵盖真实工作台、料单及资料入口。开通时的界面、权限与服务范围以实际配置为准。',
    faqs: [
      {
        question: '目前可以了解哪些业务范围？',
        answer:
          '当前介绍覆盖材料、文件、知识、项目信息四个中心，以及邮件和小幕辅助入口。申请时可说明主要业务，便于确认对应功能、权限与使用方式。',
      },
      {
        question: '料单复核、审批和下发如何使用？',
        answer:
          '现有界面提供模板、台账、人工复核、版本及审批相关入口。实际流程需要结合项目角色、料单类型和管理要求确认，可在演示中逐项评估。',
      },
      {
        question: '小幕与独立 AI 中心有什么关系？',
        answer:
          '小幕是现有工作台中的辅助入口；独立 AI 中心以及模型、现场、协同中心仍在规划。申请开通时会明确当前可用的辅助范围。',
      },
      {
        question: '已有客户如何访问，新的项目如何申请？',
        answer:
          '已有客户可联系服务人员核对项目访问地址与账号权限。新项目通过本页申请入口说明组织规模、资料类型和工作流程，再确认开通范围。',
      },
    ],
  },
  {
    slug: 'bcv',
    id: 'BCV',
    name: '移动模型浏览器',
    tagline: '把模型带到现场，让核对更直观。',
    summary:
      '面向现场工程师的离线模型浏览工具。通过构件属性、图层、剖切和测量查看设计关系，减少在模型中反复寻找信息的时间。',
    status: '内测招募',
    audience: ['现场工程师', '深化设计师', '项目协作人员'],
    image: '/images/products/bcv-ui.jpg',
    features: [
      '本地导入与缓存',
      '构件属性与定位',
      '图层、剖切与隔离',
      '距离与面积核对',
    ],
    action: {
      label: '申请 BCV 内测',
      href: '/contact?intent=trial&product=BCV',
    },
    stage: '模型查看与核对',
    workflowTitle: '从打开模型，到看清局部关系。',
    workflow: [
      {
        title: '导入模型',
        description: '打开本地 3DM、GLB 或 GLTF，按格式准备相应依赖文件。',
      },
      {
        title: '找到构件',
        description: '通过视图、图层、属性或搜索缩小范围，选中需要查看的对象。',
      },
      {
        title: '查看关系',
        description: '用隔离、剖切和爆炸视图，观察构件组成与空间位置。',
      },
      {
        title: '核对尺寸',
        description: '结合捕捉点、模型单位与测量基准，核对距离和显示网格面积。',
      },
    ],
    groups: [
      {
        title: '导入与缓存',
        description: '模型在本地处理，后续查看复用已建立的缓存。',
        items: [
          '3DM、GLB、GLTF 及模型包导入',
          'Android 原生分块缓存与按需加载',
          '只读附加模型和组合查看',
          '最近打开与模型缓存管理',
        ],
      },
      {
        title: '浏览与定位',
        description: '在整体与局部之间切换，查看构件的属性信息。',
        items: [
          '旋转、平移、缩放与标准视图',
          '点选、框选与缩放至所选对象',
          '属性读取及搜索定位',
          '文本、注解与显示模式控制',
        ],
      },
      {
        title: '图层与剖切',
        description: '聚焦需要核对的区域，理清模型中的空间关系。',
        items: [
          '母子图层树与分层显隐',
          '隐藏、隔离与全部显示',
          '按轴向或当前视图剖切',
          '构件爆炸、复原及组合模型查看',
        ],
      },
      {
        title: '距离与面积',
        description: '先确认单位、捕捉和参考对象，再读取测量结果。',
        items: [
          '两点距离、平面投影与坐标差',
          '构件边长与点到线距离',
          '所选三角面所在平面的垂距',
          '选择集的显示网格面积汇总',
        ],
      },
    ],
    inputs: [
      '本地 3DM、GLB、GLTF 模型及依赖资源',
      '大型模型对应的 BCV 缓存包',
      '需要核对的构件、区域与尺寸基准',
    ],
    outputs: [
      '本地缓存与可持续浏览的模型视图',
      '构件属性、图层与空间关系的查看结果',
      '结合模型单位解释的距离和面积结果',
    ],
    screenTitle: '整体看得见，局部查得清。',
    screenDescription:
      '视图、图层与构件操作围绕现场查看组织。大模型通过轻量总览和精细构件按需加载保持可浏览，实际体验与设备内存、模型结构和缓存规模有关。',
    environment: 'Android arm64 内测 · 独立 Web Viewer',
    version: '当前资料版本 0.20.2+71',
    versionNote:
      '近期版本完善块实例、缺少显示网格的曲面与导航。Android 真机触控和内存验证仍在推进，iOS 暂未提供；Web 体验需结合浏览器与模型规模确认。',
    video: {
      src: '/media/bcv-demo.mp4',
      poster: '/media/bcv-poster.jpg',
      captions: '/media/bcv-demo.vtt',
      duration: '3 分钟',
    },
    demoNote:
      '演示录制于 2026-09-06，使用 Android 模拟器中的 0.20.0+69。当前资料版本为 0.20.2+71，画面与操作细节可能已有变化。',
    faqs: [
      {
        question: '支持哪些设备和文件？',
        answer:
          '当前提供 Android arm64 内测，并有独立 Web Viewer。支持 3DM、GLB、GLTF；GLTF 需同时准备依赖的几何和纹理资源。iOS 适配尚未完成。',
      },
      {
        question: '模型是否需要上传？',
        answer:
          'Android 可离线查看本地模型；Web Viewer 的本地文件在当前浏览器标签页中处理。首次建立缓存需一定时间和存储空间，后续可复用缓存。',
      },
      {
        question: '大型工程模型的使用条件是什么？',
        answer:
          '模型规模、单个对象的复杂度、设备内存和可用存储共同决定体验。精细构件按预算加载，远景保留轻量总览；大模型的 Web 查看建议准备 BCV 缓存包。内测时可结合实际设备与模型评估。',
      },
      {
        question: '测量结果如何用于工程核对？',
        answer:
          '请先确认模型单位与捕捉基准。面积按显示三角网格计算，点到面显示所选三角面所在平面的垂距；曲面显示与精确设计几何可能存在近似差异，关键尺寸应结合原设计资料复核。',
      },
      {
        question: '如何参加内测？',
        answer:
          '通过申请入口提供设备型号、系统版本、模型格式与典型文件规模。我们会据此确认适用版本和验证重点，并安排体验方式。',
      },
    ],
  },
];

export const productRoadmap = [
  {
    title: 'AI 辅助设计与受控建模',
    status: '研发验证',
    problem: '将图纸信息与模型操作连接起来，让重复工作更可控。',
    progress: '已有图纸核查、型材预检与局部工程建模的阶段成果。',
    next: '继续验证原生软件集成、真实构件信息与完整工程范围。',
  },
  {
    title: '数据与模型关联',
    status: '规划方向',
    problem: '在模型、构件与加工资料之间，更快找到对应信息。',
    progress: '以现有构件身份、版本资料和项目数据组织为基础。',
    next: '逐步明确跨产品对应关系、接口与项目权限。',
  },
  {
    title: '现场反馈与协同',
    status: '规划方向',
    problem: '让现场发现的问题，带着位置和依据回到项目团队。',
    progress: '已有移动模型查看能力，现场与协同模块仍在规划。',
    next: '围绕问题定位、反馈记录与交付跟踪开展场景验证。',
  },
];
