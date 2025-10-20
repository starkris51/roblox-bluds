// Male names only
const firstNames: string[] = [
	"Alex",
	"Ben",
	"Kristoffer",
	"David",
	"Ethan",
	"Adrian",
	"Liam",
	"Noah",
	"Mason",
	"Logan",
	"Lucas",
	"Oliver",
	"Elijah",
	"James",
	"William",
	"Benjamin",
	"Henry",
	"Alexander",
	"Michael",
	"Daniel",
];

const lastNames: string[] = [
	"Smith",
	"Johnson",
	"Bekkevold",
	"Williams",
	"Brown",
	"Jones",
	"Garcia",
	"Miller",
	"Davis",
	"James",
	"Bond",
	"Wilson",
	"Moore",
	"Taylor",
	"Anderson",
	"Thomas",
	"Jackson",
];

export function generateRandomName(): string {
	const firstName = firstNames[math.floor(math.random() * firstNames.size())];
	const lastName = lastNames[math.floor(math.random() * lastNames.size())];
	return `${firstName} ${lastName}`;
}

export function assignTargets(playerIds: number[]): Map<number, number> {
	const targets = new Map<number, number>();
	const shuffledIds = [...playerIds];
	// Shuffle the player IDs
	const shuffleIdsSize = shuffledIds.size();
	for (let i = shuffleIdsSize - 1; i > 0; i--) {
		const j = math.floor(math.random() * (i + 1));
		[shuffledIds[i], shuffledIds[j]] = [shuffledIds[j], shuffledIds[i]];
	}

	// Assign targets in a circular manner

	return targets;
}
