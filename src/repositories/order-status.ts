import { OrderStatusInput, OrderStatusUpdateInput } from "src/types/generated";
import Base from "./base";

class OrderStatus extends Base<OrderStatusInput, OrderStatusUpdateInput> {}

export default new OrderStatus();
