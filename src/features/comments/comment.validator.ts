import {z} from "zod";


export const addCommentSchema =  z.object({
    text: z.string().trim().min(1, "Comment is requred"),
    task_id: z.coerce.number()
})

export const editCommentSchema =  z.object({
    text: z.optional(z.string().trim().min(1, "Comment is requred")),
    task_id: z.optional(z.coerce.number())
})