import { z } from 'zod';

export const userValidationSchema = z.object({
    // id: z.string().uuid(),
    fname: z.string().min(1, "First name is required").max(100, "First name must be at most 100 characters"),
    lname: z.string().min(1, "Last name is required").max(100, "Last name must be at most 100 characters"),
    email: z.string().email("Invalid email address").max(100, "Email must be at most 100 characters"),
    // createdAt: z.string().datetime().optional(),
});
