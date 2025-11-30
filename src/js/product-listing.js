import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

async function init() {
  await loadHeaderFooter();

  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (!query) return;
      window.location.href = `index.html?search=${encodeURIComponent(query)}`;
    });
  }

  const searchTerm = getParam("search");

  const dataSource = new ProductData();
  const element = document.getElementById("product-list");

  const productList = new ProductList(searchTerm, dataSource, element);
  await productList.init();
}

init();
