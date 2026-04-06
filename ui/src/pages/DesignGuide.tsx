import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  Bot,
  Check,
  ChevronDown,
  CircleDot,
  Command as CommandIcon,
  DollarSign,
  Hexagon,
  History,
  Inbox,
  LayoutDashboard,
  ListTodo,
  Mail,
  Plus,
  Search,
  Settings,
  Target,
  Trash2,
  Upload,
  User,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { StatusBadge } from "@/components/StatusBadge";
import { StatusIcon } from "@/components/StatusIcon";
import { PriorityIcon } from "@/components/PriorityIcon";
import { agentStatusDot, agentStatusDotDefault } from "@/lib/status-colors";
import { EntityRow } from "@/components/EntityRow";
import { EmptyState } from "@/components/EmptyState";
import { MetricCard } from "@/components/MetricCard";
import { FilterBar, type FilterValue } from "@/components/FilterBar";
import { InlineEditor } from "@/components/InlineEditor";
import { PageSkeleton } from "@/components/PageSkeleton";
import { Identity } from "@/components/Identity";

/* ------------------------------------------------------------------ */
/*  Section wrapper                                                    */
/* ------------------------------------------------------------------ */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
        {title}
      </h3>
      <Separator />
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium">{title}</h4>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Color swatch                                                       */
/* ------------------------------------------------------------------ */

function Swatch({ name, cssVar }: { name: string; cssVar: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-8 w-8 rounded-md border border-border shrink-0"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <div>
        <p className="text-xs font-mono">{cssVar}</p>
        <p className="text-xs text-muted-foreground">{name}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function DesignGuide() {
  const { t } = useTranslation();
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [selectValue, setSelectValue] = useState("in_progress");
  const [menuChecked, setMenuChecked] = useState(true);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [inlineText, setInlineText] = useState("Click to edit this text");
  const [inlineTitle, setInlineTitle] = useState("Editable Title");
  const [inlineDesc, setInlineDesc] = useState(
    "This is an editable description. Click to edit it — the textarea auto-sizes to fit the content without layout shift."
  );
  const [filters, setFilters] = useState<FilterValue[]>([
    { key: "status", label: "Status", value: "Active" },
    { key: "priority", label: "Priority", value: "High" },
  ]);

  return (
    <div className="space-y-10 max-w-4xl">
      {/* Page header */}
      <div>
        <h2 className="text-xl font-bold">{t("pages.designGuide.designGuide")}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t("pages.designGuide.pageSubtitle")}
        </p>
      </div>

      {/* ============================================================ */}
      {/*  COVERAGE                                                     */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.componentCoverage")}>
        <p className="text-sm text-muted-foreground">
          {t("pages.designGuide.componentCoverageDesc")}
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <SubSection title={t("pages.designGuide.uiPrimitives")}>
            <div className="flex flex-wrap gap-2">
              {[
                "avatar", "badge", "breadcrumb", "button", "card", "checkbox", "collapsible",
                "command", "dialog", "dropdown-menu", "input", "label", "popover", "scroll-area",
                "select", "separator", "sheet", "skeleton", "tabs", "textarea", "tooltip",
              ].map((name) => (
                <Badge key={name} variant="outline" className="font-mono text-[10px]">
                  {name}
                </Badge>
              ))}
            </div>
          </SubSection>
          <SubSection title={t("pages.designGuide.appComponents")}>
            <div className="flex flex-wrap gap-2">
              {[
                "StatusBadge", "StatusIcon", "PriorityIcon", "EntityRow", "EmptyState", "MetricCard",
                "FilterBar", "InlineEditor", "PageSkeleton", "Identity", "CommentThread", "MarkdownEditor",
                "PropertiesPanel", "Sidebar", "CommandPalette",
              ].map((name) => (
                <Badge key={name} variant="ghost" className="font-mono text-[10px]">
                  {name}
                </Badge>
              ))}
            </div>
          </SubSection>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  COLORS                                                       */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.colors")}>
        <SubSection title={t("pages.designGuide.core")}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Swatch name="Background" cssVar="--background" />
            <Swatch name="Foreground" cssVar="--foreground" />
            <Swatch name="Card" cssVar="--card" />
            <Swatch name="Primary" cssVar="--primary" />
            <Swatch name="Primary foreground" cssVar="--primary-foreground" />
            <Swatch name="Secondary" cssVar="--secondary" />
            <Swatch name="Muted" cssVar="--muted" />
            <Swatch name="Muted foreground" cssVar="--muted-foreground" />
            <Swatch name="Accent" cssVar="--accent" />
            <Swatch name="Destructive" cssVar="--destructive" />
            <Swatch name="Border" cssVar="--border" />
            <Swatch name="Ring" cssVar="--ring" />
          </div>
        </SubSection>

        <SubSection title={t("pages.designGuide.sidebar")}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Swatch name="Sidebar" cssVar="--sidebar" />
            <Swatch name="Sidebar border" cssVar="--sidebar-border" />
          </div>
        </SubSection>

        <SubSection title={t("pages.designGuide.chart")}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Swatch name="Chart 1" cssVar="--chart-1" />
            <Swatch name="Chart 2" cssVar="--chart-2" />
            <Swatch name="Chart 3" cssVar="--chart-3" />
            <Swatch name="Chart 4" cssVar="--chart-4" />
            <Swatch name="Chart 5" cssVar="--chart-5" />
          </div>
        </SubSection>
      </Section>

      {/* ============================================================ */}
      {/*  TYPOGRAPHY                                                   */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.typography")}>
        <div className="space-y-3">
          <h2 className="text-xl font-bold">{t("pages.designGuide.pageTitleExample")}</h2>
          <h2 className="text-lg font-semibold">{t("pages.designGuide.sectionTitleExample")}</h2>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            {t("pages.designGuide.sectionHeadingExample")}
          </h3>
          <p className="text-sm font-medium">{t("pages.designGuide.cardTitleExample")}</p>
          <p className="text-sm font-semibold">{t("pages.designGuide.cardTitleAltExample")}</p>
          <p className="text-sm">{t("pages.designGuide.bodyTextExample")}</p>
          <p className="text-sm text-muted-foreground">
            {t("pages.designGuide.mutedDescExample")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("pages.designGuide.tinyLabelExample")}
          </p>
          <p className="text-sm font-mono text-muted-foreground">
            {t("pages.designGuide.monoIdExample")}
          </p>
          <p className="text-2xl font-bold">{t("pages.designGuide.largeStatExample")}</p>
          <p className="font-mono text-xs">{t("pages.designGuide.logCodeExample")}</p>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SPACING & RADIUS                                             */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.radius")}>
        <div className="flex items-end gap-4 flex-wrap">
          {[
            ["sm", "var(--radius-sm)"],
            ["md", "var(--radius-md)"],
            ["lg", "var(--radius-lg)"],
            ["xl", "var(--radius-xl)"],
            ["full", "9999px"],
          ].map(([label, radius]) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div
                className="h-12 w-12 bg-primary"
                style={{ borderRadius: radius }}
              />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  BUTTONS                                                      */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.buttons")}>
        <SubSection title={t("pages.designGuide.variants")}>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="default">{t("pages.designGuide.default")}</Button>
            <Button variant="secondary">{t("pages.designGuide.secondary")}</Button>
            <Button variant="outline">{t("pages.designGuide.outline")}</Button>
            <Button variant="ghost">{t("pages.designGuide.ghost")}</Button>
            <Button variant="destructive">{t("pages.designGuide.destructive")}</Button>
            <Button variant="link">{t("pages.designGuide.link")}</Button>
          </div>
        </SubSection>

        <SubSection title={t("pages.designGuide.sizes")}>
          <div className="flex items-center gap-2 flex-wrap">
            <Button size="xs">{t("pages.designGuide.extraSmall")}</Button>
            <Button size="sm">{t("pages.designGuide.small")}</Button>
            <Button size="default">{t("pages.designGuide.defaultSize")}</Button>
            <Button size="lg">{t("pages.designGuide.large")}</Button>
          </div>
        </SubSection>

        <SubSection title={t("pages.designGuide.iconButtons")}>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="ghost" size="icon-xs"><Search /></Button>
            <Button variant="ghost" size="icon-sm"><Search /></Button>
            <Button variant="outline" size="icon"><Search /></Button>
            <Button variant="outline" size="icon-lg"><Search /></Button>
          </div>
        </SubSection>

        <SubSection title={t("pages.designGuide.withIcons")}>
          <div className="flex items-center gap-2 flex-wrap">
            <Button><Plus /> {t("pages.designGuide.newIssue")}</Button>
            <Button variant="outline"><Upload /> {t("pages.designGuide.upload")}</Button>
            <Button variant="destructive"><Trash2 /> {t("pages.designGuide.delete")}</Button>
            <Button size="sm"><Plus /> {t("pages.designGuide.add")}</Button>
          </div>
        </SubSection>

        <SubSection title={t("pages.designGuide.states")}>
          <div className="flex items-center gap-2 flex-wrap">
            <Button disabled>{t("pages.designGuide.disabled")}</Button>
            <Button variant="outline" disabled>{t("pages.designGuide.disabledOutline")}</Button>
          </div>
        </SubSection>
      </Section>

      {/* ============================================================ */}
      {/*  BADGES                                                       */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.badges")}>
        <SubSection title={t("pages.designGuide.variants")}>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="default">{t("pages.designGuide.default")}</Badge>
            <Badge variant="secondary">{t("pages.designGuide.secondary")}</Badge>
            <Badge variant="outline">{t("pages.designGuide.outline")}</Badge>
            <Badge variant="destructive">{t("pages.designGuide.destructive")}</Badge>
            <Badge variant="ghost">{t("pages.designGuide.ghost")}</Badge>
          </div>
        </SubSection>
      </Section>

      {/* ============================================================ */}
      {/*  STATUS BADGES & ICONS                                        */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.statusSystem")}>
        <SubSection title={t("pages.designGuide.statusBadgeAll")}>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              "active", "running", "paused", "idle", "archived", "planned",
              "achieved", "completed", "failed", "timed_out", "succeeded", "error",
              "pending_approval", "backlog", "todo", "in_progress", "in_review", "blocked",
              "done", "terminated", "cancelled", "pending", "revision_requested",
              "approved", "rejected",
            ].map((s) => (
              <StatusBadge key={s} status={s} />
            ))}
          </div>
        </SubSection>

        <SubSection title={t("pages.designGuide.statusIconInteractive")}>
          <div className="flex items-center gap-3 flex-wrap">
            {["backlog", "todo", "in_progress", "in_review", "done", "cancelled", "blocked"].map(
              (s) => (
                <div key={s} className="flex items-center gap-1.5">
                  <StatusIcon status={s} />
                  <span className="text-xs text-muted-foreground">{s}</span>
                </div>
              )
            )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <StatusIcon status={status} onChange={setStatus} />
            <span className="text-sm">{t("pages.designGuide.clickToChangeStatus", { status })}</span>
          </div>
        </SubSection>

        <SubSection title={t("pages.designGuide.priorityIconInteractive")}>
          <div className="flex items-center gap-3 flex-wrap">
            {["critical", "high", "medium", "low"].map((p) => (
              <div key={p} className="flex items-center gap-1.5">
                <PriorityIcon priority={p} />
                <span className="text-xs text-muted-foreground">{p}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <PriorityIcon priority={priority} onChange={setPriority} />
            <span className="text-sm">{t("pages.designGuide.clickToChangePriority", { priority })}</span>
          </div>
        </SubSection>

        <SubSection title={t("pages.designGuide.agentStatusDots")}>
          <div className="flex items-center gap-4 flex-wrap">
            {(["running", "active", "paused", "error", "archived"] as const).map((label) => (
              <div key={label} className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className={`inline-flex h-full w-full rounded-full ${agentStatusDot[label] ?? agentStatusDotDefault}`} />
                </span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t("pages.designGuide.runInvocationBadges")}>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              ["timer", "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"],
              ["assignment", "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300"],
              ["on_demand", "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300"],
              ["automation", "bg-muted text-muted-foreground"],
            ].map(([label, cls]) => (
              <span key={label} className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${cls}`}>
                {label}
              </span>
            ))}
          </div>
        </SubSection>
      </Section>

      {/* ============================================================ */}
      {/*  FORM ELEMENTS                                                */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.formElements")}>
        <div className="grid gap-6 md:grid-cols-2">
          <SubSection title={t("pages.designGuide.input")}>
            <Input placeholder={t("pages.designGuide.defaultInput")} />
            <Input placeholder={t("pages.designGuide.disabledInput")} disabled className="mt-2" />
          </SubSection>

          <SubSection title={t("pages.designGuide.textarea")}>
            <Textarea placeholder={t("pages.designGuide.writeSomething")} />
          </SubSection>

          <SubSection title={t("pages.designGuide.checkboxLabel")}>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox id="check1" defaultChecked />
                <Label htmlFor="check1">{t("pages.designGuide.checkedItem")}</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="check2" />
                <Label htmlFor="check2">{t("pages.designGuide.uncheckedItem")}</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="check3" disabled />
                <Label htmlFor="check3">{t("pages.designGuide.disabledItem")}</Label>
              </div>
            </div>
          </SubSection>

          <SubSection title={t("pages.designGuide.inlineEditor")}>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t("pages.designGuide.titleSingleLine")}</p>
                <InlineEditor
                  value={inlineTitle}
                  onSave={setInlineTitle}
                  as="h2"
                  className="text-xl font-bold"
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t("pages.designGuide.bodyTextSingleLine")}</p>
                <InlineEditor
                  value={inlineText}
                  onSave={setInlineText}
                  as="p"
                  className="text-sm"
                />
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t("pages.designGuide.descriptionMultiline")}</p>
                <InlineEditor
                  value={inlineDesc}
                  onSave={setInlineDesc}
                  as="p"
                  className="text-sm text-muted-foreground"
                  placeholder={t("pages.designGuide.addDescription")}
                  multiline
                />
              </div>
            </div>
          </SubSection>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SELECT                                                       */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.select")}>
        <div className="grid gap-6 md:grid-cols-2">
          <SubSection title={t("pages.designGuide.defaultSizeSelect")}>
            <Select value={selectValue} onValueChange={setSelectValue}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("pages.designGuide.selectStatus")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="backlog">{t("pages.designGuide.backlog")}</SelectItem>
                <SelectItem value="todo">{t("pages.designGuide.todo")}</SelectItem>
                <SelectItem value="in_progress">{t("pages.designGuide.inProgress")}</SelectItem>
                <SelectItem value="in_review">{t("pages.designGuide.inReview")}</SelectItem>
                <SelectItem value="done">{t("pages.designGuide.done")}</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">{t("pages.designGuide.currentValue", { value: selectValue })}</p>
          </SubSection>
          <SubSection title={t("pages.designGuide.smallTrigger")}>
            <Select defaultValue="high">
              <SelectTrigger size="sm" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">{t("pages.designGuide.critical")}</SelectItem>
                <SelectItem value="high">{t("pages.designGuide.high")}</SelectItem>
                <SelectItem value="medium">{t("pages.designGuide.medium")}</SelectItem>
                <SelectItem value="low">{t("pages.designGuide.low")}</SelectItem>
              </SelectContent>
            </Select>
          </SubSection>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  DROPDOWN MENU                                                */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.dropdownMenu")}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {t("pages.designGuide.quickActions")}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem>
              <Check className="h-4 w-4" />
              {t("pages.designGuide.markAsDone")}
              <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BookOpen className="h-4 w-4" />
              {t("pages.designGuide.openDocs")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={menuChecked}
              onCheckedChange={(value) => setMenuChecked(value === true)}
            >
              {t("pages.designGuide.watchIssue")}
            </DropdownMenuCheckboxItem>
            <DropdownMenuItem variant="destructive">
              <Trash2 className="h-4 w-4" />
              {t("pages.designGuide.deleteIssue")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      {/* ============================================================ */}
      {/*  POPOVER                                                      */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.popover")}>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">{t("pages.designGuide.openPopover")}</Button>
          </PopoverTrigger>
          <PopoverContent className="space-y-2">
            <p className="text-sm font-medium">{t("pages.designGuide.agentHeartbeat")}</p>
            <p className="text-xs text-muted-foreground">
              Last run succeeded 24s ago. Next timer run in 9m.
            </p>
            <Button size="xs">{t("pages.designGuide.wakeNow")}</Button>
          </PopoverContent>
        </Popover>
      </Section>

      {/* ============================================================ */}
      {/*  COLLAPSIBLE                                                  */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.collapsible")}>
        <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen} className="space-y-2">
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm">
              {collapsibleOpen ? t("pages.designGuide.hide") : t("pages.designGuide.show")} {t("pages.designGuide.advancedFilters")}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="rounded-md border border-border p-3">
            <div className="space-y-2">
              <Label htmlFor="owner-filter">{t("pages.designGuide.owner")}</Label>
              <Input id="owner-filter" placeholder={t("pages.designGuide.filterByAgentName")} />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Section>

      {/* ============================================================ */}
      {/*  SHEET                                                        */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.sheet")}>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">{t("pages.designGuide.openSidePanel")}</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{t("pages.designGuide.issueProperties")}</SheetTitle>
              <SheetDescription>{t("pages.designGuide.editMetadataDesc")}</SheetDescription>
            </SheetHeader>
            <div className="space-y-4 px-4">
              <div className="space-y-1">
                <Label htmlFor="sheet-title">{t("pages.designGuide.title")}</Label>
                <Input id="sheet-title" defaultValue={t("pages.designGuide.improveOnboardingDocs")} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="sheet-description">{t("pages.designGuide.description")}</Label>
                <Textarea id="sheet-description" defaultValue={t("pages.designGuide.captureSetupPitfalls")} />
              </div>
            </div>
            <SheetFooter>
              <Button variant="outline">{t("pages.designGuide.cancel")}</Button>
              <Button>{t("pages.designGuide.save")}</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Section>

      {/* ============================================================ */}
      {/*  SCROLL AREA                                                  */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.scrollArea")}>
        <ScrollArea className="h-36 rounded-md border border-border">
          <div className="space-y-2 p-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-md border border-border p-2 text-sm">
                {t("pages.designGuide.heartbeatRun", { n: i + 1 })}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Section>

      {/* ============================================================ */}
      {/*  COMMAND                                                      */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.command")}>
        <div className="rounded-md border border-border">
          <Command>
            <CommandInput placeholder={t("pages.designGuide.typeCommandOrSearch")} />
            <CommandList>
              <CommandEmpty>{t("pages.designGuide.noResults")}</CommandEmpty>
              <CommandGroup heading={t("pages.designGuide.pages")}>
                <CommandItem>
                  <LayoutDashboard className="h-4 w-4" />
                  {t("pages.designGuide.dashboard")}
                </CommandItem>
                <CommandItem>
                  <CircleDot className="h-4 w-4" />
                  {t("pages.designGuide.issues")}
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading={t("pages.designGuide.actions")}>
                <CommandItem>
                  <CommandIcon className="h-4 w-4" />
                  {t("pages.designGuide.openCommandPalette")}
                </CommandItem>
                <CommandItem>
                  <Plus className="h-4 w-4" />
                  {t("pages.designGuide.createNewIssue")}
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  BREADCRUMB                                                   */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.breadcrumb")}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{t("pages.designGuide.projects")}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{t("pages.designGuide.paperclipApp")}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t("pages.designGuide.issueList")}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Section>

      {/* ============================================================ */}
      {/*  CARDS                                                        */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.cards")}>
        <SubSection title={t("pages.designGuide.standardCard")}>
          <Card>
            <CardHeader>
              <CardTitle>{t("pages.designGuide.cardTitle")}</CardTitle>
              <CardDescription>{t("pages.designGuide.cardDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{t("pages.designGuide.cardContent")}</p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">{t("pages.designGuide.action")}</Button>
              <Button variant="outline" size="sm">{t("pages.designGuide.cancelSm")}</Button>
            </CardFooter>
          </Card>
        </SubSection>

        <SubSection title={t("pages.designGuide.metricCards")}>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            <MetricCard icon={Bot} value={12} label={t("pages.designGuide.activeAgents")} description={t("pages.designGuide.plus3ThisWeek")} />
            <MetricCard icon={CircleDot} value={48} label={t("pages.designGuide.openIssues")} />
            <MetricCard icon={DollarSign} value="$1,234" label={t("pages.designGuide.monthlyCost")} description={t("pages.designGuide.underBudget")} />
            <MetricCard icon={Zap} value="99.9%" label={t("pages.designGuide.uptime")} />
          </div>
        </SubSection>
      </Section>

      {/* ============================================================ */}
      {/*  TABS                                                         */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.tabs")}>
        <SubSection title={t("pages.designGuide.defaultPill")}>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">{t("pages.designGuide.overview")}</TabsTrigger>
              <TabsTrigger value="runs">{t("pages.designGuide.runs")}</TabsTrigger>
              <TabsTrigger value="config">{t("pages.designGuide.config")}</TabsTrigger>
              <TabsTrigger value="costs">{t("pages.designGuide.costs")}</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p className="text-sm text-muted-foreground py-4">{t("pages.designGuide.overviewTabContent")}</p>
            </TabsContent>
            <TabsContent value="runs">
              <p className="text-sm text-muted-foreground py-4">{t("pages.designGuide.runsTabContent")}</p>
            </TabsContent>
            <TabsContent value="config">
              <p className="text-sm text-muted-foreground py-4">{t("pages.designGuide.configTabContent")}</p>
            </TabsContent>
            <TabsContent value="costs">
              <p className="text-sm text-muted-foreground py-4">{t("pages.designGuide.costsTabContent")}</p>
            </TabsContent>
          </Tabs>
        </SubSection>

        <SubSection title={t("pages.designGuide.lineVariant")}>
          <Tabs defaultValue="summary">
            <TabsList variant="line">
              <TabsTrigger value="summary">{t("pages.designGuide.summary")}</TabsTrigger>
              <TabsTrigger value="details">{t("pages.designGuide.details")}</TabsTrigger>
              <TabsTrigger value="comments">{t("pages.designGuide.comments")}</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
              <p className="text-sm text-muted-foreground py-4">{t("pages.designGuide.summaryContent")}</p>
            </TabsContent>
            <TabsContent value="details">
              <p className="text-sm text-muted-foreground py-4">{t("pages.designGuide.detailsContent")}</p>
            </TabsContent>
            <TabsContent value="comments">
              <p className="text-sm text-muted-foreground py-4">{t("pages.designGuide.commentsContent")}</p>
            </TabsContent>
          </Tabs>
        </SubSection>
      </Section>

      {/* ============================================================ */}
      {/*  ENTITY ROWS                                                  */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.entityRows")}>
        <div className="border border-border rounded-md">
          <EntityRow
            leading={
              <>
                <StatusIcon status="in_progress" />
                <PriorityIcon priority="high" />
              </>
            }
            identifier="PAP-001"
            title={t("pages.designGuide.implAuthFlow")}
            subtitle={t("pages.designGuide.assignedToAgentAlpha")}
            trailing={<StatusBadge status="in_progress" />}
            onClick={() => {}}
          />
          <EntityRow
            leading={
              <>
                <StatusIcon status="done" />
                <PriorityIcon priority="medium" />
              </>
            }
            identifier="PAP-002"
            title={t("pages.designGuide.setUpCicd")}
            subtitle={t("pages.designGuide.completed2Days")}
            trailing={<StatusBadge status="done" />}
            onClick={() => {}}
          />
          <EntityRow
            leading={
              <>
                <StatusIcon status="todo" />
                <PriorityIcon priority="low" />
              </>
            }
            identifier="PAP-003"
            title={t("pages.designGuide.writeApiDocs")}
            trailing={<StatusBadge status="todo" />}
            onClick={() => {}}
          />
          <EntityRow
            leading={
              <>
                <StatusIcon status="blocked" />
                <PriorityIcon priority="critical" />
              </>
            }
            identifier="PAP-004"
            title={t("pages.designGuide.deployToProd")}
            subtitle={t("pages.designGuide.blockedBy001")}
            trailing={<StatusBadge status="blocked" />}
            selected
          />
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  FILTER BAR                                                   */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.filterBar")}>
        <FilterBar
          filters={filters}
          onRemove={(key) => setFilters((f) => f.filter((x) => x.key !== key))}
          onClear={() => setFilters([])}
        />
        {filters.length === 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setFilters([
                { key: "status", label: "Status", value: "Active" },
                { key: "priority", label: "Priority", value: "High" },
              ])
            }
          >
            {t("pages.designGuide.resetFilters")}
          </Button>
        )}
      </Section>

      {/* ============================================================ */}
      {/*  AVATARS                                                      */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.avatars")}>
        <SubSection title={t("pages.designGuide.sizes")}>
          <div className="flex items-center gap-3">
            <Avatar size="sm"><AvatarFallback>SM</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>DF</AvatarFallback></Avatar>
            <Avatar size="lg"><AvatarFallback>LG</AvatarFallback></Avatar>
          </div>
        </SubSection>

        <SubSection title={t("pages.designGuide.group")}>
          <AvatarGroup>
            <Avatar><AvatarFallback>A1</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>A2</AvatarFallback></Avatar>
            <Avatar><AvatarFallback>A3</AvatarFallback></Avatar>
            <AvatarGroupCount>+5</AvatarGroupCount>
          </AvatarGroup>
        </SubSection>
      </Section>

      {/* ============================================================ */}
      {/*  IDENTITY                                                     */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.identity")}>
        <SubSection title={t("pages.designGuide.sizes")}>
          <div className="flex items-center gap-6">
            <Identity name="Agent Alpha" size="sm" />
            <Identity name="Agent Alpha" />
            <Identity name="Agent Alpha" size="lg" />
          </div>
        </SubSection>

        <SubSection title={t("pages.designGuide.initialsDerivation")}>
          <div className="flex flex-col gap-2">
            <Identity name="CEO Agent" size="sm" />
            <Identity name="Alpha" size="sm" />
            <Identity name="Quality Assurance Lead" size="sm" />
          </div>
        </SubSection>

        <SubSection title={t("pages.designGuide.customInitials")}>
          <Identity name="Backend Service" initials="BS" size="sm" />
        </SubSection>
      </Section>

      {/* ============================================================ */}
      {/*  TOOLTIPS                                                     */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.tooltips")}>
        <div className="flex items-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm">{t("pages.designGuide.hoverMe")}</Button>
            </TooltipTrigger>
            <TooltipContent>{t("pages.designGuide.thisIsATooltip")}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon-sm"><Settings /></Button>
            </TooltipTrigger>
            <TooltipContent>{t("pages.designGuide.settings")}</TooltipContent>
          </Tooltip>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  DIALOG                                                       */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.dialog")}>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">{t("pages.designGuide.openDialog")}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t("pages.designGuide.dialogTitle")}</DialogTitle>
              <DialogDescription>
                {t("pages.designGuide.dialogSampleDesc")}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>{t("pages.designGuide.name")}</Label>
                <Input placeholder={t("pages.designGuide.enterAName")} className="mt-1.5" />
              </div>
              <div>
                <Label>{t("pages.designGuide.description")}</Label>
                <Textarea placeholder={t("pages.designGuide.describe")} className="mt-1.5" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">{t("pages.designGuide.cancel")}</Button>
              <Button>{t("pages.designGuide.save")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      {/* ============================================================ */}
      {/*  EMPTY STATE                                                  */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.emptyState")}>
        <div className="border border-border rounded-md">
          <EmptyState
            icon={Inbox}
            message={t("pages.designGuide.noItemsMessage")}
            action={t("pages.designGuide.createItem")}
            onAction={() => {}}
          />
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  PROGRESS BARS                                                */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.progressBars")}>
        <div className="space-y-3">
          {[
            { label: t("pages.designGuide.underBudget40"), pct: 40, color: "bg-green-400" },
            { label: t("pages.designGuide.warning75"), pct: 75, color: "bg-yellow-400" },
            { label: t("pages.designGuide.overBudget95"), pct: 95, color: "bg-red-400" },
          ].map(({ label, pct, color }) => (
            <div key={label} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="text-xs font-mono">{pct}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-[width,background-color] duration-150 ${color}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  LOG VIEWER                                                   */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.logViewer")}>
        <div className="bg-neutral-950 rounded-lg p-3 font-mono text-xs max-h-80 overflow-y-auto">
          <div className="text-foreground">{t("pages.designGuide.agentStarted")}</div>
          <div className="text-foreground">{t("pages.designGuide.processingTask")}</div>
          <div className="text-yellow-400">{t("pages.designGuide.rateLimitWarning")}</div>
          <div className="text-foreground">{t("pages.designGuide.taskCompleted")}</div>
          <div className="text-red-400">{t("pages.designGuide.connectionTimeout")}</div>
          <div className="text-blue-300">{t("pages.designGuide.retryingConnection")}</div>
          <div className="text-foreground">{t("pages.designGuide.reconnected")}</div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 animate-pulse" />
              <span className="inline-flex h-full w-full rounded-full bg-cyan-400" />
            </span>
            <span className="text-cyan-400">{t("pages.designGuide.live")}</span>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  PROPERTY ROW PATTERN                                         */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.propertyRowPattern")}>
        <div className="border border-border rounded-md p-4 space-y-1 max-w-sm">
          <div className="flex items-center justify-between py-1.5">
            <span className="text-xs text-muted-foreground">{t("pages.designGuide.status")}</span>
            <StatusBadge status="active" />
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-xs text-muted-foreground">{t("pages.designGuide.priority")}</span>
            <PriorityIcon priority="high" />
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-xs text-muted-foreground">{t("pages.designGuide.assignee")}</span>
            <div className="flex items-center gap-1.5">
              <Avatar size="sm"><AvatarFallback>A</AvatarFallback></Avatar>
              <span className="text-xs">{t("pages.designGuide.agentAlpha")}</span>
            </div>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-xs text-muted-foreground">{t("pages.designGuide.created")}</span>
            <span className="text-xs">{t("pages.designGuide.jan152025")}</span>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  NAVIGATION PATTERNS                                          */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.navigationPatterns")}>
        <SubSection title={t("pages.designGuide.sidebarNavItems")}>
          <div className="w-60 border border-border rounded-md p-3 space-y-0.5 bg-card">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-accent text-accent-foreground">
              <LayoutDashboard className="h-4 w-4" />
              {t("pages.designGuide.dashboard")}
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground cursor-pointer">
              <CircleDot className="h-4 w-4" />
              {t("pages.designGuide.issues")}
              <span className="ml-auto text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">
                12
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground cursor-pointer">
              <Bot className="h-4 w-4" />
              {t("pages.designGuide.agents")}
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground cursor-pointer">
              <Hexagon className="h-4 w-4" />
              {t("pages.designGuide.projects")}
            </div>
          </div>
        </SubSection>

        <SubSection title={t("pages.designGuide.viewToggle")}>
          <div className="flex items-center border border-border rounded-md w-fit">
            <button className="px-3 py-1.5 text-xs font-medium bg-accent text-foreground rounded-l-md">
              <ListTodo className="h-3.5 w-3.5 inline mr-1" />
              {t("pages.designGuide.list")}
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-accent/50 rounded-r-md">
              <Target className="h-3.5 w-3.5 inline mr-1" />
              {t("pages.designGuide.org")}
            </button>
          </div>
        </SubSection>
      </Section>

      {/* ============================================================ */}
      {/*  GROUPED LIST (Issues pattern)                                */}
      {/* ============================================================ */}
      <Section title={t("pages.designGuide.groupedList")}>
        <div>
          <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-t-md">
            <StatusIcon status="in_progress" />
            <span className="text-sm font-medium">{t("pages.designGuide.inProgressGroup")}</span>
            <span className="text-xs text-muted-foreground ml-1">{2}</span>
          </div>
          <div className="border border-border rounded-b-md">
            <EntityRow
              leading={<PriorityIcon priority="high" />}
              identifier="PAP-101"
              title="Build agent heartbeat system"
              onClick={() => {}}
            />
            <EntityRow
              leading={<PriorityIcon priority="medium" />}
              identifier="PAP-102"
              title="Add cost tracking dashboard"
              onClick={() => {}}
            />
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  COMMENT THREAD PATTERN                                       */}
      {/* ============================================================ */}
      <Section title="Comment Thread Pattern">
        <div className="space-y-3 max-w-2xl">
          <h3 className="text-sm font-semibold">Comments (2)</h3>
          <div className="space-y-3">
            <div className="rounded-md border border-border p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-muted-foreground">Agent</span>
                <span className="text-xs text-muted-foreground">Jan 15, 2025</span>
              </div>
              <p className="text-sm">Started working on the authentication module. Will need API keys configured.</p>
            </div>
            <div className="rounded-md border border-border p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-muted-foreground">Human</span>
                <span className="text-xs text-muted-foreground">Jan 16, 2025</span>
              </div>
              <p className="text-sm">API keys have been added to the vault. Please proceed.</p>
            </div>
          </div>
          <div className="space-y-2">
            <Textarea placeholder="Leave a comment..." rows={3} />
            <Button size="sm">Comment</Button>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  COST TABLE PATTERN                                           */}
      {/* ============================================================ */}
      <Section title="Cost Table Pattern">
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-xs">
            <thead className="border-b border-border bg-accent/20">
              <tr>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">Model</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">Tokens</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-3 py-2">claude-sonnet-4-20250514</td>
                <td className="px-3 py-2 font-mono">1.2M</td>
                <td className="px-3 py-2 font-mono">$18.00</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-3 py-2">claude-haiku-4-20250506</td>
                <td className="px-3 py-2 font-mono">500k</td>
                <td className="px-3 py-2 font-mono">$1.25</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Total</td>
                <td className="px-3 py-2 font-mono">1.7M</td>
                <td className="px-3 py-2 font-mono font-medium">$19.25</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SKELETONS                                                    */}
      {/* ============================================================ */}
      <Section title="Skeletons">
        <SubSection title="Individual">
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-8 w-full max-w-sm" />
            <Skeleton className="h-20 w-full" />
          </div>
        </SubSection>

        <SubSection title="Page Skeleton (list)">
          <div className="border border-border rounded-md p-4">
            <PageSkeleton variant="list" />
          </div>
        </SubSection>

        <SubSection title="Page Skeleton (detail)">
          <div className="border border-border rounded-md p-4">
            <PageSkeleton variant="detail" />
          </div>
        </SubSection>
      </Section>

      {/* ============================================================ */}
      {/*  SEPARATOR                                                    */}
      {/* ============================================================ */}
      <Section title="Separator">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Horizontal</p>
          <Separator />
          <div className="flex items-center gap-4 h-8">
            <span className="text-sm">Left</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Right</span>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  ICON REFERENCE                                               */}
      {/* ============================================================ */}
      <Section title="Common Icons (Lucide)">
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
          {[
            ["Inbox", Inbox],
            ["ListTodo", ListTodo],
            ["CircleDot", CircleDot],
            ["Hexagon", Hexagon],
            ["Target", Target],
            ["LayoutDashboard", LayoutDashboard],
            ["Bot", Bot],
            ["DollarSign", DollarSign],
            ["History", History],
            ["Search", Search],
            ["Plus", Plus],
            ["Trash2", Trash2],
            ["Settings", Settings],
            ["User", User],
            ["Mail", Mail],
            ["Upload", Upload],
            ["Zap", Zap],
          ].map(([name, Icon]) => {
            const LucideIcon = Icon as React.FC<{ className?: string }>;
            return (
              <div key={name as string} className="flex flex-col items-center gap-1.5 p-2">
                <LucideIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground font-mono">{name as string}</span>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  KEYBOARD SHORTCUTS                                           */}
      {/* ============================================================ */}
      <Section title="Keyboard Shortcuts">
        <div className="border border-border rounded-md divide-y divide-border text-sm">
          {[
            ["Cmd+K / Ctrl+K", "Open Command Palette"],
            ["C", "New Issue (outside inputs)"],
            ["[", "Toggle Sidebar"],
            ["]", "Toggle Properties Panel"],

            ["Cmd+Enter / Ctrl+Enter", "Submit markdown comment"],
          ].map(([key, desc]) => (
            <div key={key} className="flex items-center justify-between px-4 py-2">
              <span className="text-muted-foreground">{desc}</span>
              <kbd className="px-2 py-0.5 text-xs font-mono bg-muted rounded border border-border">
                {key}
              </kbd>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
