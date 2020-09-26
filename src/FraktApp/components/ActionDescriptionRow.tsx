import React, { useContext } from "react";
import Row from "react-bootstrap/Row";
import { FraktAppContext } from "../context/FraktAppProvider";

const ActionDescriptionRow = () => {
  const { state } = useContext(FraktAppContext);

  return (
    <Row className="mr-1 ml-1" id="row3">
      <div
        dangerouslySetInnerHTML={{ __html: state.actionDescription || "" }}
      />
    </Row>
  );
};

export default ActionDescriptionRow;
