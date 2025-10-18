import { ItemEnum } from "shared/enums/GameEnums";

export abstract class BaseItem {
	public readonly id: string;
	public readonly name: string;
	public readonly description: string;
	public readonly type: ItemEnum;
	public readonly maxStack: number;
	public readonly weight: number;
	public readonly animationId?: string;

	constructor(config: {
		id: string;
		name: string;
		description: string;
		type: ItemEnum;
		maxStack: number;
		weight: number;
		animationId?: string;
	}) {
		this.id = config.id;
		this.name = config.name;
		this.description = config.description;
		this.type = config.type;
		this.maxStack = config.maxStack;
		this.weight = config.weight;
		this.animationId = config.animationId;
	}

	abstract use(player: Player): boolean;
	abstract canUse(player: Player): boolean;

	getDisplayName(): string {
		return this.name;
	}
}
