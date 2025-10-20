import { Service } from "@flamework/core";
import { Inventory, InventorySlot } from "shared/types/Inventory";

@Service()
export class InventoryService {
	private inventories = new Map<number, Inventory>();

	private DEFAULT_INVENTORY_SIZE = 20;
	private DEFAULT_WEIGHT_LIMIT = 100;

	removeInventory(userId: number): void {
		this.inventories.delete(userId);
	}

	createInventory(userId: number): void {
		const slots: InventorySlot[] = [];

		// Initialize empty slots
		for (let i = 0; i < this.DEFAULT_INVENTORY_SIZE; i++) {
			slots.push({
				itemId: undefined,
				quantity: 0,
				slotIndex: i,
			});
		}

		this.inventories.set(userId, {
			slots: slots,
			maxSlots: this.DEFAULT_INVENTORY_SIZE,
			weightLimit: this.DEFAULT_WEIGHT_LIMIT,
			currentWeight: 0,
		});
	}

	removeItem(userId: number, itemId: string, quantity: number = 1): boolean {
		const inventory = this.inventories.get(userId);
		if (!inventory) return false;

		const remaining = quantity;

		return remaining <= 0;
	}

	getInventory(userId: number): Inventory | undefined {
		return this.inventories.get(userId);
	}

	moveItem(userId: number, fromSlot: number, toSlot: number): boolean {
		const inventory = this.inventories.get(userId);
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
