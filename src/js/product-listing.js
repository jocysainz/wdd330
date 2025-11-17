import ProductData from "./ProductData.mjs"
import ProducList from "./ProductList.mjs"
import { getParam } from "./utils.mjs";


const category = getParam("category") || "tents";

const dataSource = new ProductData(category);
const element = document.querySelector(".product-list");

const productList = new ProducList(category, dataSource, element);
productList.init();





