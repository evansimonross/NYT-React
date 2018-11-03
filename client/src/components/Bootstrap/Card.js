import React from "react";

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
