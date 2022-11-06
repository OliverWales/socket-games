import { FC, ReactNode } from "react";

const CenteredCard: FC<{
  children: ReactNode;
  width?: string;
  noBorder?: boolean;
}> = ({ children, width, noBorder = false }) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto",
      width,
      maxWidth: width ?? "450px",
      height: "fit-content",
      padding: "30px",
      border: noBorder ? undefined : "3px solid #ddd",
      borderRadius: "2px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    {children}
  </div>
);
export default CenteredCard;
