import { Service } from "@flamework/core";
import { PlayerData } from "shared/types/Player";

@Service()
export class PlayerService {
	private players: Map<number, PlayerData> = new Map();

	public updatePlayerData(userId: number, data: PlayerData): void {
		this.players.set(userId, data);
	}

	public getPlayerData(userId: number): PlayerData | undefined {
		return this.players.get(userId);
	}

	public removePlayerData(userId: number): void {
		if (this.players.has(userId)) {
			this.players.delete(userId);
		}
	}

	public initPlayerData(userId: number): void {
		const defaultData: PlayerData = {
			id: userId,
			kills: 0,
			deaths: 0,
			headshots: 0,
		};
		this.players.set(userId, defaultData);
	}
}
