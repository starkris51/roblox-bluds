import { Players, UserInputService } from "@rbxts/services";
import { GameState } from "shared/types/GameTypes";
import { PlayerData } from "shared/types/PlayerTypes";
import { CameraController, CameraEffect } from "./camera";

export class GameController {   
    private currentTarget?: Player;
    private playerData?: PlayerData;
    private gameState?: GameState;    
    private cameraController: CameraController;
    
    constructor() {
        this.setupRemotes();
        this.setupInput();
        this.cameraController = new CameraController();

        print("GameController initialized with first-person camera");
    }
    
    private setupRemotes() {
        // TODO: Set up network events
    }
    
    private setupInput() {
        UserInputService.InputBegan.Connect((input) => {
            if (input.KeyCode === Enum.KeyCode.E) {
                this.handleInteraction();
            } else if (input.KeyCode === Enum.KeyCode.C) {
                // Toggle camera shake effect as example
                this.toggleCameraEffect();
            }
        });
    }

    private toggleCameraEffect() {
        // Example: Toggle shake effect
        if (this.cameraController.hasEffect(CameraEffect.Shake)) {
            this.cameraController.removeEffect(CameraEffect.Shake);
            print("Removed camera shake");
        } else {
            this.cameraController.addEffect(CameraEffect.Shake);
            print("Added camera shake");
        }
    }
    
    private onGameStateChanged(gameState: GameState) {
        // Update UI based on game state
        print(`Game phase changed to: ${gameState.currentPhase}`);
    }
    
    private onPlayerKilled(victim: Player, killer?: Player) {
        // Handle visual effects, sounds, etc.
        print(`${victim.Name} was killed!`);
    }
    
    private handleInteraction() {
        // Handle player interaction logic
        print("Player interacted with an object.");
    }

    public addCameraEffect(effect: CameraEffect) {
        this.cameraController.addEffect(effect);
    }
    
    public removeCameraEffect(effect: CameraEffect) {
        this.cameraController.removeEffect(effect);
    }

    // Cleanup when game controller is destroyed
    public cleanup() {
        this.cameraController.cleanup();
    }
}