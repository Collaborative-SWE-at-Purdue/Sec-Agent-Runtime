import { describe, it, expect } from "vitest";
import { AgentProposalSchema } from "../ProposalSchema";
import { ActionType } from "../ActionTypeRegistry";

const TEST_UUID = "00000000-0000-0000-0000-000000000000";

describe("Agent Action Request Security & Validation", () => {

    // Good Actions

  // Valid read operation
  it("should accept a valid READ_FILE proposal", () => {
    const validProposal = {
      id: TEST_UUID,
      schema_version: "1.0.0",
      reasoning: "Reading config to understand context",
      action: ActionType.READ_FILE,
      args: {
        path: "/sandbox/config.json"
      }
    };

    const result = AgentProposalSchema.safeParse(validProposal);
    expect(result.success).toBe(true);
  });

  // write operation to valid extension
  it("should accept a valid WRITE_FILE with valid extension (.txt)", () => {
    const validProposal = {
      id: TEST_UUID,
      schema_version: "1.0.0",
      reasoning: "Creating a log file",
      action: ActionType.WRITE_FILE,
      args: {
        path: "/sandbox/logs/output.txt",
        content: "Hello world"
      }
    };

    const result = AgentProposalSchema.safeParse(validProposal);
    expect(result.success).toBe(true);
  });

  // renaming valid extension
  it("should accept renaming a file to an markdown (.md)", () => {
    const validProposal = {
      id: TEST_UUID,
      schema_version: "1.0.0",
      reasoning: "Renaming safe file to executable",
      action: ActionType.RENAME_FILE,
      args: {
        source: "/sandbox/notes.txt",
        destination: "/sandbox/notes.md" 
      }
    };

    const result = AgentProposalSchema.safeParse(validProposal);
    expect(result.success).toBe(true);
  });

  // delete valid extension
  it("should accept deleting a file with a valid extension (.txt)", () => {
    const validProposal = {
      id: TEST_UUID,
      schema_version: "1.0.0",
      reasoning: "Deleting a file",
      action: ActionType.DELETE_FILE,
      args: {
        path: "/sandbox/notes.txt"
      }
    };

    const result = AgentProposalSchema.safeParse(validProposal);
    expect(result.success).toBe(true);
  });

  // Bad Actions

  // write operation to invalid extension
  it("should reject writing executable files (.sh)", () => {
    const attackProposal = {
      id: TEST_UUID,
      schema_version: "1.0.0",
      reasoning: "I am trying to run this script",
      action: ActionType.WRITE_FILE,
      args: {
        path: "/sandbox/malicious_script.sh",
        content: "rm -rf /"
      }
    };

    const result = AgentProposalSchema.safeParse(attackProposal);
    expect(result.success).toBe(false);
  });

  // renaming unsafe extension
  it("should reject renaming a file to an executable (.exe)", () => {
    const attackProposal = {
      id: TEST_UUID,
      schema_version: "1.0.0",
      reasoning: "Renaming safe file to executable",
      action: ActionType.RENAME_FILE,
      args: {
        source: "/sandbox/notes.txt",
        destination: "/sandbox/virus.exe" 
      }
    };

    const result = AgentProposalSchema.safeParse(attackProposal);
    expect(result.success).toBe(false);
  });

  // delete invalid extension
  it("should reject deleting a file with an invalid extension (.exe)", () => {
    const attackProposal = {
      id: TEST_UUID,
      schema_version: "1.0.0",
      reasoning: "Deleting an executable file",
      action: ActionType.DELETE_FILE,
      args: {
        path: "/sandbox/virus.exe"
      }
    };

    const result = AgentProposalSchema.safeParse(attackProposal);
    expect(result.success).toBe(false);
  });

  // Not starting with /sandbox/
  it("should reject paths outside the sandbox", () => {
    const attackProposal = {
      id: TEST_UUID,
      schema_version: "1.0.0",
      reasoning: "Reading system passwords",
      action: ActionType.READ_FILE,
      args: {
        path: "/etc/password"
      }
    };

    const result = AgentProposalSchema.safeParse(attackProposal);
    expect(result.success).toBe(false);
  });

  // Missing reasoning
  it("should fail if 'reasoning' is missing", () => {
    const invalidProposal = {
      id: TEST_UUID,
      schema_version: "1.0.0",
      // reasoning is missing
      action: ActionType.READ_FILE,
      args: { path: "/sandbox/test.txt" }
    };

    const result = AgentProposalSchema.safeParse(invalidProposal);
    expect(result.success).toBe(false);
  });
  
  // Mismatched args
  it("should fail if args do not match the action", () => {
    const invalidProposal = {
      id: TEST_UUID,
      schema_version: "1.0.0",
      reasoning: "Mixed up args",
      action: ActionType.READ_FILE,
      args: { 
        // READ_FILE only takes 'path', but we provided 'content'
        content: "This shouldn't be here" 
      }
    };

    const result = AgentProposalSchema.safeParse(invalidProposal);
    expect(result.success).toBe(false);
  });

  // Invalid UUID
  it("should fail if 'id' is not a valid UUID", () => {
    const invalidProposal = {
      id: "invalid-uuid",
      schema_version: "1.0.0",
      reasoning: "Testing invalid UUID",
      action: ActionType.READ_FILE,
      args: { path: "/sandbox/test.txt" }
    };

    const result = AgentProposalSchema.safeParse(invalidProposal);
    expect(result.success).toBe(false);
  });

  // Unsupported action
  it("should fail if 'action' is unsupported", () => {
    const invalidProposal = {
      id: TEST_UUID,
      schema_version: "1.0.0",
      reasoning: "Testing unsupported action",
      action: "UNSUPPORTED_ACTION",
      args: { path: "/sandbox/test.txt" }
    };

    const result = AgentProposalSchema.safeParse(invalidProposal);
    expect(result.success).toBe(false);
  });
});