import { Service, OnStart } from "@flamework/core";
import { BaseItem } from "shared/classes/BaseItem";
import { WeaponItem } from "shared/classes/WeaponItem";
import { WeaponEnum } from "shared/enums/GameEnums";

@Service()
export class ItemService implements OnStart {
	private itemRegistry = new Map<string, BaseItem>();

	onStart() {
		this.registerDefaultItems();
	}

	private registerDefaultItems(): void {
		// Register your custom items here
		const knife = new WeaponItem({
			id: "knife",
			name: "Kitchen Knife",
			description: "A sharp kitchen knife",
			maxStack: 1,
			weight: 2,
			weaponType: WeaponEnum.Melee,
			damage: 100,
			range: 5,
			attackSpeed: 1,
			durability: 100,
			suspicionLevel: 80,
			killMethod: "Stabbed",
		});

		this.itemRegistry.set("knife", knife);
	}

	public getItem(itemId: string): BaseItem | undefined {
		return this.itemRegistry.get(itemId);
	}
}
