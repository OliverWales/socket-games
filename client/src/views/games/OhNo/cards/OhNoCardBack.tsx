import { useState } from "react";
import { backgroundColour, borderColour } from "./colourUtils";
import { BIG_NUMBER_PROPS } from "./styles";

const OhNoCardBack = ({
  upsideDown = false,
  isInteractive = false,
}: {
  upsideDown?: boolean;
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
        background: backgroundColour(),
        border: `3px solid ${borderColour()}`,
        borderRadius: "10px",
        position: "relative",
        boxSizing: "border-box",
        boxShadow: isInteractive ? "0 0 2px 3px #FFF" : undefined,
        cursor: isInteractive ? "pointer" : undefined,
        transform:
          isInteractive && isHovered
            ? "translate(0, -5px)"
            : upsideDown
            ? "rotate(180deg)"
            : undefined,
        transition: `transform .3s ease-out`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          ...BIG_NUMBER_PROPS,
          border: `3px solid ${borderColour("red")}`,
          background: backgroundColour("red"),
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
