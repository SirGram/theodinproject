import Node from './Node.js'
class LinkedList {
  constructor() {
    this.head = null;
  }
  append(value) {
    const newNode = new Node(value);
    //get last in list
    if (!this.head) {
      this.head = newNode;
    } else {
      const tail = this.getTail();
      tail.nextNode = newNode;
    }
    return newNode;
  }
  prepend(value) {
    const newNode = new Node(value);
    if (this.head) {
      newNode.nextNode = this.head;
    }

    this.head = newNode;
    return newNode
  }
  size() {
    let current = this.head;
    let counter = 0;
    while (current) {
      counter += 1;
      current = current.nextNode;
    }
    return counter;
  }
  getTail() {
    let tail = this.head;
    if (!tail) return null
    while (tail.nextNode) {
      tail = tail.nextNode;
    }
    return tail;
  }
  getHead() {
    return this.head;
  }
  at(index) {
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.nextNode;
    }
    return current;
  }
  pop() {
    if (!this.head) {
      return null;
    }
    if (!this.head.nextNode) {
      const value = this.head.value;
      this.head = null;
      return value;
    }
    let current = this.head;
    while (current.nextNode.nextNode) {
      current = current.nextNode;
    }
    const value = current.nextNode.value;
    current.nextNode = null;
    return value;
  }
  contains(value) {
    let current = this.head;
    while (current) {
      if (current.value == value) return true;
      current = current.nextNode;
    }
    return false;
  }
  find(value) {
    let current = this.head;
    let counter = 0;
    while (current) {
      if (current.value == value) return counter;
      current = current.nextNode;
      counter++;
    }
    return null;
  }
  toString() {
    let current = this.head;
    let string = "";
    while (current) {
      string += `( ${current.value} ) -> `;
      current = current.nextNode;
    }
    string += "null";
    return string;
  }
  toArray() {
    let arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.nextNode;
    }
    return arr;
  }
  removeAt(index) {
    if (index < 0 || index > this.size() - 1) return null;
    let current;
    if (index === 0) {
      current = this.head;
      if (!this.head.nextNode) this.head = null;
      else {
        this.head = this.head.nextNode;
      }
    } else {
      let previous = this.head;
      for (let i = 0; i < index - 1; i++) {
        previous = previous.nextNode;
      }
      current = previous.nextNode;
      if (!current.nextNode) {
        previous.nextNode = null;
      } else {
        previous.nextNode = current.nextNode;
      }
    }

    return current;
  }
  insertAt(value, index) {
    if (index < 0 || index > this.size()) return null;
    let current = new Node(value);
    let next;
    if (index === 0) {
      if (this.head) {
        next = this.head;
        current.nextNode = next;
      }
      this.head = current;
    } else {
      let previous = this.head;
      for (let i = 0; i < index - 1; i++) {
        previous = previous.nextNode;
      }
      if (previous.nextNode) {
        current.nextNode = previous.nextNode;
      }
      previous.nextNode = current;
    }
    return current;
  }
}
export default LinkedList;
