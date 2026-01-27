import express from 'express';
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
    }
}

app.listen(port, ()=>{
    console.log(`Running on port http://localhost:${port}`)
    connect();
    routes(app);
})