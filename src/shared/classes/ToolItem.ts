import { BaseItem } from "./BaseItem";
import { ItemEnum } from "shared/enums/GameEnums";

export class ToolItem extends BaseItem {
	public uses: number;
	public readonly maxUses: number;
	public readonly interactionRange: number;
	public readonly canOpenDoors: boolean;
	public readonly canPickLocks: boolean;
	public readonly canDisableAlarms: boolean;

	constructor(config: {
		id: string;
		name: string;
		description: string;
		maxStack: number;
		weight: number;
		uses: number;
		interactionRange: number;
		canOpenDoors?: boolean;
		canPickLocks?: boolean;
		canDisableAlarms?: boolean;
		animationId?: string;
	}) {
		super({
			...config,
			type: ItemEnum.Tool,
		});

		this.uses = config.uses;
		this.maxUses = config.uses;
		this.interactionRange = config.interactionRange;
		this.canOpenDoors = config.canOpenDoors ?? false;
		this.canPickLocks = config.canPickLocks ?? false;
		this.canDisableAlarms = config.canDisableAlarms ?? false;
	}

	use(player: Player): boolean {
		if (!this.canUse(player)) return false;

		print(`${player.Name} uses ${this.name}`);

		// Reduce uses if not infinite
		if (this.uses > 0) {
			this.uses--;
		}

		return true;
	}

	canUse(player: Player): boolean {
		return this.uses !== 0; // 0 means broken, -1 means infinite
	}

	isInfinite(): boolean {
		return this.maxUses === -1;
	}

	isBroken(): boolean {
		return this.uses === 0 && !this.isInfinite();
	}
}
