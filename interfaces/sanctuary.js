declare module 'sanctuary' {
  declare function S<a, b, c>
    (f: (a: a) => (b: b) => c): (g: (a: a) => b) => (a: a) => c;
  declare function K<a, b>
    (a: a): (b: b) => a
  declare function compose<a, b, c>
    (f: (b: b) => c): (g: (a: a) => b) => (a: a) => c
  declare function pipe
    (fns: Function[]): Function
}