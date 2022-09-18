import fs from "fs";

export const sampleInput = fs
  .readFileSync("./inputs/sample_input.txt")
  .toString("utf-8");

// export const interruptedInput = fs
//   .readFileSync("./inputs/interrupted-day.txt")
//   .toString("utf-8");

// export const twoTeamsOnlyInput = fs
//   .readFileSync("./inputs/two-teams.txt")
//   .toString("utf-8");

// export const inputWithInvalidLines = fs
//   .readFileSync("./inputs/invalid-games.txt")
//   .toString("utf-8");

// export const alphabeticalTie = fs
//   .readFileSync("./inputs/alphabetical-tie.txt")
//   .toString("utf-8");
