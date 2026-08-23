export type ProjectTone = "blue" | "green" | "coral";

export interface Project {
  slug: string;
  number: string;
  name: string;
  category: string;
  summary: string;
  contribution: string;
  highlights: string[];
  stack: string[];
  status: string;
  tone: ProjectTone;
  repository?: string;
  demo?: string;
  placeholder?: boolean;
}

export const portfolio = {
  site: {
    title: "Lingxiao Pang | 学生开发者作品集",
    description: "学生开发者个人作品集，记录项目实践、技术亮点与持续学习。",
  },
  profile: {
    name: "Lingxiao Pang",
    mark: "LP",
    role: "计算机相关专业在读",
    roles: ["Java Developer", "Backend Builder", "AI Explorer"],
    headline: "后端开发与 AI 应用",
    intro:
      "计算机相关专业学生，主要使用 Java 和 Python，正在学习后端开发、数据库与 AI 应用。",
    location: "中国 · UTC+8",
    status: "在校学习 · 开放实习机会",
    email: "3140585910@qq.com",
    github: "https://github.com/yan3140",
    resume: "",
  },
  education: {
    school: "华中农业大学",
    badges: ["211", "双一流"],
    major: "计算机科学与技术",
    period: "2024.09 — 2028.06",
  },
  focus: [
    { label: "方向", value: "后端开发 / AI 应用" },
    { label: "语言", value: "Java / Python" },
    { label: "项目", value: "3 个代表项目" },
  ],
  projects: [
    {
      slug: "knode",
      number: "01",
      name: "知屿 Knode",
      category: "个人学习项目 · 知识工程 / RAG",
      summary:
        "支持知识版本、混合检索、可靠索引与引用问答的双空间知识管理平台。",
      contribution:
        "在原有内容平台基础上扩展知识库领域模块、内部检索合约、Python Agent 服务和问答页面，完成 Java、Python 与 Vue 之间的端到端链路。",
      highlights: [
        "以系统库和个人库隔离公开内容与私有资料，通过不可变文档版本和稳定 Chunk ID 保证引用可追溯。",
        "使用 MySQL Outbox、Redis Stream 和 Elasticsearch 构建可重试索引链路，并通过 BM25、向量检索与 RRF 完成候选融合。",
        "由 Java 校验知识库权限并签发短期身份令牌，LangGraph 异步 Run 支持事件持久化、SSE 恢复和引用校验。",
      ],
      stack: ["Java 17", "Spring Boot", "Redis Stream", "Elasticsearch", "FastAPI", "LangGraph", "PostgreSQL"],
      status: "基本完成 · 持续维护",
      tone: "blue",
      repository: "https://github.com/yan3140/Knode",
    },
    {
      slug: "opspilot",
      number: "02",
      name: "OpsPilot",
      category: "个人学习项目 · AIOps / Java 后端",
      summary:
        "融合可靠告警事件、混合 RAG 与 Spring AI Graph 的 Java 智能运维诊断平台。",
      contribution:
        "围绕告警接入、证据采集和 AI 诊断完成数据库设计、可靠事件链路、版本化知识库、Agent 编排、SSE 工作台、可观测性与测试。",
      highlights: [
        "从 Alertmanager Webhook 开始，串联告警指纹、Redis 限流去重、PostgreSQL、Transactional Outbox、Kafka 与幂等消费。",
        "将知识库拆分为逻辑文档、不可变版本、发布指针和持久化索引任务，支持租约、退避、死信与人工重放。",
        "把告警、指标、日志和组合症状组织为多路查询，通过双层 RRF 形成可追溯证据，再交给 Spring AI Graph 生成受约束诊断。",
      ],
      stack: ["Java 21", "Spring Boot", "PostgreSQL", "pgvector", "Redis", "Kafka", "Spring AI Graph"],
      status: "核心链路已完成",
      tone: "green",
      repository: "https://github.com/yan3140/opspilot-aiops",
    },
    {
      slug: "greenhouse",
      number: "03",
      name: "新疆南繁智慧育种平台",
      category: "课程小组项目 · RuoYi 二次开发",
      summary:
        "负责育种数据全流程与系统权限模块，实现文件上传、级联关联、树形检索、分析任务和角色授权。",
      contribution:
        "负责育种与系统管理模块的 React/TypeScript 页面、接口封装和主要后端业务，完善数据库迁移、测试数据及前后端联调。",
      highlights: [
        "表型 CSV 上传后完成文件校验、多表关联、动态表创建、树节点更新和统计回填，并保持查询与删除链路一致。",
        "为表型、基因和图片维护独立数据树，通过后代节点递归筛选、级联条件与分页规则统一查询范围。",
        "将复杂菜单与按钮授权收敛为模块级角色选择，同时完善用户、通知、事纪、健康检测和告警等系统管理功能。",
      ],
      stack: ["Java 17", "Spring Boot", "MyBatis", "MySQL", "Redis", "React", "TypeScript"],
      status: "基本完成 · 联调维护",
      tone: "coral",
      repository: "https://gitee.com/li-zi_ling/RuoYi-Vue.git",
    },
  ] as Project[],
  capabilities: [
    {
      index: "01",
      title: "后端与数据",
      description: "能围绕业务边界组织接口、数据模型与异步流程，并关注一致性、错误处理和可恢复性。",
      items: ["Java / Spring", "MySQL / Redis", "REST API", "异步任务"],
      tone: "blue" as ProjectTone,
    },
    {
      index: "02",
      title: "AI 应用",
      description: "关注检索、证据约束、状态编排和质量评估，让模型能力进入可验证的应用流程。",
      items: ["Python", "LangGraph", "RAG", "Evaluation"],
      tone: "green" as ProjectTone,
    },
    {
      index: "03",
      title: "工程实践",
      description: "通过文档、测试、部署与可观测性推动项目从“能运行”走向“能维护、能解释”。",
      items: ["Git", "Testing", "Docker", "Observability"],
      tone: "coral" as ProjectTone,
    },
  ],
  technologyGroups: [
    {
      index: "01",
      title: "后端开发",
      tone: "violet",
      items: ["Java", "Spring Boot", "Spring Security", "MyBatis", "FastAPI", "REST API", "SSE"],
    },
    {
      index: "02",
      title: "数据与消息",
      tone: "cyan",
      items: ["MySQL", "PostgreSQL", "Redis", "Elasticsearch", "Kafka", "pgvector"],
    },
    {
      index: "03",
      title: "AI 与检索",
      tone: "coral",
      items: ["Python", "LangGraph", "RAG", "BM25", "RRF", "Spring AI Graph", "Evaluation"],
    },
    {
      index: "04",
      title: "工程与测试",
      tone: "lime",
      items: ["Git", "Docker Compose", "JUnit", "Pytest", "Testcontainers", "Prometheus", "OpenTelemetry"],
    },
  ],
  journey: [
    {
      date: "2024.09",
      label: "FOUNDATION",
      title: "进入华中农业大学",
      description: "就读计算机科学与技术专业，开始系统学习计算机基础课程与软件开发。",
      topics: ["计算机基础", "程序设计", "校园学习"],
    },
    {
      date: "2025.06",
      label: "TEAM",
      title: "加入沸点工作室",
      description: "加入校内技术组织沸点工作室，开始在团队环境中学习后端技术与协作流程。",
      topics: ["Java 后端", "团队协作", "工程规范"],
    },
    {
      date: "2025.08",
      label: "PROJECT",
      title: "开始开发知屿 Knode",
      description: "围绕知识版本、混合检索与引用问答，持续完善 Java、Python 与 Vue 的端到端实现。",
      topics: ["知识工程", "RAG", "混合检索"],
    },
    {
      date: "2026.01",
      label: "MEMBER",
      title: "成为沸点工作室正式成员",
      description: "完成阶段学习与考核，以正式成员身份继续参与技术学习、协作和项目实践。",
      topics: ["正式成员", "项目实践", "持续学习"],
    },
    {
      date: "2026.03",
      label: "DELIVERY",
      title: "参与南疆育种平台开发",
      description: "参与业务模块、权限与数据流程开发，在真实协作中练习需求理解、联调和交付。",
      topics: ["Spring Boot", "React", "业务交付"],
    },
    {
      date: "2026.07",
      label: "AIOPS",
      title: "开始运维诊断系统开发",
      description: "围绕告警接入、可靠事件链路、检索证据与 AI 诊断，开发 OpsPilot 运维诊断系统。",
      topics: ["AIOps", "可靠事件", "AI 诊断"],
    },
  ],
};
