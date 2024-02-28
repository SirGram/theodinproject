class Node {
  constructor(data, leftNode = null, rightNode = null) {
    this.data = data;
    this.left = leftNode;
    this.right = rightNode;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
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
    if (this.find(value)) return 
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    let currentNode = this.root;
    while (true) {
      //depth search
      if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return;
        } else {
          currentNode = currentNode.left;
        }
      } else {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
          return;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }

  delete(value) {
    let parentNode = null;
    let currentNode = this.root;
    while (true) {
      if (currentNode === null) return null;
      if (currentNode.data === value) {
        //no children
        if (currentNode.left === null && currentNode.right === null) {
          if (parentNode.data > currentNode.data) parentNode.left = null;
          else parentNode.right = null;
          return;
        }
        //1 child
        else if (
          (currentNode.right === null && currentNode.left !== null) ||
          (currentNode.left === null && currentNode.right !== null)
        ) {
          const childNode = currentNode.left || currentNode.right;
          if (parentNode.data > childNode.data) parentNode.left = childNode;
          else parentNode.right = childNode;
          return;
        }
        //2 children
        else {
          let nearUpperNode = currentNode.right;
          let parentNearupperNode = currentNode;
          while (nearUpperNode.left) {
            parentNearupperNode = nearUpperNode;
            nearUpperNode = nearUpperNode.left;
          }
          currentNode.data = nearUpperNode.data;
          //subchildren within nearer next value
          if (nearUpperNode.right) {
            if (parentNearupperNode === currentNode) {
              parentNearupperNode.right = nearUpperNode.right;
            } else {
              parentNearupperNode.left = nearUpperNode.right;
            }
          } else {
            if (parentNearupperNode === currentNode) {
              currentNode.right = null;
            } else {
              parentNearupperNode.left = null;
            }
          }
          return;
        }
      }
      if (currentNode.data < value) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else if (currentNode.data > value) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      }
    }
  }

  find(value) {
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.data === value) return currentNode;
      if (currentNode.data < value) currentNode = currentNode.right;
      else currentNode = currentNode.left;
    }
    return null;
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
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    if (leftHeight - rightHeight > 1 || rightHeight - leftHeight > 1) {
      return false;
    }
    return true;
  }
  rebalance() {
    if (!this.isBalanced()) {
      const arr = this.inOrder();
      this.root = this.buildTree(arr);
    }
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
  const numElements = 1 + Math.floor(Math.random() * 16);

  for (let i = 0; i < numElements; i += 1) {
    const randomNum = Math.floor(Math.random() * 101);
    arr.push(randomNum);
  }
  return arr;
}
const sortedArray = randomArray();
const tree = new Tree(sortedArray);

tree.prettyPrint();
tree.insert(552);
tree.prettyPrint();
tree.insert(552);
tree.prettyPrint();
tree.levelOrder();
tree.prettyPrint();
console.log(tree.inOrder());
tree.prettyPrint();
console.log(tree.preOrder());
tree.prettyPrint();
console.log(tree.postOrder());
tree.prettyPrint();
console.log(tree.height(tree.find(150)));
console.log(tree.depth(tree.find(551)));
console.log(tree.depth(tree.find(999)));
tree.insert(1);
tree.insert(2);
tree.insert(4);
tree.prettyPrint();
console.log(tree.isBalanced());
tree.rebalance();
tree.prettyPrint();
