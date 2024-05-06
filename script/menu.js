import {menuItems} from './menu_data.js';
import { addToCart } from './cart.js';

const menuItemsContainer = document.querySelector('.menu-items');

function renderMenuItems() {
  menuItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('item');

    // Create image element
    const imageElement = document.createElement('img');
    imageElement.src = item.image;
    imageElement.alt = item.name;
    imageElement.height = 150;
    imageElement.width = 150;

    // Create info element
    const infoElement = document.createElement('div');
    infoElement.classList.add('info');

    // Create title element (h3)
    const titleElement = document.createElement('h3');
    titleElement.textContent = item.name;

    // Create price element (p)
    const priceElement = document.createElement('p');
    priceElement.classList.add('price');
    priceElement.textContent = `$${item.price}`;

    // Create button element
    const buttonElement = document.createElement('button');
    buttonElement.textContent = "Add to Cart";
    buttonElement.classList.add('add-to-cart-button');
    buttonElement.dataset.itemId = item.id; // Add data attribute for item ID

    // Assemble the item structure
    infoElement.appendChild(titleElement);
    infoElement.appendChild(priceElement);
    infoElement.appendChild(buttonElement);

    itemElement.appendChild(imageElement);
    itemElement.appendChild(infoElement);

    menuItemsContainer.appendChild(itemElement);
  });
}

function attachEventListeners() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemId = button.dataset.itemId;
      const item = menuItems.find(item => item.id === parseInt(itemId));
      addToCart(item);
    });
  });
}

renderMenuItems();
attachEventListeners();
