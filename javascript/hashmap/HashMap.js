import Node from './Node.js';

class HashMap {
  constructor() {
    this.bucketSize = 16;
    this.buckets = new Array(this.bucketSize).fill(null).map(() => []);
    this.loadFactorLimit = 0.80;
  }

  loadFactor() {
    const entries = this.length();
    return (entries / this.bucketSize).toFixed(2);
  }

  growBuckets() {
    this.bucketSize *= 2;
    const newBuckets = new Array(this.bucketSize).fill(null).map(() => []);
    this.buckets.forEach((bucket) => {
      bucket.forEach((node) => {
        const newIndex = this.hash(node.key);
        newBuckets[newIndex].push(node);
      });
    });
    this.buckets = newBuckets;
  }

  set(key, value) {
    const currentLoadFactor = this.loadFactor();
    let keyExists = false;
    if (currentLoadFactor >= this.loadFactorLimit) {
      this.growBuckets();
    }
    const index = this.hash(key);
    const bucket = this.buckets[index];
    bucket.forEach((node) => {
      if (node.key === key) {
        node.value = value;
        keyExists = true;
      }
    });
    if (!keyExists) {
      bucket.push(new Node(key, value));
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    let searchValue = null;
    bucket.forEach((node) => {
      if (node.key === key) {
        searchValue = node.value;
      }
    });
    return searchValue;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    let hasKey = false;
    bucket.forEach((node) => {
      if (node.key === key) {
        hasKey = true;
      }
    });
    return hasKey;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i += 1) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  length() {
    let counter = 0;
    this.buckets.forEach((bucket) => {
      counter += bucket.length;
    });
    return counter;
  }

  clear() {
    this.buckets = this.buckets.fill(null).map(() => []);
  }

  keys() {
    const arr = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((node) => {
        arr.push(node.key);
      });
    });
    return arr;
  }

  values() {
    const arr = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((node) => {
        arr.push(node.value);
      });
    });
    return arr;
  }

  entries() {
    const arr = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((node) => {
        arr.push([node.key, node.value]);
      });
    });
    return arr;
  }

  hash(key) {
    const primeNumber = 31;
    let hashCode = 0;
    for (let i = 0; i < key.length; i += 1) {
      hashCode = hashCode * primeNumber + key.charCodeAt(i);
      hashCode %= this.bucketSize;
    }
    return hashCode;
  }
}
export default HashMap;
