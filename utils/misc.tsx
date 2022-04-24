export function coalesceArray<Type>(input: Type | Type[]): Type[] {
  return Array.isArray(input) ? input : [input];
}
