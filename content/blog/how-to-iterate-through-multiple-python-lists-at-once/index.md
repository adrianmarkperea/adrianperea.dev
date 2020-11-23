---
title:  'How to Iterate Through Multiple Python Lists at Once'
description:  'How to treat multiple lists as one unit'
date:  '2020-11-23'
image:  'https://cdn.pixabay.com/photo/2018/06/19/15/52/zipper-3484702_1280.jpg'
---

The Python [zip](https://docs.python.org/3.3/library/functions.html#zip) built-in function makes it easy to iterate through multiple iterables all at once. It aggregates elements from each iterable to create an iterator of tuples. The *i-th* tuple contains the *i-th* element of each of the constituent iterables. For example:

```python
>>> x = [1, 2, 3]
>>> y = ['a', 'b', 'c']
>>> zipped = zip(x, y)
>>> for x, y in zipped:
...    print(x, y)
...
1 a
2 b 
3 c
```
## Getting the zipped elements as a list
The `zip` function returns a -- wait for it -- `zip` object. You can confirm this by printing the `zipped` variable out in the console. You should see something like this:

```python
>>> zipped = zip(x, y)
>>> zip
<zip object at ox7f45ddba2c08>
```

To convert it into a `list` you can manipulate, you use the very aptly named `list` function like so:

```python
>>> list(zipped)
[(1, 'a'), (2, 'b'), (3, 'c')]
``` 

## Unzipping a zip object
If for any reason you need to reverse a `zip` operation, you can do so with the `zip` function, in conjunction with the destructuring operator (`*`). This will return the original iterables as tuples:

```python
>>> x = [1, 2, 3]
>>> y = ['a', 'b', 'c']
>>> x2, y2 = zip(*zip(x, y))
>>> x == list(x2) and y == list(y2)
True 
```

## Zipping unequal list lengths
Zipping unequal list lengths causes the elements of the longer lists to be dropped:
```python
>>> x = [1, 2, 3]
>>> y = ['a', 'b', 'c', 'd']
>>> list(zip(x, y))
[(1, 'a'), (2, 'b'), (3, 'c')]
```

Fortunately, we can use the [itertools.zip_longest](https://docs.python.org/3.3/library/itertools.html#itertools.zip_longest) function to solve this. `zip_longest` takes iterables as paramaters like `zip`, but with an additional `fillvalue` parameter which substitutes for missing values. It defaults to `None`. Here's how you use it:

```python
>>> from itertools import zip_longest
>>> x = [1, 2, 3]
>>> y = ['a', 'b', 'c', 'd']
>>> list(zip_longest(x, y))
[(1, 'a'), (2, 'b'), (3, 'c'), (None, 'd')
``` 

And with a `fillvalue`:
```python
>>> list(zip_longest(x, y, fillvalue=-1))
[(1, 'a'), (2, 'b'), (3, 'c'), (-1, 'd')]
```

 As you can see, with Python, it's very simple to iterate over multiple lists at once. 

## Further Reading
+ The official documentation for [zip](https://docs.python.org/3.3/library/functions.html#zip)
+ The official documentation for [itertools](https://docs.python.org/3.3/library/itertools.html#itertools.zip_longest)
+ How to use the [enumerate](https://www.adrianperea.dev/better-python-for-loops-using-enumerate/)
