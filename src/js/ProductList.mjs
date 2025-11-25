import { renderListWithTemplate } from "./utils.mjs";
import Auth from "./auth.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
        <a href="product_pages/?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h2 class="card__name">${product.Brand.Name}</h2>
            <h3 class="card__brand">${product.Name}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`
}

export default class ProducList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.auth = new Auth();
    }
    async init() {
        if (!this.auth.isAuthenticated()) {
            console.log("User not authenticated. Access denied.");
            this.listElement.innerHTML = "<p>Please log in to view products.</p>";
            return;
        }
        const list = await this.dataSource.getData();
        this.renderList(list);
    }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}