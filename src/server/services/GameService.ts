import { Service, OnStart } from "@flamework/core";
import { RunService } from "@rbxts/services";
import { GameConfig } from "shared/config/GameConfig";
import { GamePhase, PlayerStatus } from "shared/enums/GameEnums";
import { PlayerData } from "shared/types/PlayerTypes";

@Service()
export class GameService implements OnStart {
    private gameState: GamePhase = GamePhase.Lobby;
    private players = new Map<Player, PlayerData>();
    private gameLoop?: RBXScriptConnection;

    constructor() {
        // Initialize game service
    }

    onStart() {
        print("server GameService started");
    }

    private addPlayer(player: Player) {
        if (this.gameState !== GamePhase.Lobby) return;
        if (this.players.size() >= GameConfig.MAX_PLAYERS) return;

        const playerData: PlayerData = {
            player: player,
            status: PlayerStatus.Alive,
            money: GameConfig.STARTING_MONEY,
            needs: {
                sleep: 100,
                food: 100,
                fun: 100,
                bathroom: 100,
            },
            inventory: [],
        };
        
        this.players.set(player, playerData);

        // Todo: Handle logic for starting the game when enough players have joined

        // Todo: Handle logic for player joining mid-game (spectator mode, assigning target)
    }

    private removePlayer(player: Player) {
        this.players.delete(player);

        // Todo: Create logic for handling player removal during a game
        if (this.gameState === GamePhase.Playing) {
            // Handle player removal in the context of the game
        }

        if (this.players.size() < GameConfig.MIN_PLAYERS && this.gameState !== GamePhase.Lobby) {
            this.endGame(undefined);
        }
    }

    private startGameLoop() {
        this.gameLoop = RunService.Heartbeat.Connect(() => {
            if (this.gameState === GamePhase.Playing) {
                // this.updateTimer();
            }
        });
    }

    private endRound() {
        this.gameState = GamePhase.Results;
        // Handle round end logic
    }

    private endGame(winner: Player | undefined) {
        this.gameState = GamePhase.Results;
        // Handle game end
    }
}