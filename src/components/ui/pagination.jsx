import RCPagination from "rc-pagination";
import { ArrowNext } from "@assets/icons/arrow-next";
import { ArrowPrev } from "@assets/icons/arrow-prev";
import localeInfo from "@components/ui/locale";
import "rc-pagination/assets/index.css";

const Pagination = (props) => {
  return (
    <RCPagination
      locale={localeInfo}
      nextIcon={<ArrowNext />}
      prevIcon={<ArrowPrev />}
      {...props}
    />
  );
};

export default Pagination;
