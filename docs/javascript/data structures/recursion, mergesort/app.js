// fibs(2) =[0,1]
// iteration

function fibs(n) {
  array = [];
  currentValue = 1;
  pastValue = 0;
  total = 0;
  for (i = 0; i <= n; i++) {
    array.push(pastValue);
    const nextValue = currentValue + pastValue;
    pastValue = currentValue;
    currentValue = nextValue;
  }
  return array;
}
console.log(fibs(10));

// recursion
// too complex
function fibs2(n) {
  if (n === 0) return [0];
  if (n === 1) return [0, 1];
  const sequence = fibs2(n - 1);
  sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
  return sequence;
}
console.log(fibs2(10));

// easiest is too mix it with iteration
function calculateFibonacci(n) {
  if (n < 2) return n;
  else return calculateFibonacci(n - 2) + calculateFibonacci(n - 1);
}
function fibs3(n, array = []) {
  for (let i = 0; i <= n; i++) {
    array.push(calculateFibonacci(i));
  }
  return array;
}
console.log(fibs3(10));

//merge sort exercise
//e.g. [0,22,1,134,52,34,64,22,1] => [0,1,1,22,22,34,52,64,134]

array = [3, 2, 1, 13, 8, 5, 0, 1];
array2=[105, 79, 100, 110]

const mergeSort = (array) => {
  if (array.length <= 1) return array;
  const middlePoint = Math.floor(array.length / 2);
  const leftArray = mergeSort(array.slice(0, middlePoint));
  const rightArray = mergeSort(array.slice(middlePoint));
  return merge(leftArray, rightArray)
};
function merge(left, right) {
  let sortedArray = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sortedArray.push(left.shift());
    } else {
      sortedArray.push(right.shift());
    }
  }
  return [...sortedArray, ...left, ...right]
}
console.log(mergeSort(array));
console.log(mergeSort(array2));
console.log(merge([10, 4, 6],[7, 2]));

