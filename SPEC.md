# HERMES COMMAND CENTER — SPEC.md

## 1. Concept & Vision

**Bruno's Digital Command Center** — a hosted, mobile-first dashboard that is the nerve center of your entire life operation. Three distinct instances (Personal Life, Personal Brand, Business) each with its own visual identity but unified UX. **Una** is the soul of the system — your main AI agent who knows everything, chats with you constantly, and operates the dashboard on your behalf (with your approval).

The dashboard bridges your locally-running **Hermes Agent** with a hosted Railway frontend. When you're mobile, you access the Railway app. When you're on the same Tailscale network, you can also reach your local Hermes directly. Una's memory and capabilities span both.

**Feel:** Like a luxury war room meets a high-end productivity app. Each instance has a distinct personality — the Personal Life instance feels like home (warm, calm), the Brand instance feels like a stage (bold, magnetic), the Business instance feels like a command center (sharp, efficient).

---

## 2. Design Language

### Aesthetic Direction
Three distinct themes inspired by: (1) a premium personal concierge app, (2) a bold creator/influencer brand kit, (3) a military-grade operations dashboard. All three share the same component library and interaction patterns — only the visual skin changes.

### Color Palettes (CSS Variables per Instance)

**Personal Life**
```
--bg-primary:    #0f0f1a
--bg-secondary:  #1a1a2e
--surface:       #16213e
--text-primary:   #f0e6d3
--text-secondary: #8b8b9e
--accent:        #c9a84c
--accent-glow:   #c9a84c40
--border:        #2a2a4a
--success:       #4ade80
--warning:       #fbbf24
--danger:        #ef4444
```

**Personal Brand**
```
--bg-primary:    #0d0015
--bg-secondary:  #1a0025
--surface:       #2d0040
--text-primary:  #ffffff
--text-secondary: #c4c4d4
--accent:        #f093fb
--accent-glow:   #f093fb50
--border:        #4d0055
--success:       #00ff94
--warning:       #ffb800
--danger:        #ff3c6e
```

**Business**
```
--bg-primary:    #050505
--bg-secondary:  #0a0a0a
--surface:      #141414
--text-primary:  #e8e8e8
--text-secondary:#666666
--accent:        #dc2626
--accent-glow:   #dc262640
--border:        #222222
--success:       #16a34a
--warning:       #ca8a04
--danger:        #dc2626
```

### Typography
- **Headings:** Inter (weight 700-900 for Business/Brand, 500-600 for Personal Life)
- **Body:** Inter (weight 400-500)
- **Mono:** JetBrains Mono (for code, data, metrics)
- **Personal Life headings:** Newsreader (serif, elegant)

### Spatial System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96
- Border radius: 4px (Business), 12px (Brand), 24px (Personal Life)
- Cards: subtle backdrop-blur, 1px border

### Motion Philosophy
- **Instance switching:** 600ms portal animation via Framer Motion (can be disabled)
- **Micro-interactions:** 150ms ease-out for hovers, 200ms for state changes
- **Loading:** skeleton pulses at 1.5s cycle
- **Page transitions:** 300ms fade + slide-up
- **Spring physics:** stiffness 300, damping 30 for interactive elements

### Visual Assets
- **Icons:** Lucide React (consistent, clean)
- **Illustrations:** CSS-only geometric patterns per instance
- **Gradients:** Subtle radial gradients for depth (no flat backgrounds)

---

## 3. Layout & Structure

### Overall Shell
```
┌─────────────────────────────────────────────────────┐
│  HEADER BAR (48px — fixed)                            │
│  [Logo] [Instance Tabs] [Search] [UNA] [Settings]  │
├─────────────────────────────────────────────────────┤
│                                                      │
│  CONTENT AREA (scrollable)                           │
│  ┌──────────────────────────────────────────────┐   │
│  │  [INSTANCE-SPECIFIC PAGE CONTENT]             │   │
│  │                                               │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
├─────────────────────────────────────────────────────┤
│  BOTTOM NAV (mobile only — 64px — fixed)            │
│  [Home] [Tasks] [Calendar] [Council] [Profile]    │
└─────────────────────────────────────────────────────┘
```

### Sidebar (desktop — 280px collapsed to 64px)
- Una chat toggle button
- Instance switcher (large clickable icons)
- Navigation items with icons
- User profile at bottom

### Responsive Strategy
- **Mobile (< 768px):** Single column, bottom nav, full-width cards
- **Tablet (768px - 1024px):** Two-column where appropriate, sidebar overlay
- **Desktop (> 1024px):** Full sidebar, multi-column layouts, kanban 5-col

---

## 4. Features & Interactions

### 4.1 Three Instances

**Switching instances:**
- Click instance tab OR swipe left/right on mobile
- 600ms portal animation (disabled via settings toggle)
- Theme transitions instantly, content fades out/in
- Una's context carries across instances (she knows which one you're in)

**Instance tabs:**
- Persistent in header on all screen sizes
- Active instance has underline + glow effect
- Icons: 🏠 Personal, ✦ Brand, ⚡ Business

### 4.2 Una Chat Panel

**Appearance:**
- Right sidebar on desktop (320px), bottom sheet on mobile
- Toggle button always visible (floating on mobile)
- Conversation history list with timestamps
- Input bar with send button + attachment support
- Typing indicator when Una is "thinking"

**Capabilities (with approval gate):**
- Creates tasks, events, contacts, CRM entries
- Updates goals, settings, schedule
- Triggers workflows, crons
- Answers questions about your data
- Explains what it's doing (transparency)

**Always asks for approval before making changes** unless you explicitly said "create X" or "add Y".

**Chat commands:**
- `/task Create a task...` → creates task, asks approval
- `/calendar Schedule meeting...` → creates calendar event, asks approval
- `/search Query` → searches knowledge base
- `/help` → shows command list

### 4.3 Task Management

**Views:** Kanban (default), List, Calendar, Timeline

**Kanban columns:**
- Personal Life: To Do, In Progress, Review, Done
- Brand: Ideation, Creating, Scheduling, Published
- Business: Backlog, Sprint, In Dev, Done, Blocked

**Task card shows:**
- Title, due date, priority indicator
- Instance badge
- Assigned agent (if any)
- Subtask count
- Completion checkbox

**Interactions:**
- Drag-and-drop between columns
- Click to expand detail pane
- Swipe right → complete, left → archive (mobile)
- Quick actions: edit, assign, set due date, change priority

### 4.4 Calendar

**Views:** Month (default), Week, Day, Agenda

**Features:**
- All instances' events visible (filtered by instance)
- Color-coded by instance
- Click empty slot → create event
- Click event → detail pane with edit/delete
- Week view shows time blocks
- Una can add events via chat

### 4.5 Council (Multi-Agent Chat)

**Appearance:**
- Full-page chat interface accessible from bottom nav
- Each agent has an avatar, name, specialty tag
- Messages show agent attribution clearly

**Default Council members:**
- Una (Main Agent)
- Available sub-agents from Hermes

**Interactions:**
- Create new council instances (named, with selected agents)
- Chat as a group (all agents respond)
- @mention specific agent
- View agent session history (OpenClaw's Observe feature)

### 4.6 Goals & Goal Tracker

**Structure:**
- 3 top-level goals (one per instance)
- Sub-goals with milestones
- Tasks linked to goals
- Weekly/monthly progress tracking

**Goal card shows:**
- Title + description
- Progress bar (calculated from linked tasks)
- Time remaining / deadline
- Milestone checklist
- Strategy notes

### 4.7 CRM (Business Instance)

**Pipeline stages:** Lead → Qualified → Proposal → Negotiation → Won/Lost

**Contact card shows:**
- Name, company, role
- Contact info
- Last interaction
- Linked deals
- Notes
- Activity timeline

### 4.8 Knowledge Base

**Structure:**
- Documents organized by instance
- Tags for cross-instance knowledge
- Search across all instances
- Auto-generated summaries via Una

### 4.9 Settings

**General:**
- Theme selection
- Instance animation toggle
- Notification preferences
- Language / timezone
- Account info

**Advanced Settings:**
- Link to Hermes Gateway native dashboard (for configuring agents, skills, crons directly)

### 4.10 View Layouts (available for Tasks, Calendar, etc.)

| View | Best For |
|------|---------|
| **Kanban** | Task boards, sales pipeline |
| **List** | Dense data, bulk operations |
| **Calendar** | Time-based events, scheduling |
| **Gantt** | Project timelines, dependencies |
| **Timeline** | Activity feeds, history |
| **Cards** | Visual browsing, portfolios |

---

## 5. Component Inventory

### Navigation Bar
- **Default:** Semi-transparent, blurred background
- **Scrolled:** Solid background
- **Mobile:** Bottom-fixed, 5 items with icons + labels

### Instance Tab
- **Default:** Muted text + icon
- **Active:** Accent color, underline, subtle glow
- **Hover:** Lift effect, text brightens

### Task Card
- **Default:** Surface background, border
- **Hover:** Lift + shadow + border glow
- **Dragging:** Elevated, slight rotation, opacity 0.9
- **Completed:** Strikethrough title, muted colors

### Chat Bubble (Una)
- **User:** Right-aligned, accent background
- **Una:** Left-aligned, surface background, Una avatar
- **System:** Centered, muted, small text

### Event Card (Calendar)
- **Default:** Left border in instance color
- **Hover:** Scale 1.02, shadow
- **Today:** Ring highlight

### Goal Progress Bar
- **Visual:** Gradient fill matching instance accent
- **Animation:** Grows on load (600ms ease-out)
- **Labels:** Percentage + fraction

### Input Fields
- **Default:** Dark surface, 1px border
- **Focus:** Accent border glow, label floats up
- **Error:** Red border, error message below
- **Disabled:** Muted, no interaction

### Buttons
- **Primary:** Accent fill, white text
- **Secondary:** Transparent, accent border
- **Ghost:** No border, hover shows surface
- **Danger:** Red fill for destructive actions
- **Loading:** Spinner replaces text/icon

### Modal / Drawer
- **Desktop:** Centered modal with backdrop blur
- **Mobile:** Bottom sheet slides up
- **Animation:** Fade + scale (modal), slide-up (sheet)

### Sidebar
- **Desktop expanded:** 280px, full labels
- **Desktop collapsed:** 64px, icons only with tooltips
- **Mobile:** Hidden, accessed via hamburger

---

## 6. Technical Approach

### Stack
| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router) |
| Mobile | Capacitor + PWA (progressive web app) |
| Styling | Tailwind CSS + CSS variables (per-instance theming) |
| Animation | Framer Motion |
| State | Zustand |
| Database | PostgreSQL on Railway + SQLite locally (Hermes) |
| ORM | Prisma |
| Auth | NextAuth.js (credentials provider, email/password) |
| Icons | Lucide React |
| Calendar | react-big-calendar |
| Drag & Drop | @dnd-kit/core |

### Architecture
```
Railway (Hosted Frontend)
├── Next.js PWA (port 8000)
├── PostgreSQL (Prisma)
└── API Routes (/api/*)
    ├── /api/auth/*        → NextAuth handlers
    ├── /api/una/*         → Una chat endpoints
    ├── /api/sync/*        → Local Hermes ↔ Railway sync
    ├── /api/hermes/*      → Hermes Gateway proxy
    ├── /api/tasks/*       → Task CRUD
    ├── /api/calendar/*    → Calendar CRUD
    ├── /api/crm/*         → CRM operations
    └── /api/goals/*       → Goals management

Local Laptop (Hermes Agent)
├── Hermes Gateway (Tailscale IP: 100.122.147.84)
│   ├── Webhook adapter (:8644)
│   └── API Server (:8642) — needs enabling
├── SQLite databases (memory, sessions, goals)
├── Skills, crons, session history
└── Tailscale VPN → connects to Railway
```

### Data Sync Strategy
- **Source of truth:** Local Hermes (SQLite files)
- **Sync trigger:** Manual + cron (every 15 min)
- **Sync data:** Goals, tasks, calendar events, contacts, memory facts
- **Sync direction:** Local → Railway (read mirror)
- **Conflict resolution:** Local wins (always)

### Hermes Gateway Integration
- Railway app proxies to local Hermes Gateway over Tailscale
- API key stored in Railway env vars
- Endpoints used:
  - `POST /v1/chat/completions` — chat with Una via Hermes
  - `GET /v1/models` — check available models
  - Webhook callbacks for async operations

### PWA Requirements
- Service worker with Workbox (offline caching)
- App manifest with 3 theme colors (one per instance)
- Installable on iOS/Android
- Background sync for offline action queue

---

## 7. Page Structure

```
/                       → Redirect to /personal
/personal              → Personal Life overview (dashboard)
/personal/tasks         → Personal task board (Kanban/list/calendar)
/personal/calendar      → Personal calendar
/personal/goals         → Personal goals
/personal/habits        → Habit tracker
/personal/meals         → Meal planning + grocery
/personal/inbox         → Personal notifications feed

/brand                  → Personal Brand overview
/brand/content          → Content pipeline
/brand/calendar         → Brand content calendar
/brand/social           → Social media management
/brand/portfolio        → Portfolio showcase
/brand/goals            → Brand goals

/business               → Business overview
/business/tasks         → Business task board
/business/calendar      → Business calendar
/business/crm           → CRM + sales pipeline
/business/projects      → Project management
/business/development  → Dev workflow (sandboxes, code review)
/business/goals        → Business goals
/business/reporting    → Reports + metrics
/business/team          → Team feedback
/business/tickets       → Bug/issue tracking

/council                → Default council chat
/council/[id]           → Specific council instance

/settings               → Dashboard settings
/settings/advanced      → → Hermes Gateway native dashboard

/api/*                  → API routes (no UI)
```

---

## 8. API Design

### Authentication
```
POST /api/auth/signin    → Email + password login
POST /api/auth/signout   → Logout
GET  /api/auth/session   → Get current session
```

### Una Chat
```
POST /api/una/chat
  Body: { message: string, context: { instance, page } }
  Response: { response: string, tools_used: string[], approval_needed: { action, details } }

POST /api/una/approve
  Body: { action_id: string, approved: boolean }
  Response: { success: boolean }

GET  /api/una/conversations
  Response: { conversations: { id, title, updated_at, message_count }[] }
```

### Sync (Local Hermes ↔ Railway)
```
POST /api/sync/push         → Push local data to Railway
  Body: { type: "goals"|"tasks"|"calendar"|"contacts", data: any[] }
  Response: { synced: number, errors: string[] }

GET  /api/sync/pull         → Pull latest from Railway to local
  Response: { last_sync: timestamp, data: any }

POST /api/sync/register     → Register Railway app with Hermes (establish webhook URL)
```

### Tasks
```
GET    /api/tasks           → List tasks (filterable by instance, status, assignee)
POST   /api/tasks           → Create task
GET    /api/tasks/[id]      → Get task detail
PATCH  /api/tasks/[id]      → Update task
DELETE /api/tasks/[id]      → Delete task
POST   /api/tasks/reorder   → Bulk reorder (for kanban)
```

### Calendar
```
GET    /api/calendar/events → List events (date range filter)
POST   /api/calendar/events→ Create event
PATCH  /api/calendar/events/[id]→ Update event
DELETE /api/calendar/events/[id]→ Delete event
```

### Goals
```
GET    /api/goals           → List all goals (with sub-goals)
POST   /api/goals           → Create goal
PATCH  /api/goals/[id]      → Update goal
DELETE /api/goals/[id]      → Delete goal
POST   /api/goals/[id]/tasks→ Link task to goal
```

### CRM
```
GET    /api/crm/contacts    → List contacts
POST   /api/crm/contacts    → Create contact
GET    /api/crm/contacts/[id]→ Get contact detail
PATCH  /api/crm/contacts/[id]→ Update contact
GET    /api/crm/deals       → List deals (pipeline)
POST   /api/crm/deals       → Create deal
PATCH  /api/crm/deals/[id]  → Update deal stage
```

---

## 9. Phased Build Roadmap

### Phase 1: Foundation (This sprint)
- [x] SPEC.md written
- [ ] Next.js project scaffolded
- [ ] 3-instance routing with theme CSS variables
- [ ] Instance switching animation (Framer Motion, toggleable)
- [ ] Mobile-responsive shell (header, sidebar, bottom nav)
- [ ] PWA setup (manifest, service worker)
- [ ] Prisma schema + PostgreSQL connection
- [ ] NextAuth (email/password login)
- [ ] Basic dashboard overview pages (3x)

### Phase 2: Core Features
- [ ] Una chat panel + API integration with Hermes Gateway
- [ ] Task management (Kanban view, CRUD)
- [ ] Calendar (basic month view, CRUD)
- [ ] Goals & progress tracking
- [ ] Local Hermes ↔ Railway sync pipeline

### Phase 3: Full Suite
- [ ] All view layouts (List, Calendar, Gantt, Timeline, Cards)
- [ ] CRM (contacts, pipeline)
- [ ] Council chat (multi-agent)
- [ ] Knowledge base
- [ ] Inbox/notification feed
- [ ] Advanced settings → Hermes Gateway link

### Phase 4: Polish + Mobile
- [ ] Offline mode with background sync
- [ ] Push notifications
- [ ] Mobile gesture polish
- [ ] PWA install prompt
- [ ] Performance optimization

---

## 10. File Structure

```
dashboard/
├── SPEC.md
├── README.md
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── prisma/
│   └── schema.prisma
├── public/
│   ├── manifest.json
│   └── sw.js
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── globals.css
    │   ├── (auth)/
    │   │   └── login/page.tsx
    │   ├── personal/
    │   │   ├── page.tsx
    │   │   ├── tasks/page.tsx
    │   │   ├── calendar/page.tsx
    │   │   └── goals/page.tsx
    │   ├── brand/
    │   │   ├── page.tsx
    │   │   ├── content/page.tsx
    │   │   └── goals/page.tsx
    │   ├── business/
    │   │   ├── page.tsx
    │   │   ├── tasks/page.tsx
    │   │   ├── crm/page.tsx
    │   │   └── goals/page.tsx
    │   ├── council/
    │   │   ├── page.tsx
    │   │   └── [id]/page.tsx
    │   ├── settings/
    │   │   ├── page.tsx
    │   │   └── advanced/page.tsx
    │   └── api/
    │       ├── auth/[...nextauth]/route.ts
    │       ├── una/chat/route.ts
    │       ├── una/approve/route.ts
    │       ├── sync/push/route.ts
    │       ├── sync/pull/route.ts
    │       ├── tasks/route.ts
    │       ├── calendar/route.ts
    │       └── goals/route.ts
    ├── components/
    │   ├── ui/ (button, input, card, modal, etc.)
    │   ├── navigation/
    │   │   ├── header.tsx
    │   │   ├── sidebar.tsx
    │   │   └── bottom-nav.tsx
    │   ├── una/
    │   │   ├── chat-panel.tsx
    │   │   ├── chat-bubble.tsx
    │   │   └── approval-prompt.tsx
    │   ├── tasks/
    │   │   ├── kanban-board.tsx
    │   │   ├── task-card.tsx
    │   │   └── task-detail.tsx
    │   ├── calendar/
    │   │   ├── calendar-view.tsx
    │   │   └── event-card.tsx
    │   ├── council/
    │   │   └── council-chat.tsx
    │   └── layout/
    │       └── instance-transition.tsx
    ├── lib/
    │   ├── api.ts
    │   ├── hermes.ts
    │   ├── sync.ts
    │   └── utils.ts
    └── store/
        ├── instance.ts
        ├── una.ts
        └── tasks.ts
```
