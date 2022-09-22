import { stdin as mockStdin } from "mock-stdin";
import wait from "waait";
import { stock } from "../src/stock";
import {
  sampleInput,
  allInvalidCommands,
  largerSampleInput,
  someInvalidCommands,
} from "./fixtures/inputs.js";
import jest from "jest-mock";
import fs from "fs";
import assert from "assert";

describe("Process inventory transactions", () => {
  const outputFiles = [];
  beforeAll(() => {
    jest.spyOn(console, "log").mockImplementationOnce(() => {});
  });

  afterEach(() => {
    console.log.mockClear();
  });

  afterAll(async () => {
    await wait();
    outputFiles.forEach((file) =>
      fs.unlinkSync(file, (err) => {
        if (err) {
          console.log(err);
        }
      })
    );
  });

  it("should process given sample input from stdin and print the correct stock", async () => {
    const stdin = mockStdin();
    let output = `tests/test-outputs/report.txt`;
    outputFiles.push(output);
    stock(output);
    await wait();
    stdin.send(sampleInput);
    stdin.send(null);

    const genOutput = fs.readFileSync(
      "tests/expected-outputs/expected_report.txt",
      "utf-8"
    );
    await wait(5);
    const reportContent = fs.readFileSync(output, "utf-8");

    assert.equal(genOutput, reportContent);
  });

  it("should process a larger sample input from stdin and print the correct stock values", async () => {
    const stdin = mockStdin();
    let output = `tests/test-outputs/report_larger.txt`;
    outputFiles.push(output);
    stock(output);
    await wait();
    stdin.send(largerSampleInput);
    stdin.send(null);

    const expectedOutput = fs.readFileSync(
      "tests/expected-outputs/expected_report_larger.txt",
      "utf-8"
    );

    await wait(5);
    const generatedOutput = fs.readFileSync(output, "utf-8");

    assert.equal(expectedOutput, generatedOutput);
  });

  it("should process an input with all invalid commands", async () => {
    const stdin = mockStdin();
    let output = `tests/test-outputs/report_all_invalid.txt`;
    outputFiles.push(output);
    stock(output);
    await wait();
    stdin.send(allInvalidCommands);
    stdin.send(null);

    expect(console.log).toBeCalledTimes(8);
    const expectedOutput = fs.readFileSync(
      "tests/expected-outputs/expected_report_all_invalid.txt",
      "utf-8"
    );

    await wait(5);
    const generatedOutput = fs.readFileSync(output, "utf-8");

    assert.equal(expectedOutput, generatedOutput);
  });

  it("should process given sample input with some invalid lines from stdin and print the correct stock", async () => {
    const stdin = mockStdin();
    let output = `tests/test-outputs/report_some_invalid.txt`;
    outputFiles.push(output);
    stock(output);
    await wait();
    stdin.send(someInvalidCommands);
    stdin.send(null);

    expect(console.log).toBeCalledTimes(2);

    const expectedOutput = fs.readFileSync(
      "tests/expected-outputs/expected_report.txt",
      "utf-8"
    );

    await wait(5);
    const generatedOutput = fs.readFileSync(output, "utf-8");

    assert.equal(expectedOutput, generatedOutput);
  });
});
