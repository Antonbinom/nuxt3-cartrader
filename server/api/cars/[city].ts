import cars from "@/data/cars.json";

export default defineEventHandler((event) => {
  const { city } = event.context.params;
  const { make, minPrice, maxPrice } = getQuery(event);
  let filteredCars = cars.filter((car) => {
    const isCityMatch = !city || car.city.toLowerCase() === city.toLowerCase();
    const isMakeMatch =
      !make || car.make.toLowerCase() === String(make).toLowerCase();
    const isMinPriceMatch = !minPrice || car.price >= +minPrice;
    const isMaxPriceMatch = !maxPrice || car.price <= +maxPrice;
    return isCityMatch && isMakeMatch && isMinPriceMatch && isMaxPriceMatch;
  });

  return filteredCars;
});
