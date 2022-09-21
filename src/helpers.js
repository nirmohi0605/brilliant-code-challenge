export function getCommand(inputLine) {
  let commandArr = inputLine.split(" ");
  return [commandArr[0], commandArr.slice(1)];
}

export function convertNumberToDollarString(num) {
  return `$${num}`;
}

export function capitalizeFirstLetter(word) {
  return word[0].toUpperCase() + word.slice(1);
}

export function removeTrailingComma(str) {
  return str.replace(/,(\s+)?$/, "");
}
