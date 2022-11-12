export type NotStarted = { type: "not_started"; turn: string };
export type InProgress = { type: "in_progress"; turn: string };
export type Won = { type: "won"; winner: string };
export type Tied = { type: "tie" };
