const expression = document.getElementById("expression");
const result = document.getElementById("result");
const buttons = document.querySelectorAll(".buttons button, .extra-buttons button");
const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clear-history");
const themeBtn = document.getElementById("theme-btn");
const copyBtn = document.getElementById("copyBtn");
const clock = document.getElementById("clock");

let currentInput = "";
let firstNumber = "";
let secondNumber = "";
let operator = "";

// CLOCK
function updateClock() {
    clock.textContent = new Date().toLocaleTimeString();
}
updateClock();
setInterval(updateClock, 1000);

// THEME
if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {
        themeBtn.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        themeBtn.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});

// COPY RESULT
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(result.textContent);
    copyBtn.textContent = "✅";

    setTimeout(() => {
        copyBtn.textContent = "📋";
    }, 1000);
});

// HISTORY
function addHistory(text) {
    const li = document.createElement("li");
    li.textContent = text;
    historyList.prepend(li);
}

clearHistoryBtn.addEventListener("click", () => {
    historyList.innerHTML = "";
});

// CALCULATION
function calculate() {

    let num1 = parseFloat(firstNumber);
    let num2 = parseFloat(secondNumber);

    switch (operator) {

        case "+":
            return num1 + num2;

        case "−":
            return num1 - num2;

        case "×":
            return num1 * num2;

        case "÷":
            if (num2 === 0)
                return "Error";

            return num1 / num2;
    }
}

// BUTTONS
buttons.forEach(button => {

    button.addEventListener("click", () => {

        let value = button.textContent;

        // CLEAR
        if (value === "C") {

            currentInput = "";
            firstNumber = "";
            secondNumber = "";
            operator = "";

            expression.textContent = "";
            result.textContent = "0";
        }

        // DELETE
        else if (value === "DEL") {

            currentInput = currentInput.slice(0, -1);
            result.textContent = currentInput || "0";
        }

        // PI
        else if (value === "π") {

            currentInput = Math.PI.toFixed(6);
            result.textContent = currentInput;
        }

        // SQRT
        else if (value === "√") {

            let num = parseFloat(result.textContent);

            if (num >= 0) {

                let answer = Math.sqrt(num);

                expression.textContent = "√(" + num + ")";
                result.textContent = answer;

                currentInput = answer.toString();
            }
        }

        // SQUARE
        else if (value === "x²") {

            let num = parseFloat(result.textContent);

            let answer = num * num;

            expression.textContent = num + "²";
            result.textContent = answer;

            currentInput = answer.toString();
        }

        // PLUS / MINUS
        else if (value === "±") {

            currentInput = (-parseFloat(result.textContent)).toString();
            result.textContent = currentInput;
        }

        // PERCENTAGE
        else if (value === "%") {

            currentInput = (parseFloat(result.textContent) / 100).toString();
            result.textContent = currentInput;
        }

        // OPERATORS
        else if (["+", "−", "×", "÷"].includes(value)) {

            if (firstNumber !== "" && currentInput !== "") {

                secondNumber = currentInput;

                let answer = calculate();

                firstNumber = answer.toString();

                result.textContent = answer;

            } else {

                firstNumber = result.textContent;
            }

            operator = value;
            currentInput = "";

            expression.textContent = firstNumber + " " + operator;
        }

        // EQUALS
        else if (value === "=") {

            secondNumber = currentInput;

            let answer = calculate();

            expression.textContent =
                firstNumber + " " + operator + " " + secondNumber;

            result.textContent = answer;

            addHistory(
                expression.textContent + " = " + answer
            );

            firstNumber = answer.toString();
            currentInput = "";
        }

        // NUMBERS
        else {

            currentInput += value;

            result.textContent = currentInput;

            if (operator !== "") {

                expression.textContent =
                    firstNumber + " " +
                    operator + " " +
                    currentInput;
            }
        }

    });

});
// ================= MEMORY =================

let memory = 0;

const mc = document.getElementById("mc");
const mr = document.getElementById("mr");
const mplus = document.getElementById("mplus");
const mminus = document.getElementById("mminus");

mc.addEventListener("click", () => {
    memory = 0;
});

mr.addEventListener("click", () => {
    currentInput = memory.toString();
    result.textContent = currentInput;
});

mplus.addEventListener("click", () => {
    memory += parseFloat(result.textContent) || 0;
});

mminus.addEventListener("click", () => {
    memory -= parseFloat(result.textContent) || 0;
});


// ================= LOCAL STORAGE HISTORY =================

function saveHistory() {

    let items = [];

    document.querySelectorAll("#history-list li").forEach(li => {
        items.push(li.textContent);
    });

    localStorage.setItem("history", JSON.stringify(items));
}

function loadHistory() {

    let items = JSON.parse(localStorage.getItem("history")) || [];

    items.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        historyList.appendChild(li);

    });

}

loadHistory();


// Override addHistory function

function addHistory(text) {

    const li = document.createElement("li");

    li.textContent = text;

    historyList.prepend(li);

    saveHistory();

}


// Clear history completely

clearHistoryBtn.addEventListener("click", () => {

    historyList.innerHTML = "";

    localStorage.removeItem("history");

});


// ================= KEYBOARD SUPPORT =================

document.addEventListener("keydown", e => {

    const key = e.key;

    // Numbers
    if ("0123456789.".includes(key)) {

        document.querySelectorAll(".buttons button,.extra-buttons button")
        .forEach(button => {

            if (button.textContent === key) {

                button.click();

            }

        });

    }

    // Operators
    if (key === "+") {

        document.querySelectorAll(".operator")[3].click();

    }

    if (key === "-") {

        document.querySelectorAll(".operator")[2].click();

    }

    if (key === "*") {

        document.querySelectorAll(".operator")[1].click();

    }

    if (key === "/") {

        document.querySelectorAll(".operator")[0].click();

    }

    // Enter
    if (key === "Enter") {

        document.querySelector(".equal").click();

    }

    // Backspace
    if (key === "Backspace") {

        document.querySelectorAll(".special")[1].click();

    }

    // Escape
    if (key === "Escape") {

        document.querySelectorAll(".special")[0].click();

    }

});


// ================= SAVE THEME =================

window.addEventListener("load", () => {

    if (localStorage.getItem("theme") === "light") {

        document.body.classList.add("light");

        themeBtn.textContent = "☀️";

    }

});


// ================= COPY SUCCESS MESSAGE =================

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(result.textContent);

    copyBtn.innerHTML = "✅";

    setTimeout(() => {

        copyBtn.innerHTML = "📋";

    },1000);

});