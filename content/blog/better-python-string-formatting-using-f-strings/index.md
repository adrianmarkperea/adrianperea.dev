---
title: 'Better Python String Formatting Using f-strings'
description: 'Because we all want to make string formatting easier'
date: '2020-12-13'
image: 'https://cdn.pixabay.com/photo/2016/04/30/13/12/texture-1362879_960_720.jpg'
---

As an avid Python user, I've always been jealous of how JavaScript users can *seamlessly* put together strings and expressions using template literals:

```javascript
>>> const a = 5;
>>> const b = 10;
>>> console.log(`Fifteen is ${a + b}.`
Fifteen is 15.
```
That is an extremely elegant solution, as opposed to the de facto standard of using Python string formatting:

```python
>>> a = 5
>>> b = 10
>>> print('Fifteen is {}.'.format(a + b);
Fifteen is 15.
```
You might say, "But, Adrian! The Python version doesn't seem so bad." And you're correct... when we're talking about using single expressions. But what if we're using more than one? 

Skim through the following code examples in both JavaScript and Python to see how quickly things can get tricky.

Here's the JavaScript version:
```javascript
>>> const name = 'Adrian';
>>> const age = 25;
>>> const major = 'Computer Engineering';
>>> const occupation = 'Software Engineer';
>> console.log(`Hello! My name is ${name}. 
                I am ${age} years old.
                I studied ${major} in college,
                and I am currently working as a ${occupation}.`);
Hello! My name is Adrian.
I am 25 years old.
I studied Computer Engineering in college,
and I am currently working as a Software Engineer.
```

And the Python version:
```python
>>> name = 'Adrian'
>>> age = 25
>>> major = 'Computer Engineer'
>>> occupation = 'Software Engineer'
>>> print('''Hello! My name is {}.
             I am {} years old.
             I studied {} in college,
             and I am currently working as a {}.
          '''.format(name, age, major, occupation)
Hello! My name is Adrian.
I am 25 years old.
I studied Computer Engineering in college,
and I am currently working as a Software Engineer.
```

The problem with the Python version is that it requires you to have a mental mapping between the expressions you need to include in the string and the supplying the expressions at the end of the string. It's easy to mess up the arrangement, especially when you're working on more complex code.

Compare this with the JavaScript version that has the expressions in-line. There's less room for errors.

Python has a solution for this, and it's naming the string formatting braces. This allows you to supply the expressions in the `format` method as keyword arguments, depending on where on the string you want it to go:

```python
>>> print('''Hello! My name is {name}.
         I am {age} years old.
         I studied {major} in college,
         and I am currently working as a {occupation}.
      '''.format(name=name, age=age, major=major, occupation=occupation)
Hello! My name is Adrian.
I am 25 years old.
I studied Computer Engineering in college,
and I am currently working as a Software Engineer.
```

While this solves the problem of mental mapping, it can get quite verbose. It's not exactly the best solution.

So what are our options? Fortunately, the smart people at Python have introduced **f-strings**

## What the f-strings
F-strings are nominally called [Formatted String Literals](https://docs.python.org/3/tutorial/inputoutput.html#tut-f-strings). They're usually called f-strings since you construct them by adding an `f` before a string, like so:

```python
>>> f'I am a formatted string!'
I am a formatted string!
```

So what can we do with f-strings? Actually, its usage is very similar to the string formatting in JavaScript examples we saw above. Let's see the first example rewritten using f-strings:

```python
>>> a = 10
>>> b = 5
>>> print(f'Fifteen is {a + b}.')
Fifteen is 15.
```

Nice! That already looks so much cleaner. Now let's rewrite the second example:

```python
>>> name = 'Adrian'
>>> age = 25
>>> major = 'Computer Engineer'
>>> occupation = 'Software Engineer'
>>> print(f'''Hello! My name is {name}.
             I am {age} years old.
             I studied {major} in college,
             and I am currently working as a {occupation}.
          '''
Hello! My name is Adrian.
I am 25 years old.
I studied Computer Engineering in college,
and I am currently working as a Software Engineer.
```
As you can see, using f-strings allow us to *string* together literals and expressions seamlessly, just like in JavaScript! But since I am a **hardcore fan** of Python, I want to show you additional things you can do with f-strings that you *can't* do with JavaScript string formatting:

### Rounding Off Digits
```python
>>> import math
>>> print(f'The value of pi is {math.pi}')
The value of pi is 3.141592653589793
>>> print(f'The value of pi is approximately {math.pi:.3f}')
The value of pi is approximately 3.142
```

### Aligning Items
This ensures that `name` is at least 10 characters wide, and `quantity` is 4 characters wide.

```python
>>> shopping_list = {'Bananas': 2, 'Apples': 4, 'Grapes': 6}
>>> for name, quantity in shopping_list.items():
...		print(f'{name:10} : {quantity:4}')
...
Bananas   :    2  
Apples    :    4  
Grapes    :    6
```
## String formatting is not fun
I think many of us can agree that string formatting is not fun, so we may as well use methods that make it easier not only to us, but also the readers of our code. Using Python f-strings allows us to write cleaner, more concise, intuitive, and especially, more readable code by seamlessly embedding expressions within string literals.

The examples I showed above are only the tip of the iceberg. You can find out more examples and inspiration for string formatting through the following:

+ The [official documentation](https://docs.python.org/3/tutorial/inputoutput.html#tut-f-strings) on f-strings
+ The [format specification mini-language](https://docs.python.org/3/library/string.html#formatspec) to learn more about how to modify expressions within the strings

