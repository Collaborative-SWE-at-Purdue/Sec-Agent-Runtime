import * as z from "zod";
import { ActionType } from "../schema_error/ActionTypeRegistry.js";
import { ErrorId } from "../schema_error/ErrorTypeRegistry.js"
//import path from "path/win32";


//Schema validtion Base Model
const BaseError = z.object({
    version: z.string().regex(/^1\.\d+\.\d+$/),
    action: "error_validation",
    timestamp:z.coerce.date(),
    path: z.string().startsWith("/sandbox/") || z.string().endsWith(".md"),
    id: z.string().uuid().default(() => crypto.randomUUID()),
    explanation: z.string().min(1),
    
});
//Schema validtion inherited Model

export const SchemaErrorVal = z.discriminatedUnion( "action", [ 
    //Schema Validation Errors - All will include "Unknown"
    BaseError.extend({
        action: ActionType.THINK || ActionType.FINISH,
        args:{ 
            code: z.enum([
                ErrorId.UNKNOWN_ERROR
            ])
        }
    }),
    BaseError.extend({

        action: ActionType.READ_FILE,
        args:{ 
            code: z.enum([
                ErrorId.PATH_MISSING,
                ErrorId.PATH_NOT_STRING,
                ErrorId.PATH_OUT_OF_BOUNDS,
                ErrorId.UNKNOWN_ERROR
            ])
        }
    }),
    BaseError.extend({
        action: ActionType.WRITE_FILE,
        args:{ 
            code: z.enum([
                ErrorId.PATH_MISSING,
                ErrorId.DISK_FULL,
                ErrorId.UNKNOWN_ERROR
            ])
        }
    }),
    BaseError.extend({
        action: ActionType.LIST_FILES,
        args:{ 
            code: z.enum([
                ErrorId.PATH_MISSING,
                ErrorId.NOT_A_DIRECTORY,
                ErrorId.UNKNOWN_ERROR
            ])
        }
    }),
    BaseError.extend({
        action: ActionType.CREATE_DIRECTORY,
        args:{ 
            code: z.enum([
                ErrorId.PATH_MISSING,
                ErrorId.ALREADY_EXISTS,
                ErrorId.UNKNOWN_ERROR

            ])
        }
    }),
    BaseError.extend({
        action: ActionType.DELETE_FILE,
        args:{ 
            code: z.enum([
                ErrorId.PATH_MISSING,
                ErrorId.FILE_NOT_FOUND,
                ErrorId.PERMISSION_DENIED,
                ErrorId.UNKNOWN_ERROR
            ])
        }
    }),
    BaseError.extend({
        action: ActionType.RENAME_FILE,
        args:{ 
            code: z.enum([
                ErrorId.PATH_MISSING,
                ErrorId.FILE_NOT_FOUND,
                ErrorId.TARGET_ALREADY_EXISTS,
                ErrorId.UNKNOWN_ERROR
            ])
        }
    }),

    
 ]);
 

export type ErrorVal = z.infer<typeof SchemaErrorVal>;
