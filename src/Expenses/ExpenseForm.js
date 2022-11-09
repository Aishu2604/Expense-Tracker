import React, { useEffect, useRef, useState } from "react";
import classes from "./ExpenseForm.module.css";
import Expenses from "./Expenses";
import { expenseAction } from "../store/expense-reducer";
import { useDispatch, useSelector } from "react-redux";

const ExpenseForm = (props) => {
  const [Arr, setArr] = useState([]);
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
            // dispatch(expenseAction.updateExpense(arr))
            console.log(keys);
            setExpense((pre) => [...arr]);
            
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
    // setArr(filteredArr);
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
    // props.onAddExpense(expenseObj);

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

  let premium;
  console.log(expenseArr)
  if (expenseArr.length > 0) {
    let totalAmount = expenseArr.reduce((prev, current) => {
      return prev + Number(current.amount);
    }, 0);
    console.log(totalAmount);
    if (totalAmount > 10000) {
      premium = true;
    } else {
      premium = false;
    }
  }

  // console.log(Arr);

  return (
    <div>
      <form onSubmit={addExpenseHandler}>
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
        <button>Submit</button>
        {premium && (
          <h4>Your expenses amount exceed more then $1000, go from premimum</h4>
        )}
        {premium && <button>Buy Premium</button>}
      </form>
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
