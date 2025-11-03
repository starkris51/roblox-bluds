import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
	fireWeapon: (origin: Vector3, direction: Vector3, cameraCF: CFrame, timestamp: number) => void;
}

interface ServerToClientEvents {
	weaponFired: (shooter: Player, origin: Vector3, hitPosition: Vector3, hitPartName: string | undefined) => void;
}

interface ClientToServerFunctions {}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
