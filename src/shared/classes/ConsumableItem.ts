import { BaseItem } from "./BaseItem";
import { ItemEnum } from "shared/enums/GameEnums";

interface ConsumableEffects {
	health?: number;
	hunger?: number;
	thirst?: number;
	energy?: number;
	suspicion?: number;
}

export class ConsumableItem extends BaseItem {
	public readonly effects: ConsumableEffects;
	public readonly consumeTime: number;

	constructor(config: {
		id: string;
		name: string;
		description: string;
		maxStack: number;
		weight: number;
		effects: ConsumableEffects;
		consumeTime: number;
		animationId?: string;
	}) {
		super({
			...config,
			type: ItemEnum.Consumable,
		});

		this.effects = config.effects;
		this.consumeTime = config.consumeTime;
	}

	use(player: Player): boolean {
		if (!this.canUse(player)) return false;

		// Apply effects to player
		print(`${player.Name} consumes ${this.name}`);

		// Here you would apply the effects to the player's stats
		// This would integrate with your player stats system

		return true;
	}

	canUse(player: Player): boolean {
		// Add logic for when consumables can be used
		// e.g., not at full health for health items
		return true;
	}
}
