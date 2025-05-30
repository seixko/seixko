
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

    // DETALLES DEL CHECKOUT
    const container = document.getElementById('checkout-details');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (container) {
      if (cart.length === 0) {
        container.innerHTML = '<p>No hay productos en el carrito.</p>';
        return;
      }

      let total = 0;
      let html = '';

      cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        html += `
          <p><strong>${item.name}</strong><br>
          Cantidad: ${item.quantity}<br>
          Precio por unidad: MXN$${item.price.toFixed(2)}<br>
          Subtotal: MXN$${subtotal.toFixed(2)}</p>
          <hr>
        `;
      });

      html += `<p class="total"><strong>Total a pagar: MXN$${total.toFixed(2)}</strong></p>`;
      container.innerHTML = html;
    }

    // FUNCIÓN PARA CONFIRMAR COMPRA
    window.confirmarCompra = function () {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      if (cart.length === 0) {
        alert("Tu carrito está vacío.");
        return;
      }

      // Redirigir al formulario de pago
      window.location.href = 'pago.html';
    };
  });
