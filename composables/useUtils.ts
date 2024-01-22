const useUtils = () => {
  const route = useRoute();

  const toTitleCase = (str: any) => {
    return str[0]?.toUpperCase() + str.substring(1).toLowerCase();
  };

  const getPageTitle = () => {
    return `${toTitleCase(route.params.make) || "Cars"} in ${toTitleCase(
      route.params.city
    )}`;
  };

  return { toTitleCase, getPageTitle };
};

export default useUtils;
