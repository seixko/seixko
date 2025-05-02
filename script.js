document.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelectorAll('.product');
  
    products.forEach(product => {
      const price = parseFloat(product.getAttribute('data-price'));
      const quantityInput = product.querySelector('input[type="number"]');
      const totalDisplay = product.querySelector('.total');
  
      function updateTotal() {
        let quantity = parseInt(quantityInput.value);
        if (isNaN(quantity) || quantity < 1) {
          quantity = 1;
          quantityInput.value = 1;
        }
  
        const total = (price * quantity).toFixed(2);
        totalDisplay.textContent = `Total: MXN$${total}`;
      }
  
      quantityInput.addEventListener('input', updateTotal);
      updateTotal(); // inicializar el total
    });
  });

  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  document.querySelectorAll('.product').forEach(product => {
    const name = product.querySelector('h3').textContent;
    const price = parseFloat(product.getAttribute('data-price'));
    const quantityInput = product.querySelector('input[type="number"]');
  
    // Botón añadir al carrito
    const addToCartBtn = product.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => {
      const quantity = parseInt(quantityInput.value) || 1;
      const cart = getCart();
  
      // Ver si el producto ya está en el carrito
      const existingItem = cart.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ name, price, quantity });
      }
  
      saveCart(cart);
      alert(`${quantity} "${name}" añadido al carrito.`);
    });
  
    // Botón comprar (redirige directo al "checkout")
    const purchaseBtn = product.querySelector('.purchase');
    purchaseBtn.addEventListener('click', () => {
      const quantity = parseInt(quantityInput.value) || 1;
      const checkoutItem = { name, price, quantity };
      localStorage.setItem('checkout', JSON.stringify([checkoutItem]));
      window.location.href = 'checkout.html';
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtn = document.querySelector('.add-to-cart');
    const purchaseBtn = document.querySelector('.purchase');
    const quantityInput = document.getElementById('quantity');
    const priceElement = document.querySelector('.price');
    const nameElement = document.querySelector('h3');
  
    if (!addToCartBtn || !purchaseBtn || !quantityInput || !priceElement || !nameElement) return;
  
    const getProductData = () => {
      const name = nameElement.textContent.trim();
      const price = parseFloat(priceElement.textContent.replace(/[^0-9.]/g, ''));
      const quantity = parseInt(quantityInput.value);
      return { name, price, quantity };
    };
  
    addToCartBtn.addEventListener('click', () => {
      const product = getProductData();
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
      const existing = cart.find(p => p.name === product.name);
      if (existing) {
        existing.quantity += product.quantity;
      } else {
        cart.push(product);
      }
  
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Producto añadido al carrito 🛒');
    });
  
    purchaseBtn.addEventListener('click', () => {
      const product = getProductData();
      localStorage.setItem('checkout', JSON.stringify([product]));
      window.location.href = 'checkout.html'; // Redirige a la página de compra directa
    });
  });
  