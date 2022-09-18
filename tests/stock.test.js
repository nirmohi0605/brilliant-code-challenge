import { stdin as mockStdin } from "mock-stdin";
import wait from "waait";
import { stock } from "../src/stock";
import { sampleInput } from "./fixtures/inputs.js";
import fs from "fs";

describe("Process inventory transactions", () => {
  const outputFiles = [];
  // afterAll(() => {
  //   outputFiles.forEach((file) =>
  //     fs.unlinkSync(file, (err) => {
  //       if (err) {
  //         console.log(file);
  //         console.log(err);
  //       }
  //     })
  //   );
  // });
  it("should process given sample input from stdin and print the correct stock", async () => {
    const stdin = mockStdin();
    let output = `tests/test-outputs/myreport.txt`;
    outputFiles.push(output);
    stock(output);
    await wait();
    stdin.send(sampleInput);
    stdin.send(null);
  });
});
