/**
 * Server-side i18n for user-facing messages.
 *
 * Default language is Chinese (zh).  Static UI-facing strings in route handlers
 * and error helpers are stored here so they can be translated without
 * introducing a full i18n framework into the Node.js server.
 *
 * Technical terms (API, JSON, Git, URL, HTTP, SDK, Plugin, Adapter, Agent,
 * Issue, Project, Workspace, Token, JWT, OAuth, etc.) are kept in English.
 */

export const serverMessages = {
  en: {
    // HTTP error helpers (errors.ts)
    unauthorized: "Unauthorized",
    forbidden: "Forbidden",
    notFound: "Not found",
    badRequest: "Bad request",
    conflict: "Conflict",
    unprocessable: "Unprocessable entity",

    // Global error handler (error-handler.ts)
    validationError: "Validation error",
    internalServerError: "Internal server error",

    // Auth / session
    agentAuthRequired: "Agent authentication required",
    boardAuthRequired: "Board authentication required",
    boardUserContextRequired: "Board user context required",

    // Not-found patterns
    agentNotFound: "Agent not found",
    revisionNotFound: "Revision not found",
    companyNotFound: "Company not found",
    issueNotFound: "Issue not found",
    documentNotFound: "Document not found",
    labelNotFound: "Label not found",
    goalNotFound: "Goal not found",
    approvalNotFound: "Approval not found",
    assetNotFound: "Asset not found",
    skillNotFound: "Skill not found",
    pluginNotFound: "Plugin not found",
    pluginUiDirNotFound: "Plugin UI directory not found",
    pluginNoUiBundle: "Plugin does not declare a UI bundle",
    executionWorkspaceNotFound: "Execution workspace not found",
    runtimeServiceActionNotFound: "Runtime service action not found",
    heartbeatRunNotFound: "Heartbeat run not found",
    workspaceOperationNotFound: "Workspace operation not found",
    feedbackTraceNotFound: "Feedback trace not found",
    workProductNotFound: "Work product not found",
    attachmentNotFound: "Attachment not found",
    commentNotFound: "Comment not found",
    keyNotFound: "Key not found",
    fileNotFound: "File not found",

    // Forbidden / access denied
    accessDenied: "Access denied",
    forbiddenOnlyCeoCanManagePermissions: "Only CEO can manage permissions",
    forbiddenAgentOnlyInvokeItself: "Agent can only invoke itself",
    forbiddenAgentOnlyItsOwnCosts: "Agent can only report its own costs",
    forbiddenAgentOnlyItsOwnBudget: "Agent can only change its own budget",
    forbiddenAgentCanOnlyCheckoutAsItself: "Agent can only checkout as itself",
    forbiddenMeRequiresBoardAuth: "assigneeUserId=me requires board authentication",
    forbiddenMe2RequiresBoardAuth: "touchedByUserId=me requires board authentication",
    forbiddenMe3RequiresBoardAuth: "inboxArchivedByUserId=me requires board authentication",
    forbiddenMe4RequiresBoardAuth: "unreadForUserId=me requires board authentication",
    forbiddenMissingPermissionLinkApprovals: "Missing permission to link approvals",
    forbiddenOnlyRequestingAgentCanResubmit: "Only requesting agent can resubmit this approval",
    forbiddenOnlyBoardUsersCanInterrupt: "Only board users can interrupt active runs from issue comments",
    forbiddenOnlyBoardUsersCanVoteFeedback: "Only board users can vote on AI feedback",
    forbiddenOnlyBoardUsersCanViewVotes: "Only board users can view feedback votes",
    forbiddenOnlyBoardUsersCanViewTraces: "Only board users can view feedback traces",
    forbiddenOnlyBoardUsersCanViewTraceBundles: "Only board users can view feedback trace bundles",

    // Validation / bad request
    agentRunIdRequired: "Agent run id required",
    invalidDocumentKey: "Invalid document key",
    invalidWorkProductPayload: "Invalid work product payload",
    issueDoesNotBelongToCompany: "Issue does not belong to company",
    interruptOnlySupportedPostingComment: "Interrupt is only supported when posting a comment",
    loginOnlySupportedCluadeLocalAgents: "Login is only supported for claude_local agents",
    queryPathRequired: "Query parameter 'path' is required",
    usePermissionsEndpoint: "Use /api/agents/:id/permissions for permission changes",
    adapterConfigMustBeObject: "adapterConfig must be an object",

    // Execution workspace
    execWorkspaceNeedsLocalPath: "Execution workspace needs a local path before Paperclip can manage local runtime services",
    execWorkspaceNoRuntimeConfig: "Execution workspace has no runtime service configuration or inherited project workspace default",

    // Plugin UI
    filePathRequired: "File path is required",
    invalidFilePath: "Invalid file path",
    devUiUrlMustBeHttpOrHttps: "devUiUrl must use http or https protocol",
    devUiUrlMustTargetLocalhost: "devUiUrl must target localhost",
    failedToServeFile: "Failed to serve file",

    // Routines service (user-visible status messages)
    routineExecutionFailed: "Execution failed",
  } as const,

  zh: {
    // HTTP error helpers (errors.ts)
    unauthorized: "未授权",
    forbidden: "禁止访问",
    notFound: "未找到",
    badRequest: "请求无效",
    conflict: "冲突",
    unprocessable: "无法处理",

    // Global error handler (error-handler.ts)
    validationError: "验证错误",
    internalServerError: "内部服务器错误",

    // Auth / session
    agentAuthRequired: "需要 Agent 身份验证",
    boardAuthRequired: "需要 Board 身份验证",
    boardUserContextRequired: "需要 Board 用户上下文",

    // Not-found patterns
    agentNotFound: "Agent 未找到",
    revisionNotFound: "Revision 未找到",
    companyNotFound: "公司未找到",
    issueNotFound: "Issue 未找到",
    documentNotFound: "文档未找到",
    labelNotFound: "标签未找到",
    goalNotFound: "目标未找到",
    approvalNotFound: "审批未找到",
    assetNotFound: "资源未找到",
    skillNotFound: "技能未找到",
    pluginNotFound: "Plugin 未找到",
    pluginUiDirNotFound: "Plugin UI 目录未找到",
    pluginNoUiBundle: "Plugin 未声明 UI bundle",
    executionWorkspaceNotFound: "执行 Workspace 未找到",
    runtimeServiceActionNotFound: "运行时服务操作未找到",
    heartbeatRunNotFound: "心跳运行未找到",
    workspaceOperationNotFound: "Workspace 操作未找到",
    feedbackTraceNotFound: "反馈追踪未找到",
    workProductNotFound: "工作产出未找到",
    attachmentNotFound: "附件未找到",
    commentNotFound: "评论未找到",
    keyNotFound: "密钥未找到",
    fileNotFound: "文件未找到",

    // Forbidden / access denied
    accessDenied: "访问被拒绝",
    forbiddenOnlyCeoCanManagePermissions: "只有 CEO 可以管理权限",
    forbiddenAgentOnlyInvokeItself: "Agent 只能调用自身",
    forbiddenAgentOnlyItsOwnCosts: "Agent 只能上报自己的成本",
    forbiddenAgentOnlyItsOwnBudget: "Agent 只能修改自己的预算",
    forbiddenAgentCanOnlyCheckoutAsItself: "Agent 只能签出自己",
    forbiddenMeRequiresBoardAuth: "assigneeUserId=me 需要 Board 身份验证",
    forbiddenMe2RequiresBoardAuth: "touchedByUserId=me 需要 Board 身份验证",
    forbiddenMe3RequiresBoardAuth: "inboxArchivedByUserId=me 需要 Board 身份验证",
    forbiddenMe4RequiresBoardAuth: "unreadForUserId=me 需要 Board 身份验证",
    forbiddenMissingPermissionLinkApprovals: "缺少链接审批的权限",
    forbiddenOnlyRequestingAgentCanResubmit: "只有发起请求的 Agent 才能重新提交此审批",
    forbiddenOnlyBoardUsersCanInterrupt: "只有 Board 用户才能从 Issue 评论中中断运行",
    forbiddenOnlyBoardUsersCanVoteFeedback: "只有 Board 用户才能对 AI 反馈投票",
    forbiddenOnlyBoardUsersCanViewVotes: "只有 Board 用户才能查看反馈投票",
    forbiddenOnlyBoardUsersCanViewTraces: "只有 Board 用户才能查看反馈追踪",
    forbiddenOnlyBoardUsersCanViewTraceBundles: "只有 Board 用户才能查看反馈追踪包",

    // Validation / bad request
    agentRunIdRequired: "需要 Agent 运行 ID",
    invalidDocumentKey: "文档键无效",
    invalidWorkProductPayload: "工作产出负载无效",
    issueDoesNotBelongToCompany: "Issue 不属于此公司",
    interruptOnlySupportedPostingComment: "只有在发布评论时才能中断",
    loginOnlySupportedCluadeLocalAgents: "仅支持 claude_local 类型 Agent 登录",
    queryPathRequired: "需要 'path' 查询参数",
    usePermissionsEndpoint: "请使用 /api/agents/:id/permissions 来修改权限",
    adapterConfigMustBeObject: "adapterConfig 必须是对象",

    // Execution workspace
    execWorkspaceNeedsLocalPath: "执行 Workspace 需要本地路径，Paperclip 才能管理本地运行时服务",
    execWorkspaceNoRuntimeConfig: "执行 Workspace 没有运行时服务配置或继承的项目 Workspace 默认配置",

    // Plugin UI
    filePathRequired: "需要文件路径",
    invalidFilePath: "文件路径无效",
    devUiUrlMustBeHttpOrHttps: "devUiUrl 必须使用 http 或 https 协议",
    devUiUrlMustTargetLocalhost: "devUiUrl 必须指向 localhost",
    failedToServeFile: "文件服务失败",

    // Routines service (user-visible status messages)
    routineExecutionFailed: "执行失败",
  } as const,
} as const;

export type MessageKey = keyof typeof serverMessages.en;

/**
 * Look up a user-facing message.
 * Default lang is "zh" per project i18n goal.
 */
export function serverT(key: MessageKey, lang: string = "zh"): string {
  return (serverMessages as Record<string, Record<string, string>>)[lang]?.[key] ?? serverMessages.en[key];
}
