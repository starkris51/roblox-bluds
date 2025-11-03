import { Controller, OnRender, OnStart } from "@flamework/core";
import { Players, ReplicatedStorage, UserInputService, Workspace } from "@rbxts/services";

@Controller()
export class ViewmodelController implements OnStart {
	private camera = Workspace.CurrentCamera!;
	private player = Players.LocalPlayer;

	onStart() {
		this.player.CameraMode = Enum.CameraMode.LockFirstPerson;
		this.camera.FieldOfView = 70;
	}
}
