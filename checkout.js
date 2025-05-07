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

  window.confirmarCompra = function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
  
    // Aquí redirige al formulario de pago
    window.location.href = 'pago.html';
  };
}  
