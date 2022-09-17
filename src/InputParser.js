import readline from "readline";
import fs from "fs";
import { getCommand } from "./helpers.js";

export default class InputParser {
  async getReadInterface(filepath = "") {
    const readInput =
      filepath.length > 0 ? fs.createReadStream(filepath) : process.stdin;
    try {
      const rl = readline.createInterface({
        input: readInput,
        output: process.stdout,
        crlfDelay: Infinity,
        terminal: false,
      });
      return rl;
    } catch (err) {
      console.error(err);
    }
  }

  parseCommandFromInput(inputLine) {
    if (this.isInputValid(inputLine)) {
      return getCommand(inputLine);
    }
    return null;
  }

  isInputValid(inputLine) {
    // return validInputLineRegex.test(inputLine);

    //@TODO: do we write separate regexes for the two input formats?
    return true;
  }
}
