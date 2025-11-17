# SplitShare

A social fitness app that lets users create custom gym splits, share them with the community, and discover popular workout routines. Built with SvelteKit, Capacitor, and modern web technologies.

## ⚡ Quick Start (Local Development)

Get up and running in under 5 minutes:

```bash
# 1. Clone and install
git clone git@github.com:rezk2ll/splitshare.git
cd splitshare
npm install

# 2. Start infrastructure (PostgreSQL, Redis, Mailpit)
docker-compose up -d

# 3. Configure environment
cp .env.local.example .env

# 4. Set up database
npm run db:push

# 5. Start dev server
npm run dev
```

🎉 **Done!** Open http://localhost:5173

📖 **Detailed Guide**: See [DEVELOPMENT.md](./DEVELOPMENT.md) for complete local development instructions.

## 🚀 Tech Stack

### Frontend

- **SvelteKit 2** - Full-stack framework
- **Svelte 5** - UI framework with runes
- **Tailwind CSS v4** - Styling
- **TypeScript** - Type safety

### Backend

- **Better Auth** - Authentication
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database
- **Redis** - Rate limiting

### Mobile

- **Capacitor 7** - iOS + Android apps
- **Native plugins** - Share, Haptics, StatusBar

### Infrastructure (Phase 1)

- **Resend** - Email service
- **Upstash Redis** - Rate limiting (production)
- **Sentry** - Error monitoring
- **Supabase** - Storage (production)

## 📋 Prerequisites

### For Local Development

- **Node.js 18+** and npm
- **Docker** and Docker Compose
- **Git**

### For Mobile Development

- Android Studio (for Android builds)
- Xcode (for iOS builds, macOS only)

## 🏗️ Development Setup

### Local Development Services (Docker)

The project includes a `docker-compose.yml` with all required services:

- **PostgreSQL 16** - Database (port 5432)
- **Redis 7** - Rate limiting (port 6379)
- **Mailpit** - Email testing (ports 1025, 8025)
- **pgAdmin** - Database GUI (port 5050, optional)

```bash
# Start all services
docker-compose up -d

# View running services
docker-compose ps

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Environment Configuration

For local development, use `.env.local.example`:

```bash
cp .env.local.example .env
```

The default values work out of the box - no external services needed!

### Database Setup

```bash
# Push schema to database
npm run db:push

# Open Drizzle Studio (database GUI)
npm run db:studio

# Generate new migration
npm run db:generate
```

## Development Scripts

### Web Development

```bash
npm run dev              # Start development server
npm run build            # Create production build
npm run preview          # Preview production build
npm run check            # Type-check with svelte-check
npm run check:watch      # Watch mode for type-checking
```

### Code Quality

```bash
npm run lint             # Run prettier and eslint checks
npm run format           # Format code with prettier
```

### Testing

```bash
npm test                 # Run unit tests
npm run test:unit        # Run unit tests (alias)
npm run test:integration # Run Playwright integration tests
```

### Database

```bash
npm run db:generate      # Generate Drizzle migrations
npm run db:migrate       # Run migrations
npm run db:push          # Push schema to database
npm run db:studio        # Open Drizzle Studio
```

### Mobile Development

```bash
npm run cap:sync         # Build and sync with Capacitor
npm run cap:android      # Sync and open Android Studio
npm run cap:ios          # Sync and open Xcode
```

## Project Structure

```
splitshare/
├── src/
│   ├── lib/
│   │   ├── components/       # Reusable Svelte components
│   │   │   └── ui/           # shadcn-svelte UI components
│   │   ├── server/
│   │   │   ├── db/           # Drizzle schema and database client
│   │   │   └── auth/         # Lucia authentication configuration
│   │   ├── schemas/          # Zod validation schemas
│   │   ├── stores/           # Svelte stores for state management
│   │   └── utils/            # Utility functions
│   ├── routes/
│   │   ├── (auth)/           # Authentication routes (login, register)
│   │   ├── (app)/            # Protected app routes
│   │   │   ├── splits/       # Splits management
│   │   │   └── discover/     # Browse public splits
│   │   └── logout/           # Logout endpoint
│   ├── app.css               # Global styles with Tailwind
│   ├── app.html              # HTML template
│   └── app.d.ts              # TypeScript declarations
├── android/                  # Android native project (generated)
├── ios/                      # iOS native project (generated)
├── drizzle/                  # Drizzle migrations
├── .github/
│   └── workflows/            # GitHub Actions workflows
├── static/                   # Static assets
└── capacitor.config.ts       # Capacitor configuration
```

## Database Schema

### Users (better-auth compatible)

- `id`: Primary key
- `name`: User's display name
- `email`: Unique email address
- `emailVerified`: Email verification status
- `image`: Optional profile image
- `createdAt`, `updatedAt`: Timestamps

### Sessions (better-auth compatible)

- `id`: Session ID
- `userId`: Reference to user
- `expiresAt`: Session expiration
- `token`: Unique session token
- `ipAddress`, `userAgent`: Session metadata

### Accounts (better-auth compatible)

- Handles both OAuth and credential-based authentication
- `providerId`: Authentication provider (email, google, etc.)
- `password`: Hashed password for credential auth

### Verification

- Email verification tokens and other verification codes

### Exercises

- `id`: UUID
- `name`: Exercise name
- `muscle_group`: Target muscle group
- `equipment_type`: Required equipment

### Splits

- `id`: UUID
- `user_id`: Creator reference
- `title`: Split title
- `description`: Optional description
- `is_public`: Public/private flag
- `created_at`, `updated_at`: Timestamps

### Split Exercises

- Junction table linking splits to exercises
- Includes sets, reps, rest time, order, and notes

### Split Shares

- `id`: UUID
- `split_id`: Reference to split
- `share_token`: Unique share token
- `created_at`, `expires_at`: Share lifecycle

## CI/CD

The project includes GitHub Actions workflows:

### PR Checks (`pr-checks.yml`)

- Runs on pull requests
- Linting, type-checking, testing, and build verification

### Release (`release.yml`)

- Triggers on tags (`v*`)
- Builds web, Android, and iOS versions
- Publishes Docker image to GitHub Container Registry
- Creates GitHub releases with APK artifacts

## Mobile Development

### Android

1. Build and sync:

   ```bash
   npm run cap:android
   ```

2. Android Studio will open. Build and run from there.

### iOS

1. Build and sync:

   ```bash
   npm run cap:ios
   ```

2. Xcode will open. Build and run from there (requires macOS).

## Available Capacitor Plugins

- **Share API**: Share splits with others
- **Haptics**: Tactile feedback
- **Status Bar**: Control status bar appearance
- **Preferences**: Local storage for user preferences

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all checks pass: `npm run lint && npm run check && npm test`
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.
