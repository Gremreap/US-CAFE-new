document.addEventListener('DOMContentLoaded', function () {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');
  const cart = [];

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseFloat(button.getAttribute('data-price'));

      const item = { name, price };
      cart.push(item);

      updateCart();
      updateButtonLabel(button);
    });
  });

  function updateCart() {
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} - ${item.price.toFixed(2)}`;
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Remove';
      deleteButton.classList.add('delete-button');
      // Add the class 'delete-button' to the "Delete" button


      deleteButton.addEventListener('click', () => {
        cart.splice(index, 1);
        updateCart();
        updateButtonLabels();
      });
      
      listItem.appendChild(deleteButton);
      cartList.appendChild(listItem);

      total += item.price;
    });

    cartTotal.textContent = total.toFixed(2);
  }

  function updateButtonLabel(button) {
    const itemName = button.getAttribute('data-name');
    const itemCount = cart.filter(item => item.name === itemName).length;
    button.textContent = `Add to Cart (${itemCount})`;
  }

  function updateButtonLabels() {
    addToCartButtons.forEach(button => {
      updateButtonLabel(button);
    });
  }
});
