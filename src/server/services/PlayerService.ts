import { Service } from "@flamework/core";
import { PlayerData } from "shared/types/Player";

@Service()
export class PlayerService {
	private players: Map<number, PlayerData | undefined> = new Map();

	public setPlayerData(userId: number, data: PlayerData): void {
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
}
