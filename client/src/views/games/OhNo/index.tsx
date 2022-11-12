import { Card, Colour } from "../../../../../common/OhNo/types";
import {
  isNumberCard,
  areCompatible,
  isWildCard,
  isActionCard,
} from "../../../../../common/OhNo/utils";
import OhNoCard from "./cards/OhNoCard";
import OhNoCardBack from "./cards/OhNoCardBack";
import CardStack from "./cards/CardStack";

const OhNo = () => {
  const colours: Colour[] = ["red", "yellow", "green", "blue"];
  const numbers: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ];
  const deck: Card[] = colours
    .map((colour): Card[] => {
      const numberCards = numbers.map((number) => ({
        type: "number_card" as const,
        colour,
        number,
      }));
      return [
        ...numberCards,
        { type: "draw_two" as const, colour },
        { type: "reverse" as const, colour },
        { type: "skip" as const, colour },
        { type: "wild" as const },
        { type: "draw_four" as const },
      ];
    })
    .flat();

  const shuffledDeck = deck.sort(() => Math.random() - 0.5);
  const hand = shuffledDeck.slice(0, 7).sort((a, b) => {
    // sort into colours then values, with action cards to right of colour and
    // wild cards at right of hand
    const orderValue = (card: Card) => {
      if (isWildCard(card)) return Infinity;
      return (
        colours.indexOf(card.colour) * 12 +
        (isActionCard(card) ? 11 : card.number)
      );
    };

    return orderValue(a) - orderValue(b);
  });
  const firstCard = shuffledDeck.slice(7).find(isNumberCard)!;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "100px",
        marginTop: "100px",
      }}
    >
      <div style={{ display: "flex", gap: "3px" }}>
        {hand.map((_, i) => (
          <OhNoCardBack upsideDown key={i} />
        ))}
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <CardStack isInteractive />
        <CardStack topCard={firstCard} />
      </div>

      <div style={{ display: "flex", gap: "3px" }}>
        {hand.map((c, i) => (
          <OhNoCard
            card={c}
            isInteractive={areCompatible(c, firstCard, undefined)}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
export default OhNo;
