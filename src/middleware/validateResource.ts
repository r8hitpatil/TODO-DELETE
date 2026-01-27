import type { NextFunction,Request,Response } from "express";
import { z } from "zod";

const validateResource = <T extends z.ZodType<any,any,any>>(schema:T) => async (req:Request,res:Response,next:NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body,
            params : req.params,
            query: req.query
        })
        return next();
    } catch (error:any) {
        if(error instanceof z.ZodError){
            return res.status(400).json({
            errors: error
        })
        }
        return res.status(500).send({ error: "Internal server error" });
    }
}

export default validateResource;