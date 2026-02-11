
import * as z from "zod";
import { filter } from "../schema_error/GateRegistry.js"
//import path from "path/win32";


//Checked Path in Initial Review
const InvalidASCII = (val: string) => z.string().regex(/^[\x00-\x7F]*$/);

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
        args: z.object({
            condition: z.string().trim().includes("\0"),
            message: "Cannot contain null byte characters"
        }).strict()
    }),
    //WHITE SPACE CHECK
    Base.extend({
        ErrorId: z.literal(filter.WHITE_SPACE),
        args: z.object({
            condition: z.string().trim().includes(" "),
            message: "Cannot contain whitespace characters"
        }).strict()
    }),
    //INVALID ASCII CHECK
    Base.extend({
        ErrorId: z.literal(filter.INVALID_ASCII),
        args: z.object({
            condition: z.string().trim().refine(InvalidASCII, {
                message: "Cannot contain non-ASCII characters"
            }),
        }).strict()
    }),
    //PAYLOAD SIZE CHECK
    Base.extend({
        ErrorId: z.literal(filter.PAYLOAD_OVERFLOW),
        args: z.object({
            condition: z.string().max(1024, "Payload exceeds maximum size of 1024 characters"),
        }).strict()
    }),
    //ID COLLISION CHECK
    Base.extend({
        ErrorId: z.literal(filter.ID_COLLISION),
        args: z.object({
            condition: z.number().int().positive(),
            message: "ID collision detected. Number of collisions: {condition}"
        })
    }),
    //INVALID PROPOSAL CHECK - Catch all other schema validation errors and return as INVALID PROPOSAL
    Base.extend({
        ErrorId: z.literal(filter.INVALID_PROPOSAL),
        args: z.object({
            condition: z.string().min(1),
            message: "Proposal failed schema validation. See 'reasoning' for details."
        }).strict()
    })
]);