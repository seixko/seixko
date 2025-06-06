document.addEventListener("DOMContentLoaded", () => {
  // MENÚ
  const sidebar = document.getElementById("mySidebar");
  const openBtn = document.getElementById("openSidebar");
  const closeBtn = document.getElementById("closeSidebar");

  openBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("open");
  });

  // Cerrar sidebar si se clickea fuera de él (mejora UX en móvil)
  document.addEventListener("click", (e) => {
    if (
      sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      e.target !== openBtn
    ) {
      sidebar.classList.remove("open");
    }
  });

  // PRODUCTOS
  const products = document.querySelectorAll(".product");

  products.forEach((product) => {
    const price = parseFloat(product.getAttribute("data-price"));
    const quantityInput = product.querySelector('input[type="number"]');
    const totalDisplay = product.querySelector(".total");

    function updateTotal() {
      let quantity = parseInt(quantityInput.value);
      if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
        quantityInput.value = 1;
      }
      const total = (price * quantity).toFixed(2);
      totalDisplay.textContent = `Total: MXN$${total}`;
    }

    quantityInput.addEventListener("input", updateTotal);
    updateTotal();

    const name = product.querySelector("h3").textContent;

    // Añadir al carrito
    product.querySelector(".add-to-cart").addEventListener("click", () => {
      const quantity = parseInt(quantityInput.value) || 1;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existing = cart.find((item) => item.name === name);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ name, price, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${quantity} "${name}" añadido al carrito.`);
    });

    // Comprar ahora
    product.querySelector(".purchase").addEventListener("click", () => {
      const quantity = parseInt(quantityInput.value) || 1;
      localStorage.setItem(
        "checkout",
        JSON.stringify([{ name, price, quantity }])
      );
      window.location.href = "checkout.html";
    });
  });
});
