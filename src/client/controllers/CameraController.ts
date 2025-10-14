import { Controller } from "@flamework/core";
import { Players, RunService, UserInputService, Workspace } from "@rbxts/services";

export enum CameraEffect {
    None = "None",
    Shake = "Shake",
    Blur = "Blur",
    Desaturate = "Desaturate",
    Paranoia = "Paranoia",
    Death = "Death",
    Bobbing = "Bobbing",
}

@Controller()
export class CameraController {
    private camera: Camera;
    private character?: Model;
    private humanoid?: Humanoid;
    private rootPart?: BasePart;
    private head?: BasePart;

    private activeEffects = new Set<CameraEffect>();

    // Connections
    private connections: RBXScriptConnection[] = [];

    // Camera bobbing properties
    private bobbingEnabled = true;
    private bobbingIntensity = 0.5;
    private bobbingSpeed = 1;
    private bobbingOffset = { x: 0, y: 0 };
    private stepTime = 0;

    // First person properties
    private headOffset = new Vector3(0, 0.25, 0); // Slightly above and forward from head
    
    // Mouse sensitivity and camera angles
    private mouseSensitivity = 0.005;
    private cameraAngleX = 0;
    private cameraAngleY = 0;
    private maxCameraAngleY = math.rad(80); // Limit vertical look angle

    constructor() {
        this.camera = Workspace.CurrentCamera!;
        this.setupFirstPersonCamera();
        this.startCameraUpdate();
        this.setupMouseInput();
    }

    private setupFirstPersonCamera() {
        const player = Players.LocalPlayer;
        
        // Wait for character
        if (player.Character) {
            this.setupCharacterReferences(player.Character);
        }

        // Listen for character respawning
        const characterConnection = player.CharacterAdded.Connect((character) => {
            this.setupCharacterReferences(character);
        });
        this.connections.push(characterConnection);

        // Set camera to first person
        this.camera.CameraType = Enum.CameraType.Scriptable;
        
        // Hide mouse cursor and lock it
        UserInputService.MouseBehavior = Enum.MouseBehavior.LockCenter;
        UserInputService.MouseIconEnabled = false;
    }

    private setupCharacterReferences(character: Model) {
        this.character = character;
        this.humanoid = character.WaitForChild("Humanoid") as Humanoid;
        this.rootPart = character.WaitForChild("HumanoidRootPart") as BasePart;
        this.head = character.WaitForChild("Head") as BasePart;

        this.humanoid.AutoRotate = false;

        // Destroy accessories on head to prevent clipping
        this.character.GetChildren().forEach((child) => {
            if (child.IsA("Accessory")) {
                child.Destroy();
            }
        });
    }

    private setupMouseInput() {
        const mouseConnection = UserInputService.InputChanged.Connect((input) => {
            if (input.UserInputType === Enum.UserInputType.MouseMovement) {
                const delta = input.Delta;
                this.cameraAngleX -= delta.X * this.mouseSensitivity;
                this.cameraAngleY = math.clamp(
                    this.cameraAngleY - delta.Y * this.mouseSensitivity,
                    -this.maxCameraAngleY,
                    this.maxCameraAngleY
                );

                this.updateCharacterRotation();
            }
        });
        this.connections.push(mouseConnection);
    }

    private updateCharacterRotation() {
        if (!this.rootPart) return;

        // Create a CFrame that only rotates around the Y-axis (horizontal rotation)
        const characterRotation = CFrame.Angles(0, this.cameraAngleX, 0);
        
        // Apply rotation to the character's root part while preserving position
        const currentPosition = this.rootPart.CFrame.Position;
        this.rootPart.CFrame = new CFrame(currentPosition).mul(characterRotation);
    }

    private startCameraUpdate() {
        const renderConnection = RunService.RenderStepped.Connect((deltaTime) => {
            this.updateCamera(deltaTime);
        });
        this.connections.push(renderConnection);
    }

    private updateCamera(deltaTime: number) {
        if (!this.character || !this.humanoid || !this.rootPart || !this.head) {
            return;
        }

        // Position camera at head position with offset
        const headPosition = this.head.CFrame.Position;
        let cameraPosition = headPosition.add(this.headOffset);

        // Apply camera bobbing if enabled and moving
        if (this.bobbingEnabled && this.activeEffects.has(CameraEffect.Bobbing)) {
            const walkSpeed = this.humanoid.WalkSpeed;
            const moveVector = this.humanoid.MoveDirection;
            const isMoving = moveVector.Magnitude > 0.1;

            if (isMoving && walkSpeed > 0) {
                this.stepTime += deltaTime * this.bobbingSpeed * (walkSpeed / 16); // 16 is default walkspeed
                
                // Calculate bobbing offset
                const bobbingX = math.sin(this.stepTime * 2) * this.bobbingIntensity * 0.1;
                const bobbingY = math.abs(math.sin(this.stepTime * 4)) * this.bobbingIntensity * 0.15;
                
                this.bobbingOffset = { x: bobbingX, y: bobbingY };
            } else {
                // Smoothly return to center when not moving
                this.bobbingOffset.x = this.bobbingOffset.x * 0.9;
                this.bobbingOffset.y = this.bobbingOffset.y * 0.9;
            }

            // Apply bobbing to camera position
            const bobbingVector = new Vector3(this.bobbingOffset.x, this.bobbingOffset.y, 0);
            cameraPosition = cameraPosition.add(bobbingVector);
        }

        // Create camera CFrame with proper rotation based on mouse input
        const rotationCFrame = CFrame.Angles(0, this.cameraAngleX, 0).mul(CFrame.Angles(this.cameraAngleY, 0, 0));
        this.camera.CFrame = new CFrame(cameraPosition).mul(rotationCFrame);
    }

    public addEffect(effect: CameraEffect) {
        this.activeEffects.add(effect);
        
        if (effect === CameraEffect.Bobbing) {
            this.bobbingEnabled = true;
        }
    }
    
    public removeEffect(effect: CameraEffect) {
        this.activeEffects.delete(effect);
        
        if (effect === CameraEffect.Bobbing) {
            this.bobbingEnabled = false;
            this.bobbingOffset = { x: 0, y: 0 };
        }
    }
    
    public hasEffect(effect: CameraEffect): boolean {
        return this.activeEffects.has(effect);
    }
    
    public isFirstPerson(): boolean {
        return true; // Always first person now
    }

    // Bobbing configuration methods
    public setBobbingIntensity(intensity: number) {
        this.bobbingIntensity = math.clamp(intensity, 0, 2);
    }

    public setBobbingSpeed(speed: number) {
        this.bobbingSpeed = math.clamp(speed, 0.1, 3);
    }

    public setMouseSensitivity(sensitivity: number) {
        this.mouseSensitivity = math.clamp(sensitivity, 0.001, 0.02);
    }

    public enableBobbing() {
        this.addEffect(CameraEffect.Bobbing);
    }

    public disableBobbing() {
        this.removeEffect(CameraEffect.Bobbing);
    }
    
    public cleanup() {
        // Disconnect all connections
        for (const connection of this.connections) {
            connection.Disconnect();
        }
        this.connections = [];
        
        // Restore default camera settings
        this.camera.CameraType = Enum.CameraType.Custom;
        UserInputService.MouseBehavior = Enum.MouseBehavior.Default;
        UserInputService.MouseIconEnabled = true;

        // Restore head visibility
        if (this.head) {
            this.head.Transparency = 0;
            for (const child of this.head.GetChildren()) {
                if (child.IsA("Decal") || child.IsA("Texture")) {
                    child.Transparency = 0;
                }
            }
        }
    }
}