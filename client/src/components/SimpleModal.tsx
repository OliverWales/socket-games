import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import CenteredCard from "./CenteredCard";

const SimpleModal = ({
  heading,
  body,
  button,
}: {
  heading?: string;
  body: ReactNode;
  button?: { text: string; onClick: () => void };
}) => {
  const navigate = useNavigate();
  const buttonProps = button ?? { onClick: () => navigate(-1), text: "Back" };

  return (
    <CenteredCard>
      {heading && <h1>Error</h1>}
      {body}
      <button onClick={buttonProps.onClick} style={{ padding: "10px 15px" }}>
        {buttonProps.text}
      </button>
    </CenteredCard>
  );
};
export default SimpleModal;
