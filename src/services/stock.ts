import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/",
 
});

class StockService {
  getProducts() {
    return api.get("/product");
  }
  reFill(id:number,amount:number) {
    return api.put(`product/${id}/refill?amount=${amount}`);
  }
  buy(id:number,amount:number) {
    return api.put(`product/${id}/buy?amount=${amount}`);
  }
}


export default new StockService();
