export function coalesceArray<Type>(input: Type | Type[]): Type[] {
  console.log(input);
  if (!input) {
    return [];
  } else if (Array.isArray(input)) {
    return input;
  } else {
    return [input];
  }
}
