export function transformOutputToArray(output) {

  if (output === null || output === undefined) {
    return [];
  }

  return output.toString().split("\n").filter((value) => {
    return value !== "";
  });

}
