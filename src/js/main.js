import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";


const productList = document.getElementById("product-list");

const datasource = new ProductData("tents");
const product = new ProductList("tents", datasource, productList);

product.init();


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('so-cart')) || [];
    const cartCount = document.querySelector('#cart-count');
    cartCount.textContent = cart.length;

    // Optional: Hide the badge if cart is empty
    cartCount.style.display = cart.length > 0 ? 'inline' : 'none';
}

updateCartCount();

