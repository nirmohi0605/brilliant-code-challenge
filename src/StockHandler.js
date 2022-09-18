import Customer from "./Customer.js";
import { outputReportFile } from "./constants.js";
import fs from "fs";
import { capitalizeFirstLetter } from "./helpers.js";

export default class StockHandler {
  constructor() {
    this.inventory = {};
    this.orders = [];
    this.products = {};
    this.customers = {};
  }

  executeCommand(command, commandPayload) {
    const executionFn = {
      register: this.registerProduct,
      checkin: this.checkinProduct,
      order: this.processOrder,
    };
    executionFn[command].bind(this)(commandPayload);
  }

  registerProduct(productInfo) {
    const [productName, productPrice] = productInfo;
    //@TODO: add this string processing to helpers pls
    //@TODO: I'm hating this constant type conversion
    this.products[productName] = Number(productPrice.slice(1));
  }

  checkinProduct(productInfo) {
    const [productName, productQuantity] = productInfo;

    if (!this.inventory[productName]) {
      this.inventory[productName] = Number(productQuantity);
    } else {
      this.inventory[productName] += Number(productQuantity);
    }
  }

  processOrder(orderInfo) {
    //@TODO: move this to order class?
    //@TODO: should we lowercase the customernames, productnames?
    const [customerName, productName, orderQuantity] = orderInfo;

    if (!this.customers[customerName]) {
      const newCustomer = new Customer(customerName);
      this.customers[customerName] = newCustomer;
    }
    //only process order if inventory permits
    //@TODO: should we hold on to unfulfilled orders in a DS?
    if (this.inventory[productName] >= orderQuantity) {
      const orderTotal = this.calculateOrderTotal(
        productName,
        Number(orderQuantity)
      );
      this.customers[customerName].addNewOrder(
        productName,
        orderQuantity,
        orderTotal
      );
      this.updateInventory(productName, orderQuantity);
    }
  }

  calculateOrderTotal(productName, orderQuantity) {
    //@TODO: move this to order class
    const price = this.products[productName];
    return orderQuantity * price;
  }

  updateInventory(productName, orderQuantity) {
    this.inventory[productName] -= orderQuantity;
  }

  generateOutput() {
    let outputStr = "";

    for (let customer in this.customers) {
      const curr = this.customers[customer];
      const customerSpending = curr.calculateSpending();

      if (curr.hasSpent()) {
        outputStr += `${capitalizeFirstLetter(
          customer
        )}: ${customerSpending} | Average Order Value: ${curr.avgOrderValue()}\n`;
      } else {
        outputStr += `${capitalizeFirstLetter(customer)}: n/a`;
      }
    }
    return outputStr;
  }

  generateOutputFile(reportFilePath) {
    const outputFilePath = reportFilePath || `./reports/${outputReportFile}`;
    let output = fs.createWriteStream(outputFilePath, {
      flags: "a",
    });
    const outputLog = this.generateOutput();
    output.once("open", function (fd) {
      output.write(outputLog);
      output.end();
    });
  }
}
