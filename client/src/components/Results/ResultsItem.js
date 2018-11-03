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
        <SaveBtn headline={props.headline} web_url={props.web_url} snippet={props.snippet}/>
      </Col>
    </Row>
  </li>
);
