import { Controller, OnStart, OnPhysics } from "@flamework/core";
import { Players } from "@rbxts/services";
import { MovementConfig } from "shared/config/MovementConfig";

@Controller()
export class MovementController implements OnStart, OnPhysics {
	private player = Players.LocalPlayer;
	private character?: Model;
	private humanoid?: Humanoid;
	private root?: Part;
	private rootAttachment?: Attachment;
	private linearVelocity?: LinearVelocity;
	private movementEnabled = true;

	onStart() {
		this.bindCharacter(this.player.Character || this.player.CharacterAdded.Wait()[0]);
		this.player.CharacterAdded.Connect((char) => this.bindCharacter(char));
	}

	onPhysics(dt: number) {
		if (!this.movementEnabled || !this.character || !this.humanoid || !this.root || !this.linearVelocity) return;
		this.updateMovement(dt);
	}

	private bindCharacter(character: Model) {
		this.character = character;
		this.humanoid = character.FindFirstChildOfClass("Humanoid") as Humanoid | undefined;
		this.root = character.FindFirstChild("HumanoidRootPart") as Part | undefined;
		if (!this.root) return;

		this.rootAttachment = this.root.FindFirstChild("RootAttachment") as Attachment | undefined;

		// Recreate LinearVelocity each time (clean up old one).
		if (this.linearVelocity) this.linearVelocity.Destroy();
		if (this.rootAttachment) {
			const lv = new Instance("LinearVelocity");
			lv.Attachment0 = this.rootAttachment;
			lv.RelativeTo = Enum.ActuatorRelativeTo.World;
			lv.VelocityConstraintMode = Enum.VelocityConstraintMode.Plane;
			lv.PrimaryTangentAxis = MovementConfig.PrimaryTangentAxis;
			lv.SecondaryTangentAxis = MovementConfig.SecondaryTangentAxis;
			lv.MaxForce = MovementConfig.MaxForce;
			lv.Parent = this.root;
			this.linearVelocity = lv;
		}

		// Optional: disable when dead
		this.humanoid?.Died.Connect(() => (this.movementEnabled = false));
		this.movementEnabled = true;
	}

	private updateMovement(dt: number) {
		if (!this.humanoid || !this.linearVelocity) return;

		const moveDir = this.humanoid.MoveDirection;
		const targetVelocity2d = new Vector2(moveDir.X, moveDir.Z).mul(MovementConfig.TargetVelocityMultiplier);

		const currentPlane = this.linearVelocity.PlaneVelocity;
		const delta = targetVelocity2d.sub(currentPlane);

		const accelerating = moveDir.Magnitude > 0;
		const accelRate = accelerating
			? MovementConfig.AccelerationRateMoving
			: MovementConfig.AccelerationRateStopping;

		this.linearVelocity.PlaneVelocity = currentPlane.add(delta.mul(accelRate * dt));
	}

	// Public helpers if needed elsewhere
	public setMovementEnabled(enabled: boolean) {
		this.movementEnabled = enabled;
		if (!enabled && this.linearVelocity) {
			this.linearVelocity.PlaneVelocity = new Vector2(0, 0);
		}
	}
}
