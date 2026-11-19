const { expect } = require('chai');
const NumbersValidator = require('../../app/numbers-validator');

describe('isNumberEven', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });
  afterEach(() => {
    validator = null;
  });
  it('should return true if positive  number is even', () => {
    expect(validator.isNumberEven(4)).to.be.equal(true);
  });
  it('should return true if number is 0', () => {
    expect(validator.isNumberEven(0)).to.be.equal(true);
  });
  it('should return true if negative number is even', () => {
    expect(validator.isNumberEven(-24)).to.be.equal(true);
  });
  it('should return true if argument is even number with a decimal point', () => {
    expect(validator.isNumberEven(700.0)).to.be.equal(true);
  });
  it('should return false if argument is odd positive number', () => {
    expect(validator.isNumberEven(45)).to.be.equal(false);
  });
  it('should return false if argument is odd negative number ', () => {
    expect(validator.isNumberEven(-7)).to.be.equal(false);
  });
  it('should return false if argument is a decimal number', () => {
    expect(validator.isNumberEven(70.5)).to.be.equal(false);
  });
  it('should return false if argument is NaN', () => {
    expect(validator.isNumberEven(NaN)).to.be.equal(false);
  });
  it('should throw the error if argument is a string', () => {
    expect(() => {
      validator.isNumberEven('1');
    }).to.throw(Error, '[1] is not of type "Number" it is of type "string"');
  });
  it('should throw the error if argument is boolean ', () => {
    expect(() => {
      validator.isNumberEven(false);
    }).to.throw(Error, '[false] is not of type "Number" it is of type "boolean"');
  });
  it('should throw the error if argument is a bigint', () => {
    expect(() => {
      validator.isNumberEven(110n);
    }).to.throw(Error, '[110] is not of type "Number" it is of type "bigint"');
  });
  it('should throw the error if argument is undefined', () => {
    expect(() => {
      validator.isNumberEven();
    }).to.throw(Error, '[undefined] is not of type "Number" it is of type "undefined"');
  });
  it('should throw the error if argument is null', () => {
    expect(() => {
      validator.isNumberEven(null);
    }).to.throw(Error, '[null] is not of type "Number" it is of type "object"');
  });
  it('should throw the error if argument is object', () => {
    expect(() => {
      validator.isNumberEven({});
    }).to.throw(Error, '[[object Object]] is not of type "Number" it is of type "object"');
  });
  it('should throw the error if argument is an array', () => {
    expect(() => {
      validator.isNumberEven([1]);
    }).to.throw(Error, '[1] is not of type "Number" it is of type "object"');
  });
});

describe('getEvenNumbersFromArray', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });
  afterEach(() => {
    validator = null;
  });
  it('should return array if all numbers from array are even', () => {
    expect(validator.getEvenNumbersFromArray([2, 4, 6])).to.deep.equal([2, 4, 6]);
  });
  it('should return even numbers from array with even and odd numbers', () => {
    expect(validator.getEvenNumbersFromArray([2, 3, 4])).to.deep.equal([2, 4]);
  });
  it('should return even numbers from array with even negative numbers', () => {
    expect(validator.getEvenNumbersFromArray([-2, -4])).to.deep.equal([-2, -4]);
  });
  it('should return array if array of even numbers contains 0', () => {
    expect(validator.getEvenNumbersFromArray([0])).to.deep.equal([0]);
  });
  it('should return empty array if numbers from array are odd', () => {
    expect(validator.getEvenNumbersFromArray([1, 3, 5])).to.deep.equal([]);
  });
  it('should return empty array if array is empty', () => {
    expect(validator.getEvenNumbersFromArray([])).to.deep.equal([]);
  });
  it('should return all even numbers from a large array', () => {
    const numbers = Array.from({ length: 1000 }, (_, index) => (index + 1) * 2);
    expect(validator.getEvenNumbersFromArray(numbers)).to.deep.equal(numbers);
  });
  it('should return array if array contains only one even number', () => {
    expect(validator.getEvenNumbersFromArray([2])).to.deep.equal([2]);
  });
  it('should throw the error if argument is not an array', () => {
    expect(() => {
      validator.getEvenNumbersFromArray('string');
    }).to.throw(Error, '[string] is not an array of "Numbers"');
  });
  it('should throw the error if array contains strings', () => {
    expect(() => {
      validator.getEvenNumbersFromArray([2, '2', 4, '4']);
    }).to.throw(Error, '[2,2,4,4] is not an array of "Numbers"');
  });
  it('should throw the error if array contains another array', () => {
    expect(() => {
      validator.getEvenNumbersFromArray([[2, 4]]);
    }).to.throw(Error, '[2,4] is not an array of "Numbers"');
  });
});

describe('isAllNumbers', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });
  afterEach(() => {
    validator = null;
  });
  it('should return true if array contains only numbers', () => {
    expect(validator.isAllNumbers([1, 2, 3, 4])).to.deep.equal(true);
  });
  it('should return true if array is empty', () => {
    expect(validator.isAllNumbers([])).to.deep.equal(true);
  });
  it('should return true if array contains number 0', () => {
    expect(validator.isAllNumbers([0, 156])).to.deep.equal(true);
  });
  it('should return true if array contains negative numbers', () => {
    expect(validator.isAllNumbers([-33, -156])).to.deep.equal(true);
  });
  it('should return true if array contains NaN', () => {
    expect(validator.isAllNumbers([93, 56, NaN])).to.deep.equal(true);
  });
  it('should return false if array contains strings', () => {
    expect(validator.isAllNumbers([1, '1', 2])).to.deep.equal(false);
  });
  it('should return false if array contains bigint datatype', () => {
    expect(validator.isAllNumbers([1, 2, 10n])).to.deep.equal(false);
  });
  it('should return false if array contains boolean datatype', () => {
    expect(validator.isAllNumbers([true, false])).to.deep.equal(false);
  });
  it('should return false if array contains null', () => {
    expect(validator.isAllNumbers([null, null])).to.deep.equal(false);
  });
  it('should return false if array contains symbols', () => {
    expect(validator.isAllNumbers([1, Symbol('@'), 2])).to.deep.equal(false);
  });
  it('should return false if array contains undefined', () => {
    expect(validator.isAllNumbers([2, 890, undefined])).to.deep.equal(false);
  });
  it('should return false if array contains object', () => {
    expect(validator.isAllNumbers([
      { name: 'Belka', type: 'cat' },
      { name: 'Utja', type: 'guinea pig' }])).to.deep.equal(false);
  });
  it('should return false if array contains array', () => {
    expect(validator.isAllNumbers([[1, 2, 10]])).to.deep.equal(false);
  });
  it('should throw the error if argument is not an array', () => {
    expect(() => {
      validator.isAllNumbers('string');
    }).to.throw(Error, '[string] is not an array');
  });
});

describe('isInteger', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });
  afterEach(() => {
    validator = null;
  });
  it('should return true if argument is an integer  positive number', () => {
    expect(validator.isInteger(25)).to.deep.equal(true);
  });
  it('should return true if argument is a integer negative number', () => {
    expect(validator.isInteger(-100)).to.deep.equal(true);
  });
  it('should return true if argument is number 0', () => {
    expect(validator.isInteger(0)).to.deep.equal(true);
  });
  it('should return true if argument is a integer number written with a decimal point', () => {
    expect(validator.isInteger(3.0)).to.deep.equal(true);
  });
  it('should return true if argument is the result of a division without a remainder', () => {
    expect(validator.isInteger(30 / 5)).to.deep.equal(true);
  });
  it('should return true if argument is a rounded number', () => {
    expect(validator.isInteger(Math.round(4.2))).to.deep.equal(true);
  });
  it('should return true if argument is the result of Math.floor()', () => {
    expect(validator.isInteger(Math.floor(-4.1))).to.deep.equal(true);
  });
  it('should return true if argument is the result of Math.ceil()', () => {
    expect(validator.isInteger(Math.ceil(110.3))).to.deep.equal(true);
  });
  it('should return false  if argument is a decimal positive number', () => {
    expect(validator.isInteger(3.5)).to.deep.equal(false);
  });
  it('should return false  if argument is a decimal negative number', () => {
    expect(validator.isInteger(-100.9)).to.deep.equal(false);
  });
  it('should return false  if argument is the result of a division with a remainder', () => {
    expect(validator.isInteger(30 / 7)).to.deep.equal(false);
  });
  it('should return false  if argument is NaN', () => {
    expect(validator.isInteger(NaN)).to.deep.equal(false);
  });
  it('should throw the error if argument is a string', () => {
    expect(() => {
      validator.isInteger('1');
    }).to.throw(Error, '[1] is not a number');
  });
  it('should throw the error if argument is null', () => {
    expect(() => {
      validator.isInteger(null);
    }).to.throw(Error, '[null] is not a number');
  });
  it('should throw the error if argument is undefined', () => {
    expect(() => {
      validator.isInteger();
    }).to.throw(Error, '[undefined] is not a number');
  });
  it('should throw the error if argument is bigint', () => {
    expect(() => {
      validator.isInteger(20n);
    }).to.throw(Error, '[20] is not a number');
  });
  it('should throw the error if argument is an array', () => {
    expect(() => {
      validator.isInteger([20]);
    }).to.throw(Error, '[20] is not a number');
  });
  it('should throw the error if argument is object', () => {
    expect(() => {
      validator.isInteger([
        { name: 'Belka', type: 'cat' },
        { name: 'Utja', type: 'guinea pig' },
      ]);
    }).to.throw(Error, '[[object Object],[object Object]] is not a number');
  });
});
