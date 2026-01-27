import type { Express , Request, Response } from "express";
import validateResource from "./middleware/validateResource";
import { createTaskSchema, updateTaskSchema } from "./schema/task.schema";
import { createTaskHandler, deleteTaskHandler, getTasksHandler, updateTaskHandler } from "./controller/task.controller";
import { findAndUpdate } from "./service/task.service";

function routes(app:Express){
    app.get('/health',(req:Request,res:Response) => {
        res.send('OK');
    })

    app.post('/task',validateResource(createTaskSchema),createTaskHandler);
    
    app.get('/tasks',getTasksHandler);

    app.put('/task/:task_id',validateResource(updateTaskSchema),updateTaskHandler);

    app.delete('/task/:task_id',deleteTaskHandler)

}

export default routes;