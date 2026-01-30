# Error Validation Documentation

## Overview
This module defines the structural requirements and error codes for file system operations within the sandbox environment. It ensures all errors are versioned, traceable, and context-specific.

## Error ID Registry
Use these codes within the `args.code` property of a `SchemaErrorVal`.

| Error ID | Category | Description |
| :--- | :--- | :--- |
| `PATH_MISSING` | Schema Validation | The path parameter was not provided. |
| `PATH_NOT_STRING` | Schema Validation | The path is not a string (e.g., number or object). |
| `PATH_OUT_OF_BOUNDS` | Schema Validation | Path does not start with the mandatory `/sandbox/` prefix. |
| `PATH_NOT_FOUND` | Read / State | Target file/directory or parent directory does not exist. |
| `IS_DIRECTORY` | Read & Inspection | Attempted to read a path that is actually a folder. |
| `NOT_A_DIRECTORY` | Read & Inspection | Attempted to list contents of a path that is a file. |
| `ALREADY_EXISTS` | State Modification | Attempted to create a file or directory that already exists. |
| `UNKNOWN_ERROR` | General | An unhandled or internal system error occurred. |

## Data Model (Zod)
**See dependencies for more information 
### Base Schema Constraints
All errors inherit these core fields:
*   **version**: Must follow semantic versioning (e.g., `1.0.0`).
*   **action**: Constant value `error_validation`.
*   **timestamp**: Auto-coerced ISO date.
*   **path**: Must start with `/sandbox/` **OR** end with `.md`.
*   **id**: Auto-generated RFC 4122 UUID.
*   **explanation**: A mandatory human-readable string.

### Action-Specific Validation
The schema uses a **Discriminated Union** on the `action` field. This ensures that only relevant `ErrorId` codes are allowed for specific operations:

| Action | Allowed Error Codes (`args.code`) |
| :--- | :--- |
| `READ_FILE` | `PATH_MISSING`, `PATH_NOT_STRING`, `PATH_OUT_OF_BOUNDS`, `UNKNOWN_ERROR` |
| `WRITE_FILE` | `PATH_MISSING`, `DISK_FULL`, `UNKNOWN_ERROR` |
| `LIST_FILES` | `PATH_MISSING`, `NOT_A_DIRECTORY`, `UNKNOWN_ERROR` |
| `DELETE_FILE` | `PATH_MISSING`, `FILE_NOT_FOUND`, `PERMISSION_DENIED`, `UNKNOWN_ERROR` |
| `RENAME_FILE` | `PATH_MISSING`, `FILE_NOT_FOUND`, `TARGET_ALREADY_EXISTS`, `UNKNOWN_ERROR` |

---
*Generated via [Zod Documentation Standards](https://zod.dev)*
