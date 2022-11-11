import { CSSProperties } from "react";
import { cardColor, glowColour } from "../colourUtils";
import { Colour } from "../../types";

const WildCardIcon = ({
  size,
  borderSize,
}: {
  size: string;
  borderSize: string;
}) => {
  const getCellProps = (colour: Colour): CSSProperties => ({
    border: `${borderSize} solid ${cardColor(colour)}`,
    borderRadius: borderSize,
    background: cardColor(colour, 0.7),
    boxShadow: `0 0 calc(${borderSize} * 2) ${glowColour(undefined, 0.5)}`,
  });

  return (
    <table
      style={{
        width: size,
        height: size,
        borderSpacing: `calc(${borderSize} / 2)`,
      }}
    >
      <tr>
        <td style={getCellProps("red")} />
        <td style={getCellProps("blue")} />
      </tr>
      <tr>
        <td style={getCellProps("yellow")} />
        <td style={getCellProps("green")} />
      </tr>
    </table>
  );
};
export default WildCardIcon;
