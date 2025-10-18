import { Controller, OnStart } from "@flamework/core";
import { UserInputService } from "@rbxts/services";

@Controller()
export class GameController implements OnStart {
	constructor() {}

	onStart() {
		print("client GameController started");

		UserInputService.InputBegan.Connect((input) => {
			if (input.KeyCode === Enum.KeyCode.E) {
				print("E key pressed");
			}
		});
	}
}
