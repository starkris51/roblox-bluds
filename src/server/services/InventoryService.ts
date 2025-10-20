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

		return remaining <= 0;
	}

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
