# Money stored as Decimal, converted at the action boundary

Amounts of money (the net total paid on a Line Item, and totals derived from them) are stored as `Decimal(10,2)` in PostgreSQL, in a single currency (EUR). Prisma returns `Decimal` columns as `Decimal.js` objects, which cannot cross the server action boundary as plain values, so each action converts them (to a string or number) before returning. We accept that conversion step in exchange for values that read naturally (`156.78`, not `15678`) in the schema, in queries and in the database.

## Considered Options

- **Integer cents**: plain numbers that add exactly and cross the action boundary untouched; rejected because stored values like `15678` read poorly when working directly with the data.
- **Floating point**: rejected outright; binary rounding (`0.1 + 0.2`) makes sums drift and equality checks unreliable.

## Consequences

- Every action that returns money must convert `Decimal` explicitly; forgetting fails at serialization rather than silently.
- Arithmetic on amounts should happen in the database or on `Decimal` values, not on converted JavaScript numbers.
