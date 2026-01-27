// ActionCategory --> ActionType --> Action

//  This enum type does not yet exist, but eventually it will. For now, I define a dummy/
//import { ActionType } from "./ActionTypeRegistry";

// Dummy. Must be defined eventually.
type ActionType = {};

// Single action step from an agent proposal
export interface AgentProposalStep {
  step_id: string; // step PK
  action: ActionType; // type of action proposed | comes from ActionType enum
  target: string; // affected entity, e.g. filename, branch name, etc.
  destination?: string; // opt. for modifications (i.e. move/rename)
  content?: string; // opt. for write/create
  metadata?: Record<string, unknown>; // freeform field for extra info. Could do a minimal type.
}

// Full agent proposal containing >= 1 AgentProposalStep
export interface AgentProposal {
  proposal_id: string; // proposal PK
  agent_id: string; // identifies the LLM agent
  timestamp: string; // ISO string for time when proposal was generated
  steps: AgentProposalStep[]; // the steps the agent wants to take
}
