import { Service, OnStart } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { PlayerService } from "./PlayerService";
import { GameConfig } from "shared/config/GameConfig";
import { Events, Functions } from "server/network";

@Service()
export class WeaponService implements OnStart {
	private lastFire: Map<Player, number> = new Map();

	constructor(private playerService: PlayerService) {}

	onStart() {
		print("WeaponService started");

		Functions.requestFire.setCallback((player, cameraCF) => {
			return this.handleFire(player, cameraCF);
		});
	}

	private handleFire(player: Player, cameraCF: CFrame): boolean {
		const currentTime = os.clock();

		const last = this.lastFire.get(player) ?? 0;
		if (currentTime - last < GameConfig.RELOAD_TIME) return false;
		this.lastFire.set(player, currentTime);

		const character = player.Character;
		const root = character?.FindFirstChild("HumanoidRootPart") as BasePart | undefined;
		if (!character || !root) return false;

		const params = new RaycastParams();
		params.FilterType = Enum.RaycastFilterType.Exclude;
		params.FilterDescendantsInstances = [character];

		const rayResult = Workspace.Raycast(cameraCF.Position, cameraCF.LookVector.mul(1000), params);

		// visualise ray (for testing)
		const rayEnd = cameraCF.Position.add(cameraCF.LookVector.mul(1000));
		const rayPart = new Instance("Part");
		rayPart.Anchored = true;
		rayPart.CanCollide = false;
		rayPart.Size = new Vector3(0.1, 0.1, rayEnd.sub(cameraCF.Position).Magnitude);
		rayPart.CFrame = CFrame.lookAt(cameraCF.Position, rayEnd).mul(new CFrame(0, 0, -rayPart.Size.Z / 2));
		rayPart.BrickColor = new BrickColor("Bright yellow");
		rayPart.Parent = Workspace;

		// remove the ray part after a short delay
		coroutine.wrap(() => {
			task.wait(1);
			rayPart.Destroy();
		})();

		if (rayResult) {
			const hitPart = rayResult.Instance;
			const hitPlayer = Players.GetPlayerFromCharacter(hitPart.Parent as Model);
			if (hitPlayer) {
				const isHeadshot = hitPart.Name === "Head";
				this.playerService.recordPlayerKill(player.UserId, hitPlayer.UserId, isHeadshot);
				Events.notifyPlayerKilled.broadcast(player.UserId, hitPlayer.UserId, isHeadshot);
				return true;
			}
		}

		return false;
	}
}
