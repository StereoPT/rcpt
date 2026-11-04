# Rcpt

A personal tracker for grocery receipts, used to learn buying habits: how often products are bought, how much is spent, and whether a product is cheap enough to stockpile.

## Language

**Receipt**:
One grocery purchase made on a date, entered by hand from the receipt PDF.
_Avoid_: Purchase, transaction, invoice, order

**Line Item**:
One row of a Receipt: a Product, the quantity bought, and the net amount paid for it.
_Avoid_: Entry, row, purchase

**Product**:
The canonical thing being bought (e.g. "Milk UHT 1L"), independent of how a receipt prints it. Each Line Item is matched to one Product.
_Avoid_: Item, article, SKU

**Alias**:
The text as printed on a Receipt for a Product, remembered so the same text matches that Product automatically next time.
_Avoid_: Receipt name, label, nickname

**Base Unit**:
The single unit (units, kg or L) in which a Product's quantities are always measured, so prices compare across pack sizes.
_Avoid_: Measure, UoM
