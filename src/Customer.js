import { Order } from "./Order.js";
import { convertNumberToDollarString } from "helpers.js";

export default class Customer {
  constructor(name) {
    this.name = name;
    this.orders = [];
  }

  addNewOrder(productName, orderQuantity, orderTotal) {
    const newOrder = new Order(productName, orderQuantity, orderTotal);
    this.orders.push(newOrder);
  }

  avgOrderValue() {
    if (this.orders.length === 0) return "n/a";
    const totalAmountSpent = this.orders.reduce((acc, curr) => {
      const updatedTotal = acc + curr.total;
      return updatedTotal;
    }, 0);

    //@TODO return string after appending '$', pls create a helper
    return totalAmountSpent / this.orders.length;
  }

  spending() {
    const spendingHash = {};

    this.orders.forEach((order) => {
      if (spendingHash[order.productName]) {
        spendingHash[order.productName] += order.total;
      } else {
        spendingHash[order.productName] = order.total;
      }
    });

    return spendingHash;
  }
}
