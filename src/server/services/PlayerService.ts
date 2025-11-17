import { Service } from "@flamework/core";
import { Teams } from "shared/enums/GameEnums";
import { PlayerData } from "shared/types/Player";

@Service()
export class PlayerService {
	private players: Map<number, PlayerData> = new Map();

	public updatePlayerData(userId: number, data: PlayerData): void {
		this.players.set(userId, data);
	}

	public getAllPlayerData(): Map<number, PlayerData> {
		return this.players;
	}

	public getPlayerData(userId: number): PlayerData | undefined {
		return this.players.get(userId);
	}

	public removePlayerData(userId: number): void {
		this.players.delete(userId);
	}

	public recordPlayerKill(killerId: number, victimId: number, isHeadshot: boolean): void {
		const killerData = this.players.get(killerId);
		const victimData = this.players.get(victimId);
		if (killerData && victimData) {
			killerData.kills.set(victimId, (killerData.kills.get(victimId) ?? 0) + 1);
			victimData.deaths.set(killerId, (victimData.deaths.get(killerId) ?? 0) + 1);
			if (isHeadshot) {
				killerData.headshots += 1;
			}
		}
	}

	public assignTeamsToPlayers(): void {}

	public initPlayerData(userId: number): void {
		const defaultData: PlayerData = {
			id: userId,
			kills: new Map<number, number>(),
			deaths: new Map<number, number>(),
			headshots: 0,
			team: Teams.Spectator,
			isReady: false,
		};
		this.players.set(userId, defaultData);
	}

	public assignTeams(): void {}
}
