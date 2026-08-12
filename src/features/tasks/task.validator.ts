import {z} from "zod";

export const taskAddTaskSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().min(1, "Description is required"),
    status: z.enum(["TODO", "INPROGRESS", "DONE"]) ,
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]) ,
    assignedUserId: z.coerce.number() ,
    projectId: z.coerce.number()
})

export const taskEditTaskSchema = z.object({
    title: z.optional(z.string().trim().min(1, "Title is required")),
    description: z.optional(z.string().trim().min(1, "Description is required")),
    status: z.optional(z.enum(["TODO", "INPROGRESS", "DONE"])) ,
    priority: z.optional(z.enum(["LOW", "MEDIUM", "HIGH"])) ,
    assignedUserId: z.optional(z.coerce.number()) ,
    projectId: z.optional(z.coerce.number())
})