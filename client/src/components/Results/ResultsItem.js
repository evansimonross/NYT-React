import React from "react";
import {Row, Col} from "../Bootstrap";
import {SaveBtn} from "./SaveBtn";

export const ResultsItem = props => (
  <li className="list-group-item">
    <Row>
      <Col size="9">
        <a href={props.web_url}>{props.headline}</a>
      </Col>
      <Col size="3">
        <SaveBtn index={props.index} onClick={() => props.save(props.index)}/>
      </Col>
    </Row>
  </li>
);
