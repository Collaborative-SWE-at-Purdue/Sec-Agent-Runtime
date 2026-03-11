from agent import AgentInterface
import os

def test_proposal():
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    agent = AgentInterface(api_key=api_key)

    question = "What is 2 + 2?"
    print(f"Sending question: {question}")

    response = agent.proposal(question)
    print(f"Response: {response}")

    agent.close()

if __name__ == "__main__":
    test_proposal()
