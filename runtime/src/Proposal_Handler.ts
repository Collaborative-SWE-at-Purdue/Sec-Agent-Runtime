import * as z from "zod";
import { filter,valid_ascii, proposal_limit, schema_version, TEST_UUID } from "../../sys-common/schemas/ProposalErrorConfig.js";
import { GateList } from "../../sys-common/schemas/ProposalErrorSchema.js";
import {AgentProposalSchema} from "../../sys-common/schemas/ProposalSchema.js"
import { Agent } from "node:http";


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
/*Right now I will just have it check an empty file, 
but eventually this should be checking against a 
database/logfile of logged proposal IDs.*/

function ValidateIDCollision (proposal: string) {
    const backlogIDs: string[] = [TEST_UUID]; // This should be replaced with actual backlog data source

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
    //Missing Fields Check - Our Schema is only comprised of strings and numbers ATP.
    const missing_fields: (string | number) [] = []
    //Grab correct reference schema and parse proposal 
    const ParsedProposal = JSON.parse(proposal);
    const ReferenceSchema = AgentProposalSchema.options.find(schema => schema.shape.action === ParsedProposal.action);
    const ParsedRef  =  ReferenceSchema?.shape;


    //Reference Incoming Proposal against Correct Schema for missing units. 
    for (const key in ParsedRef) {
        if (ParsedProposal[key] === undefined || ParsedProposal[key] === null || ParsedProposal[key] === "" ) {
            missing_fields.push(key);
        }
    }

    //If there are 1 or more missing fields, return error response with list of missing fields.
    if (missing_fields.length > 0) {
        const missing_string = missing_fields.join(", ");
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

