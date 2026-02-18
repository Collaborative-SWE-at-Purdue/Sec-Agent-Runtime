//Proposal Error handling limits and configurations

export const schema_version = "1.0.0"; // Schema version for error responses
export const valid_ascii = /^[ -~]*$/; // Regex for valid ASCII characters
export const proposal_limit = 1024; // 1KB limit for proposal size

export enum filter {
 NULL_BYTE  = "NULL_BYTE",
 INVALID_ASCII = "INVALID ASCII",
 PAYLOAD_OVERFLOW = "PAYLOAD_OVERFLOW",
 ID_COLLISION = "ID_COLLISION",
 INVALID_CONTENT = "INVALID_CONTENT",
 MISSING_CONTENT = "MISSING_CONTENT"
}//error response types

