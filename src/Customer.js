import { Order } from "./Order.js";
import { removeTrailingComma, convertNumberToDollarString } from "./helpers.js";

export default class Customer {
  constructor(name) {
    this.name = name;
    this.orders = [];
    this.spendingTally = {};
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

    return convertNumberToDollarString(totalAmountSpent / this.orders.length);
  }

  hasSpent() {
    return !Object.keys(this.spendingTally).length == 0;
  }

  getSpending() {
    let spending = "";
    for (let item in this.spendingTally) {
      spending += `${item} - $${this.spendingTally[item]}, `;
    }
    return removeTrailingComma(spending);
  }

  calculateSpending() {
    this.orders.forEach((order) => {
      if (this.spendingTally[order.productName]) {
        this.spendingTally[order.productName] += order.total;
      } else {
        this.spendingTally[order.productName] = order.total;
      }
    });

    return this.getSpending();
  }
}
