import React from "react";
import { Row, Col } from "../Grid";
import { RemoveBtn } from "./RemoveBtn";

export const SavedItem = props => (
  <li className="list-group-item">
    <Row>
      <Col size="6">
        <a href={props.web_url}>{props.headline}</a>
      </Col>
      <Col size="3">
        Date Saved: {props.date}
      </Col>
      <Col size="3">
        <RemoveBtn id={props.id} />
      </Col>
    </Row>
    <Row>
      <Col size="12">
        {props.snippet}
      </Col>
    </Row>
  </li>
);
