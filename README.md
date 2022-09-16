## Setup

1. Make sure your local node version supports ESM modules used in this project. I used `v16.13.1` but anything above `v12.17.0` should be supported.
2. At the root of the project run the following

```bash
=> npm install
=> sudo npm link # use sudo or give permissions for the executable file to run and to be called anywhere using the keyword 'league'
```

3. This CLI app supports input provided in the following ways:

a) via stdin (pipe or redirect) if no input argument is provided:

```bash
=> echo "Santa Cruz Slugs 0, Capitol Seahorses 0" | league  #pipe
=> league < ./inputs/sample-input.txt # redirect
```

b) as file path if the first argument is provided

```bash
  => league ./inputs/sample-input.txt
```

c) If a user tries to run the app without any input, the program prompts correct usage by printing it to the console.

```bash
=> league  # no input provided by the user
USAGE:
filepath:	league <filepath>
redirection:	league < <filepath>
pipe:	<input> | league
```

4. To run the tests

```
=> npm test
```

## Design

### Assumptions

After going through the prompt, the following assumptions were made about the system:

- Each product and its price is registered only once into the system using the `register` command
- All items and customers have distinct names
- the input format stays consistent throughout the program

### Logic/ Data Flow

### Testing

- The tests test the application by mimicking how a user would use the CLI. Text files for the test cases are in the `/inputs` folder - and fixtures were created for each of these cases by reading the file in and converting the contents into a string which is consumed by the tests via stdin.
- The library `mock-stdin` is being used for this purpose and the output is being tested by creating a mock implementation of `console.log` using jest spies.

## Improvements

- Implement an async readline mock to test running the app by taking in input files as a command line argument
- Load test the application by generating larger inputs.
