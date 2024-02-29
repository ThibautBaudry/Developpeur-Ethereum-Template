// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {

    enum WorkflowStatus { RegisteringVoters, ProposalsRegistrationStarted, ProposalsRegistrationEnded, VotingSessionStarted, VotingSessionEnded, VotesTallied }

    struct Voter { 
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
        }
        
    struct Proposal {
        string description;
        uint voteCount;
        }

    WorkflowStatus public status;
    
    Proposal[] public proposals;

    mapping (address => bool) whitelist;

    mapping (address => Voter) public voters;

    event VoterRegistered (address voterAddress); 
    event WorkflowStatusChange (WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered (uint proposalId);
    event Voted (address voter, uint proposalId);

    constructor() Ownable (msg.sender) { }

    function getStatus() internal view returns (WorkflowStatus) {

        return status; 

    }
    
    function setStatus(WorkflowStatus _nextStatus) external onlyOwner {

        status = _nextStatus;
        emit WorkflowStatusChange(status, _nextStatus);

    }

    function addToWhitelist(address _address) external onlyOwner {

        require (status == WorkflowStatus.RegisteringVoters, "The Administrator has closed the registering time");
        require (_address != address(0), "Address 0, try again please :)");
        require (!whitelist[_address], "You are already Whitelisted");
        
        whitelist[_address] = true;

        emit VoterRegistered(_address);
        
    }
    
    function registerProposal(address _address, string calldata _description) external {

        require (status == WorkflowStatus.ProposalsRegistrationStarted, "The Administrator has closed the proposal registration");
        require (whitelist[_address], "You are not whitelisted: you cannot add a proposal");

        proposals.push(Proposal(_description, 0));

        emit ProposalRegistered(proposals.length);

    }

    function addVote(address _address, uint _proposalID) external {

        require (status == WorkflowStatus.VotingSessionStarted, "The Administrator has closed the voting session");
        require (whitelist[_address], "You are not whitelisted: you cannot vote");

        voters[_address].isRegistered = true;
        voters[_address].hasVoted = true;
        voters[_address].votedProposalId = _proposalID;
        
        proposals[_proposalID].voteCount ++;

        emit Voted(_address, _proposalID);
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);

    }

    function getWinnerIndex () private returns (uint winningProposalId) {

        for (uint i = 0 ; i < proposals.length ; i++){
            if(proposals[i].voteCount > winningProposalId){
                winningProposalId = proposals[i].voteCount;
            }
            else {
                return winningProposalId;
            }  
        }

        emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);

    }

    function getWinner () external returns (string memory) {

        return proposals[getWinnerIndex()].description;

    }

}