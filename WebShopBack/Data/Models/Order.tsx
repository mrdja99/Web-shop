import { User } from "./User";
import { OrderItem } from "./OrderItem";

export class Order {
  id: number | null = null;
  dateOfMaking: Date;
  deadline: Date;
  sumPrice: number;
  user: User | null;
  orderItems: OrderItem[] = new Array(300);
  status: string;

  constructor(
    dateOfMaking: Date,
    deadline: Date,
    sumPrice: number,
    user: User | null,
    orderItems: OrderItem[],
    status: string
  ) {
    this.dateOfMaking = dateOfMaking;
    this.deadline = deadline;
    this.sumPrice = sumPrice;
    this.user = user;
    this.orderItems = orderItems;
    this.status = status;
  }
}
