import LinkedList from "./src/linkedlist/LinkedList.js";
import HashMap from "./src/hashmap/HashMap.js";
import Tree from "./src/binarysearchtree/Tree.js";

const newList = new LinkedList();
console.log(newList.append(17));
console.log(newList.append(123));
console.log(newList.append(6));
console.log(newList.append(90));

const hoverPhrases = {
  POP: "Remove and return last value",
  "GET HEAD": "Return value at first index",
  APPEND: "Input value at last index",
  PREPEND: "Input value at first index",
  "GET TAIL": "Return value at last index",
  "GET VALUE AT": "Return value at certain index",
  "CONTAINS VALUE": "Return boolean of value containment",
  "GET INDEX FROM": "Return index from first found value",
  "REMOVE VALUE AT": "Remove and return value at certain index",
  "PUT VALUE AT": "Input value at certain index",
  //cb2
  "SET KEY VALUE": "Add a key-value pair to a node within the hashed bucket",
  "GET VALUE": "Retrieve value from input key",
  "HAS KEY": "Check if the hashmap contains the input key",
  "REMOVE KEY": "Remove node with given key",
  CLEAR: "Remove all nodes",
  KEYS: "Retrieve all keys",
  VALUES: "Retrieve all values",
  //cb3
  INSERT: "Add new node to tree from input",
  HAS: "Return boolean from node search",
  REBALANCE: "Modify tree's structure depending on its height",
  DELETE: "Remove node based on input",
  CLEAR: "Remove all nodes from tree",
  LEVELORDER: "Return array in level order",
  INORDER: "Return array: left - root - right",
  PREORDER: "Return array: root - left - right",
  POSTORDER: "Return array: left - right - root",
};
const $logButton = document.getElementById("button-logs");
let $logMessage = document.getElementById("log");
const $logs = document.getElementById("logs");
const $logsText1 = document.getElementById("logs-text-1");
const $logsText2 = document.getElementById("logs-text-2");
const $logsText3 = document.getElementById("logs-text-3");
const $exitButton = document.getElementById("exit");
const inputFields = document.querySelectorAll("input");
const buttonNames = document.querySelectorAll(".buttonName")
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const screen3 = document.getElementById("screen3");
const switchToScreen2Button = document.getElementById("switchToScreen2");
const switchToScreen3Button = document.getElementById("switchToScreen3");
const switchToScreen1Button = document.getElementById("switchToScreen1");
switchToScreen1Button.addEventListener("click", () => {
  screen3.style.display = "none";
  screen2.style.display = "none";
  screen1.style.display = "flex";
  $logsText1.style.display = "flex";
  $logsText2.style.display = "none";
  $logsText3.style.display = "none";
  updateMessage($logsText1);
  switchToScreen2Button.classList.remove("active-button-menu");
  switchToScreen3Button.classList.remove("active-button-menu");
  switchToScreen1Button.classList.add("active-button-menu");
});
switchToScreen2Button.addEventListener("click", () => {
  screen1.style.display = "none";
  screen3.style.display = "none";
  screen2.style.display = "flex";
  $logsText1.style.display = "none";
  $logsText2.style.display = "flex";
  $logsText3.style.display = "none";
  updateMessage($logsText2);
  switchToScreen1Button.classList.remove("active-button-menu");
  switchToScreen3Button.classList.remove("active-button-menu");
  switchToScreen2Button.classList.add("active-button-menu");
});
switchToScreen3Button.addEventListener("click", () => {
  screen1.style.display = "none";
  screen2.style.display = "none";
  screen3.style.display = "flex";
  $logsText1.style.display = "none";
  $logsText2.style.display = "none";
  $logsText3.style.display = "flex";
  updateMessage($logsText3);
  switchToScreen2Button.classList.remove("active-button-menu");
  switchToScreen1Button.classList.remove("active-button-menu");
  switchToScreen3Button.classList.add("active-button-menu");
});
inputFields.forEach((inputField, index) => {
  buttonNames[index].textContent =inputField.placeholder 
  inputField.addEventListener("input", function() {
      let isEmpty = true;
      
      inputFields.forEach(field => {
          if (field.value.trim() !== "") {
              isEmpty = false;
          }
      });
      buttonNames[index].style.visibility = !isEmpty ?   'visible':'hidden'
  });
  buttonNames[index].style.visibility = 'hidden'
});
//screen1
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
function handleMouseOver(event, tooltipText = null) {
  const tooltip = document.getElementById("tooltip");
  if (!tooltipText) {
    tooltipText = hoverPhrases[event.target.textContent];
  }
  tooltip.innerHTML = tooltipText;

  const padding = 25;
  const mouseX = event.clientX + padding;
  const mouseY = event.clientY + padding / 2;

  tooltip.style.top = `${mouseY}px`;
  tooltip.style.left = `${mouseX}px`;
  tooltip.style.display = "block";
}
function handleMouseOut() {
  const tooltip = document.getElementById("tooltip");
  tooltip.style.display = "none";
}
$buttons.forEach((button) => {
  button.addEventListener("mouseover", (event) => handleMouseOver(event));
  button.addEventListener("mouseout", handleMouseOut);
});
$popButton.addEventListener("click", function () {
  const popValue = newList.pop();
  $logsText1.innerHTML += `POP => {Value: ${popValue}}<br>`;

  updateDisplay();
});
$getHeadButton.addEventListener("click", function () {
  const head = newList.getHead();
  if (head) {
    $logsText1.innerHTML += `HEAD => {Value: ${head.value} `;
    let hasMoreNodes;
    if (head.nextNode) {
      hasMoreNodes = "YES";
    } else {
      hasMoreNodes = "NO";
    }
    $logsText1.innerHTML += `NextNode: ${hasMoreNodes}}<br>`;
  } else {
    $logsText1.innerHTML += `TAIL => {Value: ${head}}<br>`;
  }
  updateDisplay();
});
$getTailButton.addEventListener("click", function () {
  const tail = newList.getTail();
  if (tail) {
    $logsText1.innerHTML += `TAIL => {Value: ${tail.value}}<br>`;
  } else {
    $logsText1.innerHTML += `TAIL => {Value: ${tail}}<br>`;
  }
  updateDisplay();
});
$appendButton.addEventListener("click", function () {
  const value = $value.value;
  if (value) {
    const appendedNode = newList.append(value);
    $logsText1.innerHTML += `APPEND: {Value: ${value}} => {Value: ${appendedNode.value}} <br>`;
  } else {
    $logsText1.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay();
});
$prependButton.addEventListener("click", function () {
  const value = $value.value;
  let hasMoreNodes;
  if (value) {
    const appendedNode = newList.prepend(value);
    $logsText1.innerHTML += `PREPEND: {Value: ${value}} => {Value: ${appendedNode.value} `;
    if (appendedNode.nextNode) {
      hasMoreNodes = "YES";
    } else {
      hasMoreNodes = "NO";
    }
    $logsText1.innerHTML += `NextNode: ${hasMoreNodes}}<br>`;
  } else {
    $logsText1.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay();
});
$containsButton.addEventListener("click", function () {
  const value = $value.value;
  if (value) {
    const containsValue = newList.contains(value);
    const result = containsValue ? "TRUE" : "FALSE";
    $logsText1.innerHTML += `CONTAINS: {Value: ${value}} => ${result}<br>`;
  } else {
    $logsText1.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay();
});
$getIndexButton.addEventListener("click", function () {
  const value = $value.value;
  if (value) {
    const index = newList.find(value);

    $logsText1.innerHTML += `GET INDEX FROM: {Value: ${value}} => {Index: ${index}}<br>`;
  } else {
    $logsText1.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay();
});
$getValueButton.addEventListener("click", function () {
  const index = parseInt($index.value);
  const size = newList.size()

  if (index && index < size) {
    const value = newList.at(index);

    $logsText1.innerHTML += `GET VALUE AT: {Index: ${index}} => {Value: ${value.value}}<br>`;
  } else {
    $logsText1.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay();
});
$removeValueButton.addEventListener("click", function () {
  const index = $index.value;
  if (index) {
    const value = newList.removeAt(index);
    if (value) {
      $logsText1.innerHTML += `REMOVE VALUE AT: {Index: ${index}} => {Value: ${value.value}, Index: ${index}}<br>`;
    } else {
      $logsText1.innerHTML += `REMOVE VALUE AT: {Index: ${index}} => {Value: ${value}}<br>`;
    }
  } else {
    $logsText1.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay();
});
$putValueButton.addEventListener("click", function () {
  const value = $value.value;
  const index = parseInt($index.value);
  if (index && value) {
    const result = newList.insertAt(value, index);
    if (result) {
      $logsText1.innerHTML += `PUT VALUE AT: {Value: ${value}, Index: ${index}} => {Value: ${result.value}, Index: ${index}}<br>`;
    } else {
      $logsText1.innerHTML += `PUT VALUE AT: {Value: ${value}, Index: ${index}} => {Value: ${result}}<br>`;
    }
  } else {
    $logsText1.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay();
});
let array;
const updateArray = () => {
  array = newList.toArray();
};
const updateTooltip = (numbers) => {
  numbers.forEach((number) => {
    number.addEventListener("mouseover", function (e) {
      let tooltipText;
      if (number.classList.contains("head")) {
        tooltipText = "Head";
      } else if (number.classList.contains("tail")) {
        tooltipText = "Tail";
      } else if (number.classList.contains("number")) {
        tooltipText = "Connecting Node";
      }
      handleMouseOver(e, tooltipText);
    });
    number.addEventListener("mouseout", handleMouseOut);
  });
};
const updateMessage = (logText) => {
  const logsTextContent = logText.innerHTML;
  const sentences = logsTextContent.split("<br>");
  $logMessage.innerHTML = sentences[sentences.length - 2];
  if (sentences.length > 1) {
    $logMessage.innerHTML = sentences[sentences.length - 2];
  } else {
    $logMessage.innerHTML = "Play around with the functions!";
  }
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
  updateMessage($logsText1);
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

//screen 2

const newHashMap = new HashMap();
newHashMap.set("dog", "eats cats");
newHashMap.set("cat", "eats fish");
newHashMap.set("cat", "eats crabs");
newHashMap.set("crab", "eats fish");
newHashMap.set("bee", "eats flowers");
newHashMap.set("pig", "eats tyres");
newHashMap.set("dolphin", "eats human brains");
function arrayFromHashmap() {
  return newHashMap.buckets;
}

const $buttons2 = document.querySelectorAll("#cb2-buttons button");
const $setButton = document.getElementById("cb2-set");
const $getButton = document.getElementById("cb2-get");
const $hasButton = document.getElementById("cb2-has");
const $removeButton = document.getElementById("cb2-remove");
const $clearButton = document.getElementById("cb2-clear");
const $keysButton = document.getElementById("cb2-keys");
const $valuesButton = document.getElementById("cb2-values");
const $keyInput = document.getElementById("cb2-key");
const $valueInput = document.getElementById("cb2-value");

const calculateLength = () => {
  return newHashMap.length();
};
const getHash = (key) => {
  const hash = newHashMap.hash(key);
  return hash;
};
const getLoadFactor = () => {
  return newHashMap.loadFactor();
};
const getLoadFactorLimit = () => {
  return newHashMap.loadFactorLimit;
};
const getNumberBuckets = () => {
  return newHashMap.bucketSize;
};
const getLength = () => {
  return newHashMap.length();
};
$buttons2.forEach((button) => {
  button.addEventListener("mouseover", (event) => handleMouseOver(event));
  button.addEventListener("mouseout", () => handleMouseOut());
});
$setButton.addEventListener("click", function () {
  const key = $keyInput.value;
  const value = $valueInput.value;
  if (key && value) {
    const hash = getHash(key);
    newHashMap.set(key, value);
    $logsText2.innerHTML += `SET: {Key: ${key}, Value: ${value}} => {HashCode: ${hash}}<br>`;
  } else {
    $logsText2.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay2();
});
$getButton.addEventListener("click", function () {
  const key = $keyInput.value;
  if (key) {
    const value = newHashMap.get(key);
    $logsText2.innerHTML += `GET: {Key: ${key}} => {Value: ${value}}<br>`;
  } else {
    $logsText2.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay2();
});
$hasButton.addEventListener("click", function () {
  const key = $keyInput.value;
  if (key) {
    const hasKey = newHashMap.has(key);
    $logsText2.innerHTML += `HAS: {Key: ${key}} => {${hasKey}}<br>`;
  } else {
    $logsText2.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay2();
});
$removeButton.addEventListener("click", function () {
  const key = $keyInput.value;
  if (key) {
    const value = newHashMap.remove(key);
    $logsText2.innerHTML += `REMOVE: {Key: ${key}} => {Removed: ${value}}<br>`;
  } else {
    $logsText2.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay2();
});

$clearButton.addEventListener("click", function () {
  const previousLength = calculateLength();
  newHashMap.clear();
  const currentLength = calculateLength();
  $logsText2.innerHTML += `CLEAR: {PreviousLength: ${previousLength}} => {CurrentLength: ${currentLength}}<br>`;
  updateDisplay2();
});
$keysButton.addEventListener("click", function () {
  const arr = newHashMap.keys();
  $logsText2.innerHTML += `KEYS: {} => {${arr}}<br>`;
  updateDisplay2();
});
$valuesButton.addEventListener("click", function () {
  const arr = newHashMap.values();
  $logsText2.innerHTML += `VALUES: {} => {${arr}}<br>`;
  updateDisplay2();
});

const loadFactorDiv = document.querySelector("#load-factor");
const loadFactorLimitDiv = document.querySelector("#load-factor-limit");
loadFactorDiv.addEventListener("mouseover", (e) => {
  const currentLoad = getLoadFactor() * 100;
  const length = getLength();
  const numberBuckets = getNumberBuckets();
  const textContent =
    "Current LoadFactor: " +
    currentLoad +
    "%<br>" +
    "HashMap Length: " +
    length +
    "<br>" +
    "Number of buckets: " +
    numberBuckets;
  handleMouseOver(e, textContent);
});
loadFactorDiv.addEventListener("mouseout", handleMouseOut);
loadFactorLimitDiv.addEventListener("mouseover", (e) => {
  const limitLoad = getLoadFactorLimit() * 100;
  const textContent = "Limit LoadFactor: " + limitLoad + " %";
  handleMouseOver(e, textContent);
});
loadFactorLimitDiv.addEventListener("mouseout", handleMouseOut);

const updateDisplay2 = () => {
  const $hashmap = document.getElementById("hashmap");

  const arr = arrayFromHashmap();
  console.log(arr);
  const bucketsDiv = document.querySelector("#buckets");
  bucketsDiv.innerHTML = "";
  const loadFactorLimitWidth = 100 - newHashMap.loadFactorLimit * 100;
  const loadFactorLimitLeft = newHashMap.loadFactorLimit * 100;
  loadFactorLimitDiv.style.width = `${loadFactorLimitWidth}%`;
  loadFactorLimitDiv.style.left = `${loadFactorLimitLeft}%`;
  const loadFactor = getLoadFactor() * 100;
  loadFactorDiv.style.width = `${loadFactor}%`;
  $hashmap.appendChild(bucketsDiv);
  arr.forEach((bucket) => {
    const bucketDiv = document.createElement("div");
    bucketDiv.classList = "bucket";
    bucketsDiv.classList = "buckets";
    bucketsDiv.appendChild(bucketDiv);
    bucket.forEach((node) => {
      bucketDiv.classList.add("hasNode");
      const nodeDiv = document.createElement("div");
      const keyDiv = document.createElement("div");
      const spaceDiv = document.createElement("div");
      const valueDiv = document.createElement("div");
      keyDiv.classList = "node-key";
      valueDiv.classList = "node-value";
      nodeDiv.classList = "node";
      spaceDiv.classList = "node-space";
      keyDiv.innerHTML = node.key;
      valueDiv.innerHTML = node.value;
      nodeDiv.appendChild(keyDiv);
      nodeDiv.appendChild(spaceDiv);
      nodeDiv.appendChild(valueDiv);
      bucketDiv.appendChild(nodeDiv);
    });
  });
  updateMessage($logsText2);
};
updateDisplay2();

//screen 3
const $tree = document.querySelector("#tree");
const $insertButton = document.querySelector("#cb3-insert");
const $deleteButton = document.querySelector("#cb3-delete");
const $clearTreeButton = document.querySelector("#cb3-clear");
const $hasNodeButton = document.querySelector("#cb3-has");
const $rebalanceButton = document.querySelector("#cb3-rebalance");
const $levelorderButton = document.querySelector("#cb3-levelorder");
const $inorderButton = document.querySelector("#cb3-inorder");
const $preorderButton = document.querySelector("#cb3-preorder");
const $postorderButton = document.querySelector("#cb3-postorder");
const $nodeValue = document.querySelector("#cb3-node-value");
const $buttons3 = document.querySelectorAll("#cb3-buttons .row button");

const newTree = new Tree();

$buttons3.forEach((button) => {
  button.addEventListener("mouseover", (event) => handleMouseOver(event));
  button.addEventListener("mouseout", () => handleMouseOut());
});

const getTreeRoot = () => {
  return newTree.root;
};
const updateTreeStructure = () => {
  $tree.innerHTML = "";
  const root = getTreeRoot();
  let counter = 1;
  const queue = [{ node: root, position: "root", parentDiv: $tree, zIndex: counter }];
  while (queue.length) {
    const { node, position, parentDiv, zIndex } = queue.shift();
    const nodeDiv = document.createElement("div");
    const nodeValueDiv = document.createElement("div");
    const nodeValueSubDiv = document.createElement("div");
    if (node) {
      nodeValueSubDiv.textContent = node.data;
      if (!node.left && !node.right) {
        nodeDiv.classList.add("leaf");
      }
      if (node.left) queue.push({ node: node.left, position: "left", parentDiv: nodeDiv, zIndex: zIndex + 1 });
      if (node.right) queue.push({ node: node.right, position: "right", parentDiv: nodeDiv, zIndex: zIndex + 1 });
    }
    nodeDiv.classList.add("node-bt");
    nodeValueDiv.classList.add("data");
    nodeValueSubDiv.classList.add("value");
    if (position === "root") {
      nodeDiv.classList.add("root");
    } else if (position === "left") {
      nodeDiv.classList.add("left");
    } else if (position === "right") {
      nodeDiv.classList.add("right");
    }
    nodeDiv.style.zIndex = zIndex;
    parentDiv.appendChild(nodeDiv);
    nodeDiv.appendChild(nodeValueDiv);
    nodeValueDiv.appendChild(nodeValueSubDiv);

    // Add event listeners to the new node div
    nodeValueSubDiv.addEventListener("mouseover", function (e) {
      const isBalanced = newTree.isBalanced(node);
      const currentHeight = newTree.height(node);
      const currentDepth = newTree.depth(node);
      const text = `Node Height: ${currentHeight}<br>
        Node Depth: ${currentDepth}<br>
        Is Balanced: ${isBalanced}`;
      handleMouseOver(e, text);
    });
    nodeValueSubDiv.addEventListener("mouseout", () => handleMouseOut());
  }
};


const updateDisplay3 = () => {
  updateTreeStructure();
  updateMessage($logsText3);
  newTree.prettyPrint()
};
updateDisplay3();

$insertButton.addEventListener("click", function () {
  const nodeValue = parseInt($nodeValue.value);
  if (nodeValue) {
    const newNode = newTree.insert(nodeValue);
    if (newNode) {
      $logsText3.innerHTML += `INSERT: {${nodeValue} => {${newNode.data}}}<br>`;
    } else {
      $logsText3.innerHTML += `INSERT: {${nodeValue} => {${newNode}}}<br>`;
    }
  } else {
    $logsText3.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay3();
});
$deleteButton.addEventListener("click", function () {
  const nodeValue = parseInt($nodeValue.value);
  if (nodeValue) {
    newTree.delete(nodeValue);
    $logsText3.innerHTML += `DELETE: {${nodeValue}} => {}<br>`;
  } else {
    $logsText3.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay3();
});
$clearTreeButton.addEventListener("click", function () {
  const prevLevelOrder = newTree.levelOrder();
  newTree.clear();
  $logsText3.innerHTML += `CLEAR: {${prevLevelOrder} => {}<br>`;

  updateDisplay3();
});
$hasNodeButton.addEventListener("click", function () {
  const nodeValue = parseInt($nodeValue.value);
  if (nodeValue) {
    const result = newTree.has(nodeValue);
    $logsText3.innerHTML += `HAS: {${nodeValue} => {${result}}<br>`;
  } else {
    $logsText3.innerHTML += `Fill in the input correctly<br>`;
  }
  updateDisplay3();
});
$rebalanceButton.addEventListener("click", function () {
  const previousRoot = getTreeRoot();
  const previousHeight = newTree.height(previousRoot);
  const rebalanced = newTree.rebalance();
  const laterRoot = getTreeRoot();
  const laterHeight = newTree.height(laterRoot);
  $logsText3.innerHTML += `REBALANCE: {Height: ${previousHeight}} => {Height: ${laterHeight}, ${rebalanced}}<br>`;
  updateDisplay3();
});
const handleOrder = (order) => {
  const newOrder = newTree[order]();
  $logsText3.innerHTML += `${order.toUpperCase()}: {} => {${newOrder}}<br>`;
  updateDisplay3();
};
$levelorderButton.addEventListener("click", () => handleOrder("levelOrder"));
$inorderButton.addEventListener("click", () => handleOrder("inOrder"));
$preorderButton.addEventListener("click", () => handleOrder("preOrder"));
$postorderButton.addEventListener("click", () => handleOrder("postOrder"));


