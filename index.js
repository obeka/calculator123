const primaryDisplay = document.querySelector(".primary-display"); // current value will be displayed here
const secondaryDisplay = document.querySelector(".secondary-display"); // operation will be displayed
const buttonContainer = document.querySelector(".button-container"); // div contains all the buttons
const acBtn = document.querySelector(".ac"); // ac button to delete all values
const pmBtn = document.querySelector(".pm"); // to change current values negative positive value
const percentBtn = document.querySelector(".percent"); // to get the percentage

const additionBtn = document.querySelector(".addition");
const subtractionBtn = document.querySelector(".subtraction");
const divisionBtn = document.querySelector(".division");
const multiplicationBtn = document.querySelector(".multiplication");
const equalBtn = document.querySelector(".multiplication");

function parse(str) {
  return Function(`'use strict'; return (${str})`)();
}

buttonContainer.addEventListener("click", (event) => {
  // event.target.classList => array / contains is an array method which returns a boolean value
  const primaryDisplayValue = primaryDisplay.textContent; //  get the current value in primary display

  if (event.target.classList.contains("number")) {
    if (primaryDisplayValue === "0") {
      primaryDisplay.textContent = event.target.innerHTML;
    } else {
      primaryDisplay.textContent = primaryDisplayValue + event.target.innerHTML;
    }
  }

  if (event.target.classList.contains("operator")) {
    if (primaryDisplayValue !== "0") {
      secondaryDisplay.textContent =
        primaryDisplayValue + event.target.innerHTML;
      primaryDisplay.textContent = 0;
    } else if (
      secondaryDisplay.textContent !== "" && //regex below
      //   !secondaryDisplay.textContent.includes(/[+-÷*]/g)
      !secondaryDisplay.textContent.includes("+") &&
      !secondaryDisplay.textContent.includes("-") &&
      !secondaryDisplay.textContent.includes("*") &&
      !secondaryDisplay.textContent.includes("÷")
    ) {
      // here will work if we have a result
      secondaryDisplay.textContent =
        secondaryDisplay.textContent + event.target.innerHTML;
    }
  }

  if (event.target.classList.contains("equal")) {
    if (
      secondaryDisplay.textContent.includes("+") ||
      secondaryDisplay.textContent.includes("-") ||
      secondaryDisplay.textContent.includes("*") ||
      secondaryDisplay.textContent.includes("÷")
    ) {
      const result = parse(secondaryDisplay.textContent + primaryDisplayValue);
      secondaryDisplay.textContent = result;
      primaryDisplay.textContent = 0;
    }
  }

  if (event.target.classList.contains("function")) {
    const functionType = event.target.textContent;

    switch (functionType) {
      case "AC":
        primaryDisplay.textContent = "0";
        secondaryDisplay.textContent = "";
        break;
      case "±":
        if (!primaryDisplay.textContent.includes("-")) {
          primaryDisplay.textContent = "-" + primaryDisplay.textContent;
        } else {
          primaryDisplay.textContent = primaryDisplay.textContent.split("-")[1];
        }
        break;
      case "%":
        secondaryDisplay.textContent = primaryDisplay.textContent / 100;
        primaryDisplay.textContent = "0";
        break;

      default:
        break;
    }
  }

  if (
    event.target.classList.contains("decimal") &&
    !primaryDisplay.textContent.includes(".")
  ) {
    primaryDisplay.textContent += ".";
  }
});
