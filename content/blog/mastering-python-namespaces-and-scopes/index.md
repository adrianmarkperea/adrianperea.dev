---
title: 'Mastering Python Namespaces and Scopes'
description: 'Understanding where and when names are defined'
date: '2019-10-13'
---
Mastering Python Namespaces and Scopes

The [official Python documentation](https://docs.python.org/3/tutorial/classes.html#python-scopes-and-namespaces) defines namespaces and scopes like this:
> A *namespace* is a mapping from names to objects.
>
> A *scope* is a **textual region** of a Python program where a namespace is directly accessible.

*Say what now*?

Let’s put it in more concrete terms. A *namespace* determines which identifiers (e.g. variables, functions, classes) are available for use, and a *scope* defines where — in your written code — a namespace can be accessed. Simple, right?

No? Okay, that’s on me. Let’s break it down even further.

## For Starters

Whenever you define a variable, Python needs a way to remember two things: the name (identifier) of the variable, and the value you assigned to it. Internally, Python keeps track of all of these definitions by implicitly adding them to a dictionary, mapping the name of each variable you define to its value.

This internal dictionary serves as a lookup table for all your variables. Whenever you try to access a variable, the Python interpreter looks its name up in the dictionary and, if found, returns you its value. If not, it throws a *NameError*.

Let’s look at an example:

`gist:adrianmarkperea/256074c370db22a1855f68f6349e921a#namespaces.py`

In essence, this is simply what a namespace is: an internal dictionary used as a lookup table for names. Simple!

But not so fast; let’s go one step further.

## Into the Rabbit Hole

In reality, there are multiple namespaces existing at any given time while a Python program is running, and which namespace you have access to is determined by the *scope you are currently in*. A scope, in essence, is a *textual area* in your program that decides which of these multiple namespaces you have access to.

There are four types of scopes, each more specific than the last. A more specific scope can access the namespace of a less specific scope, but not the other way around. Here are the four types, arranged from most specific to least specific:

1. **The local scope.** The local scope is determined by whether you are in a class/function definition or not. Inside a class/function, the local scope refers to the names defined inside them. Outside a class/function, the local scope is the same as the global scope.

1. **The non-local scope.** A non-local scope is midways between the local scope and the global scope, e.g. the non-local scope of a function defined *inside another function is the enclosing function itself*.

1. **The global scope.** This refers to the scope outside any functions or class definitions. It also known as the module scope.

1. **The built-ins scope.** This scope, as the name suggests, is a scope that is built into Python. While it resides in its own [module](https://docs.python.org/3/library/builtins.html#module-builtins), any Python program is qualified to call the names defined here without requiring special access.

A visual example can easily clear this up:

`gist:adrianmarkperea/96e9cf39a50be36b4017f85b9b9d1ab5#scopes.py`

Scopes don’t exist in a vacuum, and must always be seen from the point of view of *where* you are in the code. This is the textual area I was referring to earlier. In the above code, I’ve labelled four different scopes A, B, C, and D. Let’s examine each of these scopes and determine which scope category each belongs to:

1. **Scope A.** Scope A is called the global/module scope. It exists outside any class or function definition. From the perspective of Scope A, it is considered the local scope, from the perspectives of both B and C, it is the global scope.

2. **Scope B.** From the perspective of Scope B it is the local scope, but from the perspective of scope C, it is the non-local scope. Scope A has no access to the scope inside Scope B.

3. **Scope C.** From the perspective of Scope C, it is the local scope. Scopes A and B have no access to Scope C.

4. **Scope D.** This is the built-ins scope. All other scopes have access to it.

It is important to know how to distinguish these scopes because the scope you are currently in determines which namespaces are available for you to use.

Python uses the concept of scopes to search for the variable you are trying to access. Whenever you try to access a variable, Python searches in the following order:

1. Local scope

2. Non-local scope

3. Global scope

4. Built-ins scope

> Think of scopes as nested Matryoshka Dolls: Python searches for a name from the innermost doll, and subsequently searches each larger doll until it reaches the outermost one. If it doesn’t find after reaching the largest doll, it throws an error. It’s Python’s way of saying **wait, you have no more dolls**!

![Matryoshka Dolls. Source: [Pixabay](https://pixabay.com/photos/matryoshka-russian-doll-russian-toy-2737108/)](https://cdn-images-1.medium.com/max/2000/0*HXfL_-HIS78C1HBM.jpg)*Matryoshka Dolls. Source: [Pixabay](https://pixabay.com/photos/matryoshka-russian-doll-russian-toy-2737108/)*

To illustrate variable access from different scopes, consider the following example:

`gist:adrianmarkperea/9eb4134c3cdcd68b465c1019efe3abcd#variable_access.py`

Which outputs:

`gist:adrianmarkperea/10aca2a46a994818fc8ebfbdfc11f9a2#variable_access_res.py`

The reason behind the error is that foo() has access to the global namespace, while the global namespace doesn’t have access to the local namespace of the function. An important thing to remember is that Python searches for names *outwards* from inner scopes, and not the other way around! This means that you can be assured of two things:

* More specific namespaces (e.g. the local namespace inside a function) will never be altered by less specific namespaces (e.g. the global namespace)

* More specific namespaces will always have access to less specific namespaces

## The global and nonlocal keywords

I mentioned in the previous section that more specific namespaces have access to less specific namespaces. Does this mean that functions can alter global variables? Consider the following example:

`gist:adrianmarkperea/3c8e0f945da4b80d4efcd6dd77bde8cc#globals.py`

The reason behind the result is that while inner scopes *do* have access to outer scopes, they only have *read-only* access to them. The moment that i_am_global is altered inside the function, a copy of that variable is created inside the local namespace, thus preserving the value of the global i_am_global .

While generally considered bad practice, by prefixing the global variable with the keyword global inside the function, a copy of the variable won’t be created in the local namespace; that is to say, accessing a variable prefixed with global removes the read-only constraint and allows you to alter its value:

`gist:adrianmarkperea/881b2eda34793c2f29107102f07378a9#writable_globals.py`

The nonlocal keyword works the same way, but instead of allowing access to global variables, it allows access to — wait for it — non-local variables. I bet you didn’t see that one coming!

To tie everything together, let’s look at the following program:

`gist:adrianmarkperea/4b1ed423e46598d993777b9999e221e8#writable_nonlocals.py`

The program gives the following output:

`gist:adrianmarkperea/7e54e6c464484bc978f07dcad70f8b2c#writable_nonlocals_res.py`

A few things to take note about this result:

* bleep() does not alter the variable since it creates its own copy in its namespace

* oof() binds itself to the non-local variable

* bop() creates a *global *variable*. *This is why we have access to the variable outside the function. *They have the same names but reside in different namespaces.*

By default, python protects you from modifying outer variables from inner variables so that your program stays predictable. Use the global and nonlocal keywords only if you have specific use-cases for it. Most of the time, you won’t!

Namespaces and scopes are tricky, but mastering them is essential for any Python programmer.

## Further Reading

* [The Python Class Documentation](https://docs.python.org/3/tutorial/classes.html#a-word-about-names-and-objects) offers an extensive (and more technical) explanation of scopes and namespaces.

* [Functional Programming in Python](https://kite.com/blog/python/functional-programming/) provides reasons why you wouldn’t want to use the *global* and *nonlocal* *keywords*. If you are coming from C or Java, this is a good read.