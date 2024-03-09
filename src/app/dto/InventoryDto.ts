export class InventoryDto {
  id: BigInt;
  total: bigint;
  description: string;
  itemId: BigInt;
  itemName: string;

  constructor(id: BigInt, total: bigint, description: string, itemId: BigInt, itemName: string) {
    this.id = id;
    this.total = total;
    this.description = description;
    this.itemId = itemId;
    this.itemName = itemName;
  }
}
