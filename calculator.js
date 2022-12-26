const btns = document.getElementById("btns");
const screen = document.getElementById("number-screen");

let firstNum = "",
  currentOperator = "",
  previousKey = "",
  previousNum = "";

const printValeus = () => {
  console.log(
    `First Num = ${firstNum}, Current Operator = ${currentOperator}, Previous Key = ${previousKey}, Previous Num = ${previousNum}`
  );
};

const calculate = (number1, operator, number2) => {
  let result = 0;

  if (operator === "+") {
    result = parseFloat(number1) + parseFloat(number2);
  } else if (operator === "-") {
    result = parseFloat(number1) - parseFloat(number2);
  } else if (operator === "*") {
    result = parseFloat(number1) * parseFloat(number2);
  } else if (operator === "/") {
    result = parseFloat(number1) / parseFloat(number2);
  }

  return String(result);
};

const isOperator = (operator) => {
  if (
    currentOperator === "*" ||
    currentOperator === "/" ||
    currentOperator === "+" ||
    currentOperator == "-"
  ) {
    return true;
  } else {
    return false;
  }
};

const handleBtn = (event) => {
  const target = event.target;
  const action = target.classList[0];
  const buttonContent = target.textContent;

  if (target.matches("button")) {
    if (action === "number") {
      if (previousKey === "operator" || screen.textContent === "0") {
        console.log("숫자 " + buttonContent + " 버튼");
        screen.textContent = buttonContent; // 버튼의 텍스트를 화면의 텍스트로 바꿉니다.
        previousKey = "number";
      } else {
        console.log("숫자 " + buttonContent + " 버튼");

        screen.textContent += buttonContent;
      }
    }
    if (action === "operator") {
      console.log(`연산자 ${buttonContent} 버튼`);

      if (previousKey === "number" && currentOperator !== "") {
        firstNum = calculate(firstNum, currentOperator, screen.textContent);
      } else if (previousKey !== "operator") {
        firstNum = screen.textContent;
      }

      currentOperator = buttonContent;

      previousKey = "operator";
    }
    if (action === "decimal") {
      if (previousKey !== "decimal") {
        if (previousKey === "operator") {
          screen.textContent = "";
        }
        screen.textContent += ".";
        previousKey = "decimal";
      }
    }
    if (action === "clear") {
      screen.textContent = "0";
      firstNum = "";
      currentOperator = "";
      previousNum = "";
      previousKey = "clear";
    }
    if (action === "calculate") {
      console.log("씨발!");
      if (previousKey === "calculate") {
        console.log("Calculate 한 번 더!");
        screen.textContent = calculate(
          screen.textContent,
          currentOperator,
          previousNum
        );
      } else {
        if (firstNum != "") {
          console.log("으아아아아");

          previousNum = screen.textContent;

          screen.textContent = calculate(
            firstNum,
            currentOperator,
            screen.textContent
          );
          previousKey = "calculate";
        }
      }
    }
  }
};

btns.addEventListener("click", handleBtn);
