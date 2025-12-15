const { signupSchema } = require("./auth.schema");
const { z } = require("zod");

const updateProfileSchema = signupSchema
  .partial() // makes all fields optional
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field must be provided",
      path: ["body"],
    }
  );

module.exports = { updateProfileSchema };
