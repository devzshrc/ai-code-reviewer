The `sum()` function you've written has a common issue in JavaScript (and many other programming languages) related to
**variable scope**.

Let's break down why it won't work as expected and how to fix it:

### The Problem

When you define `function sum() { return a + b; }`, the variables `a` and `b` are not defined within the function's
scope, nor are they passed into it.

1. **If `a` and `b` are not defined anywhere else (e.g., globally):**
   You will get a `ReferenceError` because the JavaScript engine won't know what `a` or `b` refers to.

```javascript
// No 'a' or 'b' defined here
function sum() {
  return a + b; // ReferenceError: a is not defined
}
sum();
```

2. **If `a` and `b` are defined globally but haven't been assigned values (so they are `undefined`):**
   You will get `NaN` (Not a Number) because adding `undefined` to `undefined` (or any number to `undefined`) results in
   `NaN`.

```javascript
let a; // a is undefined
let b; // b is undefined

function sum() {
  return a + b;
}
console.log(sum()); // Output: NaN
```

3. **If `a` and `b` are defined globally and have values:**
   The function _would_ technically work, but it's generally considered bad practice for a utility function like `sum` to
   rely on global variables. It makes the function less reusable and harder to debug.

```javascript
let a = 5;
let b = 10;

function sum() {
  return a + b;
}
console.log(sum()); // Output: 15
```

### The Correct Way (Using Parameters)

The standard and most flexible way to write a `sum` function is to pass the numbers you want to add as **parameters**
(or arguments) to the function. This makes the function reusable and self-contained.

```javascript
function sum(a, b) {
  // 'a' and 'b' are now parameters
  return a + b;
}

// How to use it:
console.log(sum(5, 10)); // Output: 15
console.log(sum(20, 30)); // Output: 50
console.log(sum(-1, 7)); // Output: 6
```

#### Explanation of Parameters:

- When you define `function sum(a, b)`, `a` and `b` become local variables _within_ that function.
- When you call `sum(5, 10)`, the value `5` is assigned to `a` for that specific call, and `10` is assigned to `b`.
- This allows the function to operate on whatever values you provide, without needing to know about external variables.

### Other Ways (Less Common for a Simple Sum)

#### 1. Defining Variables Inside the Function (Less Flexible)

If the function should always add the same specific numbers, you could define them inside:

```javascript
function sumFixedNumbers() {
  const a = 10;
  const b = 20;
  return a + b;
}
console.log(sumFixedNumbers()); // Output: 30
```

This is not very useful for a generic `sum` function, as it always returns the same result.

#### 2. Taking an Array of Numbers (More Flexible for Multiple Numbers)

If you want to sum many numbers, you could pass an array or use the rest parameter syntax:

````javascript
// Using an array
function sumArray(numbers) {
let total = 0;
for (let i = 0; i < numbers.length; i++) { total +=numbers[i]; } return total; } console.log(sumArray([1, 2, 3, 4])); //
    Output: 10 // Using the rest parameter (modern JavaScript) function sumMany(...numbers) { // 'numbers' will be an
    array of all arguments return numbers.reduce((accumulator, currentValue)=> accumulator + currentValue, 0);
    }
    console.log(sumMany(1, 2, 3)); // Output: 6
    console.log(sumMany(10, 20, 30, 40)); // Output: 100
    ```

    **In summary, for a function named `sum` that adds two numbers, the version using parameters `function sum(a, b) {
    return a + b; }` is almost certainly what you're looking for.**
````
