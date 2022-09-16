import Product from "./Product.js";
import Customer from "./Customer.js";

export default class StockHandler {
  constructor() {
    this.inventory = {};
    this.orders = [];
    this.products = [];
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

    const newProduct = new Product(productName, productPrice);

    this.products.push(newProduct);
  }

  checkinProduct(productInfo) {
    const [productName, productQuantity] = productInfo;

    if (!this.inventory[productName]) {
      this.inventory[productName] = productQuantity;
    } else {
      this.inventory[productName] += productQuantity;
    }
  }

  processOrder(orderInfo) {
    //@TODO: should we lowercase the customernames, productnames?
    const [customerName, productName, orderQuantity] = orderInfo;

    if (!this.customers[customerName]) {
      const newCustomer = new Customer(customerName);
      this.customers[customerName] = newCustomer;
    }
    this.customers[customerName].addNewOrder(productName, orderQuantity);
  }

  generateOutput() {
    // console.log("products: ", this.products);
    // console.log("inventory: ", this.inventory);
    console.log("customers: ", this.customers);
  }
}
