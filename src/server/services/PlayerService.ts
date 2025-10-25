import { Service } from "@flamework/core";
import { generateRandomName } from "server/utils/playerAssign";
import { GameConfig } from "shared/config/GameConfig";
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
			name: generateRandomName(),
			target: undefined,
			money: GameConfig.STARTING_MONEY,
			isJailed: false,
			needs: {
				hunger: 100,
				thirst: 100,
				energy: 100,
				hygiene: 100,
				fun: 100,
				social: 100,
			},
		};
		this.players.set(userId, defaultData);
	}
}
