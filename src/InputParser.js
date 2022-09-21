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
    let validCommands = ["register", "order", "checkin"];
    const command = getCommand(inputLine);
    if (validCommands.includes(command[0])) return command;
    return null;
  }

  // isInputValid(inputLine) {
  //   console.log(inputLine, validCommandRegex.test(testRegex));
  //   return true;
  // }
}
