import React, { useEffect, useRef, useState } from "react";
import classes from "./ExpenseForm.module.css";
import Expenses from "./Expenses";
import { expenseAction } from "../store/expense-reducer";
import { useDispatch, useSelector } from "react-redux";
import { themeAction } from "../store/theme-reducer";

const ExpenseForm = (props) => {
  const mode = useSelector((state) => state.theme.theme);
  console.log(mode);
  const premium = useSelector((state) => state.theme.onPremium);
  const premiumButton = useSelector((state) => state.expense.premiumButton);
  const expenseArr = useSelector((state) => state.expense.expenses);
  const [expense, setExpense] = useState([]);
  const [editId, setEditId] = useState(null);
  const [render, setRender] = useState(0);

  const enteredAmountRef = useRef();
  const enteredDescribeRef = useRef();
  const enteredCategoryRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      "https://expense-tracker-f9b22-default-rtdb.firebaseio.com/expense.json"
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          let arr = [];
          for (let keys in data) {
            let obj = {
              ...data[keys],
              id: keys,
            };
            arr.push(obj);
            console.log(keys);
            setExpense((pre) => [...arr]);
            console.log(arr);
          }
        });
      } else {
        res.json().then((data) => console.log(data));
      }
    });
  }, [render]);

  const editButtonHandler = (data) => {
    console.log(data);
    let filteredArr = expenseArr.filter((arr) => arr.Id !== data.Id);
    dispatch(expenseAction.updateExpense(filteredArr));
    enteredAmountRef.current.value = data.amount;
    enteredDescribeRef.current.value = data.description;
    enteredCategoryRef.current.value = data.category;
    setEditId(data.Id);
    deleteButtonHandler(data.id);
  };

  const deleteButtonHandler = (data) => {
    console.log(data);
    fetch(
      `https://expense-tracker-f9b22-default-rtdb.firebaseio.com/expense/${data}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        // alert("item deleted");
        setRender((pre) => pre - 1);
      } else {
        res.json().then((data) => {
          alert("error find");
          console.log(data);
        });
      }
    });
  };

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
    fetch(
      "https://expense-tracker-f9b22-default-rtdb.firebaseio.com/expense.json",
      {
        method: "POST",
        body: JSON.stringify(expenseObj),
      }
    ).then((res) => {
      if (res.ok) {
        setRender((pre) => pre + 1);
      } else {
        res.json().then((data) => alert(data.error.message));
      }
    });

    if (
      enteredAmount.trim().length === 0 ||
      enteredDescribe.trim().length === 0 ||
      enteredCategory.trim().length === 0
    ) {
      alert("Please Fill All the Input Field");
    } else {
      dispatch(expenseAction.updateExpense([...expenseArr, expenseObj]));
    }

    enteredAmountRef.current.value = "";
    enteredCategoryRef.current.value = "";
    enteredDescribeRef.current.value = "";
  };
  console.log(expense);
  console.log(expenseArr);
  if (expense.length > 0) {
    let totalAmount = expense.reduce((prev, current) => {
      return prev + Number(current.amount);
    }, 0);
    console.log(totalAmount);
    if (totalAmount > 10000) {
      dispatch(expenseAction.setPremiumButton());
    } else {
      dispatch(expenseAction.unSetPremiumButton());
      dispatch(themeAction.offTheme());
      dispatch(themeAction.offPremium());
    }
  }

  const premiumHandler = (event) => {
    event.preventDefault();
    dispatch(themeAction.onTheme());
    dispatch(themeAction.onPremium());
  };

  function makeCSV(data) {
    let arr1 = data.map((obj) => {
      let arr2 = [obj.amount, obj.category, obj.description];
      return arr2.join();
    });
    arr1.unshift(["AMOUNT", "CATEGORY", "DESCRIPTION"]);
    return arr1.join("\n");
  }
  const blob = new Blob([makeCSV(expense)]);

  // console.log(Arr);
  // const themeMode = mode ? "light_Mode" : "dark_Mode";
  // console.log(typeof themeMode)
  return (
    <div style={{ backgroundColor: mode ? "lightblue" : "lightgreen" }}>
      {/* // <div className={mode === false ? classes.light_Mode : ""}> */}
      <div>
        <h1>Expenses Form</h1>
        <label htmlFor="money">Amount</label>
        <input ref={enteredAmountRef} type="number" id="money"></input>
        <label htmlFor="description">Description</label>
        <input ref={enteredDescribeRef} type="text" id="description"></input>
        <label htmlFor="expenses">Category</label>
        <select
          className={classes.select}
          ref={enteredCategoryRef}
          id="category"
        >
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
        <div>
          {premiumButton && (
            <button onClick={premiumHandler} className={classes.premium_button}>
              {premium
                ? "You Subscribe to Premium"
                : "Your Total Expenses Amount Exceed More Than $10000, Let's Go For Premium"}
            </button>
          )}
          {premium && (
            <button onClick={() => dispatch(themeAction.toggleTheme())}>
              Change Mode
            </button>
          )}
          {expense.length > 0 && premium && (
            <a href={URL.createObjectURL(blob)} download="Expense.csv">
              Download Expense
            </a>
          )}
        </div>
      </div>
      <section className={classes.section}>
        <h2 className={classes.heading}>Your Expenses</h2>
        {expense.length > 0 &&
          expense.map((obj) => {
            {
              console.log(obj);
            }
            return (
              <Expenses
                key={Math.random()}
                items={obj}
                editButtonClicked={editButtonHandler}
                deleteButtonClicked={deleteButtonHandler}
              />
            );
          })}
      </section>
    </div>
  );
};

export default ExpenseForm;
