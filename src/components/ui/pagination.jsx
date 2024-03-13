import RCPagination from "rc-pagination";
import { ArrowNext } from "@components/icons/arrow-next";
import { ArrowPrev } from "@components/icons/arrow-prev";
import localeInfo from "@components/locale/en_US";
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
