# Rejected and Out-of-Scope Ideas

Read this before proposing any change. It lists ideas that were considered and rejected, features that already exist, design decisions that are deliberate, work that is already planned, and areas the automation must not touch. Do not re-propose or redo anything listed here.

## How Rcpt is used

Rcpt is a personal tracker for one person's grocery receipts. Receipts are imported from the Pingo Doce PDF, reviewed and corrected, and then saved. The goal is to learn buying habits. It is a small single-user tool, not a shared or commercial product. Improvements should fit that: a clearer review and correction flow, a faster and more readable receipts list, polish and reliability. Multi-user, sharing and public-facing features do not fit.

## Rejected

- Nothing has been rejected yet. When an `auto-improve` PR is closed without merging, add its idea here with the reason.

## Off limits for the automation

- **The PDF importer** (`src/lib/pingoDoce/` and `src/actions/receipt/ImportReceipt.ts`). It can only be verified against a real receipt PDF, and none is available in a fresh worktree. Import issues (quantities, discounts) are handled by hand in a planned version. Do not change the parser or the import action.
- **Receipt data and the `samples/` folder.** This repository is public. Never read, copy, quote or commit real receipt contents, store card numbers, names, addresses or any personal data, not even as test data or in examples. `samples/` is gitignored and must stay that way.
- **The Prisma schema and migrations.** Nothing in an automated run can verify a migration.

## Deliberate design decisions (do not contradict)

These come from `GLOSSARY.md` and `docs/adr/`. Do not propose changes that go against them.

- **Receipts are only created by importing a PDF** (see Receipt and Import in the glossary). Do not add manual receipt entry from scratch.
- **The PDF is not kept.** Only the parsed Receipt and its Line Items are stored.
- **Money and quantity are `Float`** (ADR 0002), in a single currency (EUR). Round to cents before comparing. Do not migrate to `Decimal` or add multiple currencies.
- **Store is plain text** (for example "Pingo Doce"), not a separate entity.
- **A Line Item's Net Amount is the line total after discount**, not a unit price.
- **Data access goes through Server Actions** (ADR 0001). Do not add hand-written Route Handlers or a parallel REST layer.

## Already built (do not re-propose)

- Receipts list, with an empty state
- Receipt details, edit and delete
- Importing a Receipt from a Pingo Doce PDF into an editable draft, reviewed before saving
- A warning on import when the Line Items do not add up to the printed total
- Lines the parser could not read shown in the draft
- Dock navigation with the pages grouped in a `(dashboard)` route group
- A reusable EmptyState component
- PostgreSQL through Prisma, with every read and write through server actions and TanStack Query hooks

## Already planned (do not duplicate)

- Products, Aliases and Base Units, and matching each Line Item to a Product
- Statistics and insights: how often a product is bought, how much is spent, and whether a product is cheap enough to stockpile
- A real home page. It stays a placeholder until there is something worth showing there.
- Fixes for the known import issues with quantities and discounts
- Support for stores other than Pingo Doce
