import { Service, OnStart } from "@flamework/core";

@Service()
export class ItemService implements OnStart {
	private itemRegistry = new Map<string, unknown>();

	onStart() {
		this.registerDefaultItems();
	}

	private registerDefaultItems(): void {
		// Register your custom items here
	}

	public getItem(itemId: string): unknown | undefined {
		return this.itemRegistry.get(itemId);
	}
}
