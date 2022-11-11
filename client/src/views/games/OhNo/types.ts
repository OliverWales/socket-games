export type Card = NumberCard | ActionCard | WildCard;

export type Colour = "red" | "yellow" | "green" | "blue";

export type NumberCard = {
  type: "number_card";
  colour: Colour;
  number: number;
};

export type ActionType = "draw_two" | "reverse" | "skip";

export type ActionCard = {
  type: ActionType;
  colour: Colour;
};

export type WildType = "wild" | "draw_four";

export type WildCard = {
  type: WildType;
};
