import { Controller, OnInit, OnStart } from "@flamework/core";
import { Players, Workspace } from "@rbxts/services";
import { ViewModelData } from "shared/types/ViewModelTypes";

@Controller()
export class ViewmodelController implements OnStart {
	private viewModel?: ViewModelData;
	private camera = Workspace.CurrentCamera!;
	private player = Players.LocalPlayer;
	private character?: Model;

	onStart() {
		this.player.CharacterAdded.Connect((character) => {
			this.setupViewModel(character);
		});
	}

	private setupViewModel(character: Model) {
		this.character = character;
		const humanoid = character.FindFirstChild("Humanoid") as Humanoid;
		print(humanoid.Name);
		print("Setting up viewmodel");
	}
}
