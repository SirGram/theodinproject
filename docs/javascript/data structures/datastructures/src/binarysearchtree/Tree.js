import Node from "./Node.js";

class Tree {
  constructor() {
    this.root = this.buildTree(randomArray());
  }
  removeDuplicates(array) {
    const newArray = [];
    array.forEach((element) => {
      let newElement = true;
      newArray.forEach((el) => {
        if (element === el) newElement = false;
      });
      if (newElement) newArray.push(element);
    });
    return newArray;
  }

  mergeSort(array) {
    if (array.length <= 1) return array;
    const middlePoint = Math.floor(array.length / 2);
    const leftArray = this.mergeSort(array.slice(0, middlePoint));
    const rightArray = this.mergeSort(array.slice(middlePoint));
    return this.merge(leftArray, rightArray);
  }

  merge(left, right) {
    let sortedArray = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        sortedArray.push(left.shift());
      } else {
        sortedArray.push(right.shift());
      }
    }
    return [...sortedArray, ...left, ...right];
  }

  buildTree(array) {
    const arraySet = this.removeDuplicates(array);
    const arraySorted = this.mergeSort(arraySet);
    if (arraySorted.length === 0) return null;
    const mid = Math.floor(arraySorted.length / 2);
    const leftPart = arraySorted.slice(0, mid);
    const rightPart = arraySorted.slice(mid + 1);
    const rootNode = new Node(arraySorted[mid]);
    rootNode.left = this.buildTree(leftPart);
    rootNode.right = this.buildTree(rightPart);
    return rootNode;
  }

  insert(value) {
    if (this.has(value)) return null;
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return newNode;
    }
    let currentNode = this.root;
    while (true) {
      //depth search
      if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return newNode;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          return newNode;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  delete(value) {
    if (this.root === null) return null;

    let parentNode = null;
    let currentNode = this.root;

    // Function to find and return the immediate successor of a given node
    const findImmediateSuccessor = (node) => {
      let parent = node;
      let successor = node.right;
      while (successor.left !== null) {
        parent = successor;
        successor = successor.left;
      }
      return { parent, successor };
    };

    while (currentNode !== null) {
      if (currentNode.data === value) {
        if (currentNode.left === null && currentNode.right === null) {
          if (parentNode === null) {
            this.root = null;
          } else if (parentNode.data > currentNode.data) {
            parentNode.left = null;
          } else {
            parentNode.right = null;
          }
          return; // Return after deletion
        } else if (
          (currentNode.right === null && currentNode.left !== null) ||
          (currentNode.left === null && currentNode.right !== null)
        ) {
          const childNode = currentNode.left || currentNode.right;
          if (parentNode === null) {
            this.root = childNode;
          } else if (parentNode.data > currentNode.data) {
            parentNode.left = childNode;
          } else {
            parentNode.right = childNode;
          }
          return; // Return after deletion
        } else {
          const { parent: successorParent, successor } =
            findImmediateSuccessor(currentNode);
          currentNode.data = successor.data;
          if (successorParent === currentNode) {
            successorParent.right = successor.right;
          } else {
            successorParent.left = successor.right;
          }
          return; // Return after deletion
        }
      }
      if (currentNode.data < value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else {
        parentNode = currentNode;
        currentNode = currentNode.left;
      }
    }
  }
  has(value) {
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.data === value) return true;
      if (currentNode.data < value) currentNode = currentNode.right;
      else currentNode = currentNode.left;
    }
    return false;
  }
  getNode(value){
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.data === value) return currentNode;
      if (currentNode.data < value) currentNode = currentNode.right;
      else currentNode = currentNode.left;
    }
    return null;
  }
  clear(){this.root=this.buildTree([])

  }
  
  levelOrder(callback) {
    const arr = [];
    if (!this.root) return arr;
    const queue = [this.root];
    let currentNode;
    while (queue.length) {
      currentNode = queue.shift();
      arr.push(currentNode.data);
      if (callback) callback(currentNode);
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }

    return arr;
  }

  inOrder(callback, currentNode = this.root) {
    const arr = [];
    if (currentNode === null) return arr;

    arr.push(...this.inOrder(callback, currentNode.left));
    if (callback) callback(currentNode);
    arr.push(currentNode.data);

    arr.push(...this.inOrder(callback, currentNode.right));
    return arr;
  }
  preOrder(callback, currentNode = this.root) {
    const arr = [];
    if (currentNode === null) return arr;
    if (callback) callback(currentNode);
    arr.push(currentNode.data);
    arr.push(...this.preOrder(callback, currentNode.left));
    arr.push(...this.preOrder(callback, currentNode.right));
    return arr;
  }
  postOrder(callback, currentNode = this.root) {
    const arr = [];
    if (currentNode === null) return [];
    arr.push(...this.postOrder(callback, currentNode.left));
    arr.push(...this.postOrder(callback, currentNode.right));

    if (callback) callback(currentNode);
    arr.push(currentNode.data);
    return arr;
  }
  height(node) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    const height = Math.max(leftHeight, rightHeight) + 1;
    return height;
  }
  depth(node, currentNode = this.root) {
    if (currentNode === null) return -1;
    if (node === currentNode) return 0;
    const leftDepth = this.depth(node, currentNode.left);
    if (leftDepth !== -1) return leftDepth + 1;
    const rightDepth = this.depth(node, currentNode.right);
    if (rightDepth !== -1) return rightDepth + 1;
    return -1;
  }
  isBalanced(node = this.root) {
    if (node === null) {
      return true; 
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);  
    const leftBalanced = this.isBalanced(node.left);
    const rightBalanced = this.isBalanced(node.right);
    if (Math.abs(leftHeight - rightHeight) <= 1 && leftBalanced && rightBalanced) {
      return true;
    }
    return false;
  }
  rebalance() {
    if (!this.isBalanced()) {
      const arr = this.inOrder();
      this.root = this.buildTree(arr);
      return 'rebalanced'
    }
    return 'already balanced'
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
function squareValue(node) {
  node.data = Math.pow(node.data, 2);
}
function squareRootValue(node) {
  node.data = Math.sqrt(node.data);
}
function randomArray() {
  const arr = [];
  const numElements = 4 + Math.floor(Math.random() * 13);

  for (let i = 0; i < numElements; i += 1) {
    const randomNum = Math.floor(Math.random() * 101);
    arr.push(randomNum);
  }
  return arr;
}

export default Tree;
