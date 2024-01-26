import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { city } = event.context.params;
  const { make, minPrice, maxPrice } = getQuery(event);

  const filters = {
    ...(city && { city }),
    ...(make && { make }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
  };
  console.log(filters);

  const cars = await prisma.car.findMany({
    where: filters,
  });

  if (!cars) {
    throw createError({
      statusCode: 400,
      statusMessage: "Not found",
    });
  }

  return cars;
});
