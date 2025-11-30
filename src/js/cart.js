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

  let deleteButtons = document.querySelectorAll(".btn");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", () => {
      cartItems = getLocalStorage("so-cart");
      cartItems = cartItems.filter((item) => item.Id !== deleteButtons[i].id);
      setLocalStorage("so-cart", cartItems);
      renderCartContents();
    });
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="btn" id="${item.Id}">❌</button>
</li>`;

  return newItem;
}

renderCartContents();
