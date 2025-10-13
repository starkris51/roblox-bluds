import Net, { Definitions } from "@rbxts/net";
import { NeedType, PlayerStatus } from "shared/enums/GameEnums";
import { GameState } from "shared/types/GameTypes";
import { Item } from "shared/types/PlayerTypes";

export const Remotes = Net.CreateDefinitions({
    // =================
    // GAME MANAGEMENT
    // =================
    GameManagement: Definitions.Namespace({
        // Server -> Client Events (Game State Updates)
        GameStateChanged: Definitions.ServerToClientEvent<[gameState: GameState]>(),
        RoundStarted: Definitions.ServerToClientEvent<[roundNumber: number, timeLimit: number]>(),
        RoundEnded: Definitions.ServerToClientEvent<[winner: Player, reason: string]>(),
        
        // Client -> Server Functions (Game Actions)
        JoinGame: Definitions.ServerAsyncFunction<() => boolean>(),
        LeaveGame: Definitions.ServerAsyncFunction<() => boolean>(),
        StartGame: Definitions.ServerAsyncFunction<() => boolean>(), // Host only
    }),

    // =================
    // PLAYER MANAGEMENT
    // =================
        Player: Definitions.Namespace({
        // Server -> Client Events (Player Updates)
        PlayerDataUpdated: Definitions.ServerToClientEvent<[playerData: PlayerData]>(),
        PlayerJoined: Definitions.ServerToClientEvent<[player: Player, playerData: PlayerData]>(),
        PlayerLeft: Definitions.ServerToClientEvent<[player: Player]>(),
        PlayerStatusChanged: Definitions.ServerToClientEvent<[player: Player, status: PlayerStatus]>(),
        
        // Server -> Client Events (Need Alerts)
        NeedAlert: Definitions.ServerToClientEvent<[need: NeedType, level: "low" | "medium" | "critical"]>(),
        NeedSatisfied: Definitions.ServerToClientEvent<[need: NeedType, amount: number]>(),
    }),
});