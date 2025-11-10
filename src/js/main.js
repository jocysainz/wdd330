import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";


const productList = document.getElementById("product-list");

const datasource = new ProductData("tents");
const product = new ProductList("tents", datasource, productList);

product.init();


