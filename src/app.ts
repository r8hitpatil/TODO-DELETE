import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import pool from './utils/connect';

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(express.json());

const connect = async () => {
    try {
        await pool.query("SELECT 1");
        console.log("Connected to db");
    } catch (error) {
        console.log("Connection failed",error);
        process.exit(1);
    }
}

app.listen(port, ()=>{
    console.log(`Running on port http://localhost:${port}`)
    connect();
    routes(app);
    
    app.use((err:any,req:Request,res:Response,next:NextFunction) => {
    const isProduction = process.env.NODE_ENV === 'production';
    res.status(err.status || 500).json({
        message : isProduction ? 'Internal server error' : err.message,
        ...(isProduction ? {} : { error : err.stack })
    })
})
})