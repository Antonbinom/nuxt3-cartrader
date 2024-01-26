import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { listingId } = event.context.params;

  const messages = await prisma.message.findMany({
    where: {
      listingId: +listingId,
    },
  });

  if (!messages) {
    throw createError({
      statusCode: 412,
      statusMessage: "Messages not found",
    });
  }
  return messages;
});
