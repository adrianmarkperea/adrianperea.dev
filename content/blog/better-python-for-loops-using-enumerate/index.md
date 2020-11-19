---
title: 'Better Python for Loops Using enumerate'
description: 'Get the item and index in one go'
date: '2020-11-19'
---

It's a common use case to iterate over a list together with its index. Traditionally, this has been done by using a `for` loop, utilizing `range` and `len` to create a list of indices. The items of the list then are accessed using `[]` notation, like so:
```python
shopping_cart = ['apple', 'cereal', 'banana', 'cola']

for i in range(len(shopping_cart)):
    print(f'{i}: {shopping_cart[i]}')

# 0 apple
# 1 cereal
# 2 banana
# 3 cola
```
But this solution is very imperative, reminiscent of older programming languages. We have a better, more pythonic solution.

Using the `enumerate` keyword, we can get an iterator that already gives both the item and index of the list. Using this, we can simplify the above code as follows:

```python
shopping_cart = ['apple', 'cereal', 'banana', 'cola']

for i, item in enumerate(shopping_cart):
	print(f'{i}: {item}')

# 0 apple
# 1 cereal
# 2 banana
# 3 cola
```
I personally think that this solution is cleaner, more elegant, and simpler to write. 
