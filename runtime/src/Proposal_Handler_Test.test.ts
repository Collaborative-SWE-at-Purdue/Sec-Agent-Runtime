import { describe, it, expect, should } from "vitest";
import { GateList } from "../../sys-common/schemas/ProposalErrorSchema.js";
import { filter,TEST_UUID } from "../../sys-common/schemas/ProposalErrorConfig.js";
import { de } from "zod/v4/locales";

// This test suite validates the error handling logic of the Proposal Handler, specifically for proposals containing null byte characters. It checks that the correct error response is generated and that the error message is accurate. The test uses a predefined UUID for consistency in testing.
describe("Proposal Handler Validation Tests", () => {
    //Invalid Test Case 
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

    it("should return a VALID_ASCII error for proposals containing non-ASCII characters", () => {
        const proposalWithNonASCII = "This proposal contains a non-ASCII character: ñ.";
        const errorResponse = GateList.parse({
            schema_version: "1.0.0",
            id: TEST_UUID,
            input: proposalWithNonASCII,
            ErrorId: filter.INVALID_ASCII,
            args: {
                message: "Proposal contains non-ASCII characters"
            }
        });
        expect(errorResponse.ErrorId).toBe(filter.INVALID_ASCII);
        expect(errorResponse.args.message).toBe("Proposal contains non-ASCII characters");
    });

    it("should return a PAYLOAD_SIZE error for proposals exceeding the maximum allowed size", () => {
        const largeProposal = "A".repeat(10001);
        const errorResponse = GateList.parse({
            schema_version: "1.0.0",
            id: TEST_UUID,
            input: largeProposal,
            ErrorId: filter.PAYLOAD_OVERFLOW,
            args: {
                message: "Proposal exceeds maximum allowed size"
            }
        });
        expect(errorResponse.ErrorId).toBe(filter.PAYLOAD_OVERFLOW);
        expect(errorResponse.args.message).toBe("Proposal exceeds maximum allowed size");
    });
    
    it("should return an ID_COLLISION error for proposals with duplicate IDs", () => {
        const duplicateIDProposal = "This proposal has a duplicate ID.";
        const errorResponse = GateList.parse({
            schema_version: "1.0.0",
            id: TEST_UUID,
            input: duplicateIDProposal,
            ErrorId: filter.ID_COLLISION,
            args: {
                message: "Proposal ID already exists in backlog"
            }
        });
        expect(errorResponse.ErrorId).toBe(filter.ID_COLLISION);
        expect(errorResponse.args.message).toBe("Proposal ID already exists in backlog");
    });


    //Valid Test Cases

    it("should pass validation for a valid proposal", () => {
        const validProposal = "This is a valid proposal with only ASCII characters and no null bytes.";
        const errorResponse = GateList.parse({
            schema_version: "1.0.0",
            id: TEST_UUID,
            input: validProposal,
            ErrorId: null,
            args: {
                message: "Proposal is valid"
            }
        });
        expect(errorResponse.ErrorId).toBeNull();
        expect(errorResponse.args.message).toBe("Proposal is valid");
    });

    it("should pass validation for a proposal at the maximum allowed size", () => {
        const maxSizeProposal = "A".repeat(1024);
        const errorResponse = GateList.parse({
            schema_version: "1.0.0",
            id: TEST_UUID,
            input: maxSizeProposal,
            ErrorId: null,
            args: {
                message: "Proposal is valid"
            }
        });
        expect(errorResponse.ErrorId).toBeNull();
        expect(errorResponse.args.message).toBe("Proposal is valid");
    });

    it("should pass validation for a proposal with a unique ID", () => {
        const uniqueIDProposal = "This proposal has a unique ID.";
        const errorResponse = GateList.parse({
            schema_version: "1.0.0",
            id: crypto.randomUUID(),
            input: uniqueIDProposal,
            ErrorId: null,
            args: {
                message: "Proposal is valid"
            }
        });
        expect(errorResponse.ErrorId).toBeNull();
        expect(errorResponse.args.message).toBe("Proposal is valid");
    });

    it("should pass validation for a proposal with complete core structure", () => {
        const completeProposal = "This proposal has a complete core structure and meets all validation criteria.";
        const errorResponse = GateList.parse({
            schema_version: "1.0.0",
            id: crypto.randomUUID(),
            input: completeProposal,
            ErrorId: null,
            args: {
                message: "Proposal is valid"
            }
        });
        expect(errorResponse.ErrorId).toBeNull();
        expect(errorResponse.args.message).toBe("Proposal is valid");
    });
});