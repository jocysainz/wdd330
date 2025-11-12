import ProductData from "./ProductData.mjs";
import ProducList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProducList("Tents", dataSource, element);

productList.init();
