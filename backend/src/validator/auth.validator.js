const { z } = require("zod");

const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid E-mail Id"),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

module.exports = { signupSchema };
