// MovementConfig defines plane-based velocity movement tuning.
// Adjust values to fit your game feel.
export const MovementConfig = {
	// Plane axes (XZ movement). Must be orthogonal & normalized.
	PrimaryTangentAxis: new Vector3(1, 0, 0),
	SecondaryTangentAxis: new Vector3(0, 0, 1),

	// Force cap applied by LinearVelocity. Increase for heavier characters.
	MaxForce: 10000,

	// Target velocity scalar (studs per second).
	TargetVelocityMultiplier: 60,

	// Acceleration when moving (approach target speed).
	AccelerationRateMoving: 8,

	// Deceleration when no input (come to stop).
	AccelerationRateStopping: 6,
};
