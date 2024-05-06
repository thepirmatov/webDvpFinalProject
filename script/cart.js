export let shoppingCart = [];

loadCart();

export function addToCart(item, category) {
  // Check if the item is already in the cart
  item.category = category;
  const existingItem = shoppingCart.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
      // If the item is already in the cart, increment its quantity
      existingItem.quantity += 1;
  } else {
      // Otherwise, add the item to the cart
      item.quantity = 1; // Set the quantity to 1
      shoppingCart.push(item);
  }

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(shoppingCart));

  // Update the cart counter
  updateCartCounter();
}


function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart !== null) {
      // Parse the JSON string back into an array
      shoppingCart = JSON.parse(savedCart);
  }
  updateCartCounter();
}

export function removeFromCart(itemId) {
  const item = shoppingCart.find(item => item.id === itemId);
  
  if (item) {
    if (item.quantity > 1) {
      // If the item quantity is more than 1, decrease it
      item.quantity -= 1;
    } else {
      // Otherwise, remove the item from the cart
      const itemIndex = shoppingCart.indexOf(item);
      shoppingCart.splice(itemIndex, 1);
    }
  }
  
  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(shoppingCart));

  // Update the cart counter and the cart icon
  updateCartCounter();
  updateCartIcon();
}

export function updateCartCounter() {
  const cartCounterElement = document.querySelector('.cart-counter');
  if (cartCounterElement) {
    const numberOfItems = shoppingCart.reduce((total, item) => total + item.quantity, 0);
    cartCounterElement.textContent = numberOfItems;
  }
}

export function updateCartIcon() {
  const cartCounterElement = document.querySelector('.cart-counter');
  if (cartCounterElement) {
    const numberOfItems = shoppingCart.reduce((total, item) => total + item.quantity, 0);
    cartCounterElement.textContent = numberOfItems;
  }
}