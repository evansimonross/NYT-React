import React from "react";
import "./Card.css";

export const Card = props => {
  return (
    <div className="card">
      <div className="card-header">
        <b>{props.header}</b>
      </div>
      <div className="card-body">
        {props.children}
      </div>
    </div>
  );
};
