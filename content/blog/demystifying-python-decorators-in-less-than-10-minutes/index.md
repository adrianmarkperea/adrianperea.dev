---
title: 'Demysitifying Python Decorators in 10 Minutes'
description: 'Automatically packaging python functions in pretty little boxes'
date: '2020-10-19'
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

`gist:adrianmarkperea/3e9c4b794fd7e6f8a9506a560cc234ae#function_argument.py`

Here, `say_to_bob` is accepting a function parameter fun. We can then use this by passing `say_hello` and `say_goodbye` as arguments to `say_to_bob`.

Seeing this in action:

`gist:adrianmarkperea/0b91d1e8a505ea3917899b85c8dd7074#function_args_out.py`

Note that when we pass functions as arguments, we don’t include the parentheses. If we do, Python evaluates the function *before* it gets passed. Often it is easy to spot, since calling the function without the proper arguments will lead to errors:

`gist:adrianmarkperea/e401e19cacc2e1104e2833dca7f6d7ca#function_args_error.py`

This satisfies the first condition for a higher-order function.

Now, let’s change the code above to satisfy the second condition:

`gist:adrianmarkperea/246efefc1f919fa35661252a0d497312#higher_order.py`

The `get_greeting` function returns a different greeting function depending on the greeting argument. say_to_bobcalls this function and gets a reference to the appropriate greeting function. It then calls this function with Bob.

We get the same output:

`gist:adrianmarkperea/4601fc53cf442193eb2460f27298fe22#higher_order_out.py`

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

`gist:adrianmarkperea/2b7e6dded10b778b843963bddab2369a#function_transform.py`

Can you see what happened? Let’s look at the output:

`gist:adrianmarkperea/e80f3d3a0507a31536294c82410a3ede#function_transform_out.py`

Note that we aren’t doing anything new here. This is the same concept of higher-order functions but in a different pattern.

We did the transformation of `walkout` in this line:

`gist:adrianmarkperea/64d5fc64afd42748e5a91134250db055#transformation.py`

From here, the function `walkout` no longer points to the original function definition. It now points to the `wrapper` function which has refers to our original function:

`gist:adrianmarkperea/0ed8994507db3c27565bf6a74e9abd1f#transformation_reference.py`

## The @-syntax (Read: Pie-decorator-syntax)

![Source: [Pixabay](https://pixabay.com/photos/apple-pie-autumn-dessert-cake-4464826/)](https://cdn-images-1.medium.com/max/2000/0*9EByYvnh0Y4F_ZqG.jpg)*Source: [Pixabay](https://pixabay.com/photos/apple-pie-autumn-dessert-cake-4464826/)*

As you might have observed, writing function transformations is quite cumbersome. From the simple example above, we had to write `walkout` three times to transform it.

To simplify this pattern, the Python team introduced the @-syntax. Let’s see how we can use it to simplify our code above:

`gist:adrianmarkperea/67917f7568e4211b627d52cc3fa4b61c#decorator.py`

If you run it, you will get the same results as before:

`gist:adrianmarkperea/e80f3d3a0507a31536294c82410a3ede#function_transform_out.py`


Much better! Behind the scenes, what the @-syntax does is the following modification:

`gist:adrianmarkperea/c0c1b0cd1fd5d4f1020b9235d4b9d891#transformation_line.py`

`@debug_transformer` is a simplified version of `walkout=debug_transformer(walkout)`. This makes it easier to read code since the decorator and function definition are in the same place. Neat!

## Vanishing Return Values

What happens if we apply our decorator to a function with a return value?

`gist:adrianmarkperea/9e516cfc089519ebcad60a7f860a69bc#transformation_with_ret.py`

Which outputs:

`gist:adrianmarkperea/3346196d553a55380ca06f38df7f8070#vanishing_ret_out.py`

The decoration works, but we have no more reference to the return value of the original function. To make this work, change the wrapperfunction to return the results of the original function:

`gist:adrianmarkperea/79e718de0c1f0d0e3d890a43920b8232#vanishing_ret_fixed.py`

We now get our expected output:

`gist:adrianmarkperea/35a72de1b2464616175c9168977c629c#vanishing_ret_fixed_out.py`

## Decorating Functions with Arguments

Will our decorator still work if we decorate a function with an argument?

`gist:adrianmarkperea/53150707b955edfa80d55f895eced0cf#decorating_with_args.py`

This gives us the following error:

`gist:adrianmarkperea/7fb31814eeda280d75a6279d7d50eb53#decorating_with_args_err.py`

The problem occurs because the wrapper function is *not* expecting any arguments. To fix this, we can change it to receive a single argument so our walkout function won’t complain. However, doing so limits the use of our decorator to functions that *only* receive one argument. We need a generalized solution.

We can change wrapper to receive an arbitrary number of arguments using `*args` and `**kwargs`. By doing so, we can support functions with *any* number of arguments:

`gist:adrianmarkperea/617c7ef333e47df23823d7e99cd83557#decorating_with_args_fixed.py`

Try it out!

`gist:adrianmarkperea/5c32af478b0d4e9bc1904b91820e294c#decorating_with_args_fixed_out.py`

Great! It works. You can experiment and see that this solution for functions with any number of arguments.

## A Couple More Examples

You can see that there is no magic involved in creating decorators. Knowing this, your creativity is the only limit in designing them!

Here are a couple of examples for inspiration:

### Calling a function many times

In this example, the original function is called many times inside the wrapper. The final function call receives the result and returns it.

`gist:adrianmarkperea/f2c0b421755ae4a8f3c8c0d443c9b957#call_three_times_dec.py`

### Timing a function

Sometimes we want to note how long a function takes to run. We can do this effortlessly with decorators:

`gist:adrianmarkperea/6faba6404880a6ae67f20a37b48a9eb8#waste_time.py`

Simple yet effective! You will see in the next section that decorators gain even more power when used with external libraries.

## Decorating External Functions

How can we apply decorators to external functions if we can’t use the @-syntax to decorate them?

At the start of the article, we created decorators by calling function transforms directly on the functions. We can do the same thing to external functions! Say we want to apply our `time_it` decorator to the `np.sort` function. We can do the following:

`gist:adrianmarkperea/2c2d2d9639ab80c6ad0e4a6da2d88ead#decorating_externals_functions.py`

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