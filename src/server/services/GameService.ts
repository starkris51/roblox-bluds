import { Service, OnStart } from "@flamework/core";
import { InventoryService } from "./InventoryService";
import { Players } from "@rbxts/services";
@Service()
export class GameService implements OnStart {
	constructor(private inventoryService: InventoryService) {}

	onStart() {
		print("server GameService started");
		Players.PlayerAdded.Connect((player) => {
			this.inventoryService.createInventory(player);
		});
		Players.PlayerRemoving.Connect((player) => {
			this.inventoryService.removeInventory(player);
		});
	}
}
