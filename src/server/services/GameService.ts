import { Service, OnStart } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { PlayerService } from "./PlayerService";
import { GamePhase } from "shared/enums/GameEnums";
import { GameConfig } from "shared/config/GameConfig";
@Service()
export class GameService implements OnStart {
	private gamePhase: GamePhase = GamePhase.NotStarted;

	constructor(private playerService: PlayerService) {}

	onStart() {
		Players.CharacterAutoLoads = true;

		try {
			// Set up services on players
			Players.PlayerAdded.Connect((player) => {
				this.updateGameState();
			});

			Players.PlayerRemoving.Connect((player) => {
				this.playerService.removePlayerData(player.UserId);
				this.updateGameState();
			});

			print("GameService started");
		} catch (error) {
			warn("Error in GameService onStart:", error);
		}
	}

	startGame(): void {
		for (const player of Players.GetPlayers()) {
			this.playerService.initPlayerData(player.UserId);
		}

		this.gamePhase = GamePhase.Playing;
		print("Game started");
	}

	updateGameState(): void {
		// Implement game state updates here
		if (this.gamePhase === GamePhase.NotStarted && Players.GetPlayers().size() >= GameConfig.MIN_PLAYERS) {
			this.gamePhase = GamePhase.Starting;
		} else if (this.gamePhase === GamePhase.Playing && Players.GetPlayers().size() < GameConfig.MIN_PLAYERS) {
			this.gamePhase = GamePhase.Results;
		}

		// Debug
		this.startGame();
	}
}
