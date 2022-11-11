import { ReactNode, useState } from "react";
import {
  ActionCard,
  Card,
  Colour,
  NumberCard,
} from "../../../../../../common/OhNo/types";
import SwapIcon from "./icons/SwapIcon";
import DrawTwoIcon from "./icons/DrawTwoIcon";
import SkipIcon from "./icons/SkipIcon";
import { glowColour, backgroundColour, borderColour } from "./colourUtils";
import WildCardIcon from "./icons/WildCardIcon";
import { BIG_NUMBER_PROPS, SMALL_NUMBER_PROPS } from "./styles";

const OhNoCard = ({
  card,
  isInteractive = false,
}: {
  card: Card;
  isInteractive?: boolean;
}) => {
  switch (card.type) {
    case "number_card":
      return <OhNoNumberCard card={card} isInteractive={isInteractive} />;
    case "draw_two":
      return <OhNoDrawTwoCard card={card} isInteractive={isInteractive} />;
    case "reverse":
      return <OhNoReverseCard card={card} isInteractive={isInteractive} />;
    case "skip":
      return <OhNoSkipCard card={card} isInteractive={isInteractive} />;
    case "wild":
      return <OhNoWildCard isInteractive={isInteractive} />;
    case "draw_four":
      return <OhNoDrawFourCard isInteractive={isInteractive} />;
    default:
      throw new Error("Card type not implemented");
  }
};

const CentreText = ({ colour, text }: { colour?: Colour; text: string }) => (
  <div
    style={{
      ...BIG_NUMBER_PROPS,
      border: `3px solid ${borderColour(colour)}`,
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
      border: `3px solid ${borderColour(colour)}`,
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
  isInteractive = false,
}: {
  colour?: Colour;
  corner: ReactNode;
  centre: ReactNode;
  isInteractive?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{
        width: "100px",
        height: "150px",
        background: backgroundColour(colour),
        border: `3px solid ${borderColour(colour)}`,
        borderRadius: "10px",
        position: "relative",
        boxSizing: "border-box",
        boxShadow: isInteractive ? "0 0 2px 3px #FFF" : undefined,
        cursor: isInteractive ? "pointer" : undefined,
        transform:
          isInteractive && isHovered ? "translate(0, -5px)" : undefined,
        transition: `transform .3s ease-out`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

const OhNoNumberCard = ({
  card,
  isInteractive = false,
}: {
  card: NumberCard;
  isInteractive?: boolean;
}) => {
  const { colour, number } = card;
  const centre = <CentreText colour={colour} text={String(number)} />;
  const corner = <CornerNumber colour={colour} number={String(number)} />;
  return (
    <OhNoCardBase
      colour={colour}
      corner={corner}
      centre={centre}
      isInteractive={isInteractive}
    />
  );
};

const OhNoDrawTwoCard = ({
  card,
  isInteractive = false,
}: {
  card: ActionCard;
  isInteractive?: boolean;
}) => {
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
  return (
    <OhNoCardBase
      colour={colour}
      corner={corner}
      centre={centre}
      isInteractive={isInteractive}
    />
  );
};

const OhNoReverseCard = ({
  card,
  isInteractive = false,
}: {
  card: ActionCard;
  isInteractive?: boolean;
}) => {
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
  return (
    <OhNoCardBase
      colour={colour}
      corner={corner}
      centre={centre}
      isInteractive={isInteractive}
    />
  );
};

const OhNoSkipCard = ({
  card,
  isInteractive = false,
}: {
  card: ActionCard;
  isInteractive?: boolean;
}) => {
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
  return (
    <OhNoCardBase
      colour={colour}
      corner={corner}
      centre={centre}
      isInteractive={isInteractive}
    />
  );
};

const OhNoWildCard = ({ isInteractive }: { isInteractive?: boolean }) => {
  const corner = <WildCardIcon size="20px" borderSize="1px" />;
  const centre = (
    <CentreIcon icon={<WildCardIcon size="60px" borderSize="3px" />} />
  );
  return (
    <OhNoCardBase
      corner={corner}
      centre={centre}
      isInteractive={isInteractive}
    />
  );
};

const OhNoDrawFourCard = ({ isInteractive }: { isInteractive?: boolean }) => {
  const centre = (
    <CentreIcon icon={<WildCardIcon size="60px" borderSize="3px" />} />
  );
  return (
    <OhNoCardBase
      corner={<CornerNumber number="+4" />}
      centre={centre}
      isInteractive={isInteractive}
    />
  );
};

export default OhNoCard;
