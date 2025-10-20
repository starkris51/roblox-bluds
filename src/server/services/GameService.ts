import { Service, OnStart } from "@flamework/core";
import { InventoryService } from "./InventoryService";
import { Players } from "@rbxts/services";
import { PlayerService } from "./PlayerService";
@Service()
export class GameService implements OnStart {
	constructor(private inventoryService: InventoryService, private playerService: PlayerService) {}

	onStart() {
		try {
			// Set up services on players
			Players.PlayerAdded.Connect((player) => {
				this.inventoryService.createInventory(player.UserId);
			});
			Players.PlayerRemoving.Connect((player) => {
				this.inventoryService.removeInventory(player.UserId);
				this.playerService.removePlayerData(player.UserId);
			});
		} catch (error) {
			warn("Error in GameService onStart:", error);
		}
	}
}
