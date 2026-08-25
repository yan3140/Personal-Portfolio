export type ProjectTone = "blue" | "green" | "coral";

export interface Project {
  slug: string;
  number: string;
  name: string;
  badge: string;
  category: string;
  period: string;
  proof: string;
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
      badge: "个人项目",
      category: "后端平台 / 知识工程",
      period: "2025.08 — 至今",
      proof: "365 项自动化测试通过；10,000 条索引任务最终全部成功，十万请求 warm 复测达到 8,009 req/s。",
      summary:
        "从内容发布、评论与搜索，逐步扩展到可靠异步任务和知识问答的模块化后端平台。",
      contribution:
        "独立完成评论与缓存优化、可补偿任务链路、知识库检索和 Agent 联调，并为关键链路建立自动化验证。",
      highlights: [
        "评论非空页由最坏 3 + 2R 次 SQL 收敛到固定 4 次；浏览量采用 Redis Lua 原子累加与批量回写，降低高频写库压力。",
        "用 MySQL Outbox 与 Redis Stream 构建可补偿任务链；10,000 条 Elasticsearch 索引任务最终全部成功，无遗留待处理任务。",
        "打通知识入库、混合检索与异步问答链路；Java、Python Agent 与 Vue 共 365 项自动化测试通过。",
      ],
      stack: ["Java 17", "Spring Boot", "MySQL", "Redis Stream", "Elasticsearch", "FastAPI", "LangGraph"],
      status: "工程验收通过 · 持续维护",
      tone: "blue",
      repository: "https://github.com/yan3140/Knode",
    },
    {
      slug: "opspilot",
      number: "02",
      name: "OpsPilot",
      badge: "个人项目",
      category: "AIOps / 证据化诊断",
      period: "2026.07 — 至今",
      proof: "1000 VU 告警风暴实测 10,000 次请求，P95 8.92ms、HTTP 错误率 0%、同指纹抑制率 100%。",
      summary:
        "围绕告警风暴、可靠事件和证据约束诊断构建的 Java AIOps 平台。",
      contribution:
        "独立完成告警接入、可靠事件链、指标与日志证据、Agent 编排、诊断工作台和工程验收。",
      highlights: [
        "用稳定告警指纹和 Redis Lua 原子限流去重抵御告警风暴；1000 VU 下 10,000 次请求 P95 8.92ms，错误率 0%。",
        "打通 PostgreSQL Outbox 到 Kafka 的可靠事件链并定位消费者配置故障；16,269 条积压全部恢复，最终 lag 降至 0。",
        "建立证据约束的根因诊断评测；50 次真实模型调用 0 失败，自动 Top-1 49/50、人工复核 50/50。",
      ],
      stack: ["Java 21", "Spring Boot", "PostgreSQL", "Redis", "Kafka", "pgvector", "Spring AI Graph"],
      status: "核心能力完成 · 持续迭代",
      tone: "green",
      repository: "https://github.com/yan3140/opspilot-aiops",
    },
    {
      slug: "greenhouse",
      number: "03",
      name: "新疆南繁智慧育种平台",
      badge: "教师科研项目",
      category: "智慧育种 / 真实业务系统",
      period: "2026.03 — 至今",
      proof: "覆盖 CSV、VCF、图片 3 类育种数据链路；现有测试报告汇总 47 项 JUnit 测试，0 失败。",
      summary:
        "负责育种数据全流程与系统权限模块，实现文件上传、级联关联、树形检索、分析任务和角色授权。",
      contribution:
        "负责育种与系统管理模块的 React/TypeScript 页面、接口封装和主要后端业务，完善数据库迁移、测试数据及前后端联调。",
      highlights: [
        "打通表型 CSV、基因型 VCF 与图片 3 类数据从校验、上传、解析到失败重试的完整导入链路。",
        "用祖先节点递归筛选解决品种、材料与图片的层级查询问题，并统一列表分页与统计口径。",
        "覆盖 18 个测试类、47 项 JUnit 测试且 0 失败，为教师科研项目的真实部署与后续维护提供回归保障。",
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
