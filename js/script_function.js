let cart = [];
let cartId=0;
let products1 = [];

async function fetchProductsFn() {
  const setProducts = await fetch("https://dummyjson.com/products ");

  const data = await setProducts.json();

  const { products } = data;

  return products;
}

products1 = await fetchProductsFn();

function addToCartFn(productId) {
  if (
    !productId ||
    typeof productId != "number" ||
    productId < 0 ||
    productId >= products1.length
  ) {
    throw new Error("Invalid productId");
  }

  let product = null;

  for (let i = 0; i < products1.length; i++) {
    let p = products1[i];

    if (p.id == productId) {
      product = p;
    }
  }

  if (product !== null) {
    for (let x = 0; x < cart.length; x++) {
      if (cart[x].product.id == productId) {
        cart[x].count++;
        return;
      }
    }

    let cartProduct = { id: cartId++, count: 1, product };
    cart.push(cartProduct);
  }
}

function deleteFromCartFn(productCartId) {
  if (typeof productCartId != "number" || productCartId < 0) {
    throw new Error("Invalid Index");
  }

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == productCartId) {
      cart[i].count--;

      if (cart[i].count == 0) {
        cart.splice(i, 1);
      }

      return;
    }
  }
}

function removeByCartIdFn(cart_id) {
  if (typeof cart_id != "number" || cart_id < 0) {
    throw new Error("Invalid cart_id");
  }

  //const index = cart.findIndex((item) => item.cartId == cart_id);
  let index ;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == (cart_id)) {
      index = i; 
      break; 
    }

  }


  if (index !== -1) {
    cart.splice(index, 1);
  }
}

export {
  cart,
  addToCartFn,
  cartId,
  deleteFromCartFn,
  fetchProductsFn,
  products1,
  removeByCartIdFn,
};
