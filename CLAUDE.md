## Agent skills

### Issue tracker

Issues are tracked in GitHub Issues (`StereoPT/rcpt`) via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Conventions

- **Next.js docs**: this Next version may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code, and heed deprecation notices.
- **Data access**: Prisma (`@/lib/prisma`) is only imported from `"use server"` actions in `src/actions/<entity>/<action>.ts`, one exported function per file. Reads and writes both go through actions; see `docs/adr/0001-server-actions-for-reads-and-writes.md`.
- **Money**: stored as `Decimal(10,2)` (EUR only) and converted at the action boundary; see `docs/adr/0002-money-as-decimal-converted-at-the-action-boundary.md`.
- **Hooks**: TanStack Query hooks wrap those actions in `src/hooks/<entity>/useX.ts` (e.g. `useExamples.ts`, `useCreateExample.ts`), one hook per file.
- **Query keys**: live in `src/constants/queryKeys.ts` (create it with the first hook).
- **Prisma client** is generated into `src/generated/prisma` (gitignored; run `pnpm db:generate` after install and after schema changes). Run `pnpm prisma migrate dev` after schema changes.
- **Lint/format**: Biome (`pnpm lint`, `pnpm format`). File names are camelCase or PascalCase.
