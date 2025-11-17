import { renderListWithTemplate } from "./utils.mjs";

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
    }
    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
    }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
// Individual Work
    renderProduct(product) {
        const final = product.FinalPrice;
        const retail = product.SuggestedRetailPrice;

        let discountBadge = "";
        if (final < retail) {
            const percent = Math.round(((retail - final) / retail) * 100);
            discountBadge = `<span class="discount-badge">-${percent}%</span>`;
        }

        return `
      <div class="product-card">
        ${discountBadge}
        <a href="../product_pages/index.html?Id=${product.Id}">
          <img src="${product.Images[0]}" alt="${product.Name}">
          <h3>${product.Name}</h3>
        </a>

        <div class="price">
          <span class="final-price">$${final.toFixed(2)}</span>
          ${final < retail ? `<span class="retail-price"><s>$${retail.toFixed(2)}</s></span>` : ""}
        </div>
      </div>
    `;
    }

}

