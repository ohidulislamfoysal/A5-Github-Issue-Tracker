1️⃣ What is the difference between var, let, and const?
Answer:In JavaScript, var, let, and const are used to declare variables, but they work differently. var is the older way of declaring variables and it follows function scope, which means a variable declared with var inside a block can still be accessed outside that block. It also allows both redeclaration and reassignment. let was introduced in ES6 and follows block scope, meaning the variable only exists inside the block where it is declared. It cannot be redeclared in the same scope, but its value can be reassigned. const is also block scoped like let, but its value cannot be reassigned after it is declared, so it is used for variables that should remain constant.
2️⃣ What is the spread operator (...)?
Answer:The spread operator allows you to expand an array or object into individual elements. It’s often used to copy, merge, or pass elements. For example, [arr1,arr2] merges two arrays, and {obj} creates a shallow copy of an object.
3️⃣ What is the difference between map(), filter(), and forEach()?
Answer:
i)map() transforms each element in an array and returns a new array.
ii)filter() selects elements based on a condition and returns a new array of elements that pass the test.
iii)forEach() loops through elements to perform actions but does not return a new array.
4️⃣ What is an arrow function?
Answer:Arrow functions are shorter function syntax introduced in ES6. They use => and automatically bind this to the surrounding context.
For example:
const add = (a, b) => a + b;
5️⃣ What are template literals?
Answer:Template literals use backticks ` and allow multi-line strings and string interpolation with ${}.