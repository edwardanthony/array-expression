# Array Expression

## Introduction

This library is created to provide formatter declaration that can be transported through network and executed securely.
The formatter is written in JSON and it's highly configurable. This formatter declaration is called "array expression".

## Syntax

Expression array syntax is specified below:

```ts
[expression_name, arg0, arg1, ...]
```

Expression is categorized into 4 different types:

- Type
  - [boolean](#boolean)
  - [string](#string)
- Math
  - [+](#add)
  - [-](#subtract)
  - [\*](#multiply)
  - [/](#divide)
  - [%](#remainder)
  - [^](#power)
  - [sqrt](#sqrt)
  - [abs](#abs)
  - [sin](#sin)
  - [cos](#cos)
  - [tan](#tan)
  - [log](#log)
  - [floor](#floor)
  - [ceil](#ceil)
  - [round](#round)
  - [min](#min)
  - [max](#max)
- String
  - [concat](#concat)
  - [downcase](#downcase)
  - [upcase](#upcase)
  - [number-format](#number-format)
- Decision
  - [!](#negate)
  - [==](#equal)
  - [!=](#not-equal)
  - [<](#less-than)
  - [<=](#less-than-or-equal)
  - [>](#greater-than)
  - [>=](#greater-than-or-equal)
  - [all](#all)
  - [any](#any)
  - [if](#if)

---

## Type expressions

### <span id="boolean">boolean</span>

Converts value into boolean.

```ts
['boolean', value]: boolean
```

### <span id="string">string</span>

Converts value into string.

```ts
['string', value]: string
```

---

## Math expressions

### <span id="add">+</span>

Performs addition and return the resulting number.

```ts
['+', number1, number2]: number
```

### <span id="subtract">-</span>

Performs subtraction and return the resulting number.

```ts
['-', number1, number2]: number
```

### <span id="multiply">\*</span>

Performs multiplication and return the resulting number.

```ts
['*', number1, number2]: number
```

### <span id="divide">/</span>

Performs division and return the resulting number.

```ts
['/', number1, number2]: number
```

### <span id="remainder">%</span>

Performs remainder operation and return the resulting number.

```ts
['%', number1, number2]: number
```

### <span id="power">^</span>

Returns number1 to the power of number2.

```ts
['^', number1, number2]: number
```

### <span id="sqrt">sqrt</span>

Returns the square root of a number.

```ts
['sqrt', number]: number
```

### <span id="abs">abs</span>

Returns the absolute value of a number.

```ts
['abs', number]: number
```

### <span id="sin">sin</span>

Returns the sine of a number.

```ts
['sin', number]: number
```

### <span id="cos">cos</span>

Returns the cosine of a number.

```ts
['cos', number]: number
```

### <span id="tan">tan</span>

Returns the tangent of a number.

```ts
['tan', number]: number
```

### <span id="log">log</span>

Returns natural logarithm (base e) of a number.

```ts
['log', number]: number
```

### <span id="floor">floor</span>

Returns the greatest integer less than or equal to a value.

```ts
['floor', number]: number
```

### <span id="ceil">ceil</span>

Returns the smallest integer greater than or equal to a value.

```ts
['ceil', number]: number
```

### <span id="round">round</span>

Rounds a number to the nearest integer and return the resulting number.

```ts
['round', number]: number
```

### <span id="min">min</span>

Returns the lowest number in the arguments.

```ts
['min', number1, number2, ...]: number
```

### <span id="max">max</span>

Returns the highest number in the arguments.

```ts
['max', number1, number2, ...]: number
```

---

## String expressions

### <span id="concat">concat<span>

Concatenate the arguments into one single string.

```ts
['concat', value1, value2, ...]: string
```

### <span id="downcase">downcase<span>

Converts all the alphabetic characters in a string to lowercase and return the resulting string.

```ts
['downcase', string]: string
```

### <span id="upcase">upcase<span>

Converts all the alphabetic characters in a string to uppercase and return the resulting string.

```ts
['upcase', string]: string
```

### <span id="number-format">number-format<span>

Format a number by specifying the minimum and maximum fraction digits.

```ts
['number-format', number, minimum_fraction_digits, [maximum_fraction_digits]]: string
```

---

## Decision expressions

### <span id="negate">!</span>

Negates a value and return the resulting boolean.

```ts
['!', value]: boolean
```

### <span id="equal">==<span>

Performs strict equality operation and return the resulting boolean.

```ts
['==', value]: boolean
```

### <span id="not-equal">!=</span>

Performs strict inequality operation and return the resulting boolean.

```ts
['!=', value]: boolean
```

### <span id="less-than"><</span>

Returns true if number1 or string1 is less than number2 or string2, otherwise return false.

```ts
['<', number1 | string1, number2 | string2]: boolean
```

### <span id="less-than-or-equal"><=</san>

Returns true if number1 or string1 is less than or equal to number2 or string2, otherwise return false.

```ts
['<=', number1 | string1, number2 | string2]: boolean
```

### <span id="greater-than">></span>

Returns true if number1 or string1 is greater than number2 or string2, otherwise return false.

```ts
['>', number1 | string1, number2 | string2]: boolean
```

### <span id="greater-than-or-equal">>=</san>

Returns true if number1 or string1 is greater than or equal to number2 or string2, otherwise return false.

```ts
['>=', number1 | string1, number2 | string2]: boolean
```

### <span id="all">all</san>

Returns true if all the values evaluate to true.

```ts
['all', value1, value2, ...]: boolean
```

### <span id="any">any</san>

Returns true if any of the values evaluate to true.

```ts
['any', value1, value2, ...]: boolean
```

### <span id="if">if</san>

Perform if else operation.

```ts
['if', condition1, output1, condition2, output2, ..., fallback_output]: boolean
```

---

## Expression can be nested

Please see the example below:

```ts
// Returns 'equal to two'
exp(['if', ['==', 5, 1], 'equal to one', ['==', 2, 2], 'equal to two', 'failure']);
```

## Expression can be injected with data

By specifying a variable using wildcard, we can inject data into the expression.

Please see the example below:

```ts
const expression: Expression = [
  'if',
  ['==', '$animal', 'cat'],
  'meow',
  ['==', '$animal', 'dog'],
  'woof',
  'Wa-pa-pa-pa-pa-pa-pow!',
];

// Returns 'meow'
exp(expression, { animal: 'cat' });

// Returns 'woof'
exp(expression, { animal: 'dog' });

// Returns 'Wa-pa-pa-pa-pa-pa-pow!'
exp(expression, { animal: 'fox' });
```

## Realworld example

Below, we will convert unit from liter per minute into US gallon per hour.

```ts
const data: Data = {
  // value contains liter per minute
  value: 5,
};

// Returns '79.3 gallon/hour'
exp(
  ['concat', ['number-format', ['*', ['*', '$value', 0.2641722], 60], 0, 1], ' ', 'gallon/hour'],
  data
);
```

## License

`array-expression` is [MIT licensed](LICENSE).
