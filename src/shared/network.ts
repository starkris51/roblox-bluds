import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
	equipItem: (itemId: string) => void;
	unequipItem: () => void;
}

interface ServerToClientEvents {
	playerEquippedItem: (player: Player, itemId: string) => void;
	playerUnequippedItem: (player: Player) => void;
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
