import { Controller, OnStart } from "@flamework/core";

@Controller()
export class GameController implements OnStart {   
    onStart() {
        print("client GameController started");
    }
}