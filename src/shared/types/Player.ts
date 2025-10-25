export interface PlayerData {
	id: number;
	name: string;
	target?: Target;
	killer?: Killer;
	money: number;
	isJailed: boolean;
	needs: Needs;
}

export interface Needs {
	hunger: number;
	thirst: number;
	energy: number;
	hygiene: number;
	fun: number;
	social: number;
}

export interface Target {
	id: number;
	name: string;
	floor: number;
	position: Vector3;
	room: string;
	isAlive: boolean;
	isJailed: boolean;
}

export interface Killer {
	id: number;
	name: string;
}
