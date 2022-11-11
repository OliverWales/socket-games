import { Card } from "../../../../../../common/OhNo/types";
import { borderColour } from "./colourUtils";
import OhNoCard from "./OhNoCard";
import OhNoCardBack from "./OhNoCardBack";

const CardStack = ({
  topCard,
  isInteractive = false,
}: {
  topCard?: Card;
  isInteractive?: boolean;
}) => {
  const BlankCard = ({ index }: { index: number }) => (
    <div
      style={{
        width: "100px",
        height: "150px",
        background: "black",
        border: `3px solid ${borderColour()}`,
        borderRadius: "10px",
        boxSizing: "border-box",
        position: "absolute",
        top: `${index * 3}px`,
        left: `${index * 2}px`,
      }}
    />
  );
  return (
    <div style={{ position: "relative" }}>
      {[3, 2, 1].map((i) => (
        <BlankCard index={i} key={i} />
      ))}
      {topCard ? (
        <OhNoCard card={topCard} isInteractive={isInteractive} />
      ) : (
        <OhNoCardBack isInteractive={isInteractive} />
      )}
    </div>
  );
};

export default CardStack;
