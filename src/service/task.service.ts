import { customAlphabet } from 'nanoid';
import pool from '../utils/connect';
import { Task,TaskInput } from '../model/task.model';

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz",10);

export const createTask = async (input:TaskInput):Promise<Task> => {
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
}

export const getTasks = async ():Promise<Task[]> => {
    const { rows } = await pool.query<Task>(
        `SELECT * FROM TASK`
    )
    return rows;
}

export const findAndUpdate = async(taskID: string, input: Partial<TaskInput>): Promise<Task | null> => {
    const { rows } = await pool.query(
        `UPDATE task
        SET title = COALESCE($1, title),
            description = COALESCE($2, description)
        WHERE task_id = $3
        RETURNING task_id, title, description, created_at, updated_at`,
        [input.title, input.description, taskID]
    );
    
    return rows[0] || null;
}

export const findAndDelete = async(taskID:string):Promise<boolean> => {
    const result = await pool.query(
        `
        DELETE FROM Task WHERE task_id = $1
        `,
        [taskID]
    );

    return !!result.rowCount;
}