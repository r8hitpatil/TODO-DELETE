import type { Express , Request, Response } from "express";
import validateResource from "./middleware/validateResource";
import { createTaskSchema, updateTaskSchema } from "./schema/task.schema";
import { createTaskHandler, deleteTaskHandler, getTasksHandler, updateTaskHandler } from "./controller/task.controller";
import pool from "./utils/connect";

function routes(app:Express){
    app.get('/health', async (req:Request,res:Response) => {
        try {
            await pool.query("SELECT 1");
            res.json({status:'OK',database:'connected'});
        } catch (error) {
            res.status(503).json({ status : 'ERROR',database: 'disconnected' })
        }
    })

    app.post('/task',validateResource(createTaskSchema),createTaskHandler);
    
    app.get('/tasks',getTasksHandler);

    app.put('/task/:task_id',validateResource(updateTaskSchema),updateTaskHandler);

    app.delete('/task/:task_id',deleteTaskHandler)

}

export default routes;