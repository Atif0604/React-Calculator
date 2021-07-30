import { useState } from "react";
import "./App.css";

function App() {
  let [oldExpression, setOldExpression] = useState("");
  let [expression, setExpression] = useState("");
  let [prev, setPerv] = useState("");

  let numerics = new Set("0123456789.");
  let operators = new Set("+-*/");
  let buttons = [
    "(",
    ")",
    "CE",
    "AC",
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  let evaluateExpression = function () {
    let evaluation = eval(expression);
    setOldExpression("Ans = " + expression );
    setExpression(String(evaluation));
    setPerv("ANS");
  };

  let putNumerics = function (value) {
    if (prev === "ANS") {
      // setExpression(event.key);the below line is same as above bas pararms passing is done
      setOldExpression("Ans = " + expression);
      setExpression(value);
      // setPerv("NUM");
    } else {
      // setExpression(expression + event.key);the below is same as above bas pararms passing is done
      setExpression(expression + value);
      // setPerv("OP");
    }
    setPerv("NUM");
  };
  let putOperator = function (value) {
    if (prev !== "OP") {
      setExpression(expression + value);}
      else{
        setExpression(expression.slice(0,-1) + value);
      }
      setPerv("OP");
    };
  let eraseExpression = function () {
    if (expression.length >= 1) {
      //as on 0 lenth is it was giving page error
      setExpression(expression.slice(0, -1));
    }
    setPerv("DEL");
  };
  let clearExpression = function () {
    setExpression("");
    setOldExpression("");
  };
  let handleKeyUp = function (event) {
    // console.log(event.key);
    if (event.key === "Backspace") {
      eraseExpression();
    }
    //else if (numerics.has(event.key) || operators.has(event.key)) {

    //   setExpression(expression + event.key);
    // }
    else if (numerics.has(event.key)) {
      // if (prev === "ANS"){
      //   setExpression(event.key);
      //   setPerv("Num");
      // }
      // else {
      //   setExpression(expression + event.key);
      //   setPerv("OP");
      // }
      putNumerics(event.key);
    } else if (operators.has(event.key)) {
      // setExpression(expression + event.key);
      putOperator(event.key);
    } else if (event.key === "Enter") {
      evaluateExpression();
      // setPerv("ANS");
    }
  };

  return (
    // <div className="App" style={{
    //   width : "100vw",
    //   height : "100vh",
    //   background : "#999",
    //   display : "flex",
    //   flexDirection : "column",
    // }}>
    //tabindex is for focus so that we can take key input and onkeyup is a event handler which is use when the key is press and it is realising and onkeydown is for when the key is just pressed
    <div className="App" tabIndex={0} onKeyUp={handleKeyUp}>
      <div
        className="App1"
        style={{
          background: "rgb(199,199,199)",
          padding: "20px",
          borderRadius: "20px",
          height : "500px",
        }}
      >
        <h1 className="heading">My Calculator</h1>
        <div
          style={{
            width: "400px",
            height : "150px",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "20px",
            borderRadius: "20px",
            margin: "10px",
            overflow : "hidden"
          }}
        >
          <h5>
            {/* {`Ans = `} */}
            {oldExpression}
          </h5>
          <h1>{expression}</h1>
        </div>
        <div
          style={{
            width: "400px",
            // height : "150px",
            background: "#fff",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "20px",
            borderRadius: "20px",
            flexWrap: "wrap",
            margin: "10px",
          }}
        >
          {buttons.map(function (buttonValue, idx) {
            return (
              <button
                style={{
                  width: "90px",
                  padding: "5px",
                  margin: "3px",
                }}
                onClick={function () {
                  // if (buttonValue === "=") {
                  //   evaluateExpression();
                  // } else if (buttonValue === "CE") {
                  //   eraseExpression();
                  // } else if (buttonValue === "AC") {
                  //   clearExpression();
                  // } else {
                  //   setExpression(expression + buttonValue);
                  // }
                  if (buttonValue === "CE") {
                    eraseExpression();
                  } else if (buttonValue === "AC") {
                    clearExpression();
                  } else if (numerics.has(buttonValue)) {
                    putNumerics(buttonValue);
                  } else if (operators.has(buttonValue)) {
                    putOperator(buttonValue);
                  } else if (buttonValue === "=") {
                    evaluateExpression();
                  }
                }}
              >
                {buttonValue}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
