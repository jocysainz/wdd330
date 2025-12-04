import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

function productDetailsTemplate(product) {
    return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId).then(product => {
            this.product = product;
        });

        this.renderProductDetails("");
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

   addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];

    const existing = cartItems.find(item => item.Id === this.product.Id);

    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cartItems.push({ ...this.product, quantity: 1 });
    }

    setLocalStorage("so-cart", cartItems);
    alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
}

   renderProductDetails(selector = ".product-detail-container") {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
        "afterbegin",
        productDetailsTemplate(this.product)
    );
}
}

// function productDetailsTemplate(product) {
//     document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
//     document.querySelector("#p-brand").textContent = product.Brand.Name;
//     document.querySelector("#p-name").textContent = product.NameWithoutBrand;

//     const productImage = document.querySelector("#p-image");
//     productImage.src = product.Images.PrimaryExtraLarge;
//     productImage.alt = product.NameWithoutBrand;
//     const euroPrice = new Intl.NumberFormat('de-DE',
//         {
//             style: 'currency', currency: 'EUR',
//         }).format(Number(product.FinalPrice) * 0.85);
//     document.querySelector("#p-price").textContent = `${euroPrice}`;
//     document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
//     document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

//     document.querySelector("#add-to-cart").dataset.id = product.Id;
// }

