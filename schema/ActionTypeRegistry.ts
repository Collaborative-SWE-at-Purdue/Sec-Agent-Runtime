// A strict whitelist of the ONLY 4 things the agent can do.

export enum ActionType {
  READ_FILE = "READ_FILE",
  WRITE_FILE = "WRITE_FILE",
  THINK = "THINK",
  FINISH = "FINISH"
}