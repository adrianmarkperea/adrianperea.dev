---
title: 'A Beginner’s Guide to Python Quirks and Jargon'
date: '2019-10-05'
description: 'Learn parseltongue'
---
The data science boom has welcomed a lot of new Python developers from many different walks of life: from seasoned hackers, statisticians, and mathematicians, to business executives, journalists, and basically anyone who wants to be part of the inevitable data revolution. We are in exciting times, people. We are in the cusp of the [fourth industrial revolution](https://www.weforum.org/agenda/2016/01/the-fourth-industrial-revolution-what-it-means-and-how-to-respond/), and everyone wants in.

For the beginner programmer, it’s mighty convenient that Python is [one of the two famous programming languages](https://dzone.com/articles/r-or-python-data-scientists-delight) for data science. With its succinct syntax, easy readability, and, closeness to natural language, it’s no wonder that [70% of introductory programming courses in US universities teach i](https://www.techrepublic.com/article/fastest-growing-programming-language-pythons-popularity-is-still-climbing/)t. I can think of no gentler introduction to programming.

With all the online courses you can take, and all the blog posts and tutorials sprawled across the interwebs, there’s no shortage of resources for learning the language. Furthermore, thanks to sites like [stackoverflow](http://stackoverflow.com), there will always be a community of other programmers to help you should you have any questions (most of us are nice, well, most of the time).

*Gaining knowledge has never been easier, and I’d like to invite all of you to join me and appreciate that for a minute.*

But while these courses and tutorials can quickly get you up to speed with the basics of the language and the relevant data science libraries — pandas, numpy, matplotlib, and, sklearn, to name a few — most barely scratch the intricacies of Python. Despite its simplicity, Python is a vast and rich language, and it pays (literally) to know its insides and outs.

## Why It Matters

You can *probably* get by by just knowing the basics and just knowing enough of the language to be functional in your domain, but there are advantages to knowing the quirks of what you’re working with:

* **You can write better, more creative code.** Programming, at its core, is problem solving. Having more knowledge of the language allows you to consider multiple solutions to a problem.

* **You can potentially speed up your work. **You probably won’t experience performance problems with small data sets. Things get more dicey and less forgiving when you start working with at least a few thousands of rows. Knowing which language constructs work faster than others can transform a script that has to run for 34 hours, to one that only has to run for 1 minute (I’ll write about this soon!).

* **Your future self will thank you**. Ever worked on code that you haven’t touched for six months? No? Let me tell you right now: it’s not a pleasant experience. You are no longer the problem domain expert you were six months ago. Writing code that is clean and consistent, i.e. code that is [pythonic](https://hub.packtpub.com/write-python-code-or-pythonic-code/), will guide you to a habit of writing in a pattern of style, resulting in code that is readable and predictable. This will definitely save you hours of hair pulling.

* **Lastly**, **pride in your own work**. Okay, this is a personal one, but still one I’d like to share. Time is a very valuable resource. If you’re going to spend it creating something, might as well create something that you can be proud of. For me, in this case, it’s aligning what I code with how the language was designed. While programming is often packaged as logical problem solving, at a design level, it’s more art than engineering. This is where your creativity can shine.

## **What You Should Know**

Learn these simple concepts and you will easily be a better Python developer:

**Empty Sequences are False, Sequences with Elements are True. **It’s not necessary to get the length of a list, dictionary, or a set when used in conditionals:

`gist:adrianmarkperea/8a6e66a157e07461f838b1373d3fe9c6#list_truthiness.py`

**Iterate through sequences using enumerate(). **With the risk of sounding like an old man, it used to be that iterating through a list and its index needed a combination of len() and range(). enumerate() makes it simpler:

`gist:adrianmarkperea/9305052eac19052d0e43a64d8ddb30d9#len_range_enumerate.py`

**You can create lists from strings**. Say you wanted to create a list of categories denoted by letters, it’s easier to make these into a string and pass it into the list constructor instead of making it by hand:

`gist:adrianmarkperea/df44f3ee46ae533b518b3c215df32d9a#list_constructor.py`

**Tuple Packing, Sequence Unpacking.** These can be used whenever you find yourself needing to group multiple items together or to extract individual items from a sequence. These are called tuple packing and sequence unpacking, respectively.

`gist:adrianmarkperea/9a93403ec58a05180a46ead35df06953#tuple_packing_sequence_unpacking.py`

Swapping values between two variables can be done by taking advantage of packing and unpacking:

`gist:adrianmarkperea/a45e159a0b94c3b3adfea3b162069eb8#swapping.py`

Be careful in using this. While it increases the semantic relationship between x and y , it can very much as well provide an erroneous semantic relationship between two very much unrelated variables.

**F-strings**. As of Python 3.6, you can use f-strings to easily pepper your strings with arbitrary expressions. For users of older versions of Python, there’s an easy solution: upgrade! If that’s not an option, you can use the string.format()method:

`gist:adrianmarkperea/6cf2e8b162a2c2e4e18a85104c2231e6#f_string.py`

The f-string evaluates the expressions inside the brackets and automatically includes them in the string. The format method sequentially replaces the curly braces inside the string with the arguments passed to it. As you can see, the f-string is much more succinct.

***args, **kwargs. ***args and **kwargs allow your functions to accept an arbitrary number of positional and keyword arguments. This can be useful when you don’t know the number of arguments your function is going to receive before hand. Inside the function, *args can be accessed as a list, and **kwargs can be accessed as a dictionary:

`gist:adrianmarkperea/46829eb0456a4432c0ebae4424bb56cc#args_kwargs.py`

While not found in your day to day programming, knowledge of these is useful for when you encounter them in the wild.

**List Comprehension.** List comprehensions allow you to create new lists and dictionaries from existing ones. They provide a succinct syntax and are preferable over for loops. Examples would help illustrate this.

Say you want to double all the values in a list:

`gist:adrianmarkperea/3f84ba0754ff2ae1507641beae92a067#list_comprehension_one.py`

Or maybe find the values in a list that are odd:

`gist:adrianmarkperea/95738396ae55857959ef16dae9c35e8a#list_comprehension_two.py`

List comprehensions offer the following benefits:

* Increased readability

* Fewer lines of code

* Potential increase in performance (appending to an array resizes it during runtime, which has a performance overhead)

Master list comprehensions and I can guarantee that you will already be a better Python developer.

Well, that’s a wrap. While there are many more things that I would’ve wanted to talk about, I wanted to keep this piece as succinct as I can while providing *immediately *relevant information to the reader. After all, we’re all busy.

Practice these, integrate them into your daily code, and experiment. I will guarantee you that your Python skills will improve, and you will be able to create code that you can be proud of.

### Further Reading

There are much more things to learn about Python, both for the things I’ve mentioned and wasn’t able to. If you want to explore more, I recommend these following articles:

* [A more in-depth explanation of list comprehension](https://towardsdatascience.com/comprehending-the-concept-of-comprehensions-in-python-c9dafce5111). Tons of clear and practical examples here.

* [Generators, Generator Functions, and Iterators](https://towardsdatascience.com/python-pro-tip-use-itertools-generators-and-generator-expressions-1b84911c978). Generators help improve memory handling and performance by using [lazy evaluation](https://en.wikipedia.org/wiki/Lazy_evaluation).

* [The Offical Python Tutorial](https://docs.python.org/3/tutorial/index.html). While it’s a bit dry, I recommend any serious Python programmer to give this a read. It provides essential information to understanding the language.