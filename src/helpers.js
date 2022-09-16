export function getCommand(inputLine) {
  let commandArr = inputLine.split(" ");
  return [commandArr[0], commandArr.slice(1)];
}

export function convertNumberToDollarString(num) {
  return `$${num}`;
}

// export const validInputLineRegex
