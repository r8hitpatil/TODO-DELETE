import z, { object , string } from "zod";

const payload = {
    body : object({
        title:string({ message : "Title is required" }).min(2,"Minimum 2 charachter required"),
        description:string({ message : "Description is required" }).min(10,"Minimum character 10 required.")
    })
}

const params = {
    params:object({
        task_id : string({ message : "Task id required." }),
    })
}

export const createTaskSchema = object({
    ...payload
});

export const updateTaskSchema = object({
    ...params,
    body : object({
        title: string().min(2,"Minimum 2 character required"),
        description: string().min(10,"Minimum character 10 required")
    })
})

export const deleteTaskSchema = object({
    ...params
})

export const getTaskSchema = object({
    ...params
})

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type DeleteTaskInput = z.infer<typeof deleteTaskSchema>;
export type GetTaskInput = z.infer<typeof getTaskSchema>;