import { CreateTag, UpdateTag } from "src/types/generated";
import Base from "./base";

class Tag extends Base<CreateTag, UpdateTag> {}

export default new Tag();
