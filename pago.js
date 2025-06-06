document.addEventListener("DOMContentLoaded", () => {
  // MENÚ
  const sidebar = document.getElementById("mySidebar");
  const openBtn = document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");

  if (openBtn && closeBtn && sidebar) {
    openBtn.addEventListener("click", () => {
      sidebar.classList.add("open");
    });

    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  }

  // FORMULARIO Y PDF
  const form = document.getElementById('payment-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const { jsPDF } = window.jspdf;

      const nombre = document.getElementById('nombre').value.trim();
      const tarjeta = document.getElementById('tarjeta').value.trim();
      const expiracion = document.getElementById('expiracion').value.trim(); // formato YYYY-MM
      const cvc = document.getElementById('cvc').value.trim();
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Validaciones
      const tarjetaRegex = /^\d{16}$/;
      const cvcRegex = /^\d{3,4}$/;  // Acepta 3 o 4 dígitos (tarjetas AMEX tienen 4)

      if (nombre === '' || tarjeta === '' || expiracion === '' || cvc === '') {
        alert('Por favor, completa todos los campos.');
        return;
      }

      if (!tarjetaRegex.test(tarjeta)) {
        alert('El número de tarjeta debe contener 16 dígitos.');
        return;
      }

      // Validar formato de expiración YYYY-MM
      if (!/^\d{4}-\d{2}$/.test(expiracion)) {
        alert('La fecha de expiración debe tener formato válido (AAAA-MM).');
        return;
      }

      const [anioExpFull, mesExpStr] = expiracion.split('-');
      const anioExp = parseInt(anioExpFull.slice(2)); // últimos 2 dígitos del año
      const mesExp = parseInt(mesExpStr);

      if (mesExp < 1 || mesExp > 12) {
        alert('El mes de expiración no es válido.');
        return;
      }

      const now = new Date();
      const mesActual = now.getMonth() + 1; // 1-12
      const anioActual = now.getFullYear() % 100; // últimos 2 dígitos del año actual

      if (anioExp < anioActual || (anioExp === anioActual && mesExp < mesActual)) {
        alert('La tarjeta ya ha expirado.');
        return;
      }

      if (!cvcRegex.test(cvc)) {
        alert('El CVC debe contener 3 o 4 dígitos.');
        return;
      }

      // Crear PDF
      let doc = new jsPDF();
      let y = 20;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("Magic Shop - Ticket de Compra", 20, y);
      y += 10;

      doc.setLineWidth(0.5);
      doc.line(20, y, 190, y);
      y += 10;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(14);
      doc.text(`Nombre del titular: ${nombre}`, 20, y); y += 8;
      doc.text(`Tarjeta: **** **** **** ${tarjeta.slice(-4)}`, 20, y); y += 8;
      doc.text(`Expiración: ${mesExpStr}/${anioExpFull.slice(2)}`, 20, y); y += 8;
      doc.text(`CVC: ***`, 20, y); y += 10;

      doc.line(20, y, 190, y);
      y += 10;

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

      doc.line(20, y, 190, y); y += 10;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.text(`Total pagado: $${total.toFixed(2)} MXN`, 20, y); y += 15;

      doc.setFont("helvetica", "italic");
      doc.setFontSize(12);
      doc.text("¡Gracias por tu compra! ", 20, y);

      doc.save("ticket-compra.pdf");

      alert("Pago procesado con éxito. Se ha generado tu ticket en PDF.");
      localStorage.removeItem('cart');
      window.location.href = 'index.html';
    });
  }
});

function cancelarCompra() {
  if (confirm("¿Seguro que deseas cancelar el pago?")) {
    alert("Compra cancelada.");
    window.location.href = 'index.html';
  }
}
