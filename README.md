# Rcpt

A grocery receipt tracker. Enter your receipts and learn from them: how often you buy specific products, how much you spend on groceries, and whether a product is cheap enough to stockpile.

The domain language (Receipt, Line Item, Product, Alias, Base Unit) is defined in [`GLOSSARY.md`](GLOSSARY.md).

## Tech stack

- [Next.js](https://nextjs.org) (App Router) with React and TypeScript
- [Prisma](https://www.prisma.io) with PostgreSQL
- [TanStack Query](https://tanstack.com/query) on top of Server Actions
- [Tailwind CSS](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com) and [Base UI](https://base-ui.com)
- [React Hook Form](https://react-hook-form.com) and [Zod](https://zod.dev)
- [Biome](https://biomejs.dev) for linting and formatting

## Getting started

You need [Node.js](https://nodejs.org), [pnpm](https://pnpm.io) and [Docker](https://www.docker.com) (for the local PostgreSQL).

```bash
pnpm install
cp .env.example .env   # adjust the values if you like
docker compose up -d
pnpm db:generate
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

- `pnpm db:generate` generates the Prisma client into `src/generated/prisma`. It needs `DATABASE_URL`, so run it after creating `.env`, and again after changing `prisma/schema.prisma`.
- `.env` holds the `POSTGRES_*` credentials used by `docker-compose.yml` and the `DATABASE_URL` connection string.
- `docker compose up -d` starts PostgreSQL 17 on port 5432 with its data in a Docker volume.
- Once there are models, run `pnpm prisma migrate dev` after changing `prisma/schema.prisma`.

## Scripts

| Command            | What it does                 |
| ------------------ | ---------------------------- |
| `pnpm dev`         | Start the development server |
| `pnpm build`       | Build for production         |
| `pnpm start`       | Run the production build     |
| `pnpm lint`        | Check code with Biome        |
| `pnpm format`      | Format code with Biome       |
| `pnpm db:generate` | Generate the Prisma client   |

## Project structure

```text
src/
├── actions/       # "use server" actions: the only place Prisma is used
├── app/           # routes and pages
├── components/    # UI (shadcn components live in ui/)
├── constants/     # table columns, query keys
├── hooks/         # TanStack Query hooks that wrap the actions
├── lib/           # shared helpers
├── providers/     # app-wide React providers
└── schemas/       # Zod schemas shared by forms and actions
prisma/            # schema and migrations
docs/adr/          # architecture decision records
```

Data access goes through Server Actions for both reads and writes ([ADR 0001](docs/adr/0001-server-actions-for-reads-and-writes.md)), and money is stored as `Decimal` and converted at the action boundary ([ADR 0002](docs/adr/0002-money-as-decimal-converted-at-the-action-boundary.md)).
