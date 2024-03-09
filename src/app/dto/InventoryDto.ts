export class InventoryDto {
  id: BigInt;
  total: number;
  description: string;
  itemId: string;
  itemName: string;

  constructor(id: BigInt, total: number, description: string, itemId: string, itemName: string) {
    this.id = id;
    this.total = total;
    this.description = description;
    this.itemId = itemId;
    this.itemName = itemName;
  }
}
