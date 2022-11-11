import { Colour } from "../../../../../../common/OhNo/types";

export const backgroundColour = (colour?: Colour) => {
  switch (colour) {
    case "red":
      return "#7E231B";
    case "green":
      return "#44872F";
    case "yellow":
      return "#B79C05";
    case "blue":
      return "#181884";
    default:
      return "#2D2D2D";
  }
};

export const borderColour = (colour?: Colour) => {
  switch (colour) {
    case "red":
      return "#EA3323";
    case "green":
      return "#75FB4C";
    case "yellow":
      return "#FFD800";
    case "blue":
      return "#1E1EF5";
    default:
      return "#5A5A5A";
  }
};

export const glowColour = (colour?: Colour, alpha?: number) => {
  switch (colour) {
    case "red":
      return `rgba(255, 127, 127, ${alpha ?? 1})`;
    case "green":
      return `rgba(0, 255, 0, ${alpha ?? 1})`;
    case "yellow":
      return `rgba(255, 255, 0, ${alpha ?? 1})`;
    case "blue":
      return `rgba(255, 200, 200, ${alpha ?? 1})`;
    default:
      return `rgba(255, 255, 255, ${alpha ?? 1})`;
  }
};
