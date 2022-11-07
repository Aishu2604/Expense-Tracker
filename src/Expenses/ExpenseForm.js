import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./ExpenseForm.module.css";
import Expenses from "./Expenses";

const ExpenseForm = (props) => {
  const [Arr, setArr] = useState([]);
  const [expense, setExpense] = useState([]);

  const enteredAmountRef = useRef();
  const enteredDescribeRef = useRef();
  const enteredCategoryRef = useRef();

  // const fetchExpenseHandler = useCallback(async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     const response = await fetch(
  //       "https://expense-tracker-f9b22-default-rtdb.firebaseio.com/expense.json"
  //     );
  //     if (!response.ok) {
  //       throw new Error("Something went wrong ....Retrying");
  //     }
  //     const data = await response.json();
  //     const loadedExpense = [];
  //     for (const key in data) {
  //       loadedExpense.push({
  //         id: key,
  //         amount: data[key].enteredAmount,
  //         category: data[key].enteredCategory,
  //         description: data[key].enteredDescribe,
  //       });
  //     }
  //     setExpense(loadedExpense);
  //   } catch (error) {
  //     setError(error.message);
  //   }
  //   setIsLoading(false);
  // }, []);

  // useEffect(() => {
  //   fetchExpenseHandler();
  // }, [fetchExpenseHandler]);

  // useEffect(() => {
  //   const resdata = (res) => {
  //     let arr = [];
  //     for (const key in res.data) {
  //       arr.push({
  //         id: key,
  //         amount: res.data[key].enteredAmount,
  //         category: res.data[key].enteredCategory,
  //         description: res.data[key].enteredDescribe,
  //       });
  //     }
  //     setArr(arr);
  //   };
  //   fetch("https://expense-tracker-f9b22-default-rtdb.firebaseio.com/expense.json",
  //   {

  //       method: "GET",
  //       body: JSON.stringify(),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     resdata
  //   })
  // },[]);
  useEffect(() => {
    fetch(
      "https://expense-tracker-f9b22-default-rtdb.firebaseio.com/expense.json"
    ).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          let arr = [];
          for (let keys in data) {
            arr.push(data[keys]);
            console.log(data[keys]);
            setExpense((pre) => [...arr]);
          }
        });
      } else {
        res.json().then((data) => console.log(data));
      }
    });
  }, []);

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
        setExpense((pre) => pre + 1);
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
      setArr([...Arr, expenseObj]);
      // async function addExpensesHandler(expense) {
      //   const response = await fetch(
      //     "https://expense-tracker-f9b22-default-rtdb.firebaseio.com/expense.json",
      //     {
      //       method: "POST",
      //       body: JSON.stringify(expense),
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
      //   const data = await response.json();
      //   console.log(data);
      // }
    }

    enteredAmountRef.current.value = "";
    enteredCategoryRef.current.value = "";
    enteredDescribeRef.current.value = "";
  };

  console.log(Arr);

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
      </form>
      <section className={classes.section}>
        <h2 className={classes.heading}>Your Expenses</h2>
        {expense.length > 0 &&
          expense.map((obj) => {
            {
              console.log("Expenses");
            }
            return <Expenses key={Math.random()} items={obj} />;
          })}
      </section>
    </div>
  );
};

export default ExpenseForm;
