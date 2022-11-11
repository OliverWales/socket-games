import { Card, NumberCard, ActionCard, WildCard, Colour } from "./types";

export const isNumberCard = (card: Card): card is NumberCard =>
  card.type === "number_card";

export const isActionCard = (card: Card): card is ActionCard =>
  ["draw_two", "reverse", "skip"].includes(card.type);

export const isWildCard = (card: Card): card is WildCard =>
  ["wild", "draw_four"].includes(card.type);

export const areCompatible = (
  card: Card,
  previousCard: Card,
  currentColour?: Colour
) => {
  // WILDCARD: can always be played
  if (isWildCard(card)) return true;

  // ACTION CARD:
  if (isActionCard(card)) {
    if (isWildCard(previousCard))
      // can play if matches chosen colour, or +2 if it was a +4
      return (
        card.colour === currentColour ||
        (card.type === "draw_two" && previousCard.type === "draw_four")
      );

    if (isActionCard(previousCard))
      // can play if colour or action matches
      return (
        card.colour === previousCard.colour || card.type === previousCard.type
      );

    // can play if colour matches
    return card.colour === previousCard.colour;
  }

  // NUMBER CARD:
  if (isWildCard(previousCard))
    // can play if matches chosen colour
    return card.colour === currentColour;

  if (isActionCard(previousCard))
    // can play if colour matches
    return card.colour === previousCard.colour;

  // otherwise, can play if colour or number matches
  return (
    card.colour === previousCard.colour || card.number === previousCard.number
  );
};
