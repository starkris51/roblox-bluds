import { BaseItem } from "./BaseItem";
import { ItemEnum, WeaponEnum } from "shared/enums/GameEnums";

export class WeaponItem extends BaseItem {
	public readonly weaponType: WeaponEnum;
	public readonly damage: number;
	public readonly range: number;
	public readonly attackSpeed: number;
	public durability: number;
	public readonly maxDurability: number;
	public readonly suspicionLevel: number;
	public readonly killMethod: string;

	constructor(config: {
		id: string;
		name: string;
		description: string;
		maxStack: number;
		weight: number;
		weaponType: WeaponEnum;
		damage: number;
		range: number;
		attackSpeed: number;
		durability: number;
		suspicionLevel: number;
		killMethod: string;
		animationId?: string;
	}) {
		super({
			...config,
			type: ItemEnum.Weapon,
		});

		this.weaponType = config.weaponType;
		this.damage = config.damage;
		this.range = config.range;
		this.attackSpeed = config.attackSpeed;
		this.durability = config.durability;
		this.maxDurability = config.durability;
		this.suspicionLevel = config.suspicionLevel;
		this.killMethod = config.killMethod;
	}

	use(player: Player): boolean {
		if (!this.canUse(player)) return false;

		// Weapon-specific use logic (equip, attack, etc.)
		print(`${player.Name} uses ${this.name}`);

		// Reduce durability
		this.durability = math.max(0, this.durability - 1);

		return true;
	}

	canUse(player: Player): boolean {
		return this.durability > 0;
	}

	getDurabilityPercentage(): number {
		return this.durability / this.maxDurability;
	}

	isBroken(): boolean {
		return this.durability <= 0;
	}
}
