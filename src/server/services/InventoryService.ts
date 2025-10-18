import { Service, OnStart } from "@flamework/core";
import { Inventory, InventorySlot } from "shared/types/InventoryTypes";

@Service()
export class InventoryService implements OnStart {
	private inventories = new Map<Player, Inventory>();

	private readonly DEFAULT_INVENTORY_SIZE = 20;
	private readonly DEFAULT_WEIGHT_LIMIT = 100;

	onStart() {
		print("server InventoryService started");
	}

	public removeInventory(player: Player): void {
		this.inventories.delete(player);
	}

	public createInventory(player: Player): void {
		const slots: InventorySlot[] = [];

		// Initialize empty slots
		for (let i = 0; i < this.DEFAULT_INVENTORY_SIZE; i++) {
			slots.push({
				itemId: undefined,
				quantity: 0,
				slotIndex: i,
			});
		}

		this.inventories.set(player, {
			slots: slots,
			maxSlots: this.DEFAULT_INVENTORY_SIZE,
			weightLimit: this.DEFAULT_WEIGHT_LIMIT,
			currentWeight: 0,
		});
	}

	removeItem(player: Player, itemId: string, quantity: number = 1): boolean {
		const inventory = this.inventories.get(player);
		if (!inventory) return false;

		const remaining = quantity;

		// for (const slot of inventory.slots) {
		// 	if (slot.item?.id === itemId && remaining > 0) {
		// 		const toRemove = math.min(remaining, slot.quantity);
		// 		slot.quantity -= toRemove;
		// 		inventory.currentWeight -= slot.item.weight * toRemove;
		// 		remaining -= toRemove;

		// 		if (slot.quantity <= 0) {
		// 			slot.item = undefined;
		// 			slot.quantity = 0;
		// 		}
		// 	}
		// }

		return remaining <= 0;
	}

	// useItem(player: Player, slotIndex: number): boolean {
	// 	const inventory = this.inventories.get(player);
	// 	if (!inventory) return false;

	// 	const slot = inventory.slots[slotIndex];
	// 	if (!slot?.item) return false;

	// 	const success = slot.item.use(player);

	// 	if (success) {
	// 		// Remove consumable items after use
	// 		if (slot.item.type === "Consumable") {
	// 			this.removeItem(player, slot.item.id, 1);
	// 		}
	// 	}

	// 	return success;
	// }

	getInventory(player: Player): Inventory | undefined {
		return this.inventories.get(player);
	}

	moveItem(player: Player, fromSlot: number, toSlot: number): boolean {
		const inventory = this.inventories.get(player);
		if (!inventory) return false;

		if (fromSlot < 0 || fromSlot >= inventory.slots.size() || toSlot < 0 || toSlot >= inventory.slots.size()) {
			return false;
		}

		const fromSlotData = inventory.slots[fromSlot];
		const toSlotData = inventory.slots[toSlot];

		// Swap slots
		inventory.slots[fromSlot] = toSlotData;
		inventory.slots[toSlot] = fromSlotData;

		// Update slot indices
		fromSlotData.slotIndex = toSlot;
		toSlotData.slotIndex = fromSlot;

		return true;
	}
}
