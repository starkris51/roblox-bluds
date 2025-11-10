import { Controller, OnStart } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";

@Controller()
export class ViewmodelController implements OnStart {
	private camera = Workspace.CurrentCamera!;
	private player = Players.LocalPlayer;

	onStart() {
		// this.player.CameraMode = Enum.CameraMode.LockFirstPerson;
	}
}
