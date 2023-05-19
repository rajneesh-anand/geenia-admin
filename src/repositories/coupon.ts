import { CouponInput, CouponUpdateInput } from "src/types/generated";
import Base from "./base";

class Coupon extends Base<CouponInput, CouponUpdateInput> {}

export default new Coupon();
