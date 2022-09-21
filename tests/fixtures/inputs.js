import fs from "fs";

export const sampleInput = fs
  .readFileSync("./inputs/sample_input.txt")
  .toString("utf-8");

export const allInvalidCommands = fs
  .readFileSync("./inputs/all_invalid_commands.txt")
  .toString("utf-8");

export const largerSampleInput = fs
  .readFileSync("./inputs/larger_sample_input.txt")
  .toString("utf-8");

export const someInvalidCommands = fs
  .readFileSync("./inputs/some_invalid_commands.txt")
  .toString("utf-8");
