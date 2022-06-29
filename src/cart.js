const fs = require("fs");

class Cart {
  #totalPrice;
  #itemsAdded;
  constructor() {
    this.#totalPrice = 0;
    this.#itemsAdded = {};
  }

  add({ url, products }) {
    const productsAdded = url.searchParams.keys();
    for (const product of productsAdded) {
      if (products[product]) {
        this.#itemsAdded[product] = products[product];
      }
    }
  }

  getAddedItems() {
    let items = '';
    Object.values(this.#itemsAdded).forEach(({ name, price }) => {
      items += `<div>${name}: ${price}</div>`;
    });
    return items;
  }

  calculateTotalPrice() {
    this.#totalPrice = Object.values(this.#itemsAdded).reduce(
      (totalPrice, { price }) => {
        return totalPrice + price;
      }, 0);
  }

  getTotalPrice() {
    this.calculateTotalPrice();
    return this.#totalPrice;
  }
}

const showCart = ({ url, cart }, response) => {
  const template = fs.readFileSync('public' + url.pathname, 'utf8');
  const products = cart.getAddedItems();
  const totalPrice = cart.getTotalPrice();
  let cartItems = template.replace('PRODUCTS', products);
  cartItems = cartItems.replace('TOTAL', totalPrice);
  response.end(cartItems);
  return true;
};

module.exports = { showCart, Cart };
