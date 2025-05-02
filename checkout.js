document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('checkout-details');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (!container) return;

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
});

window.confirmarCompra = function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  alert("Gracias por tu compra 🛍️");
  localStorage.removeItem('cart');
  window.location.href = 'index.html'; // o venta.html según tu flujo
};

window.cancelarCompra = function () {
  if (confirm("¿Seguro que deseas cancelar la compra?")) {
    localStorage.removeItem('cart');
    alert("Compra cancelada.");
    window.location.href = 'venta.html'; // O index.html
  }
};
