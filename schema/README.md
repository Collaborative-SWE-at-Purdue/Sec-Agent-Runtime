This document highlights the Allowed action types for an LLM

Tasks to complete:

1. Enumerated allowed action types
    - Description: Defines the complete set of action categories an agent is permitted to request. Forms the semantic surface of agent intent.
    - Responsibilities: Identify action categories and document the intent of each
    - Outputs: Action type registry
    - Acceptance Criteria: All proposals reference known action types
    - Pitfalls: Overbroad categories weaken policy enforcement

2. Define proposal field constraints
    - Description: Clarifies which fields are required, optional, forbidden, or mutually exclusive. Prevents ambiguity in agent intent encoding.
    - Responsibilities: Specify required vs optional fields and define forbidden fields
    - Output: Field constraint documentation
    - Acceptance Criteria: Ambiguous proposals are rejected
    - Pitfalls: Optional fields tend to become implicit control channels