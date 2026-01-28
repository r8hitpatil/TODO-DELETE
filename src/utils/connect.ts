import { Pool } from 'pg';
import pino from 'pino';

const logger = pino();

const pool = new Pool({
    host:process.env.PGHOST,
    port:Number(process.env.PGPORT),
    database:process.env.PGDATABASE,
    user:process.env.PGUSER,
    password:process.env.PGPASSWORD,
});

pool.on('error',(err:any) => {
    logger.error('Unexpected error on idle client',err);
})

export default pool;