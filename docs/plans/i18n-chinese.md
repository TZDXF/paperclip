# i18n Implementation Plan: Chinese (Simplified) Support

## Overview

Add i18n infrastructure to the Paperclip UI and server using `react-i18next`, with Chinese (Simplified) support. Preserve programming-specific terms in English (e.g., API, JSON, Git, PR, Issue, Agent, Plugin, Adapter).

## Language Guidelines

- Translate UI labels, buttons, placeholders, error messages, tooltips, empty states
- Keep in English: technical identifiers (API, JSON, Git, PR, webhook, adapter), database column names, enum values used as keys, log messages, code comments
- Chinese style: concise, natural; prefer short phrases

## Tasks

### Task 1: Set up i18n Infrastructure

**Files to create/modify:**
- `ui/src/i18n/index.ts` — create i18n instance with `react-i18next`
- `ui/src/i18n/locales/en.json` — English translations
- `ui/src/i18n/locales/zh.json` — Chinese translations
- `ui/src/main.tsx` — wrap app with `<I18nextProvider>`
- `ui/package.json` — add `react-i18next`, `i18next` dependencies

**Implementation:**
1. `npm install i18next react-i18next` (or add to package.json deps)
2. Create `ui/src/i18n/index.ts`:
   ```ts
   import i18n from "i18next";
   import { initReactI18next } from "react-i18next";
   import en from "./locales/en.json";
   import zh from "./locales/zh.json";

   i18n.use(initReactI18next).init({
     resources: { en: { translation: en }, zh: { translation: zh } },
     lng: "en",
     fallbackLng: "en",
     interpolation: { escapeValue: false },
   });

   export default i18n;
   ```
3. Extract all existing English strings into `en.json` as initial keys
4. Add Chinese translations to `zh.json`
5. Wrap app in `main.tsx` with `<I18nextProvider i18n={i18n}>`

**Acceptance criteria:**
- `i18n.t("key")` works throughout the app
- Language can be switched (no auto-detection required initially)

### Task 2: Translate UI Components (`ui/src/components/`)

**Scope:** All `.tsx` files in `ui/src/components/` (except `ui/`)

**Approach:** For each file, replace hardcoded English strings with `t("namespace:key")`:
- Button labels: `"Save"` → `t("common:save")`
- Empty states: `"No issues found"` → `t("issues:noIssues")`
- Error messages: `"Failed to load"` → `t("common:failedToLoad")`
- Tooltips, placeholders, titles, labels

**Key files to update (high string count):**
- `IssuesList.tsx` — list views, filters, sort labels
- `NewIssueDialog.tsx` — form labels, placeholders, buttons
- `Sidebar.tsx` — nav labels ("New Issue", "Select company")
- `OnboardingWizard.tsx` — wizard steps
- `NewAgentDialog.tsx`, `NewProjectDialog.tsx`, `NewGoalDialog.tsx` — dialog content
- `AgentConfigForm.tsx` — agent config labels
- `CommentThread.tsx` — comment UI strings
- `PackageFileTree.tsx` — file tree strings

**Acceptance criteria:**
- All visible English text in components uses i18n
- Programming terms kept in English

### Task 3: Translate UI Pages (`ui/src/pages/`)

**Scope:** All `.tsx` files in `ui/src/pages/`

**Key pages with many strings:**
- `Dashboard.tsx`
- `Issues.tsx`, `IssueDetail.tsx`
- `Agents.tsx`, `AgentDetail.tsx`
- `Projects.tsx`, `ProjectDetail.tsx`
- `Goals.tsx`, `GoalDetail.tsx`
- `Routines.tsx`, `RoutineDetail.tsx`
- `Costs.tsx`, `Activity.tsx`, `Inbox.tsx`
- `Settings` pages

**Acceptance criteria:** All hardcoded English visible text replaced with i18n keys.

### Task 4: Translate UI Lib/Hooks/Context/API (`ui/src/lib/`, `ui/src/hooks/`, `ui/src/context/`, `ui/src/api/`)

**Scope:**
- `ui/src/lib/` — utility files that return user-facing strings (error messages, formatters)
- `ui/src/hooks/` — hooks returning user-facing text
- `ui/src/context/` — context providers with text constants
- `ui/src/api/` — API layer error messages

**Note:** Only files that produce user-visible text need updating. Data-only/lib files (utils.ts, date formatters without user labels) can be skipped.

### Task 5: Translate Server Strings (`server/src/`)

**Scope:**
- `server/src/errors.ts` — error messages returned to client
- `server/src/startup-banner.ts` — CLI/server startup messages
- `server/src/routes/` — API route error messages and responses
- `server/src/services/` — service layer error messages
- `packages/db/` — DB error messages (migrations, queries)

**Approach:** For server, create a lightweight i18n module or inline translations. The server is Node.js, not React — use `i18next` directly (not react-i18next).

**Acceptance criteria:** User-facing server error messages translated.

### Task 6: Final Review — Find Missed Strings

**Action:** Grep the entire codebase for remaining hardcoded English strings in JSX/TSX render methods and user-facing function returns. Fix any missed ones.

**Command to verify:**
```bash
grep -rn '"[A-Z][a-z].*[A-Z]' ui/src/components/ ui/src/pages/ ui/src/lib/ --include="*.tsx" | grep -v "t(" | grep -v "//" | head -50
```

## Translation Key Naming Convention

Use hierarchical keys: `{section}:{component}:{specific}`

Examples:
- `common:save`, `common:cancel`, `common:delete`, `common:edit`
- `common:loading`, `common:error`, `common:retry`
- `issues:noIssues`, `issues:createIssue`, `issues:assignee`
- `sidebar:newIssue`, `sidebar:selectCompany`
- `agent:statusActive`, `agent:statusPaused`
- `errors:unauthorized`, `errors:notFound`, `errors:serverError`

## Shared Strings Reference (Common to translate)

```
common: save, cancel, delete, edit, create, close, back, next, confirm, loading, error, retry, success, warning, search, filter, sort, refresh, settings, loading, noResults, confirmDelete, optional, required, name, description, status, priority, type, date, actions, all, none, yes, no, true, false
sidebar: newIssue, selectCompany, dashboard, issues, projects, agents, goals, routines, costs, activity, inbox, settings
nav: back, forward, home, search
issues: createIssue, noIssues, issueDetail, assignee, reporter, labels, projects, status, priority, dueDate, created, updated, closed, title, description, addComment, closeIssue, reopenIssue
agents: createAgent, noAgents, agentDetail, status, role, adapter, instructions, skills
projects: createProject, noProjects, projectDetail, workspace, workspaces
goals: createGoal, noGoals, goalDetail, target, progress, deadline
routines: createRoutine, noRoutines, routineDetail, trigger, variables, run, lastRun, nextRun
costs: totalCost, costDetail, period, byAgent, byAdapter
activity: recentActivity, noActivity, timeline, events
inbox: inbox, noInbox, allItems, unread, read
errors: unauthorized, forbidden, notFound, serverError, validationError, networkError, timeout, badRequest
```
