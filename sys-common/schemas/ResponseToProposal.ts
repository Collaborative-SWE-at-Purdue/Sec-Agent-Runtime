import { ActionType } from "./ActionTypeRegistry";

type DecisionForProposal = "approved" | "denied" | "partial";

// Result tied to a single specific step from a proposed sequence
export interface StepResult {
  step_id: string; // step PK. step FK?
  action: ActionType; // Currently a dummy placeholder while Kevin works out full enum
  success: boolean;
  message?: string; // i.e. reason for denial: if !(StepResult.success) --> ____
}

// Runtime response to a proposal
export interface ResponseToProposal {
  proposal_id: string;
  status: DecisionForProposal;
  step_results: StepResult[];
}
