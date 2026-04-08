import { UserPlus, Lightbulb, ShieldAlert, ShieldCheck } from "lucide-react";
import { formatCents } from "../lib/utils";
import { useTranslation } from "react-i18next";

function approvalTypeLabel(t: ReturnType<typeof useTranslation>[0], type: string): string {
  switch (type) {
    case "hire_agent": return t("approvals.hireAgent");
    case "approve_ceo_strategy": return t("approvals.ceoStrategy");
    case "budget_override_required": return t("approvals.budgetOverride");
    default: return type;
  }
}

/** Build a contextual label for an approval, e.g. "Hire Agent: Designer" - use getApprovalLabel(t, type, payload) instead */
export function approvalLabel(type: string, payload?: Record<string, unknown> | null): string {
  switch (type) {
    case "hire_agent": return `Hire Agent${payload?.name ? `: ${String(payload.name)}` : ""}`;
    case "approve_ceo_strategy": return "CEO Strategy";
    case "budget_override_required": return "Budget Override";
    default: return type;
  }
}

/** Build a contextual label for an approval with translation */
export function getApprovalLabel(t: ReturnType<typeof useTranslation>[0], type: string, payload?: Record<string, unknown> | null): string {
  const base = approvalTypeLabel(t, type);
  if (type === "hire_agent" && payload?.name) {
    return `${base}: ${String(payload.name)}`;
  }
  return base;
}

function fieldLabel(t: ReturnType<typeof useTranslation>[0], key: string): string {
  const labels: Record<string, string> = {
    name: t("approvals.name"),
    role: t("approvals.role"),
    title: t("approvals.title"),
    icon: t("approvals.icon"),
    capabilities: t("approvals.capabilities"),
    adapter: t("approvals.adapter"),
    scope: t("approvals.scope"),
    scopeName: t("approvals.scope"),
    scopeType: t("approvals.scope"),
    windowKind: t("approvals.window"),
    metric: t("approvals.metric"),
    skills: t("approvals.skills"),
  };
  return labels[key] ?? key;
}

function payloadFieldLabel(t: ReturnType<typeof useTranslation>[0], key: string): string {
  return fieldLabel(t, key) || key;
}

export const typeIcon: Record<string, typeof UserPlus> = {
  hire_agent: UserPlus,
  approve_ceo_strategy: Lightbulb,
  budget_override_required: ShieldAlert,
};

export const defaultTypeIcon = ShieldCheck;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PayloadField({ label, value, t }: { label: string; value: unknown; t: any }) {
  const translatedLabel = fieldLabel(t, label);
  if (!value) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground w-20 sm:w-24 shrink-0 text-xs">{translatedLabel}</span>
      <span>{String(value)}</span>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SkillList({ values, t }: { values: unknown; t: any }) {
  if (!Array.isArray(values)) return null;
  const items = values
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean);
  if (items.length === 0) return null;

  return (
    <div className="flex items-start gap-2">
      <span className="text-muted-foreground w-20 sm:w-24 shrink-0 text-xs pt-0.5">{t("approvals.skills")}</span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className="rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function HireAgentPayload({ payload }: { payload: Record<string, unknown> }) {
  const { t } = useTranslation("approvals");
  return (
    <div className="mt-3 space-y-1.5 text-sm">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground w-20 sm:w-24 shrink-0 text-xs">{t("name")}</span>
        <span className="font-medium">{String(payload.name ?? "—")}</span>
      </div>
      <PayloadField label="role" value={payload.role} t={t} />
      <PayloadField label="title" value={payload.title} t={t} />
      <PayloadField label="icon" value={payload.icon} t={t} />
      {!!payload.capabilities && (
        <div className="flex items-start gap-2">
          <span className="text-muted-foreground w-20 sm:w-24 shrink-0 text-xs pt-0.5">{t("capabilities")}</span>
          <span className="text-muted-foreground">{String(payload.capabilities)}</span>
        </div>
      )}
      {!!payload.adapterType && (
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground w-20 sm:w-24 shrink-0 text-xs">{t("adapter")}</span>
          <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
            {String(payload.adapterType)}
          </span>
        </div>
      )}
      <SkillList values={payload.desiredSkills} t={t} />
    </div>
  );
}

export function CeoStrategyPayload({ payload }: { payload: Record<string, unknown> }) {
  const { t } = useTranslation("approvals");
  const plan = payload.plan ?? payload.description ?? payload.strategy ?? payload.text;
  return (
    <div className="mt-3 space-y-1.5 text-sm">
      <PayloadField label="title" value={payload.title} t={t} />
      {!!plan && (
        <div className="mt-2 rounded-md bg-muted/40 px-3 py-2 text-sm text-muted-foreground whitespace-pre-wrap font-mono text-xs max-h-48 overflow-y-auto">
          {String(plan)}
        </div>
      )}
      {!plan && (
        <pre className="mt-2 rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground overflow-x-auto max-h-48">
          {JSON.stringify(payload, null, 2)}
        </pre>
      )}
    </div>
  );
}

export function BudgetOverridePayload({ payload }: { payload: Record<string, unknown> }) {
  const { t } = useTranslation("approvals");
  const budgetAmount = typeof payload.budgetAmount === "number" ? payload.budgetAmount : null;
  const observedAmount = typeof payload.observedAmount === "number" ? payload.observedAmount : null;
  return (
    <div className="mt-3 space-y-1.5 text-sm">
      <PayloadField label="scope" value={payload.scopeName ?? payload.scopeType} t={t} />
      <PayloadField label="windowKind" value={payload.windowKind} t={t} />
      <PayloadField label="metric" value={payload.metric} t={t} />
      {(budgetAmount !== null || observedAmount !== null) ? (
        <div className="rounded-md bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
          {t("limit")} {budgetAmount !== null ? formatCents(budgetAmount) : "—"} · {t("observed")} {observedAmount !== null ? formatCents(observedAmount) : "—"}
        </div>
      ) : null}
      {!!payload.guidance && (
        <p className="text-muted-foreground">{String(payload.guidance)}</p>
      )}
    </div>
  );
}

export function ApprovalPayloadRenderer({ type, payload }: { type: string; payload: Record<string, unknown> }) {
  if (type === "hire_agent") return <HireAgentPayload payload={payload} />;
  if (type === "budget_override_required") return <BudgetOverridePayload payload={payload} />;
  return <CeoStrategyPayload payload={payload} />;
}
