import { CSSProperties } from "react";

export const SMALL_NUMBER_PROPS: CSSProperties = {
  fontWeight: "bold",
  fontSize: "20px",
  userSelect: "none",
  letterSpacing: "-2px",
};

export const BIG_NUMBER_PROPS: CSSProperties = {
  width: "100%",
  height: "calc(100% - 20px)",
  lineHeight: "130px",
  textAlign: "center",
  borderRadius: "70% 30% / 70% 30%",
  fontSize: "50px",
  fontWeight: "bold",
  letterSpacing: "-4px",
  userSelect: "none",
  marginLeft: "-3px",
  marginTop: "calc(10px - 3px)",
};
