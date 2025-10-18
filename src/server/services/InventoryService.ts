import { Service, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";
import { InventoryItem } from "shared/types/InventoryTypes";

@Service()
export class InventoryService implements OnStart {
	private inventories = new Map<Player, InventoryItem[]>();

	onStart() {
		Players.PlayerAdded.Connect((player) => {
			this.inventories.set(player, []);
		});
		Players.PlayerRemoving.Connect((player) => {
			this.inventories.delete(player);
		});
	}

	addItem(player: Player, item: InventoryItem) {
		const inv = this.inventories.get(player) ?? [];
		inv.push(item);
		this.inventories.set(player, inv);
	}

	getInventory(player: Player) {
		return this.inventories.get(player) ?? [];
	}

	equip(player: Player, itemId: string) {
		const inv = this.inventories.get(player);
		if (!inv) return;
		const item = inv.find((i) => i.id === itemId);
		if (!item) return;
		print(`${player.Name} equipped ${item.name}`);
	}
}
