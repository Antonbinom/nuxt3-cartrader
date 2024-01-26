import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

const schema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number()
    .min(1886)
    .max(+new Date().getFullYear() + 1),
  miles: Joi.number().required(),
  city: Joi.string().required(),
  numberOfSeats: Joi.number().min(1).max(12).required(),
  features: Joi.array().items(Joi.string()).required(),
  url: Joi.string().required(),
  listerId: Joi.string().required(),
  price: Joi.number().min(0).required(),
  name: Joi.string().required(),
  description: Joi.string().min(20).required(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { value, error } = schema.validate(body);

  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });
  }

  const {
    name,
    year,
    price,
    city,
    make,
    url,
    numberOfSeats,
    miles,
    features,
    description,
    listerId,
  } = body;

  await prisma.car.create({
    data: {
      name,
      year,
      price,
      city: city.toLowerCase(),
      make,
      url,
      numberOfSeats,
      miles,
      features,
      description,
      listerId,
    },
  });

  return { value, error };
});
