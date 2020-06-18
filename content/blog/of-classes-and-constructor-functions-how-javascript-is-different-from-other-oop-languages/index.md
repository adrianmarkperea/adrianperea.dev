---
title: 'Of Classes and Constructor Functions: How JavaScript is Different from Other OOP Languages'
date: '2020-06-19'
description: 'What’s a prototype language, anyway?'
---
[A question was raised](https://dev.to/gnio/eli5-functions-vs-class-constructor-in-javascript-nki) about the difference between functions and constructor functions in JavaScript. The question follows JavaScript's notorious reputation of *not* being a real Object Oriented language. 

And while this is true (which we will get into later), popular literature mostly explains why in comparison with traditional OOP languages like C++, Java, or Python. Not only is this not helpful, it's also confusing for those who aren't familiar with those languages.

So in this article, I will try to clear up how JavaScript classes are different from traditional OOP classes. I will be using Python as a representative of those languages because it's easy to understand and its relatively close to JavaScript. 

## Traditional OOP Languages
A `class` is often defined as a blueprint for for objects. It serves two practical purposes:

+ **Abstraction**: which information is relevant? Which is irrelevant?
+ **Encapsulation**: how do I show or hide what is relevant or irrelevant?

At its very core, a `class` has two types of properties: `members` and `methods`. These properties define the data stored in the `class` and what operations the `class` can do on that data.

To make use of a `class`, we create `instances` of the class through a process called instantiation. Each `instance` gets *isolated* copies of the `members` and `methods` of the `class`. Let's see how this works in Python:

```python
class Person:
  def __init__(self, first_name, last_name):
    self.first_name = first_name
    self.last_name = last_name
  
  def print_full_name(self):
    print(f'{self.first_name} {self.last_name}')

person_a = Person('Adrian', 'Perea')
person_b = Person('Ben', 'Halpern')

person_a.print_full_name() # Adrian Perea
person_b.print_full_name() # Ben Halpern
```

In this example, `person_a` and `person_b` are `instances` of `Person`. Each of them gets their own `first_name` and `last_name` members, and their own `print_full_name` method.

Now in Python, you perform instantiation by just calling the `class` directly (like how we created `person_a` and `person_b`). Traditionally however, this wasn't always the case. In C++ and Java, for example, you need to add the keyword `new` in order to be able to instantiate the `class`. I believe that this is where the confusion starts.

## JavaScript
In JavaScript, we have something called **constructor functions** that we called with the `new` keyword. These constructor functions are the JavaScript analog of the class. Now while it seems that this is the same thing as the other languages we've mentioned, JavaScript behaves differently whenever we use these constructor functions. See, whenever we use the `new` keyword to execute a constructor function, we're essentially telling JavaScript to run the function normally, but with two extra steps behind the scenes: 
1. An implicit object is created at the start of the function that we can reference with `this`.
2. The resulting instance has a copy of the constructor function's prototype property inside its own prototype.  

Don't worry about the details for now as we'll get to those later. Let's see first how we can make a JavaScript object without any fancy constructor functions:

```javascript
function Person(firstName, lastName) {
  return {
    firstName,
    lastName,
    fullName() {
      console.log(`${this.firstName} ${this.lastName}`)
    }
  };
}

const personA = Person('Adrian', 'Perea');
const personB = Person('Ben', 'Halpern');

personA.fullName() // Adrian Perea
personB.fullName() // Ben Halpern
```

This works fully well! Why not call it a day and be done with it?

Well, the brutally honest truth is, we *can*. There are a lot of things that we can accomplish by simply creating objects this way. But in so doing, we're missing the entire point of JavaScript being what we call a prototype-based language. This is what makes it unique (not necessarily better nor worse) from the traditional OOP languages.

Now let's see how we can implement this another way. While you're reading the following snippet, remember the extra two steps that happen behind the scenes when constructor functions are called with `new`.
```javascript
function Person(firstName, lastName) {
  // 1. An implicit object is created that we can reference with `this`
  this.firstName = firstName;
  this.lastName = lastName;
}

// 2. The resulting instance has a copy of the 
// constructor function's prototype property 
// inside its own prototype. 
Person.prototype.fullName = function() {
  console.log(`${firstName} ${lastName}`);
}

const personA = new Person('Adrian', 'Perea');
const personB = new Person('Ben', 'Halpern');

personA.fullName() // Adrian Perea
personB.fullName() // Ben Halpern
```
Now this is where the magic happens. As you can see, when we created the `Person` class, we separated where we defined the members (`firstName` and `lastName`) and where we defined the method (`fullName`). `firstName` and `lastName` are right where you expect them: inside the constructor function definition. But the interesting part is where we define `fullName` and that's in the `prototype` of the constructor function.

Why is this important? It's important because **whenever we create a new `instance` of the `Person` constructor function through the `new` keyword, a reference to the `prototype` property of constructor function gets added to the `__proto__` property of the object.** Read that again. After that, read it one more time. This part is important.

```javascript
personA.__proto__ === Person.prototype;
```

As opposed to traditional OOP languages, methods are not copied to each instance of the constructor function (or class). When we call `personA.fullName()`, instead of finding the method in the instance itself, JavaScript looks at the `__proto__` property of `personA` and *climbs* up until it finds `fullName`. Since we defined `fullName` in `Person.prototype`, and since `Person.prototype` is the same as `personA.__proto__`, when we call `personA.fullName()`, we're calling a method that exists not in the instance but in the constructor function itself! This provides performance benefits since the methods only have to be defined once (on the prototype of the constructor function). That's to say:

```javascript
personA.fullName === personB.fullName === Person.prototype.fullName;
```

This means that whatever we define on `Person.prototype` will be available to all instances of `Person`. In effect, we can do something weird (in traditional OOP sense) like this:

```javascript
Person.prototype.sayHi = function() {
  console.log(`Hi! I'm ${this.firstName}`);
}

// Note that we did not recreate the objects here
personA.sayHi(); // Hi! I'm Adrian
personB.sayHi(); // Hi! I'm Ben
```

So there you have it. To sum things up:

+ Constructor functions do two things in the background whenever they are called with `new`: create an implicit object that can be referenced with `this`, and assign the `__proto__` property of each instance to refer to the `prototype` property of the constructor function
+ When a function is called on the instance, the `__proto__` property is climbed until a reference to the called function is found. This means that each instance doesn't have a reference to the method, but all share the same method that's defined on the constructor function.
+ In traditional OOP, all instances have a copy of each method. There is no concept of prototypes.

## What about ES6 "classes"
ES6 "classes" don't really introduce the classes as we traditionally know them. It makes writing constructor functions easier since you wouldn't have to write `prototype` for each method you want to share amongst instances. ES6 class syntax is simply an easier way to store all members and methods of a constructor function all in one place, while also abstracting `prototype` and all the confusion it brings.

As an example, we can write the `Person` constructor function the following way:

```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  fullName() {
    console.log(`${firstName} ${lastName}`);
  }
}
```

You can see that it looks very similar to our python example (but you and I both know they're not the same!). Try creating instances of the `Person` and look at the `prototype` property yourself! 😉