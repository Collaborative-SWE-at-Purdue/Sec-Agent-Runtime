import os
from anthropic import Anthropic
import AgentConfig

class AgentInterface:
    def __init__(
        self,
        api_key:str = "ANTHROPIC_API_KEY",  
        model: str = "claude-sonnet-4-6",
        max_retries: int = 3): 
        self.client = Anthropic(api_key=api_key)
        self.model = model 
        self.proposal_history = []
        self.prompt = ""
        self.active = True
    
    def proposal(self,message:str) -> str: 
        #Confirm agent active (Should be if possible.)
        if(not self.active):
            return "Interface not active"
        else:     
            try:
                return self.client.messages.create(max_tokens=1024,
                    model=self.model,
                    messages=[{"role": "user", "content": message}]
                )
                self.proposal_history.append(message)

            except Exception as e:
                print(f"Something went wrong: {e}")

    def close(self):
        self.active = False
        print("Agent has closed - Deleting History")
        self.proposal_history = []
   
    def open(self): 
        print("Agent has opened")
        self.active = True
