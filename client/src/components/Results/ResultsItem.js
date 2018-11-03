import React from "react";
import {Row, Col} from "../Grid";
import {SaveBtn} from "./SaveBtn";

export const SavedItem = props => (
  <li className="list-group-item">
    <Row>
      <Col size="9">
        {props.headline}
      </Col>
      <Col size="3">
        <SaveBtn id={props.id}/>
      </Col>
    </Row>
  </li>
);
