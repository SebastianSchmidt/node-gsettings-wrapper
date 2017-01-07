export function transformOutputToArray(output) {
  return output.toString().split("\n").filter((value) => {
    return value !== "";
  });
}
