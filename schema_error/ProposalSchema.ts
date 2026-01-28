import { z } from "zod";
import { ActionType } from "./ActionTypeRegistry";

// Schema Versioning Strategy:
const Base = z.object({
  version: z.string().regex(/^1\.\d+\.\d+$/), 
  id: z.string().uuid().default(() => crypto.randomUUID()),
  reasoning: z.string().min(1),
});

export const AgentProposalSchema = z.discriminatedUnion("action", [
  
  Base.extend({
    action: z.literal(ActionType.READ_FILE),
    arguments: z.object({ 
      path: z.string().startsWith("/sandbox/")
    }).strict()
  }),

  Base.extend({
    action: z.literal(ActionType.WRITE_FILE),
    arguments: z.object({
      path: z.string()
        .startsWith("/sandbox/")
        .refine(path => path.endsWith(".txt") || path.endsWith(".md")),
      content: z.string().min(1)
    }).strict()
  }),

  Base.extend({
    action: z.literal(ActionType.THINK),
    arguments: z.object({}).strict()
  }),

  Base.extend({
    action: z.literal(ActionType.FINISH),
    arguments: z.object({
      response: z.string()
    }).strict()
  })
]);

export type AgentProposal = z.infer<typeof AgentProposalSchema>;