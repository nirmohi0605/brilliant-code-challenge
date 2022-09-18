import InputParser from "./InputParser.js";
import StockHandler from "./StockHandler.js";

export async function stock(outputFilePath = "") {
  let readInterface;
  const inputParser = new InputParser();
  try {
    if (process.stdin.isTTY) {
      const [, , filepath] = process.argv;
      if (!filepath) {
        usage();
        return;
      }
      readInterface = await inputParser.getReadInterface(filepath);
    } else {
      readInterface = await inputParser.getReadInterface();
    }
    const stockHandler = new StockHandler();

    readInterface
      .on("line", (line) => {
        const [command, commandPayload] =
          inputParser.parseCommandFromInput(line);
        if (command && commandPayload)
          stockHandler.executeCommand(command, commandPayload);
      })
      .on("close", () => {
        stockHandler.generateOutputFile(outputFilePath);
      });
  } catch (e) {
    console.error(e);
    usage();
  }
}

function usage() {
  console.log(`USAGE:`);
  console.log(
    `filepath:\tstock <filepath>\nredirection:\tstock < <filepath>\npipe:\t<input> | stock`
  );
}
