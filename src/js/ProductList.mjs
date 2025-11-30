import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image.PrimaryMedium.Url}" alt="${product.Brand.Name} – ${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, searchTerm, dataSource, listElement) {
    this.category = category;
    this.searchTerm = searchTerm;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const titleElement = document.querySelector(".products-title");

    let products;

    if (this.searchTerm) {
      products = await this.dataSource.search(this.searchTerm);

      if (titleElement) {
        titleElement.textContent = `Results for "${this.searchTerm}"`;
      }
    } else {
      products = await this.dataSource.getData(this.category);

      if (titleElement) {
        titleElement.textContent = `Top Products: ${this.category}`;
      }
    }

    this.renderList(products);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
