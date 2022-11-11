import { ReactNode } from "react";
import { ActionCard, Card, Colour, NumberCard } from "../types";
import SwapIcon from "./icons/SwapIcon";
import DrawTwoIcon from "./icons/DrawTwoIcon";
import SkipIcon from "./icons/SkipIcon";
import { glowColour, cardColor } from "./colourUtils";
import WildCardIcon from "./icons/WildCardIcon";
import { BIG_NUMBER_PROPS, SMALL_NUMBER_PROPS } from "./styles";

const OhNoCard = ({ card }: { card: Card }) => {
  switch (card.type) {
    case "number_card":
      return <OhNoNumberCard card={card} />;
    case "draw_two":
      return <OhNoDrawTwoCard card={card} />;
    case "reverse":
      return <OhNoReverseCard card={card} />;
    case "skip":
      return <OhNoSkipCard card={card} />;
    case "wild":
      return <OhNoWildCard />;
    case "draw_four":
      return <OhNoDrawFourCard />;
    default:
      throw new Error("Card type not implemented");
  }
};

const CentreText = ({ colour, text }: { colour?: Colour; text: string }) => (
  <div
    style={{
      ...BIG_NUMBER_PROPS,
      border: `3px solid ${cardColor(colour)}`,
      textShadow: `0 0 10px ${glowColour(colour, 0.7)}`,
      textDecoration: text === "6" || text === "9" ? "underline" : undefined,
    }}
  >
    {text}
  </div>
);

const CentreIcon = ({ colour, icon }: { colour?: Colour; icon: ReactNode }) => (
  <div
    style={{
      ...BIG_NUMBER_PROPS,
      border: `3px solid ${cardColor(colour)}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {icon}
  </div>
);

const CornerNumber = ({
  colour,
  number,
}: {
  colour?: Colour;
  number: string;
}) => (
  <span
    style={{
      ...SMALL_NUMBER_PROPS,
      textShadow: `0 0 4px ${glowColour(colour, 0.7)}`,
      textDecoration:
        number === "6" || number === "9" ? "underline" : undefined,
    }}
  >
    {number}
  </span>
);

const OhNoCardBase = ({
  colour,
  corner,
  centre,
}: {
  colour?: Colour;
  corner: ReactNode;
  centre: ReactNode;
}) => {
  return (
    <div
      style={{
        width: "100px",
        height: "150px",
        background: cardColor(colour, 0.5),
        border: `3px solid ${cardColor(colour)}`,
        borderRadius: "10px",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "3px",
          left: "3px",
          height: "20px",
          lineHeight: "20px",
        }}
      >
        {corner}
      </span>
      <span
        style={{
          position: "absolute",
          bottom: "3px",
          right: "3px",
          height: "20px",
          lineHeight: "20px",
        }}
      >
        {corner}
      </span>
      {centre}
    </div>
  );
};

const OhNoNumberCard = ({ card }: { card: NumberCard }) => {
  const { colour, number } = card;
  const centre = <CentreText colour={colour} text={String(number)} />;
  const corner = <CornerNumber colour={colour} number={String(number)} />;
  return <OhNoCardBase colour={colour} corner={corner} centre={centre} />;
};

const OhNoDrawTwoCard = ({ card }: { card: ActionCard }) => {
  const { colour } = card;
  const corner = <CornerNumber colour={colour} number={"+2"} />;
  const centre = (
    <CentreIcon
      colour={colour}
      icon={
        <DrawTwoIcon
          size="50px"
          colour="white"
          filter={`drop-shadow(0 0 4px ${glowColour(colour, 0.7)})`}
        />
      }
    />
  );
  return <OhNoCardBase colour={colour} corner={corner} centre={centre} />;
};

const OhNoReverseCard = ({ card }: { card: ActionCard }) => {
  const { colour } = card;
  const corner = (
    <SwapIcon
      size="20px"
      colour="white"
      filter={`drop-shadow(0 0 2px ${glowColour(colour, 0.7)})`}
    />
  );
  const centre = (
    <CentreIcon
      colour={colour}
      icon={
        <SwapIcon
          size="50px"
          colour="white"
          filter={`drop-shadow(0 0 4px ${glowColour(colour, 0.7)})`}
        />
      }
    />
  );
  return <OhNoCardBase colour={colour} corner={corner} centre={centre} />;
};

const OhNoSkipCard = ({ card }: { card: ActionCard }) => {
  const { colour } = card;
  const corner = (
    <SkipIcon
      size="20px"
      colour="white"
      filter={`drop-shadow(0 0 2px ${glowColour(colour, 0.7)})`}
    />
  );
  const centre = (
    <CentreIcon
      colour={colour}
      icon={
        <SkipIcon
          size="50px"
          colour="white"
          filter={`drop-shadow(0 0 4px ${glowColour(colour, 0.7)})`}
        />
      }
    />
  );
  return <OhNoCardBase colour={colour} corner={corner} centre={centre} />;
};

const OhNoWildCard = () => {
  const corner = <WildCardIcon size="20px" borderSize="1px" />;
  const centre = (
    <CentreIcon icon={<WildCardIcon size="60px" borderSize="3px" />} />
  );
  return <OhNoCardBase corner={corner} centre={centre} />;
};

const OhNoDrawFourCard = () => {
  const centre = (
    <CentreIcon icon={<WildCardIcon size="60px" borderSize="3px" />} />
  );
  return <OhNoCardBase corner={<CornerNumber number="+4" />} centre={centre} />;
};

export default OhNoCard;
