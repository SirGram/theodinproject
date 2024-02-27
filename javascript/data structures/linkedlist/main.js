import LinkedList from "./src/LinkedList.js";

const newList = new LinkedList();
console.log(newList.append(17));
console.log(newList.append(123));
console.log(newList.append(6));
console.log(newList.append(90));

const hoverPhrases = {
  "POP": "Remove and return last value",
  "GET HEAD": "Return value at first index",
  "APPEND": "Input value at last index",
  "PREPEND": "Input value at last index",
  "GET TAIL": "Return value at last index",
  "GET VALUE AT": "Return value at certain index",
  "CONTAINS VALUE": "Return boolean of value containment",
  "GET INDEX FROM": "Return index from first found value",
  "REMOVE VALUE AT": "Remove and return value at certain index",
  "PUT VALUE AT": "Input value at certain index",
};
const $logButton = document.getElementById("button-logs");
let $logMessage = document.getElementById("log");
const $logs = document.getElementById("logs");
const $logsText = document.getElementById("logs-text");
const $exitButton = document.getElementById("exit");
const $tooltip = document.getElementById("tooltip");
const $buttons = document.querySelectorAll(".control");

const $popButton = document.getElementById("pop");
const $getHeadButton = document.getElementById("get-head");
const $getTailButton = document.getElementById("get-tail");
const $appendButton = document.getElementById("append");
const $prependButton = document.getElementById("prepend");
const $containsButton = document.getElementById("contains-value");
const $getIndexButton = document.getElementById("get-index-from");
const $getValueButton = document.getElementById("get-value-at");
const $removeValueButton = document.getElementById("remove-value-at");
const $putValueButton = document.getElementById("put-value-at");

const $value = document.getElementById("value");
const $index = document.getElementById("index");

let $numbers;

$logButton.addEventListener("click", function () {
  displayLogs();
});
$exitButton.addEventListener("click", function () {
  displayLogs();
});
$buttons.forEach((button) => {
  button.addEventListener("mouseover", function () {
    const tooltipText = hoverPhrases[this.textContent];
    $tooltip.innerHTML = tooltipText;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    $tooltip.innerHTML = tooltipText;

    $tooltip.style.top = `${mouseY}px`;
    $tooltip.style.left = `${mouseX}px`;

    $tooltip.style.display = "block";
  });
  button.addEventListener("mouseout", function () {
    $tooltip.style.display = "none";
  });
});
$popButton.addEventListener("click", function () {
  const popValue = newList.pop();
  $logsText.innerHTML += `POP => {Value: ${popValue}}<br>`;

  updateDisplay();
});
$getHeadButton.addEventListener("click", function () {
  const head = newList.getHead();
  if (head) {
    $logsText.innerHTML += `HEAD => {Value: ${head.value} `;
    let hasMoreNodes;
    if (head.nextNode) {
      hasMoreNodes = "YES";
    } else {
      hasMoreNodes = "NO";
    }
    $logsText.innerHTML += `NextNode: ${hasMoreNodes}}<br>`;
  } else {
    $logsText.innerHTML += `TAIL => {Value: ${head}}<br>`;
  }
  updateDisplay();
});
$getTailButton.addEventListener("click", function () {
  const tail = newList.getTail();
  if (tail) {
    $logsText.innerHTML += `TAIL => {Value: ${tail.value}}<br>`;
  } else {
    $logsText.innerHTML += `TAIL => {Value: ${tail}}<br>`;
  }
  updateDisplay();
});
$appendButton.addEventListener("click", function () {
  const value = $value.value;
  if (value) {
    const appendedNode = newList.append(value);
    $logsText.innerHTML += `APPEND: {Value: ${value}} => {Value: ${appendedNode.value}} <br>`;
  } else {
    $logsText.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay();
});
$prependButton.addEventListener("click", function () {
  const value = $value.value;
  let hasMoreNodes;
  if (value) {
    const appendedNode = newList.prepend(value);
    $logsText.innerHTML += `PREPEND: {Value: ${value}} => {Value: ${appendedNode.value} `;
    if (appendedNode.nextNode) {
      hasMoreNodes = "YES";
    } else {
      hasMoreNodes = "NO";
    }
    $logsText.innerHTML += `NextNode: ${hasMoreNodes}}<br>`;
  } else {
    $logsText.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay();
});
$containsButton.addEventListener("click", function () {
  const value = $value.value;
  if (value) {
    const containsValue = newList.contains(value);
    const result = containsValue ? "TRUE" : "FALSE";
    $logsText.innerHTML += `CONTAINS: {Value: ${value}} => ${result}<br>`;
  } else {
    $logsText.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay();
});
$getIndexButton.addEventListener("click", function () {
  const value = $value.value;
  if (value) {
    const index = newList.find(value);

    $logsText.innerHTML += `GET INDEX FROM: {Value: ${value}} => {Index: ${index}}<br>`;
  } else {
    $logsText.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay();
});
$getValueButton.addEventListener("click", function () {
  const index = $index.value;
  if (index) {
    const value = newList.at(index);

    $logsText.innerHTML += `GET VALUE AT: {Index: ${index}} => {Value: ${value.value}}<br>`;
  } else {
    $logsText.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay();
});
$removeValueButton.addEventListener("click", function () {
  const index = $index.value;
  if (index) {
    const value = newList.removeAt(index);
    if (value) {
      $logsText.innerHTML += `REMOVE VALUE AT: {Index: ${index}} => {Value: ${value.value}, Index: ${index}}<br>`;
    } else {
      $logsText.innerHTML += `REMOVE VALUE AT: {Index: ${index}} => {Value: ${value}}<br>`;
    }
  } else {
    $logsText.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay();
});
$putValueButton.addEventListener("click", function () {
  const value = $value.value;
  const index = $index.value;
  if (index && value) {
    const result = newList.insertAt(value, index);
    if (result) {
      $logsText.innerHTML += `PUT VALUE AT: {Value: ${value}, Index: ${index}} => {Value: ${result.value}, Index: ${index}}<br>`;
    } else {
      $logsText.innerHTML += `PUT VALUE AT: {Value: ${value}, Index: ${index}} => {Value: ${result}}<br>`;
    }
  } else {
    $logsText.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay();
});
let array;
const updateArray = () => {
  array = newList.toArray();
};
const updateTooltip = (numbers) => {
  numbers.forEach((number) => {
    number.addEventListener("mouseover", function () {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      $tooltip.style.top = `${mouseY}px`;
      $tooltip.style.left = `${mouseX}px`;
      if (number.classList.contains("head")) {
        $tooltip.innerHTML = "Head";
        $tooltip.style.display = "block";
      } else if (number.classList.contains("tail")) {
        $tooltip.style.display = "block";

        $tooltip.innerHTML = "Tail";
      } else if (number.classList.contains("number")) {
        $tooltip.innerHTML = "Connecting Node";
        $tooltip.style.display = "block";
      }
    });
    number.addEventListener("mouseout", function () {
      $tooltip.style.display = "none";
    });
  });
};
const updateDisplay = () => {
  updateArray();
  $numbers = document.getElementById("numbers");
  $numbers.innerHTML = "";
  array.forEach((number, index) => {
    const $numberDiv = document.createElement("div");
    $numberDiv.classList = "number";
    $numberDiv.innerHTML = number;
    if (index === 0) {
      $numberDiv.classList.add("head");
    }
    $numbers.appendChild($numberDiv);
    const $hyphenDiv = document.createElement("div");
    $hyphenDiv.classList = "hyphen";
    $numbers.appendChild($hyphenDiv);
  });
  const $tailDiv = document.createElement("div");
  $tailDiv.classList.add("tail");
  $tailDiv.classList.add("number");
  $tailDiv.innerHTML = "NULL";
  $numbers.appendChild($tailDiv);
  const logsTextContent = $logsText.innerHTML;
  const sentences = logsTextContent.split("<br>");
  $logMessage.innerHTML = sentences[sentences.length - 2];
  if (sentences.length > 1) {
    $logMessage.innerHTML = sentences[sentences.length - 2];
  } else {
    $logMessage.innerHTML = "Play around with the functions!";
  }
  let numbersArray = [];
  $numbers.childNodes.forEach((child) => {
    numbersArray.push(child);
  });
  updateTooltip(numbersArray);
};
function displayLogs() {
  $logs.style.visibility =
    $logs.style.visibility === "visible" ? "hidden" : "visible";
}
updateDisplay();
