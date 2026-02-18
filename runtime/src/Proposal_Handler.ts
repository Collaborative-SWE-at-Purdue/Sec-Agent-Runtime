import * as z from "zod";
import { filter,valid_ascii, proposal_limit, schema_version } from "../../sys-common/schemas/ProposalErrorConfig.js";
import { GateList } from "../../sys-common/schemas/ProposalErrorSchema.js";
import { text } from "node:stream/consumers";


//Proposal Error handling logic for incoming proposals.
//This should be done in Typescript PascalCase for better readability and maintainability.


function ValidateProposal(proposal: string) {
    // Check for null byte characters
    
    
};
    
    
    
    
 function ValidateNullByte(proposal: string) {  
     if (proposal.includes("\0")) {
        return { 
            schema_version: schema_version,
            id: crypto.randomUUID(),
            input: proposal,
            ErrorId: filter.NULL_BYTE,
            args: {
                message: "Cannot contain null byte characters"
            }
        };
    }
 };
    // Check for valid ASCII characters
function ValidateASCII(proposal: string) {
    if (!valid_ascii.test(proposal)) {
        return { 
            schema_version: schema_version,
            id: crypto.randomUUID(),
            input: proposal,
            ErrorId: filter.INVALID_ASCII,
            args: {
                message: "Cannot contain invalid ASCII characters"
            }
        }
        
    }
};
// Check for payload size
function validatePayloadSize(proposal: string) {
    //Convert Proposal to bytes
    const ProposalByteSize = (str:string) => new TextEncoder().encode(str).length;
    //Check if proposal exceeds limit
    if (ProposalByteSize(proposal) > proposal_limit ) {
        return { 
            schema_version: schema_version,
            id: crypto.randomUUID(),
            input: proposal,
            ErrorId: filter.PAYLOAD_OVERFLOW,
            args: {
                size: ProposalByteSize(proposal),
                limit: 1024,
                message: "Payload exceeds maximum size of 1024 characters"
                }
        }
    }
};

//Check for ID Collision
//WIP to check proposal ID against backlog. 
function ValidateIDCollision (proposal: string) {

    if (backlogIDs.includes(proposal)) {
        return { 
            schema_version: schema_version,
            id: crypto.randomUUID(),
            input: proposal,
            ErrorId: filter.ID_COLLISION,
            args: {
                incoming: proposal,
                backlog: backlogIDs.find(id => id === proposal) || "",
                message: "ID matches with previously logged proposal ID"
            }
        }
    }
};



//Check for invalid strucure.

function ValidateCoreStructure(proposal:string) {
    const missing_fields: (string | number) [] = []
        //Check for missing or empty sections. 
        for(let i = 0; i < ){
        
            if( || key === ""){
                missing_fields.push(key);
            }
        }
    //If array contains missing fields

    if(missing_fields.length() > 0){
        const missing_string: string = missing_fields.toString();
        return { 
            schema_version: schema_version,
            id: crypto.randomUUID(),
            input: proposal,
            ErrorId: filter.MISSING_CONTENT,
            args: {
                fields: missing_string,
                message: "Required field is missing or empty"
            }
        }

    }

}

