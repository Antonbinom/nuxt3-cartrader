import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["ru", "com", "org", "net"] },
  }),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  name: Joi.string().required(),
  message: Joi.string().min(20).required(),
});

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { listingId } = event.context.params;
  console.log("PARAMS: ", event.context.params);

  const { error } = await schema.validate(body);

  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });
  }

  const { name, email, phone, message } = body;
  console.log(name, email, phone, message);

  await prisma.message.create({
    data: {
      name,
      email,
      phone,
      message,
      listingId: +listingId,
    },
  });
});
