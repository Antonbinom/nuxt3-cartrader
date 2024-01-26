interface FilterParams {
  make: "string";
  minPrice: "string";
  maxPrice: "string";
  city: "string";
}

export default (city: string, filters: FilterParams) => {
  const { data, error } = useFetch(`/api/cars/${city}`, {
    params: {
      ...filters,
    },
  });

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: "Unable to fetch cars",
    });
  }
  return { data };
};
