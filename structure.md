# Repository Structure

    runtime/					# Core execution and policy engine (TS)
    	- src/
    		- actions/					# Definitions of allowed actions
    		- policy/					# Policy evaluation & decision logic
    		- state/					# Runtime state model & transitions
    		- execution/				# Step loop, action dispatch
    		- logging/					# Structured logging & audit trail
    		- errors/					# Runtime error model
    		- invariants/				# Runtime guarantees & assertions
    	- tests/
    	- tsconfig.json
    	- package.json
    	- jest.config.ts
    	- index.ts


    api/						# Client-facing runtime API (TS)
    	- src/
    		- routes/					# API routes
    		- middleware/				# API Middleware
    		- validation/				# Client request validation
    		- errors/					# Client-side error mapping
    		- sessions/					# Session lifecycle management
    	- tests/
    	- tsconfig.json
    	- package.json
    	- jest.config.ts
    	- index.ts


    agent-comms/				# Agent-runtime communication interface
    	- src/
    		- proposal/					# Proposal schema + builders
    		- serialization/			# Message formatting
    		- client/					# Runtime request/response handling
    		- retry/					# Error handling & retires
    		- logging/					# Agent-side traces
    		- examples/					# Req, resp, usage examples
    	- tests/
    	- pyproject.toml
    	- requirements.txt


    system-specs/				# System contracts (lang agnostic); diagrams
    	- proposal_schema/
    	- action-model/
    	- policy-model/
    	- state-model/
    	- logging-model/
    	- invariants.md

    evaluation/					# Adversarial & metrics work (Python)
    	- adversarial/				# Representative bad proposals
    	- simulation/				# Multi-agent harness
    	- metrics/					# Metric definitions & computation
    	- reports/
    	- notebooks/				# Optional analysis
    	- pyproject.toml
    	- requirements.txt


    docs/						# Public-facing external documentation
    	- architecture.md
    	- threat-model.md
    	- policy-design.md
    	- evaluation-methodology.md
    	- etc.


    shared/						# Necessarily common definitions
    	- constants/
    	- ids/
    	- versioning/


    scripts/					# dev, ci, etc.


    README.md
    LICENSE
