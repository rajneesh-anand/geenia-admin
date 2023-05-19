import { CreateTestinomial, UpdateTestinomial } from "src/types/generated";
import Base from "./base";

class Service extends Base<CreateTestinomial, UpdateTestinomial> {
  popularService = (url: string) => {
    return this.http(url, "get");
  };
}

export default new Service();
