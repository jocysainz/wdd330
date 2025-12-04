import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

loadHeaderFooter();

// const clearCart = document.querySelector("#success");

// if (clearCart.textContent === "Your order was made succesfully") {
//   localStorage.clear();
// }

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");

  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // const cartFooter = document.querySelector(".cart-footer");
  const cartTotalElement = document.querySelector(".cart-total");

  if (cartItems.length > 0) {
    // cartFooter.classList.remove("hide");

    const total = cartItems.reduce((sum, item) => {
      const price = Number(item.FinalPrice) || 0;
      const qty = item.quantity || 1;
      return sum + price * qty;
    }, 0);

    cartTotalElement.innerHTML = `Total: $${total.toFixed(2)}`;
  } else {
    // cartFooter.classList.add("hide");
  }
  attachDeleteListeners();
  attachQuantityListeners();
}

  function attachDeleteListeners() {
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      let cartItems = getLocalStorage("so-cart") || [];
      cartItems = cartItems.filter(item => item.Id !== btn.dataset.id);
      setLocalStorage("so-cart", cartItems);
      
    });
  });

}

function cartItemTemplate(item) {
  return `
  <li class="cart-card divider" data-id="${item.Id}">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <h2 class="card__name">${item.Name}</h2>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>

    <p class="cart-card__quantity">
      qty:
      <input 
        type="number" 
        class="quantity-input" 
        min="1" 
        value="${item.quantity || 1}" 
        data-id="${item.Id}"
      />
    </p>

    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="btn delete-btn" data-id="${item.Id}">❌</button>
  </li>`;
}

function attachQuantityListeners() {
  document.querySelectorAll(".quantity-input").forEach(input => {
    input.addEventListener("change", (e) => {
      const id = e.target.dataset.id;
      const newQty = Number(e.target.value);

      if (newQty < 1) {
        e.target.value = 1;
        return;
      }

      let cartItems = getLocalStorage("so-cart") || [];
      const item = cartItems.find(i => i.Id === id);
      if (item) item.quantity = newQty;

      setLocalStorage("so-cart", cartItems);
      renderCartContents();
    });
  });

}
renderCartContents();