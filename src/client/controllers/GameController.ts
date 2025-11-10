import { Controller, OnStart } from "@flamework/core";
import { Players, UserInputService, Workspace } from "@rbxts/services";
import { Functions } from "client/network";

@Controller()
export class GameController implements OnStart {
	private camera = Workspace.CurrentCamera!;
	private player = Players.LocalPlayer;

	onStart() {
		print("game controller start");

		UserInputService.InputBegan.Connect((input) => {
			if (input.KeyCode === Enum.KeyCode.E) {
				this.fire();
			}
		});
	}

	private async fire() {
		const camCF = this.camera.CFrame;
		const result = await Functions.requestFire(camCF);
		print("Fire result:", result);
	}
}
