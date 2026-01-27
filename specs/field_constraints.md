# Field Constraints (Requirements)

### Task: Define proposal field constraints
    - Description: Clarifies which fields are required, optional, forbidden, or mutually exclusive. Prevents ambiguity in agent intent encoding.
    - Responsibilities: Specify required vs optional fields and define forbidden fields
    - Output: Field constraint documentation
    - Acceptance Criteria: Ambiguous proposals are rejected
    - Pitfalls: Optional fields tend to become implicit control channels

### Proposal:

The agents shall follow a JSON schema. This schema will divide the payload into global fields and action
arguments. 

#### Global Field Constraints (Requirements)

Every JSON received from the LLM shall follow the following schema:

| Field            | Requirement | Type   | Description                                                  |
|------------------|-------------|--------|--------------------------------------------------------------|
| schema_version   | required    | string | Must match pattern 1.x.x. Rejects all other patterns         |
| action           | required    | enum   | Must match a value from the Allowed Action Types list above. |
| reasoning        | required    | string | Min length of 1 char.  Required for auditing intent          |
| id               | required    | uuid   | id for request. Used for auditing and traceability           |
| args        | required    | object | contains the action parameters                               |

#### Action Field Constraints (Requirements)

The ```args``` parameter shall follow the following constraints for each action type:

Action:
- THINK: 
    - ```args``` shall be empty ```{}```

- FINISH: 
    - ```args``` shall contain ```response``` string

- READ_FILE: 
    - ```args``` shall contain ```path```. ```path``` must start with ```/sandbox/```

- WRITE_FILE: 
    - ```args``` shall contain ```path```. ```path``` must start with ```/sandbox/``` and end with ```.txt``` or ```.md```
    - ```args``` shall contain ```content```. ```content``` must be a string with min length of 1 char

The following is an example of the schema the LLM must follow:

```JSON
{
  "schema_version": "1.0.1",          
  "id": "123...",           
  "reasoning": "I need to save the log", 
  "action": "WRITE_FILE",             
  "args": {                           
     "path": "/sandbox/log.txt",
     "content": "Hello World!"
  }
}
```