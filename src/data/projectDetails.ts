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
    shortLabel: "BACKEND PLATFORM / KNOWLEDGE ENGINEERING",
    type: "个人学习项目",
    role: "独立开发",
    period: "2025.08 — 至今",
    organization: "个人项目",
    status: "工程验收通过，生产灰度未开放",
    overview:
      "从个人内容平台持续演进而来的模块化后端项目。我围绕文章、评论、搜索与通知完善缓存和可靠任务链路，并进一步扩展双空间知识库、混合检索和异步 RAG Agent，让内容发布、知识沉淀、检索与引用问答形成完整闭环。",
    metrics: [
      {
        value: "365",
        label: "自动化用例通过",
        note: "Python 246 / Java 116 / Vue 3，0 失败",
      },
      {
        value: "10,000",
        label: "条索引任务成功",
        note: "ES Outbox 最终 SUCCEEDED，PENDING 为 0",
      },
      {
        value: "8,009",
        label: "req/s warm 复测",
        note: "1000 VU / 100000 次混合请求",
      },
    ],
    results: [
      {
        title: "模块化内容平台与权限边界",
        description:
          "以后端多模块拆分通用、权限、内容、博客与管理职责，并以 scope 隔离前台和后台会话；在内容平台上新增知识库领域，将文章和个人资料沉淀为可版本化知识。",
        evidence: "前后台 Token、Cookie 与 API 路径独立；博客 Token 越权访问管理接口返回 HTTP 403。",
      },
      {
        title: "评论查询与缓存一致性优化",
        description:
          "将评论树的逐层查询改为根评论分页、子评论批量查询和用户批量装配；浏览量采用 Redis Hash、dirty Set 与 Lua 防重，并在数据库成功后按快照条件清理脏标记。",
        evidence: "评论非空页由最坏 3 + 2R 条 SQL 收敛为固定 4 条；真实接口返回 HTTP 200。",
      },
      {
        title: "可补偿的异步任务链路",
        description:
          "以 MySQL Outbox 作为事实源，Redis Stream 承担削峰和消费；索引同步、通知投递与缓存失效统一具备幂等、租约、重试、死信和人工重放能力。",
        evidence: "10,000 条 ES 索引任务最终全部成功；面向 10,000 粉丝的发布使用事件记录避免同步写扩散。",
      },
      {
        title: "有评测门禁的知识问答 Agent",
        description:
          "Java 负责知识库权限与短期身份令牌，Python LangGraph 异步执行检索和生成，PostgreSQL 保存 Run 与事件供 SSE 断点恢复；检索策略必须通过冻结数据集门禁。",
        evidence: "365 项自动化测试通过、4 个真实异步 Run 成功；Multi Query 未通过门禁后保持 0% 并回退稳定策略。",
      },
    ],
    stack: ["Java 17", "Spring Boot", "MySQL", "Redis Stream", "Elasticsearch", "FastAPI", "LangGraph", "PostgreSQL"],
    skillGroups: [
      { title: "后端与架构", items: ["Spring Boot", "模块化单体", "RBAC", "FastAPI"] },
      { title: "可靠性与检索", items: ["Outbox", "Redis Stream", "Elasticsearch", "RRF"] },
      { title: "AI 与工程验证", items: ["LangGraph", "SSE", "JUnit", "Pytest", "k6"] },
    ],
  },
  {
    slug: "opspilot",
    shortLabel: "AIOPS / EVIDENCE-DRIVEN DIAGNOSIS",
    type: "个人学习项目",
    role: "独立开发",
    period: "2026.07 — 至今",
    organization: "个人项目",
    status: "核心能力完成，自动诊断 Worker 待接通",
    overview:
      "模块化单体架构的智能运维诊断平台。从 Alertmanager 告警接入开始，经 Redis 抑制、Transactional Outbox、Kafka、诊断任务、Prometheus/Loki/RAG 证据和 Spring AI Graph 编排，最终在 SSE 工作台呈现可追踪的诊断过程。",
    metrics: [
      {
        value: "8.92ms",
        label: "告警风暴 P95",
        note: "1000 VU / 10000 次 paced 请求",
      },
      {
        value: "50 / 50",
        label: "人工复核根因命中",
        note: "离线构造样本，不代表生产准确率",
      },
      {
        value: "16,269",
        label: "条积压事件恢复",
        note: "Kafka lag 最终降至 0",
      },
    ],
    results: [
      {
        title: "告警风暴下的可靠接入",
        description:
          "Alertmanager Webhook 生成稳定指纹，Redis Lua 原子完成全局限流与同指纹去重；首次告警与 Outbox 在 PostgreSQL 同一事务提交，再异步发布到 Kafka。",
        evidence: "1000 VU、10000 次 paced 风暴：P95 8.92ms、HTTP 错误率 0%、抑制率 100%；主工程 103 项测试 0 失败/错误。",
      },
      {
        title: "定位 16,269 条 Kafka 积压",
        description:
          "沿业务表、Outbox、Topic、Consumer Group 和下游任务表逐段核对，确认故障来自被禁用的 listener，而不是事件未发布。",
        evidence: "重启正确配置后 lag 16269 → 0，diagnosis_task 0 → 16269。",
      },
      {
        title: "真实模型的离线根因评测",
        description:
          "为 Redis、PostgreSQL、Kafka、JVM、Kubernetes、DNS 等故障构造包含指标、日志和知识摘要的评测集，要求模型输出结构化根因并引用输入中的 evidenceId。",
        evidence: "50 条真实模型调用 0 失败；自动 Top-1 为 49/50，人工复核为 50/50，8 并发将耗时由约 5 分 38 秒降至约 50 秒。",
      },
      {
        title: "证据约束与诚实降级",
        description:
          "Prometheus、Loki 和版本化知识库只通过受控工具进入诊断；Spring AI Graph 输出需经过字段、引用和危险动作校验，证据不足或模型不可用时返回确定性降级建议。",
        evidence: "真实语义 RAG 准确率尚未评测，Kafka 任务到自动诊断 Worker 尚未接通；页面不将两项写成已完成能力。",
      },
    ],
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "pgvector", "Redis", "Kafka", "Spring AI Graph"],
    skillGroups: [
      { title: "可靠事件", items: ["Kafka", "Outbox", "Redis Lua"] },
      { title: "诊断与检索", items: ["Spring AI Graph", "pgvector", "RRF", "Evidence Gate"] },
      { title: "观测与验证", items: ["Prometheus", "Loki", "SSE", "JUnit", "Testcontainers", "k6"] },
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
