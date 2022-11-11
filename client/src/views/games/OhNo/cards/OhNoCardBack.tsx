import { cardColor } from "./colourUtils";
import { BIG_NUMBER_PROPS } from "./styles";

const OhNoCardBack = () => {
  return (
    <div
      style={{
        width: "100px",
        height: "150px",
        background: cardColor(undefined, 0.5),
        border: `3px solid ${cardColor(undefined)}`,
        borderRadius: "10px",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          ...BIG_NUMBER_PROPS,
          border: `3px solid ${cardColor("red")}`,
          background: cardColor("red", 0.5),
        }}
      >
        <div
          style={{
            transform: "rotate(-20deg)",
            fontSize: "30px",
            letterSpacing: "-2px",
            color: "gold",
            textShadow: `0 0 5px rgba(255, 255, 255, 0.7)`,
          }}
        >
          OHNO
        </div>
      </div>
    </div>
  );
};
export default OhNoCardBack;
