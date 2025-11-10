import { Networking } from "@flamework/networking";

interface ClientToServerEvents {}

interface ServerToClientEvents {
	notifyPlayerKilled(killerId: number, victimId: number, isHeadshot: boolean): void;
}

interface ClientToServerFunctions {
	requestFire(cameraCFrame: CFrame): boolean;
}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
