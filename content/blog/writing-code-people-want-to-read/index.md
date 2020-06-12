---
title: 'Writing Code People Want to Read'
description: 'Or how to write beautiful, clean code'
date: '2019-10-09'
---

It was 5 years ago when I first created my first programming project. I was a clueless freshman, taking an introductory course to programming in C++. I’m tempted to lie and say I was a natural programmer, but a snippet of my first project looked something like this:

```cpp
int main()
{
    string a;
    string b;

    getline(cin, a);
    getline(cin, b);

    if ((a == 'g') || (b == 'c')
    {
        ...
        if (condition#2)
        {
            ...
            if (condition#3)
            {
                ...
            }
            else if (condition#4)
            {
                ...
            }
    } 

    return 0;
}
```

*Yikes*. I wish I could say that the nesting stopped there.

Mind you, my program worked. And I used to argue that as long as the program produced the proper output, it didn’t matter what it looked like internally. No one else was going to read it, anyway. *Wrong*.
> Indeed, the ratio of time spent reading versus writing is well over 10 to 1. We are constantly reading old code as part of the effort to write new code. …[Therefore,] making it easy to read makes it easier to write. — Robert C. Martin

The truth of the matter is, people spend more time reading code than writing it. This may not seem obvious at first, but whether you’re browsing through documentation, debugging an old program, or simply trying to think of the next line to write, *you’re reading code*.

Here’s a simple exercise: find a program that you wrote a while back and try to understand what it does. Really get into it. Pay attention to how you named your variables and functions, indented each line, and formed every if statement. Examine which functions call which and why the program is structured that way. The goal is to determine whether you can recreate the logical flow of your program *without *having to run it.

*Ready? Go.*

![Image courtesy of [Pixabay](https://pixabay.com/photos/doors-choices-choose-decision-1767562/)](https://cdn-images-1.medium.com/max/2000/0*S315agQcId-6piEI.jpg)*Image courtesy of [Pixabay](https://pixabay.com/photos/doors-choices-choose-decision-1767562/)*

Difficult, isn’t it? Even if your code was smooth and clean, you still had to exert effort in trying to recreate the logical flow simply because you had to rewind back in time and remember the decisions that you made that led to your code.

Now imagine this: What if another person wrote that code? It would take much more effort on your part to understand it because you have no context of how the code was created. All you have is what’s written in front of you. What if that person wrote bad code? *How would you feel if there was a bug in the code I wrote back on top (there probably is) and you were tasked to debug it?*

Here’s another exercise. The following are three snippets of code that do the exact same thing (note that these snippets aren’t written in a particular language). See which one is easiest to understand:

`gist:adrianmarkperea/1330581259f7d2f1b915fb2e2f164c9f#bad_fun`

`gist:adrianmarkperea/5ea7b4c52494a40066804654da60e2d6#better_fun`

`gist:adrianmarkperea/520b6d9c4b95818d47767787de70b6d6#best`

Functionally, these three code snippets are the same. When you feed it to the hypothetical compiler of this hypothetical language (it’s not related to Python, *I promise*), all of them will produce the same program, and you can be guaranteed that all the outputs of the function will be the same.

However, it’s quite obvious that the third snippet is much more pleasing to the eye. Not only is it *readable*, it’s actually quite enjoyable to read. It offers no head scratching or ambiguity. It is what it is. By simply reading it you can be sure, without a shadow of a doubt, what the function does: it calculates the volume of a cylinder. If you can write code like that all the time, then you can pat yourself in the back. *You have great code*.

While I acknowledge that this is a simplistic demonstration, it carries with it profound ideas that could help you easily improve the readability of your code:

* **Take time to name, and name well**. This goes for variables, functions, file names, packages, and what have you. Ensure that you write what you mean and mean what you write. If there is only one sensible way to interpret your code, then you reduce the risk of anyone (including yourself) misunderstanding your logic.

* **Comments to explain code are good. Code that explains code is best. **The general problem with comments is that they are often overlooked. When code with comments is refactored (restructured), there’s a high chance that the comment won’t be updated with it. What was once a helpful comment is now a straight up lie. [Self-documenting code](https://en.wikipedia.org/wiki/Self-documenting_code) (e.g. the third snippet above) offers the same benefit as the first point above: reduced ambiguity and less chances of misinterpretation (plus, it’s much cleaner to look at!).

And as a bonus, a lesson that can be learned from my very first program:

* **Delegate: make shorter functions**. Think of your code as a business. A business is made up of various departments, each expected to perform a specific task and potentially return results obtained from those tasks. If you run all of your code in one huge function, you’re like a company with no clearly defined boundaries; perhaps at the start you will be able to manage properly, but there will surely be problems once the company expands, *and you won’t know who’s responsible*. Make shorter functions. Delegate specific tasks to these functions and leave only the main function with the responsibility of orchestrating each task. He’s the head honcho and that’s his job. If any problem arises from your code, you will know exactly know where and why it happened.

![Image courtesy of [Pixabay](https://pixabay.com/photos/pets-dog-corgi-cute-4415649/)](https://cdn-images-1.medium.com/max/2000/0*UAZjZaW2trdC6eX4.jpg)*Image courtesy of [Pixabay](https://pixabay.com/photos/pets-dog-corgi-cute-4415649/)*

While this is, by no means, a comprehensive list of guidelines that you can do to make your code much more readable and enjoyable (in fact, it barely scratches the surface), employing these three simple principles can significantly improve the quality of your code. Once again: **name properly, delegate tasks, and make the code speak for itself**.
> Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler

Remember: coders aren’t like authors. We *are* authors. And our job is not only to write functional code, but also to write code that communicates to others our intentions, ingenuity, and creativity, i.e., code that others want to read.

### **Further Reading**

* The ultimate authority on writing clean code, [Uncle Bob Martin](https://en.wikipedia.org/wiki/Robert_C._Martin). His book aptly named [Clean Code](https://amzn.to/320MrFh) is a must-read for any programmer.

* [Design Principles and Design Patterns](https://web.archive.org/web/20150906155800/http://www.objectmentor.com/resources/articles/Principles_and_Patterns.pdf) — this is the paper where Uncle Bob introduced the [SOLID](https://www.baeldung.com/solid-principles) principles of Object-oriented Programming.

* [Design Patterns](https://amzn.to/30ZrGZh) by the famous [Gang of Four](https://en.wikipedia.org/wiki/Design_Patterns)

* [Sourcemaking](https://sourcemaking.com/design_patterns) a one-stop site about design patterns.