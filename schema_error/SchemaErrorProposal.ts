import * as z from "zod";
import { ActionType } from "../schema_error/ActionTypeRegistry.js";


//error response types 
// Preliminary reusable schema components
const SchemaVersion = z.string().regex(/^1\.\d+\.\d+$/);
const SchemaPath = z.string().startsWith("/sandbox/");
const ErrorCodes = z.enum([ 
    //Schema Validation Errors
    "INVALID_VERSION",
    "PATH_MISSING",
    "INVALID_FORMAT",
    "PATH_OUT_OF_BOUNDS",
    //Read and Inspection Errors
    "PATH_NOT_FOUND",
    "IS_DIRECTORY",
    "NOT_DIRECTORY",
    //State Modification Errors
    "FILE_NOT_FOUND",
    "ALREADY_EXISTS",
    "DIRECTORY_IN_USE",
    "DISK_FULL",
    //High_Risk_Operation Errors
    "PERMISSION_DENIED",
    "TARGET_ALREADY_EXISTS",
    
    //Other Errors
    "UNKNOWN_ERROR"
])


//Primary Schema Export Structure

//Schema validtion model
const base = z.object({
    version: SchemaVersion,
    action: "error_code",
    path: SchemaPath

})
export const SchemaErrorVal = z.object({
    
})

export type ErrorVal = z.infer<typeof SchemaErrorVal>
