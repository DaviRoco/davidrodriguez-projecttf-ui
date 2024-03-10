export class ItemDto {
  id: BigInt;
  name?: string;
  state?: string;

  constructor(id: BigInt, name?: string, state?: string) {
    this.id = id;
    this.name = name;
    this.state = state;
  }
}
