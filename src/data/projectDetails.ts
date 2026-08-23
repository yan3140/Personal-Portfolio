export interface ProjectDetail {
  slug: string;
  shortLabel: string;
  lead: string;
  context: string;
  goal: string;
  features: Array<{ title: string; description: string }>;
  responsibilities: string[];
  challenge: {
    title: string;
    problem: string;
    investigation: string;
    solution: string;
    verification: string;
  };
  outcomes: string[];
  learnings: string[];
  nextStep: string;
}

export const projectDetails: ProjectDetail[] = [
  {
    slug: "knode",
    shortLabel: "KNOWLEDGE ENGINEERING / RAG",
    lead: "把公开文章与个人资料组织成可管理、可检索、可追溯引用的知识空间，并让长耗时问答具备可靠的异步执行与恢复能力。",
    context:
      "项目从 Spring Boot 内容平台出发。我希望它不只负责发布内容，还能把文章和个人资料沉淀为知识，因此新增了独立知识库领域、检索链路与 Python Agent 服务。",
    goal:
      "验证 Java 多模块架构、跨存储最终一致性、Elasticsearch 混合检索、权限边界和 LangGraph Agent 能否组成一条完整且可验证的工程链路。",
    features: [
      {
        title: "双空间知识库",
        description:
          "系统库承载公开文章，个人库隔离私有资料。文档通过不可变版本、内容哈希与稳定 Chunk ID 保留来源和版本边界。",
      },
      {
        title: "可靠索引与混合检索",
        description:
          "以 MySQL Outbox 记录索引任务，经 Redis Stream 投递到消费者，再由 Elasticsearch 承载 BM25 与向量候选，并使用 RRF 融合结果。",
      },
      {
        title: "可恢复的 RAG Agent",
        description:
          "Java 校验知识库权限并签发短期身份令牌，Python Agent 异步执行检索、生成和引用校验，PostgreSQL 保存 Run 与事件供 SSE 恢复。",
      },
    ],
    responsibilities: [
      "在原内容平台上新增知识库模块、数据库迁移、内部检索 OpenAPI 合约与前端问答页面。",
      "实现 MySQL、Redis Stream 与 Elasticsearch 之间可重试、幂等和可观测的异步索引链路。",
      "完成 Java 权限网关与 FastAPI、LangGraph Agent 之间的端到端协作，并补充自动化测试和压力验证。",
    ],
    challenge: {
      title: "批量写入后，部分文章无法及时检索",
      problem:
        "MySQL 已写入文章，但 Elasticsearch 在等待窗口内没有完成全部索引。单纯增加线程无法解决任务丢失、重复执行和进程中断后的补偿问题。",
      investigation:
        "逐段对比文章数量、Outbox 状态、消费者日志、重试次数、线程池队列和最终索引数量，区分任务未产生、任务积压与 ES 写入失败。",
      solution:
        "把索引任务先写入 MySQL Outbox，再通过 Redis Stream 消费；为任务增加唯一键、租约、有界重试、死信状态和幂等处理。",
      verification:
        "使用单元测试覆盖幂等、租约、重试和死信分支，并在真实 Redis/ES 环境与高并发脚本中观察积压消化和最终索引数量。",
    },
    outcomes: [
      "形成文章发布、文档版本、异步索引、混合检索和引用问答的完整闭环。",
      "验收记录中 Java、Python 与 Vue 共 365 个自动化用例通过。",
      "对未达到召回率、错误率和 P95 门槛的 Multi Query 策略保留实验开关，并自动回退到稳定方案。",
    ],
    learnings: [
      "异步任务首先要保证不丢、幂等、可观测和可补偿，再讨论增加并发度。",
      "RAG 的正确性不仅是相似度，还包括权限、版本、证据来源和引用有效性。",
      "技术决策需要用测试、压力数据和对照评测验证，而不是只依赖主观效果。",
    ],
    nextStep:
      "继续完善外部文档导入与解析，建立固定压测数据集和性能基线，并根据积压、错误率和尾延迟调整消费者容量。",
  },
  {
    slug: "opspilot",
    shortLabel: "AIOPS / RELIABLE EVENTS",
    lead: "从告警接入、可靠事件和证据采集出发，让 AI 诊断建立在真实指标、日志与 Runbook 上，而不是仅凭 Prompt 猜测。",
    context:
      "这是一个用于系统练习 Java 后端、消息可靠性、数据库设计和 AI 工程化的个人项目，重点不是堆叠技术，而是把它们放进同一条告警诊断链路。",
    goal:
      "处理告警风暴与重复消息，保证告警落库后可靠产生诊断任务，并让 Agent 的每个结论都能回到可追溯证据。",
    features: [
      {
        title: "告警抑制与可靠事件",
        description:
          "接收 Alertmanager Webhook，生成稳定告警指纹，通过 Redis Lua 完成原子限流与窗口去重，再用 Transactional Outbox 和 Kafka 投递事件。",
      },
      {
        title: "版本化知识与双层检索",
        description:
          "支持 Markdown/PDF、SHA-256 去重、异步切块与 Embedding，组合 pg_trgm 关键词检索、pgvector 向量检索和 RRF 融合。",
      },
      {
        title: "证据约束诊断",
        description:
          "采集 Prometheus 与 Loki 证据，由 Spring AI Graph 编排诊断；结构化输出经过程序校验，证据不足时明确降级，并通过 SSE 推送进度。",
      },
    ],
    responsibilities: [
      "完成数据库设计、告警接入、Outbox 发布、Kafka 消费、知识库、诊断编排、SSE 工作台和可观测性链路。",
      "为失败、重试、死信、降级和引用追溯定义明确状态与异常路径，而不是只实现成功流程。",
      "围绕告警指纹、Lua 抑制协议、诊断状态机、证据模型和双层 RRF 完成面向业务的设计。",
    ],
    challenge: {
      title: "Kafka 积压 16,269 条且没有诊断任务",
      problem:
        "告警表和 Outbox 均有 16,269 条记录，但 diagnosis_task 为 0，consumer group 没有 active member，单个分区 lag 持续堆积。",
      investigation:
        "沿业务表、Outbox 发布状态、Kafka topic/partition、consumer group 和下游表逐段核对，确认数据库到 Kafka 已成功，问题位于消费端。",
      solution:
        "发现应用曾携带禁用 listener 自动启动的参数。停止旧进程并按正常配置重启，使消费者重新加入 group。",
      verification:
        "观察 lag 从 16,269 下降到 0，diagnosis_task 增长到 16,269；再次发送新告警后成功创建任务且 lag 保持为 0。",
    },
    outcomes: [
      "完成知识文档索引、告警抑制、Kafka 事件、诊断任务、证据工具、Agent 编排和 SSE 进度查询。",
      "源码包含 143 个测试方法；资料整理前执行的 47 个知识库与诊断工具聚焦测试全部通过。",
      "保留真实边界：Kafka 到 Agent 的自动 worker、完整权限认证和真实 RAG 评测仍在后续计划中。",
    ],
    learnings: [
      "至少一次投递不等于 exactly-once，必须通过业务幂等和状态约束控制重复影响。",
      "排查异步链路要逐段验证，Kafka lag 必须结合 active member 和下游数据判断。",
      "AI 输出必须经过结构化校验、证据约束和可复现评测。",
    ],
    nextStep:
      "补齐 Kafka 任务到 Agent 的自动 worker、超时与限流，建立真实 RAG 标注集，并完善知识库管理和权限认证。",
  },
  {
    slug: "greenhouse",
    shortLabel: "FULL STACK / BREEDING DATA",
    lead: "把物种、材料、表型、基因、图片与分析任务的复杂关系落到可运行系统中，完成从数据导入到筛选、分析和权限管理的前后端闭环。",
    context:
      "项目来自课程综合实训。我在 RuoYi-Vue 后台能力和早期设计稿基础上，重点负责育种业务与系统管理模块，把静态界面接入真实后端和数据库。",
    goal:
      "练习从业务分析、数据库建模到 React 页面、Spring Boot 接口、文件处理、权限控制和联调交付的完整流程。",
    features: [
      {
        title: "育种资源管理",
        description:
          "维护物种、群体、材料、性状及分类，支持材料单条录入、CSV 批量导入、逐级筛选和关联统计。",
      },
      {
        title: "多类型文件链路",
        description:
          "支持表型 CSV、基因 VCF 和表型图片，包含内容校验、重复拦截、多文件进度、停止上传、失败重传、预览和批量删除。",
      },
      {
        title: "树形筛选与系统权限",
        description:
          "为不同业务数据设计独立树结构与父节点递归查询，并将复杂数据范围收敛为更直观的模块级角色权限。",
      },
    ],
    responsibilities: [
      "完成育种与系统管理的 React/TypeScript 页面、接口封装以及主要 Spring Boot、MyBatis 业务。",
      "实现物种、材料、表型、基因、图片、分析任务、全局搜索、通知、事纪、健康检测和告警等功能。",
      "整理数据库迁移 SQL、接口文档和测试数据，并持续处理分页、级联筛选、上传反馈与权限菜单联调问题。",
    ],
    challenge: {
      title: "树节点文件数与分析任务统计不一致",
      problem:
        "叶子节点能看到文件，但物种根节点缺少部分数据；页面树统计、物种管理统计和分析任务可选文件数量口径不同。",
      investigation:
        "从前端节点状态、请求参数和分页配置追踪到 Controller、Service、Mapper 与数据库，分别对比根节点、群体节点和叶子节点结果。",
      solution:
        "统一父节点递归查询规则，移除固定条数限制并使用真实分页；逐步统一物种、群体和文件 ID 关联，并在上传和删除后刷新统计。",
      verification:
        "准备不同物种、群体、年份和地区的测试文件，交叉核对各层节点、物种管理和分析任务数量，并覆盖删除、重传和分页切换。",
    },
    outcomes: [
      "完成育种数据与系统管理两大模块的前后端闭环，可在本地和课程服务器运行。",
      "将设计稿和开源后台扩展为具有真实数据库、文件处理、权限控制与分析流程的系统。",
      "部分服务、Controller、Mapper 与事纪业务具备 JUnit 测试，并通过前端构建、后端编译和人工流程验证。",
    ],
    learnings: [
      "页面显示正常不代表数据口径正确，树筛选、分页、统计与下拉选项必须共享关联规则。",
      "名称适合展示，不适合作为稳定外键；复杂业务应优先明确 ID 与领域边界。",
      "定位全栈问题需要沿页面、请求、Service、Mapper SQL 和真实数据逐层验证。",
    ],
    nextStep:
      "继续增加上传任务中心、断点续传、异步分析队列、端到端测试、可重复数据库迁移和 Docker 部署。",
  },
];
