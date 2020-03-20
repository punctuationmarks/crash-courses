

- Never pass mutable data structures as default arguments
	- i.e. if you have a list as a parameter set it to None if you're 
	allowing it to be a null value, then have an if/else statement
	setting it to an empty list if nothing is passed
	```
	def __init__(list_x = None):
		if list_x is None:
			list_x = []
		else:
			self.list_x = list_x
	```
