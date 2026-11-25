---
status: accepted
---

# Money and quantity stored as Float

Totals, Net Amounts and quantities are stored as `Float` (`double precision`) in PostgreSQL, in a single currency (EUR). Prisma returns plain numbers, so actions return query results as they are, with no conversion step. We accept possible rounding drift in exchange for simplicity: this is a single-user app and amounts have at most 2 decimals.

## Considered Options

- **`Decimal(10,2)` converted per action**: exact, but every action has to map `Decimal` to a number before returning, since `Decimal` objects cannot cross the server action boundary; rejected as too much ceremony for this app.
- **`Decimal` with a Prisma result extension**: exact with one conversion point; not pursued.

## Consequences

- The database no longer enforces 2 decimals for money or 3 for quantity; the Zod schemas in `src/schemas/` do.
- Compare amounts in whole cents, and round at display time; SQL sums may show rounding noise.
- If drift becomes a real problem, revisit with a new ADR.
