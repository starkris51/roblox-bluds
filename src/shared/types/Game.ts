import { GamePhase } from "shared/enums/GameEnums";

export interface GameState {
	currentPhase: GamePhase;
	votingResults?: VotingResults;
}

export interface VotingResults {
	votes: Map<Player, Player | "skip">;
	ejectedPlayer?: Player;
}
