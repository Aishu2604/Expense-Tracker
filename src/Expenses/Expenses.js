import React from "react";
import classes from "./Expenses.module.css";

const Expenses = (props) => {
  return (
    <div>
      <main className={classes.main}>
        <span>
          <h3>Amount:-</h3>
          <h2 className={classes.items}>${props.items.amount}</h2>
        </span>
        <span>
          <h3>Description:-</h3>
          <h2 className={classes.items}>{props.items.description}</h2>
        </span>
        <span>
          <h3>Category:-</h3>
          <h2 className={classes.items}>{props.items.category}</h2>
        </span>
        <button
          onClick={() => props.editButtonClicked(props.items)}
          className={classes.edit_button}
        >
          Edit
        </button>
        <button
          onClick={() => props.deleteButtonClicked(props.items.id)}
          className={classes.delete_button}
        >
          Delete
        </button>
      </main>
    </div>
  );
};

export default Expenses;
