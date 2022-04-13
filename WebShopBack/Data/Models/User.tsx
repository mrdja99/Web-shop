export class User {
  userId: number | null = null;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  role: string;
  image: string | undefined;

  constructor(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    username: string,
    password: string,
    isAdmin: boolean,
    role: string,
    image?: string,
    id?: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin;
    this.role = role;
    this.image = image;

    if (id) {
      this.userId = id;
    }
  }
}
