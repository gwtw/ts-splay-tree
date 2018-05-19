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

  // TODO: Support adding optional value
  add(key: K): boolean;
  contains(key: K): boolean;
  findMaximum(): K;
  findMinimum(): K;
  remove(key: K): boolean;
}
