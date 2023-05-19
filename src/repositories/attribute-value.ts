import Base from "./base";

import {
  AttributeValueCreateInput,
  AttributeValueUpdateInput,
} from "src/types/generated";

class AttributeValue extends Base<
  AttributeValueCreateInput,
  AttributeValueUpdateInput
> {}

export default new AttributeValue();
