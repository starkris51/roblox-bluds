import { Service, OnStart } from "@flamework/core";
@Service()
export class GameService implements OnStart {
    constructor() {
        // Initialize game service
    }

    onStart() {
        print("server GameService started");
    }
}