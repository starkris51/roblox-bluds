export interface InventorySlot {
	itemId: string | undefined;
	quantity: number;
	slotIndex: number;
}

export interface Inventory {
	slots: InventorySlot[];
	maxSlots: number;
	weightLimit: number;
	currentWeight: number;
}
