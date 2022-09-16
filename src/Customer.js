import { Order } from "./Order.js";

export default class Customer {
  constructor(name) {
    this.name = name;
    this.orders = [];
  }

  addNewOrder(productName, orderQuantity) {
    const newOrder = new Order(productName, orderQuantity);
    this.orders.push(newOrder);
  }
  avgOrderValue() {}

  spending() {}
}
