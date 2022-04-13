import { User } from "../models/User";
import { RequestUser } from "../models/RequestUser";
import { Manufacturer } from "../models/Manufacturer";
import { ProductType } from "../models/ProductType";
import { Product } from "../models/Product";
import { Order } from "../models/Order";

const baseUrl = "http://localhost:5000/api";

let tokenValue: string;

export async function LoginUser(
  requestUser: RequestUser
): Promise<User | null> {
  let user;

  await fetch(baseUrl + "/user/login", {
    method: "POST",
    body: JSON.stringify(requestUser),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      user = new User(
        data.firstName,
        data.lastName,
        data.phone,
        data.email,
        data.username,
        data.password,
        data.isAdmin,
        data.role,
        data.image,
        data.id
      );

      localStorage.setItem(
        "login",
        JSON.stringify({
          loggedIn: true,
          token: data.token,
          user: JSON.stringify(user),
        })
      );

      let dataLocalStorage = JSON.parse(localStorage.getItem("login")!);

      if (dataLocalStorage) {
        tokenValue = `Bearer ${dataLocalStorage.token}`;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  if (user) {
    return user;
  }

  return null;
}

export async function AddUser(user: User) {
  const response = await fetch(baseUrl + "/user/register", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

export async function GetAllManufacturers(): Promise<Manufacturer[]> {
  const response = await fetch(baseUrl + "/manufacturer");
  return await response.json();
}

export async function AddManufacturer(manufacturer: Manufacturer) {
  const response = await fetch(baseUrl + "/manufacturer", {
    method: "POST",
    body: JSON.stringify(manufacturer),
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenValue,
    },
  });
  return await response.json();
}

export async function GetAllProductTypes(): Promise<Manufacturer[]> {
  const response = await fetch(baseUrl + "/productType");
  return await response.json();
}

export async function AddProductType(productType: ProductType) {
  const response = await fetch(baseUrl + "/productType", {
    method: "POST",
    body: JSON.stringify(productType),
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenValue,
    },
  });
  return await response.json();
}

export async function AddProduct(product: Product) {
  const response = await fetch(baseUrl + `/product`, {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenValue,
    },
  });
  return await response.json();
}

export async function GetAllProducts(): Promise<Product[]> {
  const response = await fetch(baseUrl + "/product");
  return await response.json();
}

export async function UpdateProduct(product: Product) {
  const response = await fetch(baseUrl + `/product/${product?.id}`, {
    method: "PUT",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenValue,
    },
  });
  return await response.json();
}

export async function DeleteProduct(id: number) {
  const response = await fetch(baseUrl + `/product/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenValue,
    },
  });
  return response;
}

export async function UpdateUser(user: User) {
  const response = await fetch(baseUrl + `/user/${user?.userId}`, {
    method: "PUT",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenValue,
    },
  });
  return await response.json();
}

export async function AddOrder(order: Order) {
  const response = await fetch(baseUrl + `/order`, {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenValue,
    },
  });
  return await response.json();
}

export async function GetAllOrders(): Promise<Order[]> {
  const response = await fetch(baseUrl + `/order`);
  return await response.json();
}

export async function UpdateOrder(order: Order) {
  const response = await fetch(baseUrl + `/order/${order?.id}`, {
    method: "PUT",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenValue,
      Accept: "application/json",
    },
  });
  return await response.json();
}

export async function GetAllOrdersForUser(id: number): Promise<Order[]> {
  const response = await fetch(baseUrl + `/order/${id}`);
  return await response.json();
}
