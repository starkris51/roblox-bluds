import { Controller, OnStart } from "@flamework/core";
import { UserInputService } from "@rbxts/services";

@Controller()
export class GameController implements OnStart {
	onStart() {
		print("game controller start");

		UserInputService.InputBegan.Connect((input) => {
			if (input.KeyCode === Enum.KeyCode.E) {
				print("E key pressed");
			}
		});
	}
}
