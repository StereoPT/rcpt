# Rcpt

A personal tracker for grocery receipts, used to learn buying habits: how often products are bought, how much is spent, and whether a product is cheap enough to stockpile.

## Language

**Receipt**:
One grocery purchase from a Store on a date, with the total as printed. Only created by importing the receipt PDF; it can be corrected afterwards.
_Avoid_: Purchase, transaction, invoice, order

**Line Item**:
One row of a Receipt: the description as printed, the quantity bought, and the net amount paid for it. Once Products exist, each Line Item is matched to one Product.
_Avoid_: Entry, row, purchase

**Import**:
Reading a Receipt PDF into a draft Receipt that the user reviews and corrects before it is saved. The PDF itself is not kept.
_Avoid_: Upload, scan

**Net Amount**:
What was paid for a Line Item after any discount: the line total, not a unit price.
_Avoid_: Price, cost

**Store**:
The shop a Receipt is from, as plain text (e.g. "Pingo Doce").
_Avoid_: Shop, merchant, supermarket

**Product**:
The canonical thing being bought (e.g. "Milk UHT 1L"), independent of how a receipt prints it. Each Line Item is matched to one Product.
_Avoid_: Item, article, SKU

**Alias**:
The text as printed on a Receipt for a Product, remembered so the same text matches that Product automatically next time.
_Avoid_: Receipt name, label, nickname

**Base Unit**:
The single unit (units, kg or L) in which a Product's quantities are always measured, so prices compare across pack sizes.
_Avoid_: Measure, UoM
