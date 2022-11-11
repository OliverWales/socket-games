import { Colour } from "./types";
import OhNoCard from "./cards/OhNoCard";
import OhNoCardBack from "./cards/OhNoCardBack";

const OhNo = () => {
  const COLOURS: Colour[] = ["red", "yellow", "green", "blue"];
  const NUMBERS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      {COLOURS.map((c) => (
        <div style={{ width: "calc(100px * 17)", display: "flex" }}>
          {NUMBERS.map((n) => (
            <OhNoCard card={{ type: "number_card", colour: c, number: n }} />
          ))}
          <OhNoCard card={{ type: "draw_two", colour: c }} />
          <OhNoCard card={{ type: "reverse", colour: c }} />
          <OhNoCard card={{ type: "skip", colour: c }} />
          <OhNoCard card={{ type: "wild" }} />
          <OhNoCard card={{ type: "draw_four" }} />
          <OhNoCardBack />
        </div>
      ))}
    </div>
  );
};
export default OhNo;
