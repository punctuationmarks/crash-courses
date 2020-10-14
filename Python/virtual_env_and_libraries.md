# Want to know a specific version of library/module being used?

- Brute force/return all:
```
$ pip3 freeze
```

- Specifc library
```
$ pip3 freeze | grep matplotlib

```

- Pythonic way with dunder methods from the terminal
```
$ python3 -c "import matplotlib; print(matplotlib.__version__)"

```

- Pythonic way with dunder methods inside .py file (or easier is .ipynb file)

```

matplotlib.__version__

```
