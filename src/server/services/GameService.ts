import { Service, OnStart } from "@flamework/core";
import { InventoryService } from "./InventoryService";
import { Players } from "@rbxts/services";
import { PlayerService } from "./PlayerService";
import { GamePhase } from "shared/enums/GameEnums";
import { GameConfig } from "shared/config/GameConfig";
@Service()
export class GameService implements OnStart {
	private gamePhase: GamePhase = GamePhase.NotStarted;

	constructor(private inventoryService: InventoryService, private playerService: PlayerService) {}

	onStart() {
		try {
			// Set up services on players
			Players.PlayerAdded.Connect((player) => {
				this.inventoryService.createInventory(player.UserId);
				this.updateGameState();
			});
			Players.PlayerRemoving.Connect((player) => {
				this.inventoryService.removeInventory(player.UserId);
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
			print(`Setting up player: ${player.Name}`);
			this.playerService.initPlayerData(player.UserId);
			print(`Initialized player data for ${this.playerService.getPlayerData(player.UserId)?.name}`);
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

		print("Current Game Phase:", this.gamePhase);

		// Debug
		this.startGame();
	}
}
