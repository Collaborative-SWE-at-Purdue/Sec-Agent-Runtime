//Error type examples


//\0 check, Null Byte Exists 
//Trim for whitespace 
//Non Printable ASCII Characters 
//payload max 1024
//reasoning max 1024
//ID Collisions? 

//sanitize path size? 
//error response types

export enum filter {
 NULL_BYTE  = "NULL_BYTE",
 WHITE_SPACE = "WHITE_SPACE",
 INVALID_ASCII = "INVALID ASCII",
 PAYLOAD_OVERFLOW = "PAYLOAD_OVERFLOW"
 ID_COLLISION = "ID_COLLISION"
 INVALID_PROPOSAL = "INVALID_PROPOSAL"

}

