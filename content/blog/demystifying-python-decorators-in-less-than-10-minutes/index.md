---
title: 'Demystifying Python Decorators in 10 Minutes'
description: 'Automatically packaging python functions in pretty little boxes'
date: '2019-10-19'
---

In this quick tutorial, we will learn all about Python decorators.

The Python Decorator is [syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar) for writing **function transformations**. This excerpt from PEP 318 describes the motivation for it:
> The current method for **transforming functions** and methods … is awkward and can lead to code that is difficult to understand. Ideally, these **transformations** should be made at the same point in the code where the declaration itself is made.

Understanding decorators, then, is a matter of understanding what function transformations are. Once we understand them, we’ll easily digest decorators.

So, what *are* function transformations? The name sounds daunting, but they’re quite simple. By definition, **function transformations** are no more than functions that extend the functionality of other functions, without modifying their original behaviors. They are like toppings on frozen yogurt: they add an extra zing and oomph, but don’t take away the vanilla flavor. They *wrap* and *decorate* our functions so that they adhere to a particular representation.

![They are like toppings on froyo: they add an extra zing and oomph but don’t take away the vanilla flavor. Source: [Pixabay](https://pixabay.com/photos/yogurt-fruits-blackberries-currants-2104327/)](https://cdn-images-1.medium.com/max/2000/0*JtSkqeHbsA_kNvYf.jpg)*They are like toppings on froyo: they add an extra zing and oomph but don’t take away the vanilla flavor. Source: [Pixabay](https://pixabay.com/photos/yogurt-fruits-blackberries-currants-2104327/)*

This will all clear up once we start going through some examples. Let’s get started.

## Higher-order Functions

Before jumping straight into function transformations, we should first learn about higher-order functions. We will see that function transformations make a lot of use of this concept.

Higher-order functions are functions that have the following properties:

* They accept functions as arguments

* They return functions as results

How can higher-order functions be applied to Python? It’s straightforward: functions in Python are first-class objects. This means that like any other objects, functions can:

* be assigned to variables

* be passed as function arguments

* be returned from other functions

Therefore, we don’t need any special procedures. Python supports higher-order functions right off the bat!

Let’s see an example:

```python
def say_hello(name):
    print(f'Hello, {name}!')
    
    
def say_goodbye(name):
    print(f'Goodbye, {name}!')

    
def say_to_bob(fun):
    fun('Bob')
    
    
say_to_bob(say_hello)
say_to_bob(say_goodbye)
```

Here, `say_to_bob` is accepting a function parameter fun. We can then use this by passing `say_hello` and `say_goodbye` as arguments to `say_to_bob`.

Seeing this in action:

```python
Hello, Bob!
Goodbye, Bob!
```

Note that when we pass functions as arguments, we don’t include the parentheses. If we do, Python evaluates the function *before* it gets passed. Often it is easy to spot, since calling the function without the proper arguments will lead to errors:

```python
>>> say_to_bob(say_hello())
TypeError: say_hello() missing 1 required positional argument: 'name'
```

This satisfies the first condition for a higher-order function.

Now, let’s change the code above to satisfy the second condition:

```python
def say_hello(name):
    print(f'Hello, {name}!')
    
    
def say_goodbye(name):
    print(f'Goodbye, {name}!')


def get_greeting(greeting):
    if greeting == 'hello':
        greeting_fun = say_hello
    elif greeting == 'goodbye':
        greeting_fun = say_goodbye
    
    return greeting_fun
    
    
def say_to_bob(greeting):
    greeting_fun = get_greeting(greeting)
    greeting_fun('Bob')
    
    
say_to_bob('hello')
say_to_bob('goodbye')
```

The `get_greeting` function returns a different greeting function depending on the greeting argument. say_to_bobcalls this function and gets a reference to the appropriate greeting function. It then calls this function with Bob.

We get the same output:

```python
Hello, Bob!
Goodbye, Bob!
```

Note once again that when we return functions, we omit the parentheses.

## Function Transformations by Hand

How can we use higher-order functions to make function transformations?

Like I mentioned earlier:
> By definition, function transformations are no more than functions that extend the functionality of other functions, without modifying their original behaviors.

From this definition, let’s breakdown a function transformation into three properties:

* It’s a higher-order function

* It adds extra functionality to the passed function

* It retains the original functionality of the passed function

Let’s see an example wherein we add a few debug messages before and after calling a function:

```python
def walkout():
    print('Bye Felicia')

    
def debug_transformer(fun):
    def wrapper():
        print(f'Function `{fun.__name__}` called')
        fun()
        print(f'Function `{fun.__name__}` finished')
        
    return wrapper


walkout = debug_transformer(walkout)
walkout()
```

Can you see what happened? Let’s look at the output:

```python
Function `walkout` called
Bye Felicia
Function `walkout` finished
```

Note that we aren’t doing anything new here. This is the same concept of higher-order functions but in a different pattern.

We did the transformation of `walkout` in this line:

```python
walkout = debug_transformer(walkout)
```

From here, the function `walkout` no longer points to the original function definition. It now points to the `wrapper` function which has refers to our original function:

```python
def wrapper():
    print(f'Function `{fun.__name__}` called')
    fun() # Original reference to walkout()
    print(f'Function `{fun.__name__}` finished')
```

## The @-syntax (Read: Pie-decorator-syntax)

![Source: [Pixabay](https://pixabay.com/photos/apple-pie-autumn-dessert-cake-4464826/)](https://cdn-images-1.medium.com/max/2000/0*9EByYvnh0Y4F_ZqG.jpg)*Source: [Pixabay](https://pixabay.com/photos/apple-pie-autumn-dessert-cake-4464826/)*

As you might have observed, writing function transformations is quite cumbersome. From the simple example above, we had to write `walkout` three times to transform it.

To simplify this pattern, the Python team introduced the @-syntax. Let’s see how we can use it to simplify our code above:

```python
def debug_transformer(fun):
    def wrapper():
        print(f'Function `{fun.__name__}` called')
        fun()
        print(f'Function `{fun.__name__}` finished')
        
    return wrapper


@debug_transformer
def walkout():
    print('Bye Felicia')

walkout()
```

If you run it, you will get the same results as before:

```python
Function `walkout` called
Bye Felicia
Function `walkout` finished
```

Much better! Behind the scenes, what the @-syntax does is the following modification:

```python
# Before
walkout = debug_transformer(walkout)

# After
@debug_transformer
def walkout():
    print('Bye Felicia')
```

`@debug_transformer` is a simplified version of `walkout=debug_transformer(walkout)`. This makes it easier to read code since the decorator and function definition are in the same place. Neat!

## Vanishing Return Values

What happens if we apply our decorator to a function with a return value?

```python
def debug_transformer(fun):
    def wrapper():
        print(f'Function `{fun.__name__}` called')
        fun()
        print(f'Function `{fun.__name__}` finished')
        
    return wrapper


@debug_transformer
def walkout():
    print('Bye Felicia')

    
@debug_transformer
def get_bob():
    return 'Bob'

bob = get_bob()
print(bob)
```

Which outputs:

```python
Function `get_bob` called
Function `get_bob` finished
None
```

The decoration works, but we have no more reference to the return value of the original function. To make this work, change the wrapperfunction to return the results of the original function:

```python
def debug_transformer(fun):
    def wrapper():
        print(f'Function `{fun.__name__}` called')
        res = fun() # get reference to original return value
        print(f'Function `{fun.__name__}` finished')
        
        return res
        
    return wrapper
```

We now get our expected output:

```python
>>> bob = get_bob()
Function `get_bob` called
Function `get_bob` finished
>>> print(bob)
Bob
```

## Decorating Functions with Arguments

Will our decorator still work if we decorate a function with an argument?

```python
@debug_transformer
def walkout(name):
    print(f'Bye {name}')


walkout('Felicia')
```

This gives us the following error:

```python
TypeError: wrapper() takes 0 positional arguments but 1 was given
```

The problem occurs because the wrapper function is *not* expecting any arguments. To fix this, we can change it to receive a single argument so our walkout function won’t complain. However, doing so limits the use of our decorator to functions that *only* receive one argument. We need a generalized solution.

We can change wrapper to receive an arbitrary number of arguments using `*args` and `**kwargs`. By doing so, we can support functions with *any* number of arguments:

```python
def debug_transformer(fun):
    # Allow wrapper to receive arbitrary args
    def wrapper(*args, **kwargs):
        print(f'Function `{fun.__name__}` called')
        # And pass it to the original function
        res = fun(*args, **kwargs)
        print(f'Function `{fun.__name__}` finished')
        return res
        
    return wrapper
```

Try it out!

```python
>>> walkout('Dionisia')
Function `walkout` called
Bye Dionisia
Function `walkout` finished
```

Great! It works. You can experiment and see that this solution for functions with any number of arguments.

## A Couple More Examples

You can see that there is no magic involved in creating decorators. Knowing this, your creativity is the only limit in designing them!

Here are a couple of examples for inspiration:

### Calling a function many times

In this example, the original function is called many times inside the wrapper. The final function call receives the result and returns it.

```python
def call_three_times(fun):
    def wrapper(*args, **kwargs):
        fun(*args, **kwargs)
        fun(*args, **kwargs)
        res = fun(*args, **kwargs)
        
        return res
    
    return wrapper


@call_three_times
def say_hey():
    print('Hey!')


say_hey()

# Output
Hey!
Hey!
Hey!
```

### Timing a function

Sometimes we want to note how long a function takes to run. We can do this effortlessly with decorators:

```python
import time

def time_it(fun):
    def wrapper(*args, **kwargs):
        start = time.time()
        res = fun(*args, **kwargs)
        end = time.time()
        print(f'Function took {end-start}s')
        
        return res
    
    return wrapper


@time_it
def waste_time():
    for i in range(10000000):
        pass

    
waste_time()

# Output
Function took 0.18418407440185547s
```

Simple yet effective! You will see in the next section that decorators gain even more power when used with external libraries.

## Decorating External Functions

How can we apply decorators to external functions if we can’t use the @-syntax to decorate them?

At the start of the article, we created decorators by calling function transforms directly on the functions. We can do the same thing to external functions! Say we want to apply our `time_it` decorator to the `np.sort` function. We can do the following:

```python
import numpy as np

rng = np.random.RandomState(0)

# Create a lot of numbers
nums = rng.random(10000000)
# Decorate np.sort with our time_it transformer
timed_sort = time_it(np.sort)
# Perform the sort with our time_it functionality
timed_sort(nums)
```

Note here that we assigned the decorated `np.sort` to a new name instead of reassigning it to `np.sort`. This allows to keep the original and transformed versions of the function.

## Conclusion

At the beginning of the tutorial, we learned about:

* **higher order functions**: functions that accept and return other functions

* **function transformations**: a technique of utilizing higher-order functions to add functionality

Then, we talked about how the @-syntax streamlines creating function transformations. We then made decorators that:

* Preserve the original return value of the function

* Accept an arbitrary number of arguments

We ended by:

* Seeing creative examples of decorators

* Learning how to decorate external functions

![Simple, right?](https://cdn-images-1.medium.com/max/2000/0*tcaDJEMpfOECtrtX.jpg)*Simple, right?*

Remember that there’s no magic in creating decorators! They are no more than function transformations written in a funny syntax.

## Further reading

* [PEP 318](https://www.python.org/dev/peps/pep-0318/). The spec sheet for decorators (and why they call @-syntax the pie-decorator-syntax!)

* [Real Python Primer on Decorators](https://realpython.com/primer-on-python-decorators/). More examples of creating decorators.

* [Scopes and Namespaces](https://medium.com/swlh/mastering-python-namespaces-and-scopes-7eba67aa3094) and [Python Closures](http://www.trytoprogram.com/python-programming/python-closures/). How does the decorator preserve its reference to the original function?