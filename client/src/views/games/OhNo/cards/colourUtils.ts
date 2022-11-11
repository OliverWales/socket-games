import { Colour } from "../types";

export const cardColor = (colour?: Colour, alpha?: number) => {
  switch (colour) {
    case "red":
      return `rgba(255, 0, 0, ${alpha ?? 1})`;
    case "green":
      return `rgba(0, 255, 0, ${alpha ?? 1})`;
    case "yellow":
      return `rgba(255, 255, 0, ${alpha ?? 1})`;
    case "blue":
      return `rgba(30, 30, 255, ${alpha ?? 1})`;
    default:
      return `rgba(90, 90, 90, ${alpha ?? 1})`;
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
