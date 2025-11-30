import { loadHeaderFooter } from "./utils.mjs";

async function initHeader() {
  await loadHeaderFooter();

  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (!query) return;
      window.location.href = `../product_listing/index.html?category=${encodeURIComponent(query)}`;
    });
  }
}

initHeader();
