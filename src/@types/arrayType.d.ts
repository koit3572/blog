export type Lengthlimit<
  T,
  N extends number,
  R extends readonly T[] = []
> = R["length"] extends N ? R : Lengthlimit<T, N, readonly [T, ...R]>;
