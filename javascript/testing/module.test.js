const capitalize = (string) => {
  const stringArray = string.split('');
  stringArray[0] = stringArray[0].toUpperCase();
  return stringArray.join('');
};

const reverse = (string) => {
  const reverseArray = [];
  const stringArray = string.split('');
  for (let i = stringArray.length; i >= 0; i--) {
    reverseArray.push(stringArray[i]);
  }
  return reverseArray.join('');
};

const calculator = () => { // Add semicolon here
  function sum(a, b) {
    return a + b;
  }
  function substract(a, b) {
    return a - b;
  }
  function multiply(a, b) {
    return a * b;
  }
  function divide(a, b) {
    return (a / b);
  }
  return {
    sum, substract, multiply, divide,
  };
};

const cypher = (string) => {
  const lettersLC = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const lettersUC = lettersLC.map((letter) => letter.toUpperCase());
  const punctuation = [' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~'];
  const result = [];
  const stringArr = string.split('');
  let letterIndex;
  stringArr.forEach((letter) => {
    if (punctuation.includes(letter)) result.push(letter);
    else if (letter !== letter.toUpperCase()) {
      letterIndex = lettersLC.indexOf(letter);
      const newLetterIndex = (letterIndex + 1) % lettersLC.length;
      result.push(lettersLC[newLetterIndex]);
    } else {
      letterIndex = lettersUC.indexOf(letter);
      const newLetterIndex = (letterIndex + 1) % lettersUC.length;
      result.push(lettersUC[newLetterIndex]);
    }
  });
  return result.join('');
};

const analyze = (arr) => {
  let total = 0;
  arr.forEach((el) => total += el);
  const { length } = arr;
  const average = Math.floor(total / length);
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  return {
    average, min, max, length,
  };
};
test('i to I', () => {
  expect(capitalize('i am tired today')).toBe('I am tired today');
});

test('reverses esor to equal rose', () => {
  expect(reverse('esor')).toBe('rose');
});
// calculator
test('adds 5 to 10 to equal 15', () => {
  expect(calculator().sum(5, 10)).toBe(15);
});
test('substracts 6 to 1 to equal -5', () => {
  expect(calculator().substract(1, 6)).toBe(-5);
});
test('multiplies 2 by 6 to equal 12', () => {
  expect(calculator().multiply(2, 6)).toBe(12);
});
test('divides 10 by 3 to be next to 3.33', () => {
  expect(calculator().divide(10, 3)).toBeCloseTo(3.33, 2);
});
// cypher
test('cyphers abc to equal bcd', () => {
  expect(cypher('abc')).toBe('bcd');
});
test('cyphers zbz to equal aca', () => {
  expect(cypher('zbz')).toBe('aca');
});
test('cyphers zbz to equal aca', () => {
  expect(cypher('kZAb')).toBe('lABc');
});
test('cyphers a a to equal b b', () => {
  expect(cypher('kZAb')).toBe('lABc');
});

// analyzer
test('analyzes [5,9,10,5,1,2,4] to return {average:5, min:1, max:10, length:7}', () => {
  const object = analyze([5, 9, 10, 5, 1, 2, 4]);
  const expectedObject = {
    average: 5,
    min: 1,
    max: 10,
    length: 7,
  };
  expect(object).toEqual(expectedObject);
});


