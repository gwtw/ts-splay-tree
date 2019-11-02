/**
 * @license
 * Copyright Daniel Imms <http://www.growingwiththeweb.com>
 * Released under MIT license. See LICENSE in the project root for details.
 */

// export type CompareFunction<K, V> = (a: INode<K, V>, b: INode<K, V>) => number;
export type CompareFunction<K, V> = (a: K, b: K) => number;

export interface INode<K, V> {
  readonly key: K;
  readonly value?: V;
}

export interface ISplayTree<K, V> {
  readonly size: number;

  add(key: K, value?: V): boolean;
  contains(key: K): boolean;
  findMaximum(): INode<K, V>;
  findMinimum(): INode<K, V>;
  remove(key: K): boolean;
}
