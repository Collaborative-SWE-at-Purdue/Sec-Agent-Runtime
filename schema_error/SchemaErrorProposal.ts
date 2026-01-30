import * as z from "zod";
import { ActionType } from "../schema_error/ActionTypeRegistry.js";


//error response types 
// Preliminary reusable schema components
const SchemaVersion = z.string().regex(/^1\.\d+\.\d+$/);
const SchemaPath = z.string().startsWith("/sandbox/");
export enum ErrorId {
  // Schema Validation
  PATH_MISSING = "PATH_MISSING",
  PATH_NOT_STRING = "PATH_NOT_STRING",
  PATH_OUT_OF_BOUNDS = "PATH_OUT_OF_BOUNDS",

  // Read & Inspection
  PATH_NOT_FOUND = "PATH_NOT_FOUND",
  IS_DIRECTORY = "IS_DIRECTORY",
  NOT_A_DIRECTORY = "NOT_A_DIRECTORY",

  // State Modification
  ALREADY_EXISTS = "ALREADY_EXISTS",
  DISK_FULL = "DISK_FULL",
  IO_ERROR = "IO_ERROR",

  // High-Risk Operations
  FILE_NOT_FOUND = "FILE_NOT_FOUND",
  PERMISSION_DENIED = "PERMISSION_DENIED",
  TARGET_ALREADY_EXISTS = "TARGET_ALREADY_EXISTS",

  // Fallback
  UNKNOWN_ERROR = "UNKNOWN_ERROR"
}

//Primary Schema Export Structure

//Schema validtion model
const BaseError = z.object({
    version: SchemaVersion,
    action: "error_validation",
    path: SchemaPath

});
export const SchemaErrorVal = z.discriminatedUnion( "action", [ 
    //Schema Validation Errors - All will include "Unknown"
    BaseError.extend({
        action: ActionType.THINK || ActionType.FINISH,
        args:{ 
            id: ErrorId.UNKNOWN_ERROR
        }


    })
    //Read and Inspection Errors

    //State Modification Errors 

    //High Risk Operation Errors 




]);

export type ErrorVal = z.infer<typeof SchemaErrorVal>;
