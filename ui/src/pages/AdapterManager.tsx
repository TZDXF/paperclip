/**
 * @fileoverview Adapter Manager page — install, view, and manage external adapters.
 *
 * Adapters are simpler than plugins: no workers, no events, no manifests.
 * They just register a ServerAdapterModule that provides model discovery and execution.
 */
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, Cpu, Plus, Power, Trash2, FolderOpen, Package, RefreshCw, Download } from "lucide-react";
import { useCompany } from "@/context/CompanyContext";
import { useBreadcrumbs } from "@/context/BreadcrumbContext";
import { adaptersApi } from "@/api/adapters";
import type { AdapterInfo } from "@/api/adapters";
import { getAdapterLabel } from "@/adapters/adapter-display-registry";
import { queryKeys } from "@/lib/queryKeys";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/utils";
import { ChoosePathButton } from "@/components/PathInstructionsModal";
import { invalidateDynamicParser } from "@/adapters/dynamic-loader";
import { invalidateConfigSchemaCache } from "@/adapters/schema-config-fields";
import { useTranslation } from "react-i18next";

function AdapterRow({
  adapter,
  canRemove,
  onToggle,
  onRemove,
  onReload,
  onReinstall,
  isToggling,
  isReloading,
  isReinstalling,
  overriddenBy,
  toggleTitleEnabled,
  toggleTitleDisabled,
  disabledBadgeLabel,
  labels,
}: {
  adapter: AdapterInfo;
  canRemove: boolean;
  onToggle: (type: string, disabled: boolean) => void;
  onRemove: (type: string) => void;
  onReload?: (type: string) => void;
  onReinstall?: (type: string) => void;
  isToggling: boolean;
  isReloading?: boolean;
  isReinstalling?: boolean;
  overriddenBy?: string;
  toggleTitleEnabled?: string;
  toggleTitleDisabled?: string;
  disabledBadgeLabel?: string;
  labels: {
    external: string;
    builtin: string;
    installedFromNpm: string;
    installedFromLocalPath: string;
    overridesBuiltin: string;
    hiddenFromMenus: string;
    reinstallAdapter: string;
    reloadAdapter: string;
    showInAgentMenus: string;
    hideFromAgentMenus: string;
    removeAdapter: string;
    modelsCount: string;
  };
}) {
  return (
    <li>
      <div className="flex items-center gap-4 px-4 py-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn("font-medium", adapter.disabled && "text-muted-foreground line-through")}>
              {adapter.label || getAdapterLabel(adapter.type)}
            </span>
            <Badge variant="outline">{adapter.source === "external" ? labels.external : labels.builtin}</Badge>
            {adapter.source === "external" && (
              adapter.isLocalPath
                ? <span title={labels.installedFromLocalPath}><FolderOpen className="h-4 w-4 text-amber-500" /></span>
                : <span title={labels.installedFromNpm}><Package className="h-4 w-4 text-red-500" /></span>
            )}
            {adapter.version && (
              <Badge variant="secondary" className="font-mono text-[10px]">
                v{adapter.version}
              </Badge>
            )}
            {adapter.overriddenBuiltin && (
              <Badge variant="secondary" className="text-blue-600 border-blue-400">
                {labels.overridesBuiltin}
              </Badge>
            )}
            {overriddenBy && (
              <Badge variant="secondary" className="text-blue-600 border-blue-400">
                {overriddenBy}
              </Badge>
            )}
            {adapter.disabled && (
              <Badge variant="secondary" className="text-amber-600 border-amber-400">
                {disabledBadgeLabel ?? labels.hiddenFromMenus}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {adapter.type}
            {adapter.packageName && adapter.packageName !== adapter.type && (
              <> · {adapter.packageName}</>
            )}
            {" · "}{adapter.modelsCount} {labels.modelsCount}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {onReinstall && (
            <Button
              variant="outline"
              size="icon-sm"
              className="h-8 w-8"
              title={labels.reinstallAdapter}
              disabled={isReinstalling}
              onClick={() => onReinstall(adapter.type)}
            >
              <Download className={cn("h-4 w-4", isReinstalling && "animate-bounce")} />
            </Button>
          )}
          {onReload && (
            <Button
              variant="outline"
              size="icon-sm"
              className="h-8 w-8"
              title={labels.reloadAdapter}
              disabled={isReloading}
              onClick={() => onReload(adapter.type)}
            >
              <RefreshCw className={cn("h-4 w-4", isReloading && "animate-spin")} />
            </Button>
          )}
          <Button
            variant="outline"
            size="icon-sm"
            className="h-8 w-8"
            title={adapter.disabled
              ? (toggleTitleEnabled ?? labels.showInAgentMenus)
              : (toggleTitleDisabled ?? labels.hideFromAgentMenus)}
            disabled={isToggling}
            onClick={() => onToggle(adapter.type, !adapter.disabled)}
          >
            <Power className={cn("h-4 w-4", !adapter.disabled ? "text-green-600" : "text-muted-foreground")} />
          </Button>
          {canRemove && (
            <Button
              variant="outline"
              size="icon-sm"
              className="h-8 w-8 text-destructive hover:text-destructive"
              title={labels.removeAdapter}
              onClick={() => onRemove(adapter.type)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

function fetchNpmLatestVersion(packageName: string): Promise<string | null> {
  return fetch(`https://registry.npmjs.org/${encodeURIComponent(packageName)}/latest`, {
    signal: AbortSignal.timeout(5000),
  })
    .then((res) => res.json())
    .then((data) => (typeof data?.version === "string" ? (data.version as string) : null))
    .catch(() => null);
}

function ReinstallDialog({
  adapter,
  open,
  isReinstalling,
  onConfirm,
  onCancel,
  t,
  labels,
}: {
  adapter: AdapterInfo | null;
  open: boolean;
  isReinstalling: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  t: (key: string, opts?: Record<string, unknown>) => string;
  labels: {
    reinstallAdapterTitle: string;
    reinstallAdapterBody: string;
    package: string;
    current: string;
    latestOnNpm: string;
    checking: string;
    unavailable: string;
    alreadyOnLatest: string;
    cancel: string;
    reinstalling: string;
    reinstall: string;
  };
}) {
  const { data: latestVersion, isLoading: isFetchingVersion } = useQuery({
    queryKey: ["npm-latest-version", adapter?.packageName],
    queryFn: () => {
      if (!adapter?.packageName) return null;
      return fetchNpmLatestVersion(adapter.packageName);
    },
    enabled: open && !!adapter?.packageName,
    staleTime: 60_000,
  });

  const isUpToDate = adapter?.version && latestVersion && adapter.version === latestVersion;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onCancel(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{labels.reinstallAdapterTitle}</DialogTitle>
          <DialogDescription>
            {labels.reinstallAdapterBody.replace("{{packageName}}", adapter?.packageName ?? "")}
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-md border bg-muted/50 px-4 py-3 text-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{labels.package}</span>
            <span className="font-mono">{adapter?.packageName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{labels.current}</span>
            <span className="font-mono">
              {adapter?.version ? `v${adapter.version}` : labels.unavailable}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">{labels.latestOnNpm}</span>
            <span className="font-mono">
              {isFetchingVersion
                ? labels.checking
                : latestVersion
                  ? `v${latestVersion}`
                  : labels.unavailable}
            </span>
          </div>
          {isUpToDate && (
            <p className="text-xs text-muted-foreground pt-1">
              {labels.alreadyOnLatest}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel} disabled={isReinstalling}>
            {labels.cancel}
          </Button>
          <Button disabled={isReinstalling} onClick={onConfirm}>
            {isReinstalling ? labels.reinstalling : labels.reinstall}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AdapterManager() {
  const { selectedCompany } = useCompany();
  const { setBreadcrumbs } = useBreadcrumbs();
  const queryClient = useQueryClient();
  const { pushToast } = useToast();
  const { t } = useTranslation("pages");

  const [installPackage, setInstallPackage] = useState("");
  const [installVersion, setInstallVersion] = useState("");
  const [isLocalPath, setIsLocalPath] = useState(false);
  const [installDialogOpen, setInstallDialogOpen] = useState(false);
  const [removeType, setRemoveType] = useState<string | null>(null);
  const [reinstallTarget, setReinstallTarget] = useState<AdapterInfo | null>(null);

  const labels = {
    externalAdapters: t("pages:adapterManager.externalAdapters"),
    builtinAdapters: t("pages:adapterManager.builtinAdapters"),
    noExternalAdapters: t("pages:adapterManager.noExternalAdapters"),
    noExternalAdaptersDesc: t("pages:adapterManager.noExternalAdaptersDesc"),
    noBuiltinAdapters: t("pages:adapterManager.noBuiltinAdapters"),
    adapters: t("pages:adapterManager.adapters"),
    alpha: t("pages:adapterManager.alpha"),
    installAdapter: t("pages:adapterManager.installAdapter"),
    installExternalAdapter: t("pages:adapterManager.installExternalAdapter"),
    installAdapterDescription: t("pages:adapterManager.installAdapterDescription"),
    npmPackage: t("pages:adapterManager.npmPackage"),
    localPath: t("pages:adapterManager.localPath"),
    pathToAdapterPackage: t("pages:adapterManager.pathToAdapterPackage"),
    pathToAdapterPackageNote: t("pages:adapterManager.pathToAdapterPackageNote"),
    packageName: t("pages:adapterManager.packageName"),
    version: t("pages:adapterManager.versionOptional"),
    versionOptional: t("pages:adapterManager.versionOptional"),
    cancel: t("pages:adapterManager.cancel"),
    installing: t("pages:adapterManager.installing"),
    install: t("pages:adapterManager.install"),
    alphaNoticeTitle: t("pages:adapterManager.alphaNoticeTitle"),
    alphaNoticeBody: t("pages:adapterManager.alphaNoticeBody"),
    removeAdapterTitle: t("pages:adapterManager.removeAdapterTitle"),
    remove: t("pages:adapterManager.remove"),
    removing: t("pages:adapterManager.removing"),
    pauseExternalOverride: t("pages:adapterManager.pauseExternalOverride"),
    resumeExternalOverride: t("pages:adapterManager.resumeExternalOverride"),
    loadingAdapters: t("pages:adapterManager.loadingAdapters"),
    reinstallAdapterTitle: t("pages:adapterManager.reinstallAdapterTitle"),
    reinstallAdapterBody: t("pages:adapterManager.reinstallAdapterDescription"),
    package: t("pages:adapterManager.package"),
    current: t("pages:adapterManager.current"),
    latestOnNpm: t("pages:adapterManager.latestOnNpm"),
    checking: t("pages:adapterManager.checking"),
    unavailable: t("pages:adapterManager.unavailable"),
    alreadyOnLatest: t("pages:adapterManager.alreadyOnLatest"),
    reinstalling: t("pages:adapterManager.reinstalling"),
    reinstall: t("pages:adapterManager.reinstall"),
  };

  const adapterRowLabels = {
    external: t("pages:adapterManager.external"),
    builtin: t("pages:adapterManager.builtin"),
    installedFromNpm: t("pages:adapterManager.installedFromNpm"),
    installedFromLocalPath: t("pages:adapterManager.installedFromLocalPath"),
    overridesBuiltin: t("pages:adapterManager.overridesBuiltin"),
    hiddenFromMenus: t("pages:adapterManager.hiddenFromMenus"),
    reinstallAdapter: t("pages:adapterManager.reinstallAdapter"),
    reloadAdapter: t("pages:adapterManager.reloadAdapter"),
    showInAgentMenus: t("pages:adapterManager.showInAgentMenus"),
    hideFromAgentMenus: t("pages:adapterManager.hideFromAgentMenus"),
    removeAdapter: t("pages:adapterManager.removeAdapter"),
    modelsCount: t("pages:adapterManager.modelsCount", { count: 0 }).replace("0", "{{count}}"),
  };

  useEffect(() => {
    setBreadcrumbs([
      { label: selectedCompany?.name ?? t("common:company"), href: "/dashboard" },
      { label: t("common:settings"), href: "/instance/settings/general" },
      { label: labels.adapters },
    ]);
  }, [selectedCompany?.name, setBreadcrumbs, t, labels.adapters]);

  const { data: adapters, isLoading } = useQuery({
    queryKey: queryKeys.adapters.all,
    queryFn: () => adaptersApi.list(),
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.adapters.all });
  };

  const installMutation = useMutation({
    mutationFn: (params: { packageName: string; version?: string; isLocalPath?: boolean }) =>
      adaptersApi.install(params),
    onSuccess: (result) => {
      invalidate();
      setInstallDialogOpen(false);
      setInstallPackage("");
      setInstallVersion("");
      setIsLocalPath(false);
      pushToast({
        title: t("pages:adapterManager.adapterInstalled"),
        body: t("pages:adapterManager.adapterRegistered", {
          type: result.type,
          version: result.version ? ` (v${result.version})` : "",
        }),
        tone: "success",
      });
    },
    onError: (err: Error) => {
      pushToast({
        title: t("pages:adapterManager.installFailed"),
        body: err.message,
        tone: "error",
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (type: string) => adaptersApi.remove(type),
    onSuccess: () => {
      invalidate();
      pushToast({ title: t("pages:adapterManager.adapterRemoved"), tone: "success" });
    },
    onError: (err: Error) => {
      pushToast({
        title: t("pages:adapterManager.removalFailed"),
        body: err.message,
        tone: "error",
      });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ type, disabled }: { type: string; disabled: boolean }) =>
      adaptersApi.setDisabled(type, disabled),
    onSuccess: () => {
      invalidate();
    },
    onError: (err: Error) => {
      pushToast({
        title: t("pages:adapterManager.toggleFailed"),
        body: err.message,
        tone: "error",
      });
    },
  });

  const overrideMutation = useMutation({
    mutationFn: ({ type, paused }: { type: string; paused: boolean }) =>
      adaptersApi.setOverridePaused(type, paused),
    onSuccess: () => {
      invalidate();
    },
    onError: (err: Error) => {
      pushToast({
        title: t("pages:adapterManager.overrideToggleFailed"),
        body: err.message,
        tone: "error",
      });
    },
  });

  const reloadMutation = useMutation({
    mutationFn: (type: string) => adaptersApi.reload(type),
    onSuccess: (result) => {
      invalidate();
      invalidateDynamicParser(result.type);
      invalidateConfigSchemaCache(result.type);
      pushToast({
        title: t("pages:adapterManager.adapterReloaded"),
        body: t("pages:adapterManager.adapterReloadedDetail", {
          type: result.type,
          version: result.version ? ` (v${result.version})` : "",
        }),
        tone: "success",
      });
    },
    onError: (err: Error) => {
      pushToast({
        title: t("pages:adapterManager.reloadFailed"),
        body: err.message,
        tone: "error",
      });
    },
  });

  const reinstallMutation = useMutation({
    mutationFn: (type: string) => adaptersApi.reinstall(type),
    onSuccess: (result) => {
      invalidate();
      invalidateDynamicParser(result.type);
      invalidateConfigSchemaCache(result.type);
      pushToast({
        title: t("pages:adapterManager.adapterReinstalled"),
        body: t("pages:adapterManager.adapterUpdatedFromNpm", {
          type: result.type,
          version: result.version ? ` (v${result.version})` : "",
        }),
        tone: "success",
      });
    },
    onError: (err: Error) => {
      pushToast({
        title: t("pages:adapterManager.reinstallFailed"),
        body: err.message,
        tone: "error",
      });
    },
  });

  const builtinAdapters = (adapters ?? []).filter((a) => a.source === "builtin");
  const externalAdapters = (adapters ?? []).filter((a) => a.source === "external");

  // External adapters that override a builtin type.  The server only returns
  // one entry per type (the external), so we synthesize a builtin row for
  // the builtins section so users can see which builtins are affected.
  const overriddenBuiltins = (adapters ?? [])
    .filter((a) => a.source === "external" && a.overriddenBuiltin)
    .filter((a) => !builtinAdapters.some((b) => b.type === a.type))
    .map((a) => ({
      type: a.type,
      label: getAdapterLabel(a.type),
      overriddenBy: [
        a.packageName,
        a.version ? `v${a.version}` : undefined,
      ].filter(Boolean).join(" "),
      overridePaused: !!a.overridePaused,
      menuDisabled: !!a.disabled,
    }));

  if (isLoading) return <div className="p-4 text-sm text-muted-foreground">{labels.loadingAdapters}</div>;

  const isMutating = installMutation.isPending || removeMutation.isPending || toggleMutation.isPending || overrideMutation.isPending || reloadMutation.isPending || reinstallMutation.isPending;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="h-6 w-6 text-muted-foreground" />
          <h1 className="text-xl font-semibold">{labels.adapters}</h1>
          <Badge variant="outline" className="text-amber-600 border-amber-400">
            {labels.alpha}
          </Badge>
        </div>

        <Dialog open={installDialogOpen} onOpenChange={setInstallDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              {labels.installAdapter}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{labels.installExternalAdapter}</DialogTitle>
              <DialogDescription>
                {labels.installAdapterDescription}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Source toggle */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs transition-colors",
                    !isLocalPath
                      ? "border-foreground bg-accent text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                  onClick={() => setIsLocalPath(false)}
                >
                  <Package className="h-3.5 w-3.5" />
                  {labels.npmPackage}
                </button>
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs transition-colors",
                    isLocalPath
                      ? "border-foreground bg-accent text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                  onClick={() => setIsLocalPath(true)}
                >
                  <FolderOpen className="h-3.5 w-3.5" />
                  {labels.localPath}
                </button>
              </div>

              {isLocalPath ? (
                /* Local path input */
                <div className="grid gap-2">
                  <Label htmlFor="adapterLocalPath">{labels.pathToAdapterPackage}</Label>
                  <div className="flex gap-2">
                    <Input
                      id="adapterLocalPath"
                      className="flex-1 font-mono text-xs"
                      placeholder="/mnt/e/Projects/my-adapter  or  E:\Projects\my-adapter"
                      value={installPackage}
                      onChange={(e) => setInstallPackage(e.target.value)}
                    />
                    <ChoosePathButton />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {labels.pathToAdapterPackageNote}
                  </p>
                </div>
              ) : (
                /* npm package input */
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="adapterPackageName">{labels.packageName}</Label>
                    <Input
                      id="adapterPackageName"
                      placeholder="my-paperclip-adapter"
                      value={installPackage}
                      onChange={(e) => setInstallPackage(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="adapterVersion">{labels.version}</Label>
                    <Input
                      id="adapterVersion"
                      placeholder="latest"
                      value={installVersion}
                      onChange={(e) => setInstallVersion(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setInstallDialogOpen(false)}>{labels.cancel}</Button>
              <Button
                onClick={() =>
                  installMutation.mutate({
                    packageName: installPackage,
                    version: installVersion || undefined,
                    isLocalPath,
                  })
                }
                disabled={!installPackage || installMutation.isPending}
              >
                {installMutation.isPending ? labels.installing : labels.install}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Alpha notice */}
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
          <div className="space-y-1 text-sm">
            <p className="font-medium text-foreground">{labels.alphaNoticeTitle}</p>
            <p className="text-muted-foreground">
              {labels.alphaNoticeBody}
            </p>
          </div>
        </div>
      </div>

      {/* External adapters */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-base font-semibold">{labels.externalAdapters}</h2>
        </div>

        {externalAdapters.length === 0 ? (
          <Card className="bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <Cpu className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-sm font-medium">{labels.noExternalAdapters}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {labels.noExternalAdaptersDesc}
              </p>
            </CardContent>
          </Card>
        ) : (
          <ul className="divide-y rounded-md border bg-card">
            {externalAdapters.map((adapter) => {
              const isBuiltinOverride = adapter.overriddenBuiltin;
              const overridePaused = isBuiltinOverride && !!adapter.overridePaused;

              // For overridden builtins, the power button controls the
              // override pause state (not server menu visibility).
              const effectiveAdapter: AdapterInfo = isBuiltinOverride
                ? { ...adapter, disabled: overridePaused ?? false }
                : adapter;

              return (
                <AdapterRow
                  key={adapter.type}
                  adapter={effectiveAdapter}
                  canRemove={true}
                  onToggle={
                    isBuiltinOverride
                      ? (type, disabled) => overrideMutation.mutate({ type, paused: disabled })
                      : (type, disabled) => toggleMutation.mutate({ type, disabled })
                  }
                  onRemove={(type) => setRemoveType(type)}
                  onReload={(type) => reloadMutation.mutate(type)}
                  onReinstall={!adapter.isLocalPath ? (type) => setReinstallTarget(adapter) : undefined}
                  isToggling={isBuiltinOverride ? overrideMutation.isPending : toggleMutation.isPending}
                  isReloading={reloadMutation.isPending}
                  isReinstalling={reinstallMutation.isPending}
                  toggleTitleDisabled={isBuiltinOverride ? labels.pauseExternalOverride : undefined}
                  toggleTitleEnabled={isBuiltinOverride ? labels.resumeExternalOverride : undefined}
                  disabledBadgeLabel={isBuiltinOverride ? t("pages:adapterManager.overridePaused") : undefined}
                  labels={adapterRowLabels}
                />
              );
            })}
          </ul>
        )}
      </section>

      {/* Built-in adapters */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-base font-semibold">{labels.builtinAdapters}</h2>
        </div>

        {builtinAdapters.length === 0 && overriddenBuiltins.length === 0 ? (
          <div className="text-sm text-muted-foreground">{labels.noBuiltinAdapters}</div>
        ) : (
          <ul className="divide-y rounded-md border bg-card">
            {builtinAdapters.map((adapter) => (
              <AdapterRow
                key={adapter.type}
                adapter={adapter}
                canRemove={false}
                onToggle={(type, disabled) => toggleMutation.mutate({ type, disabled })}
                onRemove={() => {}}
                isToggling={isMutating}
                labels={adapterRowLabels}
              />
            ))}
            {overriddenBuiltins.map((virtual) => (
              <AdapterRow
                key={virtual.type}
                adapter={{
                  type: virtual.type,
                  label: virtual.label,
                  source: "builtin",
                  modelsCount: 0,
                  loaded: true,
                  disabled: virtual.menuDisabled,
                }}
                canRemove={false}
                onToggle={(type, disabled) => toggleMutation.mutate({ type, disabled })}
                onRemove={() => {}}
                isToggling={isMutating}
                labels={adapterRowLabels}
                overriddenBy={virtual.overridePaused ? undefined : virtual.overriddenBy}
              />
            ))}
          </ul>
        )}
      </section>

      {/* Remove confirmation */}
      <Dialog
        open={removeType !== null}
        onOpenChange={(open) => { if (!open) setRemoveType(null); }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{labels.removeAdapterTitle}</DialogTitle>
            <DialogDescription>
              {t("pages:adapterManager.removeAdapterBody", {
                type: removeType ?? "",
                npmCleanup: (removeType && adapters?.find((a) => a.type === removeType)?.packageName)
                  ? " npm packages will be cleaned up from disk."
                  : "",
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemoveType(null)}>{labels.cancel}</Button>
            <Button
              variant="destructive"
              disabled={removeMutation.isPending}
              onClick={() => {
                if (removeType) {
                  removeMutation.mutate(removeType, {
                    onSettled: () => setRemoveType(null),
                  });
                }
              }}
            >
              {removeMutation.isPending ? labels.removing : labels.remove}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Reinstall confirmation */}
      <ReinstallDialog
        adapter={reinstallTarget}
        open={reinstallTarget !== null}
        isReinstalling={reinstallMutation.isPending}
        onConfirm={() => {
          if (reinstallTarget) {
            reinstallMutation.mutate(reinstallTarget.type, {
              onSettled: () => setReinstallTarget(null),
            });
          }
        }}
        onCancel={() => setReinstallTarget(null)}
        t={(key: string, opts?: Record<string, unknown>) => t(key, opts)}
        labels={{
          reinstallAdapterTitle: labels.reinstallAdapterTitle,
          reinstallAdapterBody: labels.reinstallAdapterBody,
          package: labels.package,
          current: labels.current,
          latestOnNpm: labels.latestOnNpm,
          checking: labels.checking,
          unavailable: labels.unavailable,
          alreadyOnLatest: labels.alreadyOnLatest,
          cancel: labels.cancel,
          reinstalling: labels.reinstalling,
          reinstall: labels.reinstall,
        }}
      />
    </div>
  );
}
