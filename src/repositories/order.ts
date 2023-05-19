// import {
// 	CheckoutVerificationInput,
// 	CreateOrder,
// 	UpdateOrder,
// } from "@ts-types/generated";
// import Base from "./base";

// class Order extends Base<CreateOrder, UpdateOrder> {
// 	verify = async (url: string, variables: CheckoutVerificationInput) => {
// 		return this.http<CheckoutVerificationInput>(url, "post", variables);
// 	};
// }

// export default new Order();

import { CreateProduct, UpdateProduct } from "src/types/generated";
import Base from "./base";

class Order extends Base<CreateProduct, UpdateProduct> {
  popularOrders = (url: string) => {
    return this.http(url, "get");
  };
}

export default new Order();
