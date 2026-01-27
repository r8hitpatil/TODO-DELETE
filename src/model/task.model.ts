export interface Task{
    task_id:string,
    title:string,
    description:string
}

export type TaskInput = Pick<Task,"title" | "description">;