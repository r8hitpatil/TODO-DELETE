import type { Response , Request } from "express";
import { createTask, findAndDelete, findAndUpdate, getTasks } from "../service/task.service";
import { CreateTaskInput, DeleteTaskInput, UpdateTaskInput } from "../schema/task.schema";

// why CreateTaskInput['body']
export const createTaskHandler = async (req:Request<{},{},CreateTaskInput['body']>,res:Response) => {
    try {
        const task = await createTask(req.body);
        if(!task) return res.sendStatus(500);
        return res.send(task);
    } catch (error) {
        return res.status(500).send({ message: "Failed to create task",error : error});
    }
}

export const updateTaskHandler = async (req:Request<UpdateTaskInput['params'] , {} ,UpdateTaskInput['body']>,res:Response) => {
    try {
        const update = await findAndUpdate(req.params.task_id,req.body);
        if(!update) return res.sendStatus(404);
        return res.send(update);
    } catch (error) {
        return res.status(500).send({ message : "Failed to updated task",error : error });
    }
}

export const getTasksHandler = async (req:Request,res:Response) => {
    try {
        const tasks = await getTasks();
        if(!tasks) return res.sendStatus(500);
        return res.send(tasks);
    } catch (error) {
        return res.status(500).send({ message: "Failed to fetch tasks",error : error});
    }
}

export const deleteTaskHandler = async (req:Request<DeleteTaskInput['params'],{} , {}>,res:Response) => {
    try {
        const deleteTask = await findAndDelete(req.params.task_id);
        if(!deleteTask) return res.sendStatus(500);
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).send({ message : "Failed to delete task",error : error });
    }
}