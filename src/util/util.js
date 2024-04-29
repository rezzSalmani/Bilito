export function removeIdentifierFromSingUpForm(inputObject) {
  const resultObject = {};
  for (const key in inputObject) {
    if (key.includes("_")) {
      const lastUnderscoreIndex = key.lastIndexOf("_");
      const newKey = key.slice(lastUnderscoreIndex + 1);
      resultObject[newKey] = inputObject[key];
    } else {
      resultObject[key] = inputObject[key];
    }
  }
  return resultObject;
}