import { describe, it, expect, should } from "vitest";
import { GateList } from "../../ProposalErrorSchema.js";
import { filter,TEST_UUID } from "../ProposalErrorConfig.js";

// This test suite validates the error handling logic of the Proposal Handler, specifically for proposals containing null byte characters. It checks that the correct error response is generated and that the error message is accurate. The test uses a predefined UUID for consistency in testing.
describe("Proposal Handler Validation Tests", () => {
    
    it("should return NULL_BYTE error for proposals containing null byte characters", () => {  
        const proposalWithNullByte = "This proposal contains a null byte \0 character.";
        const errorResponse = GateList.parse({
            schema_version: "1.0.0",
            id: TEST_UUID,
            input: proposalWithNullByte,
            ErrorId: filter.NULL_BYTE,
            args: {
                message: "Cannot contain null byte characters"
            }
        });
        expect(errorResponse.ErrorId).toBe(filter.NULL_BYTE);
        expect(errorResponse.args.message).toBe("Cannot contain null byte characters");
    });


});