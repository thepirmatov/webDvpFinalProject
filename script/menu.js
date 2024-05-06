import {menuItems} from './menu_data.js';
import { shoppingCart, addToCart } from './cart.js';

const menuItemsContainer = document.querySelector('.menu-items');

function renderMenuItems() {
  menuItems.forEach(category => {
    // Create a new element for the category
    const categoryElement = document.createElement('div');
    categoryElement.classList.add('category');

    // Create a new element for the category title
    const categoryTitleElement = document.createElement('h2');
    categoryTitleElement.textContent = category.category;
    categoryElement.appendChild(categoryTitleElement);

    category.items.forEach(item => {
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

      categoryElement.appendChild(itemElement);
    });

    menuItemsContainer.appendChild(categoryElement);
  });
}

function attachEventListeners() {
  const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemId = parseInt(button.dataset.itemId);
      let item;
      let category;
      for (const categoryData of menuItems) {
        item = categoryData.items.find(item => item.id === itemId);
        if (item) {
          category = categoryData.category;
          break;
        }
      }
      if (item) {
        addToCart(item, category); // Pass the category to the addToCart function
      } else {
        console.error(`Item with ID ${itemId} not found`);
      }
    });
  });
}





renderMenuItems();
attachEventListeners();
