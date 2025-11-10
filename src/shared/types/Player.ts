import { Teams } from "shared/enums/GameEnums";

export interface PlayerData {
	id: number;
	kills: ByPlayer;
	deaths: ByPlayer;
	headshots: number;
	team: Teams;
	isReady: boolean;
}

export type ByPlayer = Map<number, number>;
