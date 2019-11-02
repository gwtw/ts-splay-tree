/**
 * @license
 * Copyright Daniel Imms <http://www.growingwiththeweb.com>
 * Released under MIT license. See LICENSE in the project root for details.
 */

declare module '@gwtw/splay-tree' {
  export type CompareFunction<K> = (a: K, b: K) => number;

  export interface INode<K, V> {
    readonly key: K;
    readonly value?: V;
  }

  export interface ISplayTree<K, V> {
    readonly size: number;

    add(key: K, value?: V): boolean;
    contains(key: K): INode<K, V> | undefined;
    findMaximum(): INode<K, V> | undefined;
    findMinimum(): INode<K, V> | undefined;
    remove(key: K): boolean;
  }
}
