export class Manufacturer {
  id: number | undefined;
  name: string;
  phone: string;
  email: string;
  address: string;

  constructor(name: string, phone: string, email: string, address: string) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.address = address;
  }
}
