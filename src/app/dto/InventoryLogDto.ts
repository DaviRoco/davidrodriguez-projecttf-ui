export class InventoryLogDto{
  id: BigInt;
  transaction: string;
  amount: number;
  itemId: string;
  itemName: string;

  constructor(id: BigInt, transaction: string, amount: number, itemId: string, itemName?: string) {
    this.id = id;
    this.transaction = transaction;
    this.amount = amount;
    this.itemId = itemId;
    this.itemName = itemName;
  }
}
