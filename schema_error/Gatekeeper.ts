import * as z from "zod";
import { ErrorId } from "../schema_error/GateRegistry.js"
//import path from "path/win32";


//Checked Path in Initial Review
const InvalidASCII = z.string().regex(/^[\x00-\x7F]*$/);

//Schema validtion Base Model
const Base = z.object({
    version: z.string().regex(/^1\.\d+\.\d+$/),
    timestamp:z.coerce.date(),
    id: z.string().uuid().default(() => crypto.randomUUID()),
    input: z.string().min(1).trim(),

});


export const GateList = z.discriminatedUnion("ErrorId", [
    //NULL SPACE CHECK
    Base.extend({
        ErrorId: z.literal(filter.NULL_BYTE),
        args: z.string().trim().refine((val) => !val.includes("\0"),{
            message: "Cannot be in null bytes"
        })
    }).strict(),

    //WHITE SPACE CHECK
    Base.extend({
        ErrorId: z.literal(filter.WHITE_SPACE),
        args: z.string().trim().refine((val) => !val.includes(" "),{
            message: "Cannot have white space in proposal"
        })
    }).strict(),
    //ASCII CHECK
       Base.extend({
        ErrorId: z.literal(filter.WHITE_SPACE),
        args: z.string().trim().refine((val) => !val.includes(" "),{
            message: "Cannot have invalid ASCII, please fix and resubmit"})
        }).strict(),

])


    
export type AgentProposal = z.infer<typeof GateList>;


