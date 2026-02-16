import * as z from "zod";
import { ActionType } from "../sys-common/schemas/ActionTypeRegistry.js";
import { ErrorId } from "./RunTimeErrorRegistry.js"
//import path from "path/win32";

//POSTPONE UNTIL PHASE 4

//Schema validtion Base Model
const BaseError = z.object({
    version: z.string().regex(/^1\.\d+\.\d+$/),
    action: "error_validation",
    timestamp:z.coerce.date(),
    path: z.string()
        .startsWith("/sandbox/")
        .refine(path => path.endsWith(".txt") || path.endsWith(".md")),
    id: z.string().uuid().default(() => crypto.randomUUID()),
    explanation: z.string().min(1),
    
});
//Schema validtion inherited Model

export const SchemaErrorVal = z.discriminatedUnion( "action", [ 
    //Schema Validation Errors - All will include "Unknown"
    BaseError.extend({
        action: z.literal(ActionType.THINK),
        args: z.object({
            code: z.enum([
                ErrorId.UNKNOWN_ERROR
            ]) }).strict(),
        }),
    BaseError.extend({
        action: z.literal(ActionType.FINISH),
        args: z.object({
            code: z.enum([
                ErrorId.UNKNOWN_ERROR
            ])
        }).strict()
    }),
    BaseError.extend({

        action: z.literal(ActionType.READ_FILE),
        args:z.object({ 
            code: z.enum([
                ErrorId.PATH_MISSING,
                ErrorId.PATH_NOT_STRING,
                ErrorId.PATH_OUT_OF_BOUNDS,
                ErrorId.UNKNOWN_ERROR
            ])
        }).strict()
    }),
    BaseError.extend({
        action: z.literal(ActionType.WRITE_FILE),
        args:z.object({ 
            code: z.enum([
                ErrorId.PATH_MISSING,
                ErrorId.DISK_FULL,
                ErrorId.UNKNOWN_ERROR
            ])
        }).strict()
    }),
    BaseError.extend({
        action: z.literal(ActionType.LIST_FILES),
        args: z.object({ 
            code: z.enum([
                ErrorId.PATH_MISSING,
                ErrorId.NOT_A_DIRECTORY,
                ErrorId.UNKNOWN_ERROR
            ])
        }).strict()
    }),
    BaseError.extend({
        action: z.literal(ActionType.CREATE_DIRECTORY),
        args:z.object({ 
            code: z.enum([
                ErrorId.PATH_MISSING,
                ErrorId.ALREADY_EXISTS,
                ErrorId.UNKNOWN_ERROR

            ])
        }).strict()
    }),
    BaseError.extend({
        action: z.literal(ActionType.DELETE_FILE),
        args: z.object({ 
            code: z.enum([
                ErrorId.PATH_MISSING,
                ErrorId.FILE_NOT_FOUND,
                ErrorId.PERMISSION_DENIED,
                ErrorId.UNKNOWN_ERROR
            ])
        }).strict()
    }),
    BaseError.extend({
        action: z.literal(ActionType.RENAME_FILE),
        args: z.object({ 
            code: z.enum([
                ErrorId.PATH_MISSING,
                ErrorId.FILE_NOT_FOUND,
                ErrorId.TARGET_ALREADY_EXISTS,
                ErrorId.UNKNOWN_ERROR
            ])
        }).strict() 
    }),

    
 ]);
 

export type ErrorVal = z.infer<typeof SchemaErrorVal>;
