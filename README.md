## Setup

1. Make sure your local node version supports ESM modules used in this project. I used `v16.13.1` but anything above `v12.17.0` should be supported.
2. At the root of the project run the following

```bash
=> npm install
=> sudo npm link # use sudo or give permissions for the executable file to run and to be called anywhere using the keyword 'stock'
```

3. This CLI app supports input provided in the following ways:

a) via stdin (pipe or redirect) if no input argument is provided:

```bash
=> echo "order kate hats 20" | stock  # pipe
=> stock < ./inputs/sample_input.txt # redirect
```

b) as file path if the first argument is provided

```bash
  => stock ./inputs/sample_input.txt
```

c) If a user tries to run the app without any input, the program prompts correct usage by printing it to the console.

```bash
=> stock  # no input provided by the user
USAGE:
filepath:	stock <filepath>
redirection:	stock < <filepath>
pipe:	<input> | stock
```

4. To run the tests

```bash
=> npm test
```

## Design

### Assumptions

After going through the prompt, the following assumptions were made about the system:

- Each product and its price is registered only once into the system using the `register` command
- All items and customers have distinct names
- the input format stays consistent throughout the program
- any input lines starting with invalid commands are ignored

### Logic/ Data Flow

- The `InputParser` class processes the provided input line by line asyncronously using Node's `readline` module and process it if the command is valid. Invalid input lines are skipped.
- Each command is then processed by the `StockHandler` class.
- The `StockHandler` class keeps a tally of the orders (using the class `Order`), inventory, products (class `Product`) and customers and also handles the output report generation when the input stream ends. The reports are stores in the `/reports` folder.
- The `Customer` class handles calculation of avg order value and spending calculations per customer

### Testing

- The tests test the application by mimicking how a user would use the CLI. Text files for the test cases are in the `/inputs` folder - and fixtures were created for each of these cases by reading the file in and converting the contents into a string which is consumed by the tests via stdin.
- The library `mock-stdin` is being used for this purpose and the log output to the console in case of an invalid command is being tested by creating a mock implementation of `console.log` using jest spies.

## Improvements

- Load test the application by generating larger inputs
- Process product pricing in cents, to mimic real world processing
