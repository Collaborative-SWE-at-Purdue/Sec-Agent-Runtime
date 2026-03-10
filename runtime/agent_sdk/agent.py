import os
from anthropic import Anthropic
from AgentConfig

class AgentInterface:
    def __init__(self,api_key:str, model: str = "claude-sonnet-4-6"): 
        self.client = Anthropic(api_key)
        self.model = model 
        self.proposal_history = []
        self.prompt = ""
        self.active = True
    
    def proposal(self,message:str) -> str: 
        #Confirm agent active (Should be if possible.)
        if(!self.active):
            return "Interface not active"
        else:     
            try:
                return self.send(message)
            except Exception as e:
                print(f"Something went wrong: {e}")

    def close(self):
        self.active = False
        print("Agent has closed - Deleting History")
        self.proposal_history = []
   
    def open(self): 
        print("Agent has opened")
        self.active = True
        