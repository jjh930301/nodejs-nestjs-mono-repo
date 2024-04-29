export const promiseProps = async <T>(obj: {
  [K in keyof T]: Promise<T[K]> | T[K];
}): Promise<{ [K in keyof T]: Awaited<T[K]> }> => {
  const result = {} as { [K in keyof T]: Awaited<T[K]> };
  const resolvedValues = (await Promise.all(Object.values(obj))) as Awaited<
    T[keyof T]
  >[];
  const allKeys = Object.keys(obj) as (keyof T)[];

  for (let i = 0; i < resolvedValues.length; i += 1) {
    const key = allKeys[i];
    const val = resolvedValues[i];
    result[key] = val;
  }

  return result;
};
