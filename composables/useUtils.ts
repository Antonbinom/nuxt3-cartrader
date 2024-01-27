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

  const getImageStoragePath = (image: string) => {
    const config = useRuntimeConfig();
    const imageUrl = `${config.public.supabase.url}/storage/v1/object/public/images/${image}`;
    return imageUrl;
  };

  return { toTitleCase, getPageTitle, getImageStoragePath };
};

export default useUtils;
