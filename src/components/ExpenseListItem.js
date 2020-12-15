import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

export const ExpenseListItem = ({ description, amount, createdAt, id }) => (
  <Link className="list-link" to={`/edit/${id}`}>
    <div>
      <h3 className="title">{description}</h3>
      <span>{moment(createdAt).format(" MMMM Do Y")}</span>
    </div>
    <h3>{numeral(amount / 100).format("$0,0.00")}</h3>
  </Link>
);

export default ExpenseListItem;
