import { Controller, OnRender, OnStart } from "@flamework/core";
import { Players, ReplicatedStorage, UserInputService, Workspace } from "@rbxts/services";

interface EquippedItemData {
	model: Model;
}

@Controller()
export class ViewmodelController implements OnStart, OnRender {
	private camera = Workspace.CurrentCamera!;
	private player = Players.LocalPlayer;
	private viewmodel?: viewmodel;
	private equipped?: EquippedItemData;
	private idleAnim = "rbxassetid://123050957561356";
	private idleTrack?: AnimationTrack;

	private readonly weaponPositionOffset = new CFrame(0, -0.4, -0.5);
	private readonly weaponRotationOffset = CFrame.Angles(math.rad(-90), math.rad(0), math.rad(0)); // tweak

	onStart() {
		this.camera.CameraType = Enum.CameraType.Custom;
		// UserInputService.MouseBehavior = Enum.MouseBehavior.LockCenter;

		const assets = ReplicatedStorage.FindFirstChild("Assets") as Folder;
		this.viewmodel = assets.FindFirstChild("viewmodel")?.Clone() as viewmodel;
		this.viewmodel.Parent = this.camera;

		UserInputService.InputBegan.Connect((input, gp) => {
			if (gp) return;
			if (input.KeyCode === Enum.KeyCode.One) {
				this.equipTestWeapon();
			}
			if (input.KeyCode === Enum.KeyCode.Two) {
				this.unequipItem();
			}
		});

		this.playIdleAnimation();
	}

	onRender(dt: number): void {
		if (!this.viewmodel) return;

		this.viewmodel.PrimaryPart!.CFrame = this.camera.CFrame;
	}

	// Tempoary simple idle animation handling
	private playIdleAnimation() {
		if (!this.viewmodel) return;
		const animator = this.viewmodel.AnimationController.Animator;
		if (!animator) return;

		// Stop previous track if reloading
		if (this.idleTrack) {
			this.idleTrack.Stop();
		}

		const anim = new Instance("Animation");
		anim.AnimationId = this.idleAnim;
		this.idleTrack = animator.LoadAnimation(anim);
		this.idleTrack.Priority = Enum.AnimationPriority.Idle;
		this.idleTrack.Looped = true;
		this.idleTrack.Play();
	}

	// Temporary test weapon equipping
	private equipTestWeapon() {
		if (!this.viewmodel) return;
		if (this.equipped) this.unequipItem();

		const weaponFolder = ReplicatedStorage.WaitForChild("Assets").WaitForChild("weapon");
		const knife = weaponFolder.FindFirstChild("TestKnife");
		if (!knife || !knife.IsA("Model")) {
			warn("TestKnife asset missing");
			return;
		}

		const weaponClone = knife.Clone();
		const rightArm = this.viewmodel["Right Arm"];
		const gripAttachment = rightArm.RightGripAttachment;

		const handle = weaponClone.FindFirstChild("Handle") as Part | undefined;
		if (!handle) {
			warn("Weapon has no Handle part");
			weaponClone.Destroy();
			return;
		}

		// Prepare parts
		for (const part of weaponClone.GetDescendants()) {
			if (part.IsA("BasePart")) {
				part.Anchored = false;
				part.CanCollide = false;
				part.Massless = true;
			}
		}

		weaponClone.PrimaryPart = handle;
		weaponClone.Parent = rightArm;

		// Move entire model (not just handle)
		weaponClone.PivotTo(
			gripAttachment.WorldCFrame.mul(this.weaponRotationOffset) // local rotation
				.mul(this.weaponPositionOffset), // local translation
		);
		// Weld all parts to handle so they move together
		for (const part of weaponClone.GetDescendants()) {
			if (part.IsA("BasePart") && part !== handle) {
				const weldToHandle = new Instance("WeldConstraint");
				weldToHandle.Part0 = handle;
				weldToHandle.Part1 = part;
				weldToHandle.Parent = handle;
			}
		}

		// Single weld to arm
		const weldToArm = new Instance("WeldConstraint");
		weldToArm.Part0 = handle;
		weldToArm.Part1 = rightArm;
		weldToArm.Parent = handle;

		weaponClone.Name = "EquippedWeapon";
		this.equipped = { model: weaponClone };
	}

	private unequipItem() {
		if (!this.equipped) return;
		this.equipped.model.Destroy();
		this.equipped = undefined;
	}

	public isEquipped() {
		return this.equipped !== undefined;
	}
}
