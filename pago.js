const { jsPDF } = window.jspdf;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('payment-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const tarjeta = document.getElementById('tarjeta').value;
    const expiracion = document.getElementById('expiracion').value;
    const cvc = document.getElementById('cvc').value;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    let doc = new jsPDF();
    let y = 20;

    // Título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Magic Shop - Ticket de Compra", 20, y);
    y += 10;

    // Línea
    doc.setLineWidth(0.5);
    doc.line(20, y, 190, y);
    y += 10;

    // Información del comprador
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`Nombre del titular: ${nombre}`, 20, y); y += 8;
    doc.text(`Tarjeta: **** **** **** ${tarjeta.slice(-4)}`, 20, y); y += 8;
    doc.text(`Expiración: ${expiracion}`, 20, y); y += 8;
    doc.text(`CVC: ***`, 20, y); y += 10;

    // Línea
    doc.line(20, y, 190, y);
    y += 10;

    // Detalles del carrito
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Detalles de la compra:", 20, y);
    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    let total = 0;

    cart.forEach(item => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      doc.text(`${item.name}`, 22, y); y += 7;
      doc.text(`Cantidad: ${item.quantity}  |  Precio: $${item.price.toFixed(2)}  |  Subtotal: $${subtotal.toFixed(2)}`, 24, y);
      y += 10;
    });

    // Línea
    doc.line(20, y, 190, y); y += 10;

    // Total
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text(`Total pagado: $${total.toFixed(2)} MXN`, 20, y); y += 15;

    // Mensaje de agradecimiento
    doc.setFont("helvetica", "italic");
    doc.setFontSize(12);
    doc.text("¡Gracias por tu compra! ", 20, y);

    doc.save("ticket-compra.pdf");

    alert("Pago procesado con éxito. Se ha generado tu ticket en PDF.");
    localStorage.removeItem('cart');
    window.location.href = 'venta.html';
  });
});

function cancelarCompra() {
  if (confirm("¿Seguro que deseas cancelar el pago?")) {
    alert("Compra cancelada.");
    window.location.href = 'venta.html';
  }
}
