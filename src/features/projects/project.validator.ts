import {z} from "zod";

export const projectAddProjectSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    description: z.string().trim().min(1, "Description is required")
})

export const projectEditProjecttSchema = z.object({
    name: z.optional(z.string().trim().min(1, "Name is required")),
    description: z.optional(z.string().trim().min(1, "Description is required"))
})

