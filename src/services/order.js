import client from "./client";
import header from "./header";

class OrderService {
    order(collectetData) {

        return client
            .post(`/order`, collectetData, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                return response.data;
            });
    }

}

export default new OrderService();
