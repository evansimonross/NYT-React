import React from "react";

export const Card = props => {
  return (
    <div class="card">
      <div class="card-header">
        <b>{props.header}</b>
      </div>
      <div class="card-body">
        {props.children}
      </div>
    </div>
  );
};
