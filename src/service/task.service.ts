import { customAlphabet } from 'nanoid';
import pool from '../utils/connect';
import { Task,TaskInput } from '../model/task.model';
// FIX WITH TRY CATCH

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz",10);

export const createTask = async (input:TaskInput):Promise<Task> => {
    try {
        const taskId = `task_${nanoid()}`

        const { rows } = await pool.query<Task>(
            `INSERT INTO TASK (task_id,title,description)
            VALUES ($1,$2,$3)
            RETURNING
            task_id,
            title,
            description
            `,
        [taskId,input.title,input.description]
        );
        return rows[0];
    } catch (error:any) {
        throw new Error('Failed to create task',error);
    }
}

export const getTasks = async ():Promise<Task[]> => {
    try {
        const { rows } = await pool.query<Task>(
            `SELECT * FROM TASK`
        )
        return rows;
    } catch (error:any) {
        throw new Error('Failed to fetch tasks',error);
    }
}

export const findAndUpdate = async(taskID: string, input: Partial<TaskInput>): Promise<Task | null> => {
    try {
        const { rows } = await pool.query(
            `UPDATE task
            SET title = COALESCE($1, title),
                description = COALESCE($2, description)
            WHERE task_id = $3
            RETURNING task_id, title, description, created_at, updated_at`,
        [input.title, input.description, taskID]
    );
    return rows[0] || null;
    } catch (error:any) {
        throw new Error('Failed to update task',error);
    }
}

export const findAndDelete = async(taskID:string):Promise<boolean> => {
    try {
        const result = await pool.query(
         `
        DELETE FROM Task WHERE task_id = $1
        `,
        [taskID]
    );
    return !!result.rowCount; // get to know what is this!
    } catch (error:any) {
        throw new Error('Failed to delete task',error);
    }
}