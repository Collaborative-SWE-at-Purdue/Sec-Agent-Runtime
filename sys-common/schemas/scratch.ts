        const proposalObj = JSON.parse(proposal);
        const reference = AgentProposalSchema.parse();
        const referenceObj = AgentProposalSchema.parse(reference);


        for(let key in referenceObj){
            if( !(proposalObj[key] || proposalObj[key] === "") ){
                missing_fields.push(key);
            }
        }   