/* @flow */

type UnaryFn<A,R> = (a: A) => R
type BinaryFn<A,B,R> = ((a: A, b: B) => R) & ((a:A) => (b: B) => R)

type UnarySameTypeFn<T> = UnaryFn<T,T>
type BinarySameTypeFn<T> = BinaryFn<T,T,T>

interface ObjPredicate {
  (value: any, key: string): boolean;
}

interface Functor<A> {
  map<A,B>(fn:(a: A) => B): B;
}

type UnaryPredicateFn<T> = (x:T) => boolean
type BinaryPredicateFn<T> = (x:T, y:T) => boolean
type Lens<s, a> = (f: (a: a) => Functor<a>) => (s: s) => Functor<s>

declare class Composition {
  pipe<A,B,C,D,E,F,G>(ab: UnaryFn<A,B>, bc: UnaryFn<B,C>, cd: UnaryFn<C,D>, de: UnaryFn<D,E>, ef: UnaryFn<E,F>, fg: UnaryFn<F,G>, ...rest: Array<void>): UnaryFn<A,G>;
  pipe<A,B,C,D,E,F>(ab: UnaryFn<A,B>, bc: UnaryFn<B,C>, cd: UnaryFn<C,D>, de: UnaryFn<D,E>, ef: UnaryFn<E,F>, ...rest: Array<void>): UnaryFn<A,F>;
  pipe<A,B,C,D,E>(ab: UnaryFn<A,B>, bc: UnaryFn<B,C>, cd: UnaryFn<C,D>, de: UnaryFn<D,E>, ...rest: Array<void>): UnaryFn<A,E>;
  pipe<A,B,C,D>(ab: UnaryFn<A,B>, bc: UnaryFn<B,C>, cd: UnaryFn<C,D>, ...rest: Array<void>): UnaryFn<A,D>;
  pipe<A,B,C>(ab: UnaryFn<A,B>, bc: UnaryFn<B,C>, ...rest: Array<void>): UnaryFn<A,C>;
  pipe<A,B>(ab: UnaryFn<A,B>, ...rest: Array<void>): UnaryFn<A,B>;
  compose<A,B,C,D,E,F,G>(fg: UnaryFn<F,G>, ef: UnaryFn<E,F>, de: UnaryFn<D,E>, cd: UnaryFn<C,D>, bc: UnaryFn<B,C>, ab: UnaryFn<A,B>, ...rest: Array<void>): UnaryFn<A,G>;
  compose<A,B,C,D,E,F>(ef: UnaryFn<E,F>, de: UnaryFn<D,E>, cd: UnaryFn<C,D>, bc: UnaryFn<B,C>, ab: UnaryFn<A,B>, ...rest: Array<void>): UnaryFn<A,F>;
  compose<A,B,C,D,E>(de: UnaryFn<D,E>, cd: UnaryFn<C,D>, bc: UnaryFn<B,C>, ab: UnaryFn<A,B>, ...rest: Array<void>): UnaryFn<A,E>;
  compose<A,B,C,D>(cd: UnaryFn<C,D>, bc: UnaryFn<B,C>, ab: UnaryFn<A,B>, ...rest: Array<void>): UnaryFn<A,D>;
  compose<A,B,C>(bc: UnaryFn<B,C>, ab: UnaryFn<A,B>, ...rest: Array<void>): UnaryFn<A,C>;
  compose<A,B>(ab: UnaryFn<A,B>, ...rest: Array<void>): UnaryFn<A,B>;
}

interface CurriedFunction2<T1, T2, R> {
  (t1: T1): (t2: T2) => R;
  (t1: T1, t2: T2): R;
}

interface CurriedFunction3<T1, T2, T3, R> {
  (t1: T1): CurriedFunction2<T2, T3, R>;
  (t1: T1, t2: T2): (t3: T3) => R;
  (t1: T1, t2: T2, t3: T3): R;
}

interface CurriedFunction4<T1, T2, T3, T4, R> {
  (t1: T1): CurriedFunction3<T2, T3, T4, R>;
  (t1: T1, t2: T2): CurriedFunction2<T3, T4, R>;
  (t1: T1, t2: T2, t3: T3): (t4: T4) => R;
  (t1: T1, t2: T2, t3: T3, t4: T4): R;
}

interface CurriedFunction5<T1, T2, T3, T4, T5, R> {
  (t1: T1): CurriedFunction4<T2, T3, T4, T5, R>;
  (t1: T1, t2: T2): CurriedFunction3<T3, T4, T5, R>;
  (t1: T1, t2: T2, t3: T3): CurriedFunction2<T4, T5, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): (t5: T5) => R;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R;
}

interface CurriedFunction6<T1, T2, T3, T4, T5, T6, R> {
  (t1: T1): CurriedFunction5<T2, T3, T4, T5, T6, R>;
  (t1: T1, t2: T2): CurriedFunction4<T3, T4, T5, T6, R>;
  (t1: T1, t2: T2, t3: T3): CurriedFunction3<T4, T5, T6, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): CurriedFunction2<T5, T6, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): (t6: T6) => R;
  (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): R;
}

declare class Curry {
  curry<T1, T2, TResult>(fn: (a: T1, b: T2) => TResult): CurriedFunction2<T1,T2, TResult>;
  curry<T1, T2, T3, TResult>(fn: (a: T1, b: T2, c: T3) => TResult): CurriedFunction3<T1,T2, T3, TResult>;
  curry<T1, T2, T3, T4, TResult>(fn: (a: T1, b: T2, c: T3, d: T4) => TResult): CurriedFunction4<T1,T2, T3, T4, TResult>;
  curry<T1, T2, T3, T4, T5, TResult>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5) => TResult): CurriedFunction5<T1,T2, T3, T4, T5, TResult>;
  curry<T1, T2, T3, T4, T5, T6, TResult>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6) => TResult): CurriedFunction6<T1,T2, T3, T4, T5, T6, TResult>;
  curry(fn: Function): Function;
  curryN(length: number, fn: (...args: Array<any>) => any): Function;
}

// Math methods: done
declare class RMath {
  add: CurriedFunction2<number, number, number>;
  dec(a: number): number;
  divide: CurriedFunction2<number, number, number>;
  inc(a: number): number;
  mathMod: CurriedFunction2<number, number, number>;
  mean: UnaryFn<Array<number>,number>;
  median: UnaryFn<Array<number>,number>;
  modulo: CurriedFunction2<number, number, number>;
  multiply: CurriedFunction2<number, number, number>;
  negate(a: number): number;
  product: UnaryFn<Array<number>,number>;
  subtract: CurriedFunction2<number, number, number>;
  sum: UnaryFn<Array<number>,number>;
}

declare class Monad<T> {}
declare class Semigroup<T> {}

declare class Chain<T,V: Monad<T>|Array<T>> {
  chain: CurriedFunction2<(a:T) => V, V, V>;
}

declare class Concat {
  concat<V,T:Array<V>|string>(x: T, y: T): T;
  concat<V,T:Array<V>|string>(x: T): (y: T) => T;
}

declare class Filter {
  filter<K,V,T:Array<V>|{[key:K]:V}>(fn: UnaryPredicateFn<V>, xs:T): T;
  filter<K,V,T:Array<V>|{[key:K]:V}>(fn: UnaryPredicateFn<V>): (xs:T) => T;
  reject<K,V,T:Array<V>|{[key:K]:V}>(fn: UnaryPredicateFn<V>, xs:T): T;
  reject<K,V,T:Array<V>|{[key:K]:V}>(fn: UnaryPredicateFn<V>): (xs:T) => T
}

declare class Find {
  find<V,T:Array<V>>(fn: UnaryPredicateFn<V>, xs:T): ?V;
  find<V,T:Array<V>>(fn: UnaryPredicateFn<V>): (xs:T) => ?V;
  find<K,V,T:{[key:K]:V}>(fn: UnaryPredicateFn<V>, xs:T): ?{[key:K]:V};
  find<K,V,T:{[key:K]:V}>(fn: UnaryPredicateFn<V>): (xs:T) => ?{[key:K]:V};
  findLast<V,T:Array<V>>(fn: UnaryPredicateFn<V>, xs:T): ?V;
  findLast<V,T:Array<V>>(fn: UnaryPredicateFn<V>): (xs:T) => ?V;
  findLast<K,V,T:{[key:K]:V}>(fn: UnaryPredicateFn<V>, xs:T): ?{[key:K]:V};
  findLast<K,V,T:{[key:K]:V}>(fn: UnaryPredicateFn<V>): (xs:T) => ?{[key:K]:V};
  findIndex<K,V,T:Array<V>|{[key:K]:V}>(fn: UnaryPredicateFn<V>, xs:T): number;
  findIndex<K,V,T:Array<V>|{[key:K]:V}>(fn: UnaryPredicateFn<V>): (xs:T) => number;
  findLastIndex<K,V,T:Array<V>|{[key:K]:V}>(fn: UnaryPredicateFn<V>, xs:T): number;
  findLastIndex<K,V,T:Array<V>|{[key:K]:V}>(fn: UnaryPredicateFn<V>): (xs:T) => number;
}

declare class Drop {
  drop<V,T:Array<V>|string>(n: number, xs: T): T;
  drop<V,T:Array<V>|string>(n: number):(xs: T) => T;
  dropLast<V,T:Array<V>|string>(n: number, xs: T): T;
  dropLast<V,T:Array<V>|string>(n: number):(xs: T) => T;
  dropLastWhile<V,T:Array<V>>(fn: UnaryPredicateFn<V>, xs:T): T;
  dropLastWhile<V,T:Array<V>>(fn: UnaryPredicateFn<V>): (xs:T) => T;
  dropWhile<V,T:Array<V>>(fn: UnaryPredicateFn<V>, xs:T): T;
  dropWhile<V,T:Array<V>>(fn: UnaryPredicateFn<V>): (xs:T) => T;
  dropRepeats<V,T:Array<V>>(xs:T): T;
  dropRepeatsWith<V,T:Array<V>>(fn: BinaryPredicateFn<V>, xs:T): T;
  dropRepeatsWith<V,T:Array<V>>(fn: BinaryPredicateFn<V>): (xs:T) => T;
}

declare class RMap<T,R> {
  map<T,R>(fn: (x:T) => R, xs: Array<T>): Array<R>;
  map<T,R>(fn: (x:T) => R): (xs: Array<T>) => Array<R>;
  map<T,R>(fn: (x:T) => R, xs: Functor<T>): Functor<R>;
  map<T,R>(fn: (x:T) => R): (xs: Functor<T>) => Functor<R>;
  map<T,R>(fn: (x:T) => R, xs: {[key: string]: T}): {[key: string]: R};
  map<T,R>(fn: (x:T) => R): (xs: {[key: string]: T}) => {[key: string]: R};
}

declare class RReduce {
  reduce<T, TResult>(fn: (acc: TResult, elem: T) => TResult, acc: TResult, list: Array<T>): TResult;
  reduce<T, TResult>(fn: (acc: TResult, elem: T) => TResult): (acc: TResult, list: Array<T>) => TResult;
  reduce<T, TResult>(fn: (acc: TResult, elem: T) => TResult, acc: TResult): (list: Array<T>) => TResult;
  reduceRight<T, TResult>(fn: (acc: TResult, elem: T) => TResult, acc: TResult, list: Array<T>): TResult;
  reduceRight<T, TResult>(fn: (acc: TResult, elem: T) => TResult): (acc: TResult, list: Array<T>) => TResult;
  reduceRight<T, TResult>(fn: (acc: TResult, elem: T) => TResult, acc: TResult): (list: Array<T>) => TResult;
}

type NestedArray<T> = Array<T | NestedArray<T>>

declare class RList<T, S, R> {
  // adjust<T>(fn:(a: T) => T, ...rest: Array<void>): (index: number, src: Array<T>) => Array<T>; THIS MESSES UP THE CHECKER
  // Technically at this point the return function can be either of these.
  /*
  TODO:
    into
    allUniq
    into
    mapAccum
    mapAccumRight
    mergeAll
    nth
    pair
    partition
    pluck
    range
    reduced
    reduceBy
    reduceRight
    scan
    sequence
    splitAt
    splitEvery
    splitWhen
    take
    takeLast
    takeWhile
    takeLastWhile
    times
    transduce
    transpose
    traverse
    unfold
    unnest
    zipObj
    zipWith
  */
  adjust<T>(fn:(a: T) => T, ...rest: Array<void>): (index: number) => (src: Array<T>) => Array<T>;
  adjust<T>(fn:(a: T) => T, index: number, ...rest: Array<void>): (src: Array<T>) => Array<T>;
  adjust<T>(fn:(a: T) => T, index: number, src: Array<T>, ...rest: Array<void>): Array<T>;
  all<T>(fn: (a: T) => boolean, xs: Array<T>): boolean;
  all<T>(fn: (a: T) => boolean): (xs: Array<T>) => boolean;
  any<T>(fn: (a: T) => boolean, xs: Array<T>): boolean;
  any<T>(fn: (a: T) => boolean): (xs: Array<T>) => boolean;
  aperture<T>(n: number, xs: Array<T>): Array<Array<T>>;
  aperture<T>(n: number): (xs: Array<T>) => Array<Array<T>>;
  append<T>(x: T, xs: Array<T>): Array<T>;
  append<T>(x: T): (xs: Array<T>) => Array<T>;
  contains<T>(x:T, xs: Array<T>): boolean;
  contains<T>(x:T): (xs: Array<T>) => boolean;
  flatten<T>(xs: NestedArray<T>): Array<T>;
  forEach<T,V>(fn:(x:T) => ?V, xs: Array<T>): Array<T>;
  forEach<T,V>(fn:(x:T) => ?V): (xs: Array<T>) => Array<T>;
  fromPairs<T,V>(pair: Array<[T,V]>): {[key: string]:V};
  groupBy<T>(fn: (x: T) => string, xs: Array<T>): {[key: string]: Array<T>};
  groupBy<T>(fn: (x: T) => string): (xs: Array<T>) => {[key: string]: Array<T>};
  groupWith<T,V:Array<T>|string>(fn: BinaryPredicateFn<T>, xs: V): Array<V>;
  groupWith<T,V:Array<T>|string>(fn: BinaryPredicateFn<T>): (xs: V) => Array<V>;
  head<T,V:Array<T>>(xs: V): ?T;
  head<T,V:string>(xs: V): V;
  indexBy: CurriedFunction2<UnaryFn<T, string>, T[], {[key: string]: T}>;
  indexOf<T>(x: T, xs: Array<T>): number;
  indexOf<T>(x: T): (xs: Array<T>) => number;
  init<T,V:Array<T>|string>(xs: V): V;
  insert<T>(index: number, ...rest: Array<void>): (elem: T) => (src: Array<T>) => Array<T>;
  insert<T>(index: number, elem: T, ...rest: Array<void>): (src: Array<T>) => Array<T>;
  insert<T>(index: number, elem: T, src: Array<T>, ...rest: Array<void>): Array<T>;
  insertAll<T>(index: number, ...rest: Array<void>): (elem: Array<T>) => (src: Array<T>) => Array<T>;
  insertAll<T>(index: number, elems: Array<T>, ...rest: Array<void>): (src: Array<T>) => Array<T>;
  insertAll<T>(index: number, elems: Array<T>, src: Array<T>, ...rest: Array<void>): Array<T>;
  intersperse<T>(x: T, xs: Array<T>): Array<T>;
  intersperse<T>(x: T): (xs: Array<T>) => Array<T>;
  join(x: string, xs: Array<any>): string;
  join(x: string): (xs: Array<any>) => string;
  last<T,V:Array<T>>(xs: V): ?T;
  last<T,V:string>(xs: V): V;
  mergeAll(os: {}[]): {};
  lastIndexOf<T>(x: T, xs: Array<T>): number;
  lastIndexOf<T>(x: T): (xs: Array<T>) => number;
  length<T>(xs: Array<T>): number;
  lift: UnaryFn<Function, (...as: any[]) => any>;
  none<T>(fn: (a: T) => boolean, xs: Array<T>): boolean;
  none<T>(fn: (a: T) => boolean): (xs: Array<T>) => boolean;
  prepend<T>(x: T, xs: Array<T>): Array<T>;
  prepend<T>(x: T): (xs: Array<T>) => Array<T>;
  range: BinaryFn<number, number, number[]>;
  remove<T>(from: number, ...rest: Array<void>): (to: number) => (src: Array<T>) => Array<T>;
  remove<T>(from: number, to: number, ...rest: Array<void>): (src: Array<T>) => Array<T>;
  remove<T>(from: number, to: number, src: Array<T>, ...rest: Array<void>): Array<T>;
  repeat<T>(x: T, times: number): Array<T>;
  repeat<T>(x: T): (times: number) => Array<T>;
  reverse<T,V:Array<T>|string>(xs: V): V;
  slice<V,T:Array<V>|string>(from: number, ...rest: Array<void>): (to: number) => (src: T) => T;
  slice<V,T:Array<V>|string>(from: number, to: number, ...rest: Array<void>): (src: T) => T;
  slice<V,T:Array<V>|string>(from: number, to: number, src: T, ...rest: Array<void>): T;
  splitEvery: CurriedFunction2<number, T[], T[][]>;
  sort<V,T:Array<V>>(fn: BinaryPredicateFn<V>, xs:T): T;
  sort<V,T:Array<V>>(fn: BinaryPredicateFn<V>): (xs:T) => T;
  tail<T,V:Array<T>|string>(xs: V): V;
  uniq<T>(xs: Array<T>): Array<T>;
  uniqBy<T,V>(fn:(x: T) => V, xs: Array<T>): Array<T>;
  uniqBy<T,V>(fn:(x: T) => V): (xs: Array<T>) => Array<T>;
  uniqWith<T>(fn: BinaryPredicateFn<T>, xs: Array<T>): Array<T>;
  uniqWith<T>(fn: BinaryPredicateFn<T>): (xs: Array<T>) => Array<T>;
  update<T>(index: number, ...rest: Array<void>): (elem: T) => (src: Array<T>) => Array<T>;
  update<T>(index: number, elem: T, ...rest: Array<void>): (src: Array<T>) => Array<T>;
  update<T>(index: number, elem: T, src: Array<T>, ...rest: Array<void>): Array<T>;
  without<T>(xs: Array<T>, src: Array<T>): Array<T>;
  without<T>(xs: Array<T>): (src: Array<T>) => Array<T>;
  xprod<T,S>(xs: Array<T>, ys: Array<S>): Array<[T,S]>;
  xprod<T,S>(xs: Array<T>): (ys: Array<S>) => Array<[T,S]>;
  zip<T,S>(xs: Array<T>, ys: Array<S>): Array<[T,S]>;
  zip<T,S>(xs: Array<T>): (ys: Array<S>) => Array<[T,S]>;
  zipWith: CurriedFunction3<BinaryFn<T, S, R>, Array<T>, Array<S>, Array<R>>;
}

declare class RObject<s, a> {
  /**
   * TODO:
   * lens
   * lensIndex
   * lensPath
   * lensProp
   * over
   * set
   * view
   */
  assoc<T>(key: string, val:T, src: Object): Object;
  assoc<T>(key: string, val:T, ...args: Array<void>): (src: Object) => Object;
  assoc<T>(key: string, ...args: Array<void>): (val: T) => (src: Object) => Object;
  assocPath<T>(key: Array<string>, val:T, src: Object): Object;
  assocPath<T>(key: Array<string>, val:T, ...args: Array<void>): (src: Object) => Object;
  assocPath<T>(key: Array<string>, ...args: Array<void>): (val: T) => (src: Object) => Object;
  clone(src: Object): Object;
  dissoc<T>(key: string, val:T, src: Object): Object;
  dissoc<T>(key: string, val:T, ...args: Array<void>): (src: Object) => Object;
  dissoc<T>(key: string, ...args: Array<void>): (val: T) => (src: Object) => Object;
  dissocPath<T>(keys: Array<string>, val:T, src: Object): Object;
  dissocPath<T>(keys: Array<string>, val:T, ...args: Array<void>): (src: Object) => Object;
  dissocPath<T>(keys: Array<string>, ...args: Array<void>): (val: T) => (src: Object) => Object;
  eqProps(key: string, o1: Object, o2: Object): boolean;
  eqProps(key: string, o1: Object, ...args: Array<void>): (o2: Object) => boolean;
  eqProps(key: string, ...args: Array<void>): (o1: Object) => (o2: Object) => boolean;
  evolve<V>(fn:{[key: string]: (x:V) => any}, src: Object): Object;
  has(key: string, o: Object): boolean;
  has(key: string):(o: Object) => boolean;
  hasIn(key: string, o: Object): boolean;
  hasIn(key: string): (o: Object) => boolean;
  invert(o: Object): {[k: string]: Array<string>};
  invertObj(o: Object): {[k: string]: string};
  keys(o: Object): Array<string>;
  keysIn(o: Object): Array<string>;
  lens<s, a>(f: (s: s) => ?a): (g: ((a: a, s: s) => s)) => Lens<s, a>;
  lensIndex<s, a>(index: number): Lens<s, a>;
  lensPath<s, a>(path: string[]): Lens<s, a>;
  lensProp<s, a>(prop: string): Lens<s, a>;
  mapObjIndexed(fn: (val: any, key: string, o: Object) => any, o: {[key: string]: any}): {[key: string]: any};
  mapObjIndexed(fn: (val: any, key: string, o: Object) => any, ...args: Array<void>): (o: {[key: string]: any}) => {[key: string]: any};
  merge(o1: Object, o2: Object): Object;
  merge(o1: Object): (o2: Object) => Object;
  // mergeAll(o1: Array<Object>, o2: Object): Object;
  // mergeAll(o1: Array<Object>): Object;
  mergeWith(fn: (v1: any, v2: any) => any, o1: Object, o2: Object): Object;
  mergeWith(fn: (v1: any, v2: any) => any): (o1: Object, o2: Object) => Object;
  mergeWithKey(fn: (v0: string, v1: any, v2: any) => any, o1: Object, o2: Object): Object;
  mergeWithKey(fn: (v0: string, v1: any, v2: any) => any): (o1: Object, o2: Object) => Object;
  // objOf<T>(key: string, val: T): {[key: string]: T};
  // objOf<T>(key: string): (val: T) => {[key: string]: T};
  omit(keys: Array<string>, val: Object): Object;
  omit(keys: Array<string>): (val: Object) => Object;
  over: CurriedFunction3<Lens<s,a>, (a: a) => a, s, s>;
  path: CurriedFunction2<string[], {}, ?any>;
  pathOr<T>(or: T, p: Array<string>, o: Object): any|T;
  pathOr<T>(or: T, p: Array<string>): (o: Object) => any|T;
  pick(keys: Array<string>, val: {[key:string]: any}): {[key:string]: any};
  pick(keys: Array<string>): (val: {[key:string]: any}) => {[key:string]: any};
  pickAll(keys: Array<string>, val: {[key:string]: any}): {[key:string]: ?any};
  pickAll(keys: Array<string>): (val: {[key:string]: any}) => {[key:string]: ?any};
  pickBy(fn: (v: any, k: string) => boolean, val: {[key:string]: any}): {[key:string]: any};
  pickBy(fn: (v: any, k: string) => boolean): (val: {[key:string]: any}) => {[key:string]: any};
  project(keys: Array<string>, val: Array<{[key:string]: any}>): Array<{[key:string]: any}>;
  project(keys: Array<string>): (val: Array<{[key:string]: any}>) => Array<{[key:string]: any}>;
  prop(key: string, o: Object): ?any;
  prop(key: string): (o: Object) => ?any;
  propOr<T>(v: T, key: string, o: Object): any|T;
  propOr<T>(v: T, key: string): (o: Object) => any|T;
  propOr<T>(v: T): (key: string) => (o: Object) => any|T;
  props(keys: Array<string>, o: Object): Array<any>;
  props(keys: Array<string>): (o: Object) => Array<any>;
  set: CurriedFunction3<Lens<s, a>, a, s, s>;
  toPairs(o: Object): Array<[string, any]>;
  toPairsIn(o: Object): Array<[string, any]>;
  values(o: Object): Array<any>;
  valuesIn(o: Object): Array<any>;
  view<s, a>(lens: Lens<s, a>): (s: s) => a;
  view<s, a>(lens: Lens<s, a>, s: s): a;
  where(predObj: {[key: string]: UnaryPredicateFn<any>}, o: Object): boolean;
  where(predObj: {[key: string]: UnaryPredicateFn<any>}): (o: Object) => boolean;
  whereEq(predObj: Object, o: Object): boolean;
  whereEq(predObj: Object): (o: Object) => boolean;
}

// String methods: done
declare class RString {
  match(a: RegExp, s: string): Array<string|void>;
  match(a: RegExp): (s: string) => Array<string|void>;
  replace(a: RegExp|string): (s: string) => (src: string) => string;
  split(a: RegExp|string, s: string): Array<string>;
  split(a: RegExp|string): (s: string) => Array<string>;
  test(a: RegExp, s: string): boolean;
  test(a: RegExp): (s: string) => boolean;
  toLower(a: string): string;
  toString(a: any): string;
  toUpper(a: string): string;
  trim(a: string): string;
}

declare class RLogic<R, T> {
  allPass(fns: Array<(...args: Array<any>) => boolean>): (...args: Array<any>) => boolean;
  and(x: boolean, y: boolean): boolean;
  and(x: boolean): (y: boolean) => boolean;
  anyPass(fns: Array<(...args: Array<any>) => boolean>): (...args: Array<any>) => boolean;
  both(x: (...args: Array<any>) => boolean, y: (...args: Array<any>) => boolean): (...args: Array<any>) => boolean;
  both(x: (...args: Array<any>) => boolean): (y: (...args: Array<any>) => boolean) => (...args: Array<any>) => boolean;
  complement(x: (...args: Array<any>) => boolean): (...args: Array<any>) => boolean;
  cond(fns: Array<[(...args: Array<any>) => boolean, (...args: Array<any>) => any]>): (...args: Array<any>) => any;
  cond<T, R>(fns: [(t: T) => boolean, R][]): (t: T) => R;
  defaultTo<T,V>(d: T, x: ?V): V|T;
  defaultTo<T,V>(d: T): (x: ?V) => V|T;
  either(x: (...args: Array<any>) => boolean, y: (...args: Array<any>) => boolean): (...args: Array<any>) => boolean;
  either(x: (...args: Array<any>) => boolean): (y: (...args: Array<any>) => boolean) => (...args: Array<any>) => boolean;
  ifElse: CurriedFunction4<UnaryPredicateFn<T>, UnaryFn<T, R>, UnaryFn<T, R>, T, R>;
  isEmpty(x:Array<any>|Object|string): boolean;
  not(x:boolean): boolean;
  or(x: boolean, y: boolean): boolean;
  or(x: boolean): (y: boolean) => boolean;
  pathSatisfies(cond: (x: any) => boolean, path: Array<string>, o: Object): boolean;
  pathSatisfies(cond: (x: any) => boolean, path: Array<string>): (o: Object) => boolean;
  pathSatisfies(cond: (x: any) => boolean): (path: Array<string>, o: Object) => boolean;
  pathSatisfies(cond: (x: any) => boolean): (path: Array<string>) => (o: Object) => boolean;
  propSatisfies(cond: (x: any) => boolean, prop: string, o: Object): boolean;
  propSatisfies(cond: (x: any) => boolean, prop: string): (o: Object) => boolean;
  propSatisfies(cond: (x: any) => boolean): (prop: string, o: Object) => boolean;
  propSatisfies(cond: (x: any) => boolean): (prop: string) => (o: Object) => boolean;
  unless<T,V>(pred: UnaryPredicateFn<T>, fn: (x: T) => V, x: T): T|V;
  unless<T,V>(pred: UnaryPredicateFn<T>, fn: (x: T) => V): (x: T) => T|V;
  unless<T,V>(pred: UnaryPredicateFn<T>): (fn: (x: T) => V) => (x: T) => T|V;
  until<T>(pres: UnaryPredicateFn<T>, fn: (x:T) => T, x: T): T;
  until<T>(pres: UnaryPredicateFn<T>, fn: (x:T) => T): (x: T) => T;
  until<T>(pres: UnaryPredicateFn<T>): (fn: (x:T) => T, x: T) => T;
  until<T>(pres: UnaryPredicateFn<T>): (fn: (x:T) => T) => (x: T) => T;
  when<T>(pres: UnaryPredicateFn<T>, fn: (x:T) => T, x: T): T;
  when<T>(pres: UnaryPredicateFn<T>, fn: (x:T) => T): (x: T) => T;
  when<T>(pres: UnaryPredicateFn<T>): (fn: (x:T) => T, x: T) => T;
  when<T>(pres: UnaryPredicateFn<T>): (fn: (x:T) => T) => (x: T) => T;
}

declare class RRelation<T,V> {
  clamp<T:number|string|Date>(min: T, max: T, v: T): T;
  clamp<T:number|string|Date>(min: T, max: T): (v: T) => T;
  clamp<T:number|string|Date>(min: T): (max: T, v: T) => T;
  clamp<T:number|string|Date>(min: T): (max: T) => (v: T) => T;
  countBy<T>(fn: (x: T) => string, list: Array<T>): {[key: string]: number};
  countBy<T>(fn: (x: T) => string): (list: Array<T>) => {[key: string]: number};
  difference<T>(xs1: Array<T>, xs2: Array<T>): Array<T>;
  difference<T>(xs1: Array<T>): (xs2: Array<T>) => Array<T>;
  differenceWith<T>(fn: BinaryPredicateFn<T>, xs1: Array<T>, xs2: Array<T>): Array<T>;
  differenceWith<T>(fn: BinaryPredicateFn<T>): (xs1: Array<T>) => (xs2: Array<T>) => Array<T>;
  differenceWith<T>(fn: BinaryPredicateFn<T>): (xs1: Array<T>, xs2: Array<T>) => Array<T>;
  differenceWith<T>(fn: BinaryPredicateFn<T>, xs1: Array<T>): (xs2: Array<T>) => Array<T>;
  eqBy<T>(fn: (x: T) => T, x: T, y: T): boolean;
  eqBy<T>(fn: (x: T) => T): (x: T, y: T) => boolean;
  eqBy<T>(fn: (x: T) => T, x: T): (y: T) => boolean;
  eqBy<T>(fn: (x: T) => T): (x: T) => (y: T) => boolean;
  equals<T>(x: T, y: T): boolean;
  equals<T>(x: T): (y: T) => boolean;
  gt<T>(x: T, y: T): boolean;
  gt<T>(x: T): (y: T) => boolean;
  gte<T>(x: T, y: T): boolean;
  gte<T>(x: T): (y: T) => boolean;
  identical<T>(x: T, y: T): boolean;
  identical<T>(x: T): (y: T) => boolean;
  intersection<T>(x: Array<T>, y: Array<T>): Array<T>;
  intersection<T>(x: Array<T>): (y: Array<T>) => Array<T>;
  intersectionWith<T>(fn: BinaryPredicateFn<T>, x: Array<T>, y: Array<T>): Array<T>;
  intersectionWith<T>(fn: BinaryPredicateFn<T>): (x: Array<T>) => (y: Array<T>) => Array<T>;
  intersectionWith<T>(fn: BinaryPredicateFn<T>): (x: Array<T>, y: Array<T>) => Array<T>;
  intersectionWith<T>(fn: BinaryPredicateFn<T>, x: Array<T>): (y: Array<T>) => Array<T>;
  lt<T>(x: T, y: T): boolean;
  lt<T>(x: T): (y: T) => boolean;
  lte<T>(x: T, y: T): boolean;
  lte<T>(x: T): (y: T) => boolean;
  max<T>(x: T, y: T): T;
  max<T>(x: T): (y: T) => T;
  maxBy<T,V>(fn: (x:T) => V, x: T, y: T): T;
  maxBy<T,V>(fn: (x:T) => V): (x: T, y: T) => T;
  maxBy<T,V>(fn: (x:T) => V): (x: T) => (y: T) => T;
  maxBy<T,V>(fn: (x:T) => V, x: T): (y: T) => T;
  min<T>(x: T, y: T): T;
  min<T>(x: T): (y: T) => T;
  minBy<T,V>(fn: (x:T) => V, x: T, y: T): T;
  minBy<T,V>(fn: (x:T) => V): (x: T, y: T) => T;
  minBy<T,V>(fn: (x:T) => V): (x: T) => (y: T) => T;
  minBy<T,V>(fn: (x:T) => V, x: T): (y: T) => T;
  pathEq(path: Array<string>, val: any, o: Object): boolean;
  pathEq(path: Array<string>, val: any): (o: Object) => boolean;
  pathEq(path: Array<string>): (val: any, o: Object) => boolean;
  pathEq(path: Array<string>): (val: any) => (o: Object) => boolean;
  propEq(path: string, val: any, o: Object): boolean;
  propEq(path: string, val: any): (o: Object) => boolean;
  propEq(path: string): (val: any, o: Object) => boolean;
  propEq(path: string): (val: any) => (o: Object) => boolean;
  sortBy: CurriedFunction2<(x:T) => V, T[], T[]>;
  symmetricDifference<T>(x: Array<T>, y: Array<T>): Array<T>;
  symmetricDifference<T>(x: Array<T>): (y: Array<T>) => Array<T>;
  symmetricDifferenceWith<T>(fn: BinaryPredicateFn<T>, x: Array<T>, y: Array<T>): Array<T>;
  symmetricDifferenceWith<T>(fn: BinaryPredicateFn<T>): (x: Array<T>) => (y: Array<T>) => Array<T>;
  symmetricDifferenceWith<T>(fn: BinaryPredicateFn<T>): (x: Array<T>, y: Array<T>) => Array<T>;
  symmetricDifferenceWith<T>(fn: BinaryPredicateFn<T>, x: Array<T>): (y: Array<T>) => Array<T>;
  union<T>(x: Array<T>, y: Array<T>): Array<T>;
  union<T>(x: Array<T>): (y: Array<T>) => Array<T>;
  unionWith<T>(fn: BinaryPredicateFn<T>, x: Array<T>, y: Array<T>): Array<T>;
  unionWith<T>(fn: BinaryPredicateFn<T>): (x: Array<T>) => (y: Array<T>) => Array<T>;
  unionWith<T>(fn: BinaryPredicateFn<T>): (x: Array<T>, y: Array<T>) => Array<T>;
  unionWith<T>(fn: BinaryPredicateFn<T>, x: Array<T>): (y: Array<T>) => Array<T>;
}

type NestedObject<V> = { [key: string]: V | NestedObject<V> }

declare class GenericContructor<T> {
  constructor(x: T): GenericContructor
}

declare class GenericContructorMulti {
  constructor(...args: Array<any>): GenericContructor
}

declare class RFunction<T, V, A, B, C> {
  /**
   * TODO:
   * addIndex
   * composeK
   * composeP
   * invoker
   * lift
   * liftN
   * partial
   * partialRight
   * pipeK
   * pipeP
   * tryCatch
   * uncurryN
   * useWith
   * wrap
   */
  __: any;
  T: (_: any) => boolean;
  F: (_: any) => boolean;
  always<T>(x:T): (x: any) => T;
  ap: CurriedFunction2<((x:T) => V)[], T[], V[]>;
  apply: CurriedFunction2<((...args: T[]) => V), T[], V>;
  applySpec(spec: NestedObject<(x: any) => any>): (...args: Array<any>) => NestedObject<any>;
  binary: CurriedFunction3<(as: any[]) => T, any, any, T>;
  bind<T>(fn: (...args: Array<any>) => any, thisObj: T): (...args: Array<any>) => any;
  call<T>(fn: (...args: Array<any>) => T, ...args: Array<any>): T;
  comparator<T>(fn: BinaryPredicateFn<T>): (x:T, y:T) => number;
  construct<T>(ctor: Class<GenericContructor<T>>): (x: T) => GenericContructor<T>;
  constructN<T>(n: number, ctor: Class<GenericContructorMulti>): (...args: any) => GenericContructorMulti;
  converge: CurriedFunction2<Function, Function[], Function>;
  empty<T>(x: T): T;
  flip: UnaryFn<CurriedFunction2<A, B, C>, CurriedFunction2<B, A, C>>;
  identity<T>(x:T): T;
  juxt<T>(fns: Array<(...args: Array<any>) => T>): (...args: Array<T>) => Array<T>;
  memoize<V,T:(...args: Array<any>) => V>(fn:T):T;
  nAry<T>(arity: number, fn:(...args: Array<any>) => T): (...args: Array<any>) => T;
  nthArg(n: number): (...args: Array<any>) => any;
  of<T>(x: T): Array<T>;
  once<V,T:(...args: Array<any>) => V>(fn:T):T;
  tap<T>(fn: (x: T) => any): (x: T) => T;
  unapply<T,V>(fn: (xs: Array<T>) => V): (...args: Array<T>) => V;
  unary<T>(fn:(...args: Array<any>) => T): (x: any) => T;
}

declare class RType {
  is: CurriedFunction2<Class<any>, any, boolean>;
  isArrayLike(x: any): boolean;
  isNil(x: ?any): boolean;
  propIs: CurriedFunction3<any, string, Object, boolean>;
  type(x: ?any): string;
}

/**
 * DONE:
 * Function*
 * List*
 * Logic
 * Math
 * Object*
 * Relation
 * String
 * Type
 */


declare class Ramda<T> mixins
RFunction,
Composition,
RMath,
RList,
RObject,
RString,
Chain,
Concat,
Drop,
Filter,
Find,
RLogic,
RRelation,
Curry,
RType,
RMap,
RReduce
{
  converge: CurriedFunction2<Function, Function[], Function>;
  mergeAll(os: {}[]): {};
  objOf: CurriedFunction2<string, T, {[key: string]: T}>;
  prop: CurriedFunction2<string, Object, ?any>;
  unapply<T,V>(fn: (xs: Array<T>) => V): (...args: Array<T>) => V;

  compose<A,B,C,D,E,F,G>(fg: UnaryFn<F,G>, ef: UnaryFn<E,F>, de: UnaryFn<D,E>, cd: UnaryFn<C,D>, bc: UnaryFn<B,C>, ab: UnaryFn<A,B>, ...rest: Array<void>): UnaryFn<A,G>;
  compose<A,B,C,D,E,F>(ef: UnaryFn<E,F>, de: UnaryFn<D,E>, cd: UnaryFn<C,D>, bc: UnaryFn<B,C>, ab: UnaryFn<A,B>, ...rest: Array<void>): UnaryFn<A,F>;
  compose<A,B,C,D,E>(de: UnaryFn<D,E>, cd: UnaryFn<C,D>, bc: UnaryFn<B,C>, ab: UnaryFn<A,B>, ...rest: Array<void>): UnaryFn<A,E>;
  compose<A,B,C,D>(cd: UnaryFn<C,D>, bc: UnaryFn<B,C>, ab: UnaryFn<A,B>, ...rest: Array<void>): UnaryFn<A,D>;
  compose<A,B,C>(bc: UnaryFn<B,C>, ab: UnaryFn<A,B>, ...rest: Array<void>): UnaryFn<A,C>;
  compose<A,B>(ab: UnaryFn<A,B>, ...rest: Array<void>): UnaryFn<A,B>;
}

declare module 'ramda' {
  declare var exports: Ramda
}
