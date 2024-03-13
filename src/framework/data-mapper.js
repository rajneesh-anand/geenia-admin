import camelcaseKeys from "camelcase-keys";

export const mapPaginatorData = (obj) => {
  const formattedValues = camelcaseKeys(obj);
  return {
    ...formattedValues,
    hasMorePages: formattedValues.lastPage !== formattedValues.currentPage,
  };
};
