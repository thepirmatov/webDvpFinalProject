export let shoppingCart = [];

export function addToCart(item) {
  shoppingCart.push(item);
  updateCartIcon();
}

export function removeFromCart(itemId) {
    const itemIndex = shoppingCart.findIndex(item => item.id === itemId);
  
    if (itemIndex !== -1) {
      shoppingCart.splice(itemIndex, 1);
    }
  
    updateCartDisplay();
    updateCartIcon();
}

export function updateCartIcon() {
    const cartCounterElement = document.querySelector('.cart-counter');
    const numberOfItems = shoppingCart.reduce((total, item) => total + item.quantity, 0);
    cartCounterElement.textContent = numberOfItems;
}

export function updateCartDisplay() {
    const cartDisplayElement = document.querySelector('.cart-display');
    cartDisplayElement.innerHTML = '';
    let totalCost = 0;

    shoppingCart.forEach(item => {
        // Create a new element to display the item
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
    
        // Add the item details to the element
        itemElement.innerHTML = `
          <span>${item.name}</span>
          <span>Quantity: ${item.quantity}</span>
          <span>Price: $${item.price.toFixed(2)}</span>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
    
        // Append the item element to the cart display element
        cartDisplayElement.appendChild(itemElement);
    
        // Update the total cost
        totalCost += item.price * item.quantity;
    });

    const totalCostElement = document.createElement('div');
    totalCostElement.classList.add('total-cost');
    totalCostElement.textContent = `Total Cost: $${totalCost.toFixed(2)}`;
    cartDisplayElement.appendChild(totalCostElement);
}