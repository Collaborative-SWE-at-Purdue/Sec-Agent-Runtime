import * as z from "zod";
import { ActionType } from "../sys-common/ActionTypeRegistry.js";
import { ErrorId } from "../schema_error/CGateRegistry.js"
//import path from "path/win32";


//Checked Path in Initial Review
const ASCIISchema = z.string().regex(/^[\x00-\x7F]*$/);

//Schema validtion Base Model
const Base = z.object({
    version: z.string().regex(/^1\.\d+\.\d+$/),
    timestamp:z.coerce.date(),
    id: z.string().uuid().default(() => crypto.randomUUID()),
    explanation: z.string().min(1),

});


const WhiteList = z.discriminatedUnion("ErrorId", [

    Base.extend({
        ErrorId: z.literal(filter.NULL_BYTE),
        args: z.string().refine((val) => !val.includes("\0"),{
            message: "Cannot be in null bytes"
        })
    }).strict(),








])


cosnt BaseExtend = z.object({
    
    


})