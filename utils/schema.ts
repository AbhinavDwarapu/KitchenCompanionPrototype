import { z } from "zod";

export const CategoryTagSchema = z.object({
  id: z
    .string({
      required_error: "Name is required.",
      invalid_type_error: "Name must be a string.",
    })
    .min(2, {
      message: "Name should be 2 or more characters in length.",
    })
    .max(24, {
      message: "Name should be 24 or fewer characters in length.",
    }),
  colour: z
    .string({
      required_error: "Colour is required.",
      invalid_type_error: "Colour name must be a string.",
    })
    .min(3, { message: "Colour should be 2 or more characters in length." })
    .max(10, { message: "Colour should be 24 or fewer characters in length." })
    .optional(),
});

export const IngredientSchema = z.object({
  id: z.string().uuid({ message: "Id is invalid." }),
  name: z
    .string({
      required_error: "Name is required.",
      invalid_type_error: "Name must be a string.",
    })
    .min(2, {
      message: "Name should be 2 or more characters in length.",
    })
    .max(32, {
      message: "Name should be 32 or fewer characters in length.",
    }),
  quantity: z
    .number({ invalid_type_error: "Quantity should be an integer." })
    .nonnegative({ message: "Quantity must be a positive number." })
    .lte(99999, { message: "Quantity is too large." }),
  unit: z
    .string()
    .max(32, {
      message: "Unit should be 32 or fewer characters in length.",
    })
    .optional(),
  // alias: z
  //   .string()
  //   .max(32, { message: "Alias should be 32 characters or shorter." })
  //   .array()
  //   .optional(),
  expiration: z
    .string()
    .max(16, { message: "Expiration should be 16 characters or shorter." })
    .optional(),
  notes: z
    .string()
    .max(500, { message: "Notes should be 500 characters or shorter." })
    .optional(),
  cost: z
    .number()
    .nonnegative({ message: "Quantity must be a positive number." })
    .lte(99999, { message: "Quantity is too large." })
    .optional(),
  category: CategoryTagSchema.optional(),
});

export const RecipeSchema = z.object({
  id: z.string().uuid({ message: "Id is invalid." }),
  name: z
    .string({
      required_error: "Name is required.",
      invalid_type_error: "Name must be a string.",
    })
    .min(2, {
      message: "Name should be 2 or more characters in length.",
    })
    .max(32, {
      message: "Name should be 32 or fewer characters in length.",
    }),
  ingredients: IngredientSchema.array().optional(),
  time: z
    .string()
    .max(16, { message: "Time should be 16 characters or shorter." })
    .optional(),
  tags: CategoryTagSchema.array().optional(),
  steps: z
    .string()
    .max(5000, { message: "Notes should be 5000 characters or shorter." })
    .optional(),
});
