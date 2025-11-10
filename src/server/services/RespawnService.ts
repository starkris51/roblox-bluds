import { OnStart, Service } from "@flamework/core";
import { PlayerService } from "./PlayerService";
import { CollectionService, Workspace } from "@rbxts/services";
import { Teams } from "shared/enums/GameEnums";

@Service()
export class RespawnService implements OnStart {
	private teamSpawnPoints: Map<Teams, Instance[]> = new Map();

	constructor(private playerService: PlayerService) {}

	onStart() {}

	public setupSpawnPoints(): void {
		const blueTeamSpawns = CollectionService.GetTagged("BlueTeamSpawn");
		const redTeamSpawns = CollectionService.GetTagged("RedTeamSpawn");
		this.teamSpawnPoints.set(Teams.Blue, blueTeamSpawns);
		this.teamSpawnPoints.set(Teams.Red, redTeamSpawns);
	}

	public placeAtSpawn(character: Model, team: Teams) {
		const teamSpawns = this.teamSpawnPoints.get(team);
		if (!teamSpawns || teamSpawns.size() === 0) return;

		const spawnPart = teamSpawns[math.random(1, teamSpawns.size()) - 1] as BasePart;
		const primary = character.PrimaryPart ?? (character.FindFirstChild("HumanoidRootPart") as BasePart);
		if (primary) {
			primary.CFrame = spawnPart.CFrame.add(new Vector3(0, 3, 0)); // slight lift
		}
	}
}
