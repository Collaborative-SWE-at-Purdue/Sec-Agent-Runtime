import * as z from "zod";
import { filter } from "../../sys-common/schemas/ProposalErrorRegistry.js";
import { GateList } from "../../sys-common/schemas/ProposalErrorSchema.js";


//Proposal Error handling logic for incoming proposals.
//This should be done in Typescript PascalCase for better readability and maintainability.
const ValidASCII = /^[ -~]*$/;


function ValidateProposal(proposal: string) {
    // Check for null byte characters
    
    
};
    
    
    
    
 function ValidateNullByte(proposal: string) {  
     if (proposal.includes("\0")) {
        return { 
            schema_version: "1.0.0",
            id: crypto.randomUUID(),
            input: proposal,
            ErrorId: filter.NULL_BYTE,
            args: {
                message: "Cannot contain null byte characters"
            }
        };
    }
 }
    // Check for valid ASCII characters
    if (!ValidASCII.test(proposal)) {
        return { 
            schema_version: "1.0.0",
            id: crypto.randomUUID(),
            input: proposal,
            ErrorId: filter.INVALID_ASCII,
            args: {
                message: "Cannot contain invalid ASCII characters"
            }
        };

    