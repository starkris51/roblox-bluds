type viewmodel = Model & {
	AnimationController: AnimationController & {
		Animator: Animator;
	};
	["Right Arm"]: Part & {
		Joint: Motor6D;
		RightGripAttachment: Attachment;
		RightShoulderAttachment: Attachment;
	};
	Head: Part & {
		FaceFrontAttachment: Attachment;
	};
	["Left Arm"]: Part & {
		Joint: Motor6D;
		LeftGripAttachment: Attachment;
		LeftShoulderAttachment: Attachment;
	};
	Body: Part & {
		Joint: Motor6D;
	};
};
