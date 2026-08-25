export interface ProjectMetric {
  value: string;
  label: string;
  note: string;
}

export interface ProjectResult {
  title: string;
  description: string;
  evidence: string;
}

export interface ProjectSkillGroup {
  title: string;
  items: string[];
}

export interface ProjectDetail {
  slug: string;
  shortLabel: string;
  type: string;
  role: string;
  period: string;
  organization: string;
  status: string;
  overview: string;
  metrics: ProjectMetric[];
  results: ProjectResult[];
  stack: string[];
  skillGroups: ProjectSkillGroup[];
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: "knode",
    shortLabel: "KNOWLEDGE ENGINEERING / RAG",
    type: "个人学习项目",
    role: "独立开发",
    period: "2025.08 — 至今",
    organization: "个人项目",
    status: "核心功能完成，持续维护",
    overview:
      "面向文章与个人资料的双空间知识工程平台。我在原内容平台上扩展知识库、可靠索引、混合检索与异步 RAG Agent，让文档版本、检索结果和最终引用能够相互追溯。",
    metrics: [
      {
        value: "365",
        label: "自动化用例通过",
        note: "Python 246 / Java 116 / Vue 3，0 失败",
      },
      {
        value: "8,009",
        label: "req/s",
        note: "1000 VU、100000 请求 warm 复测",
      },
      {
        value: "0.034%",
        label: "HTTP 失败率",
        note: "同轮压测 P95 为 222ms",
      },
    ],
    results: [
      {
        title: "双空间与可追溯版本",
        description:
          "系统库承载公开文章，个人库隔离私有资料；通过不可变文档版本、内容哈希与稳定 Chunk ID 保存来源、版本和引用边界。",
        evidence: "验收覆盖权限隔离、版本切换、引用有效性与失败恢复路径。",
      },
      {
        title: "可靠索引与混合检索",
        description:
          "以 MySQL Outbox 记录索引任务，经 Redis Stream 可靠投递，再由 Elasticsearch 组合 BM25、向量召回与 RRF 融合。",
        evidence: "365 个自动化用例全部通过，失败、重试、租约和死信分支均有覆盖。",
      },
      {
        title: "用评测决定检索策略",
        description:
          "对 Multi Query 方案进行对照评测；复杂题策略未带来召回收益且显著增加错误率和尾延迟，因此保留实验开关并自动回退稳定方案。",
        evidence: "稳定方案 Recall@10 60.83%、错误率 0%、P95 8.049s。",
      },
      {
        title: "高并发下的可验证表现",
        description:
          "对详情、评论、浏览量、热榜和搜索等平台热路径执行千级并发与十万级请求压测，并针对连接拒绝和消费积压继续调优。",
        evidence: "warm 复测 100000 请求：8009 req/s、P95 222ms、HTTP 失败率 0.034%。",
      },
    ],
    stack: ["Java 17", "Spring Boot", "Redis Stream", "Elasticsearch", "FastAPI", "LangGraph", "PostgreSQL"],
    skillGroups: [
      { title: "后端与框架", items: ["Spring Boot", "FastAPI", "LangGraph"] },
      { title: "数据与检索", items: ["MySQL", "PostgreSQL", "Redis", "Elasticsearch"] },
      { title: "工程验证", items: ["JUnit", "Pytest", "k6", "SSE"] },
    ],
  },
  {
    slug: "opspilot",
    shortLabel: "AIOPS / RELIABLE EVENTS",
    type: "个人学习项目",
    role: "独立开发",
    period: "2026.07 — 至今",
    organization: "个人项目",
    status: "核心链路完成",
    overview:
      "从告警接入、可靠事件与证据采集出发的智能运维诊断平台。重点不是让模型直接猜测原因，而是让诊断结论建立在可追踪的指标、日志、知识文档和运行状态上。",
    metrics: [
      {
        value: "16,269",
        label: "条事件完整恢复",
        note: "Kafka lag 从 16269 降至 0",
      },
      {
        value: "47",
        label: "聚焦测试通过",
        note: "知识库与诊断工具相关测试",
      },
      {
        value: "0",
        label: "恢复后积压",
        note: "任务数同步增长至 16269",
      },
    ],
    results: [
      {
        title: "告警抑制与可靠事件链",
        description:
          "Alertmanager Webhook 生成稳定告警指纹，Redis Lua 原子完成限流与窗口去重，再通过 PostgreSQL Transactional Outbox 和 Kafka 投递事件。",
        evidence: "幂等键、状态约束、重试与死信路径均进入聚焦测试范围。",
      },
      {
        title: "定位 16,269 条 Kafka 积压",
        description:
          "沿业务表、Outbox、Topic、Consumer Group 和下游任务表逐段核对，确认故障来自被禁用的 listener，而不是事件未发布。",
        evidence: "重启正确配置后 lag 16269 → 0，diagnosis_task 0 → 16269。",
      },
      {
        title: "版本化知识与双路召回",
        description:
          "文档通过 SHA-256 去重和不可变版本发布，使用 pg_trgm 关键词检索与 pgvector 向量检索，再通过 RRF 合并候选。",
        evidence: "47 个知识库与诊断工具聚焦测试全部通过。",
      },
      {
        title: "证据约束的诊断流程",
        description:
          "采集 Prometheus 指标与 Loki 日志，由 Spring AI Graph 编排诊断；结构化输出经过程序校验，证据不足时明确降级。",
        evidence: "状态机保留失败、重试、降级和引用追溯路径，不隐藏尚未完成的自动 worker。",
      },
    ],
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "pgvector", "Redis", "Kafka", "Spring AI Graph"],
    skillGroups: [
      { title: "可靠事件", items: ["Kafka", "Outbox", "Redis Lua"] },
      { title: "数据与检索", items: ["PostgreSQL", "pgvector", "pg_trgm"] },
      { title: "诊断与观测", items: ["Spring AI Graph", "Prometheus", "Loki", "SSE"] },
    ],
  },
  {
    slug: "greenhouse",
    shortLabel: "BREEDING DATA / REAL-WORLD SYSTEM",
    type: "教师科研项目",
    role: "团队成员 / 前后端开发",
    period: "2026.03 — 至今",
    organization: "校内教师科研团队",
    status: "面向实际部署",
    overview:
      "由校内教师团队推进、面向真实使用场景的智慧育种系统。我负责育种数据全流程和系统管理相关模块，把物种、材料、表型、基因、图片与分析任务的复杂关系落到可运行的前后端业务中。",
    metrics: [
      {
        value: "47",
        label: "JUnit 测试通过",
        note: "现有 Surefire 报告汇总，0 失败",
      },
      {
        value: "18",
        label: "个测试类",
        note: "覆盖 Controller、Service、Mapper 与工具类",
      },
      {
        value: "3",
        label: "类育种数据链路",
        note: "表型 CSV / 基因 VCF / 图片",
      },
    ],
    results: [
      {
        title: "三类育种数据完整链路",
        description:
          "支持表型 CSV、基因 VCF 和表型图片的校验、上传、进度反馈、失败重传、预览与批量删除，并维护关联数据和统计结果。",
        evidence: "功能范围覆盖 3 类数据，不以演示页代替真实接口和数据库。",
      },
      {
        title: "独立业务树与递归筛选",
        description:
          "为表型、基因和图片维护独立数据树，通过后代节点递归筛选、级联条件和真实分页统一列表、统计与分析任务的数据口径。",
        evidence: "针对根节点、群体节点、叶子节点及删除、重传、分页切换进行交叉验证。",
      },
      {
        title: "模块级角色权限",
        description:
          "将复杂菜单与按钮授权收敛为更适合业务人员使用的模块级角色选择，并补齐用户、通知、事纪、健康检测和告警等系统管理能力。",
        evidence: "权限、数据范围和操作入口在前后端联调中共同校验。",
      },
      {
        title: "测试覆盖真实业务层",
        description:
          "测试不只停留在页面展示，覆盖育种与系统模块的 Controller、Service、Mapper XML 和分析工具等关键路径。",
        evidence: "18 个测试类，共 47 项 JUnit 测试，0 失败、0 错误、0 跳过。",
      },
    ],
    stack: ["Java 17", "Spring Boot", "MyBatis", "MySQL", "Redis", "React", "TypeScript"],
    skillGroups: [
      { title: "后端与数据", items: ["Spring Boot", "MyBatis", "MySQL", "Redis"] },
      { title: "业务能力", items: ["文件处理", "树形查询", "权限控制"] },
      { title: "工程验证", items: ["JUnit", "Surefire", "前后端联调"] },
    ],
  },
];
