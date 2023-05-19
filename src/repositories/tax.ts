import Base from "./base";

import { TaxInput, TaxUpdateInput } from "src/types/generated";

class Tax extends Base<TaxInput, TaxUpdateInput> {}

export default new Tax();
