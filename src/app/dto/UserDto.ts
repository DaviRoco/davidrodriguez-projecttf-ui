export class UserDto {
  id: string;
  firstName: string;
  lastNames: string;
  email: string;
  phone: string;
  password: string;
  age: number;
  state: string;

  constructor(id: string, firstName: string, lastNames: string, email: string, phone: string, password: string, age: number, state: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastNames = lastNames;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.age = age;
    this.state = state;
  }
}
