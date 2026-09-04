# LifeOS - Event-Centric Personal Operating System

**LifeOS** is a production-ready web application that manages every aspect of life through a graph of connected objects, with Events as the central organizing principle.

## 🎯 Core Concept

Everything revolves around **Events** - anything that happens, is planned, is observed, or requires attention. Events are connected to:

- **People** - Relationships and network capital
- **Assets** - Things with value (cash, investments, property, vehicles, skills, certifications)
- **Streams** - Ongoing flows (income, learning, fitness, relationships, projects)
- **Open Loops** - Unresolved commitments (tasks, questions, risks, follow-ups)
- **Goals** - Hierarchical objectives (annual → quarterly → monthly → weekly)
- **Decisions** - Important choices with review cycles
- **Insights** - Lessons and patterns derived from historical events

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Charts**: Recharts
- **Drag & Drop**: dnd-kit
- **Icons**: Lucide

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (authenticated)/   # Protected routes
│   ├── auth/              # Authentication pages
│   └── layout.tsx         # Root layout with providers
├── components/
│   ├── ui/                # Base components (Button, Card, Input, etc.)
│   ├── cards/             # Domain components (MetricCard, EventCard, etc.)
│   ├── kanban/            # Kanban board components
│   ├── wizard/            # Weekly review wizard
│   ├── layout/            # Layout components (AppShell, Sidebar, Header)
│   └── navigation/        # Navigation (CommandPalette)
├── features/              # Feature-specific logic
├── hooks/                 # Custom React hooks (useApi, etc.)
├── store/                 # Zustand stores
├── services/              # API services
├── lib/
│   ├── supabase/         # Supabase client
│   └── intelligence/     # AI scoring and insights engine
├── types/                 # TypeScript types
└── styles/               # Global styles
```

## 🔐 Database Schema

### Core Tables
- `users` - User accounts
- `events` - Central event objects
- `people` - Contacts and relationships
- `assets` - Portfolio of assets
- `streams` - Ongoing flows
- `open_loops` - Tasks and commitments
- `goals` - Hierarchical goals
- `decisions` - Decision journal
- `insights` - Generated insights

### Relationship Tables
- `event_people`, `event_assets`, `event_streams`
- `event_goals`, `event_decisions`, `event_open_loops`, `event_insights`

All tables include **Row-Level Security (RLS)** policies for data isolation.

## 🎨 Key Features

### Dashboard
- Life Score (derived from 6 metrics)
- Health, Relationships, Finance, Growth, Execution scores
- Today's events widget
- Open loops summary
- Goals progress
- Life Balance Wheel (radar chart)

### Events Management
- Create, read, update, delete events
- Filter by type and date
- Timeline and calendar views
- Event detail drawer with relationships

### People CRM
- Relationship tracking with scores
- Contact frequency monitoring
- Last contact tracking
- Burnout risk detection

### Assets Portfolio
- Net worth tracking
- Asset allocation charts
- Asset maintenance events
- Asset growth visualization

### Open Loops Kanban
- Status: Open, Active, Waiting, Blocked, Complete
- Drag-and-drop with dnd-kit
- Priority levels: Low, Medium, High, Critical
- Due date tracking
- Persistent storage to Supabase

### Goals Planner
- Hierarchical goal structure
- Progress tracking with visual indicators
- Annual → Quarterly → Monthly → Weekly breakdown
- Goal velocity forecasting

### Decision Journal
- Decision tracking with context
- Confidence and risk scoring
- Review workflow
- Actual outcomes and lessons learned

### Weekly Review Wizard
- 8-step guided process:
  1. Events - Review this week's events
  2. Open Loops - Assess pending items
  3. People - Check relationships
  4. Assets - Review portfolio
  5. Streams - Monitor ongoing flows
  6. Decisions - Review decisions made
  7. Insights - Extract lessons
  8. Planning - Plan next week

### Intelligence Engine

**Scoring Algorithms:**
- Life Score: Average of all domain scores
- Relationship Score: Recency + Frequency + Shared events
- Health Score: Workouts + Sleep + Stress
- Finance Score: Net worth + Income + Savings + Stability
- Growth Score: Learning hours + Skills + Certifications
- Execution Score: Completion rate + Overdue tasks

**Insight Generation:**
- No contact alerts ("No contact with X for 21 days")
- Health improvements ("Health score increased 8%")
- Open loop trends ("Open loops increased for 3 consecutive weeks")
- Goal velocity warnings ("Current goal velocity indicates risk")
- Burnout risk detection

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/5cxxpb2yrr-ui/lifeos.git
   cd lifeos
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Set up database**
   - Create a Supabase project
   - Run migrations using Supabase CLI or SQL editor
   - Execute all migration files in `supabase/migrations/`

5. **Seed sample data**
   ```bash
   npm run db:seed
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Run type checking
npm run type-check
```

## 🗄️ Database Migrations

Migrations are located in `supabase/migrations/`:

- `001_create_users.sql` - User management
- `002_create_events.sql` - Events
- `003_create_people.sql` - People
- `004_create_assets.sql` - Assets
- `005_create_streams.sql` - Streams
- `006_create_open_loops.sql` - Open loops
- `007_create_goals.sql` - Goals
- `008_create_decisions.sql` - Decisions
- `009_create_insights.sql` - Insights
- `010_create_relationships.sql` - All relationship tables

## 🧪 State Management

Using Zustand stores:

- `useEventsStore` - Events state
- `usePeopleStore` - People state
- `useGoalsStore` - Goals state
- `useDashboardStore` - Dashboard metrics
- `useReviewStore` - Weekly review state

## 🎯 API Hooks (React Query)

- `useEvents(userId)` - Fetch all events
- `useCreateEvent()` - Create event mutation
- `useUpdateEvent()` - Update event mutation
- `usePeople(userId)` - Fetch all people
- `useGoals(userId)` - Fetch all goals
- `useOpenLoops(userId)` - Fetch all open loops
- `useDecisions(userId)` - Fetch all decisions
- `useInsights(userId)` - Fetch all insights

## 🔐 Authentication

- Supabase Auth with email/password
- Google OAuth integration ready
- Protected routes with session checking
- Automatic redirect to login if not authenticated

## 📊 Sample Data

Includes realistic seed data:
- 50+ Events
- 20+ People
- 10+ Assets
- 10+ Streams
- 25+ Open Loops
- 10+ Goals
- 10+ Decisions
- 20+ Insights

## 🎨 Design System

**Theme (Dark Mode Default)**
- Background: `#0B1020`
- Surface: `#111827`
- Panel: `#1F2937`
- Primary: `#3B82F6`
- Success: `#22C55E`
- Warning: `#F59E0B`
- Danger: `#EF4444`

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Adaptive sidebar (collapsible on mobile)
- Touch-friendly components

## 🚀 Performance Optimizations

- React Query caching and stale time management
- Code splitting with Next.js dynamic imports
- Image optimization
- CSS-in-JS with Tailwind for minimal bundle
- Incremental static regeneration ready

## 📝 Development Guidelines

1. **Types First**: Always define TypeScript types
2. **Component Composition**: Build with reusable components
3. **Error Handling**: Implement proper error boundaries
4. **Loading States**: Show loading indicators for async operations
5. **Accessibility**: Follow WCAG guidelines

## 🐛 Known Limitations

- Real-time updates require WebSocket subscriptions (not yet implemented)
- Export/import functionality pending
- Mobile app versions pending
- Advanced analytics dashboard pending

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [dnd-kit Documentation](https://docs.dndkit.com)

## 📞 Support

For questions or issues:
1. Check existing GitHub issues
2. Create a new GitHub issue with detailed description
3. Include reproduction steps and environment details

---

**Built with ❤️ for personal life management**
