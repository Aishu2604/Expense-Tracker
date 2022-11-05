import React, { useRef, useState } from "react";
import classes from "./ExpenseForm.module.css";
import Expenses from "./Expenses";

const ExpenseForm = () => {
  const [Arr, setArr] = useState([]);

  const enteredAmountRef = useRef();
  const enteredDescribeRef = useRef();
  const enteredCategoryRef = useRef();

  const addExpenseHandler = (event) => {
    event.preventDefault();

    const enteredAmount = enteredAmountRef.current.value;
    const enteredDescribe = enteredDescribeRef.current.value;
    const enteredCategory = enteredCategoryRef.current.value;

    const expenseObj = {
      amount: enteredAmount,
      description: enteredDescribe,
      category: enteredCategory,
    };

    if (
      enteredAmount.trim().length === 0 ||
      enteredDescribe.trim().length === 0 ||
      enteredCategory.trim().length === 0
    ) {
      alert("Please Fill All the Input Field");
    } else {
      setArr([...Arr, expenseObj]);
    }

    enteredAmountRef.current.value = "";
    enteredCategoryRef.current.value = "";
    enteredDescribeRef.current.value = "";
  };

  console.log(Arr);

  return (
    <div>
      <form>
        <h1>Expenses Form</h1>
        <label htmlFor="money">Amount</label>
        <input ref={enteredAmountRef} type="number" id="money"></input>
        <label htmlFor="description">Description</label>
        <input ref={enteredDescribeRef} type="text" id="description"></input>
        <label htmlFor="expenses">Category</label>
        <select className={classes.select} ref={enteredCategoryRef} id="category">
          <option value="grocery">Grocery</option>
          <option value="fuel">Fuel</option>
          <option value="medicine">Medicine</option>
          <option value="fruits">Fruits</option>
          <option value="vegitables">Vegitables</option>
          <option value="party">Party</option>
          <option value="travel">Travel</option>
          <option value="other">Other</option>
        </select>
        <button onClick={addExpenseHandler}>Submit</button>
      </form>
      <section className={classes.section}>
        <h2 className={classes.heading}>Your Expenses</h2>
        {Arr.length > 0 &&
          Arr.map((obj) => {
            {
              console.log("Expenses");
            }
            return <Expenses items={obj} />;
          })}
      </section>
    </div>
  );
};

export default ExpenseForm;
