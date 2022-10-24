# start new project
- creates git repo, cargo.toml and /src
`$ cargo new <project-name>`

- creates a cargo.lock file
`$ cargo update` 


# compile and run with cargo
- cargo is the package manager. technically can do these steps with just `rustc` but not for 
larger programs

- after cargo new, run `cargo build` in same directory to compile the program
- then can run `cargo run` to run the compiled code. note this is for development. 
	- it looks like cargo run does compile new changes to existing files, not sure if it would also for new files


# add dependencies
- depenency libraries are called "crates"

- Automatically add a dependency
```
$ cargo add serde_json
```



Manual way, seems useful if you need specific version? 
- add each dependency in Cargo.toml. the Cargo.lock will update on `cargo update`
- go to crates.io to see package version

# Install a binary  
- note this will be installed at the root directory witht the "Default location is $HOME/.cargo/bin"
	 - seems nice for when you want to run a crate/binary anywhere (like a cli app)
```
$ cargo install crate
```

# format entire project

```
$ cargo fmt
```

# macros
- _mostsly_ built in functions that make life easier, also denoted by an exclamation mark at the end of the function name (when called)
 


# Error handling
- allows and almost forces you to build error handling while coding

# Testing
- tests can be in the same file as the production code, and tests are built in


# To Learn
- how to have multiple files, I believe it has to do with modules, but there are multiple ways of doing so

- how to do nothng during a match if the result is None
```rust
if authors.contains_key(&"Kafka"){
        let the_franz = authors.get(&"Kafka");
        match the_franz {
        Some(x) => println!("Franz Kafka iis the shit"),
        // I'd like to do nothing if it's none, how do I do that?
        None => println!("{}", json["array0")
        }

```

- the difference between 'std' and 'core' libraries

### probably already figured out:
- how to do ranges in arrays? it's not this [start..stop], that is for slices like 
let x = [0,1,2,3,4]
let y = &x[0..2] // not inclusive
	- could it be in a vec!()?

- this is how you do ranges, and then can filter/reduce
      let v: Vec<i32> = (1..).filter(|x| x % 2 == 0).take(5).collect();
