import { CSSProperties } from "react";
import { backgroundColour, borderColour, glowColour } from "../colourUtils";
import { Colour } from "../../../../../../../common/OhNo/types";

const WildCardIcon = ({
  size,
  borderSize,
}: {
  size: string;
  borderSize: string;
}) => {
  const getCellProps = (colour: Colour): CSSProperties => ({
    border: `${borderSize} solid ${borderColour(colour)}`,
    borderRadius: borderSize,
    background: backgroundColour(colour),
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
      <tbody>
        <tr>
          <td style={getCellProps("red")} />
          <td style={getCellProps("blue")} />
        </tr>
        <tr>
          <td style={getCellProps("yellow")} />
          <td style={getCellProps("green")} />
        </tr>
      </tbody>
    </table>
  );
};
export default WildCardIcon;
