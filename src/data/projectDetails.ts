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
    status: "工程验收通过 · 持续维护",
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
        title: "前后台权限边界落地",
        description:
          "将公开端、管理端和知识库的认证范围分开校验，避免后台凭证被用于公开接口，也防止普通用户越权访问管理能力。",
        evidence: "前后台 Token、Cookie 与 API 路径独立；博客 Token 越权访问管理接口返回 HTTP 403。",
      },
      {
        title: "评论热路径收敛为固定 4 次查询",
        description:
          "把逐层递归查询改为根评论分页、子评论批量查询和用户批量装配；浏览量则用 Redis Lua 原子累加，并按脏标记批量回写。",
        evidence: "评论非空页由最坏 3 + 2R 条 SQL 收敛为固定 4 条；真实接口返回 HTTP 200。",
      },
      {
        title: "万级索引任务零遗留",
        description:
          "用 MySQL Outbox 保存任务事实，Redis Stream 承接异步消费，并补齐幂等、租约、重试、死信和人工重放，避免任务悄然丢失。",
        evidence: "10,000 条 ES 索引任务最终全部成功；面向 10,000 粉丝的发布使用事件记录避免同步写扩散。",
      },
      {
        title: "知识问答支持断线恢复",
        description:
          "Java 校验知识库权限并签发短期身份令牌，Python LangGraph 异步执行检索和生成；运行事件持久化后可按 Last-Event-ID 续传。",
        evidence: "365 项自动化测试通过、4 个真实异步 Run 成功；SSE 主动断开后可恢复并收到完整终态事件。",
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
    status: "核心能力完成 · 持续迭代",
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
        note: "50 条离线构造故障样本",
      },
      {
        value: "16,269",
        label: "条积压事件恢复",
        note: "Kafka lag 最终降至 0",
      },
    ],
    results: [
      {
        title: "万级告警风暴稳定接入",
        description:
          "为同一故障生成稳定指纹，并用 Redis Lua 在一次原子操作中完成全局限流与重复告警抑制，避免风暴流量反复写入数据库。",
        evidence: "1000 VU、10,000 次 paced 风暴实测：P95 8.92ms、HTTP 错误率 0%、同指纹抑制率 100%。",
      },
      {
        title: "16,269 条积压事件完整恢复",
        description:
          "沿告警表、Outbox、Kafka Topic 和 Consumer Group 逐层核对，确认事件已经发布，根因是消费者启动参数关闭了 listener。",
        evidence: "重启正确配置后 lag 16269 → 0，diagnosis_task 0 → 16269。",
      },
      {
        title: "根因诊断达到 Top-1 49 / 50",
        description:
          "为 Redis、PostgreSQL、Kafka、JVM、Kubernetes 和 DNS 等故障构造指标、日志与知识证据，要求模型给出结构化结论并引用真实 evidenceId。",
        evidence: "50 次真实模型调用 0 失败；自动 Top-1 49/50、人工复核 50/50，8 并发将总耗时由约 5 分 38 秒降至约 50 秒。",
      },
      {
        title: "诊断进度支持断线续传",
        description:
          "诊断步骤先持久化并分配单调序号，前端通过 SSE 接收进度；连接中断后按 Last-Event-ID 补发遗漏事件，再继续实时推送。",
        evidence: "主工程 mvn verify 共 103 项测试，0 失败、0 错误；SSE 断线回放链路已纳入实现与测试。",
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
