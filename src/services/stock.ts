import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

class StockService {
  getProducts() {
    return api.get("/product");
  }
}


export default new StockService();
