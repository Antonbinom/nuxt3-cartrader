import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { listingId } = event.context.params;

  const car = prisma.car.findUnique({
    where: {
      id: +listingId,
    },
  });

  if (!car) {
    throw createError({
      statusCode: 404,
      statusMessage: `The listing with id ${listingId} does not exist.`,
    });
  }

  await prisma.car.delete({
    where: {
      id: +listingId,
    },
  });
});
