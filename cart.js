document.addEventListener("DOMContentLoaded", () => {
    // MENÚ
    const sidebar = document.getElementById("mySidebar");
    const openBtn = document.getElementById("openSidebar");
    const closeBtn = document.getElementById("closeSidebar");

    if (sidebar && openBtn && closeBtn) {
      openBtn.addEventListener("click", () => {
        sidebar.classList.add("open");
      });

      closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("open");
      });
    }

    // CARRITO
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderCart() {
      if (!cartContainer || !cartTotal) return;

      cartContainer.innerHTML = '';
      let total = 0;

      if (cart.length === 0) {
        cartContainer.innerHTML = '<p>No hay productos en el carrito.</p>';
        cartTotal.textContent = '';
        return;
      }

      cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
          <p><strong>${item.name}</strong><br>
          Precio: MXN$${item.price.toFixed(2)} x ${item.quantity} = <strong>MXN$${subtotal.toFixed(2)}</strong><br>
          <button onclick="removeItem(${index})" class="delete-btn" style="margin-top: 5px;">Eliminar</button>
        </p>
          <hr>
        `;
        cartContainer.appendChild(itemDiv);
      });

      cartTotal.textContent = `Total general: MXN$${total.toFixed(2)}`;
    }

    window.removeItem = function(index) {
      cart.splice(index, 1);
      saveCart();
      renderCart();
    }

    window.clearCart = function() {
      if (confirm("¿Seguro que deseas vaciar el carrito?")) {
        cart = [];
        saveCart();
        renderCart();
      }
    }

    renderCart();
  });