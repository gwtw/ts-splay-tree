/**
 * @license
 * Copyright Daniel Imms <http://www.growingwiththeweb.com>
 * Released under MIT license. See LICENSE in the project root for details.
 */

import { INode, CompareFunction } from './types';
import { Node } from './node';

export class SplayTree<K, V> {
  private _root: Node<K, V>;
  private _nodeCount = 0;

  constructor(
    private _compare?: CompareFunction<K, V>
  ) {
    if (!_compare) {
      this._compare = this._defaultCompare;
    }
  }

  /**
   * Adds a key to the tree.
   *
   * @param key The key to add.
   * @return Whether the node was added.
   */
  public add(key: K): boolean {
    // TODO: Support value
    if (!this._root) {
      this._root = new Node(key);
      this._nodeCount++;
      return true;
    }

    return this._add(key, this._root);
  }

  /**
   * Inserts a key into the tree rooted on a particular node.
   *
   * @param key The key to insert.
   * @param node The current node insertion is being considered on.
   * @return Whether the node was added.
   */
  private _add(key: K, node: Node<K, V>): boolean {
    if (this._compare(key, node.key) < 0) {
      if (node.left) {
        return this._add(key, node.left);
      }
      node.left = new Node(key, node);
      this._nodeCount++;
      return true;
    }

    if (this._compare(key, node.key) > 0) {
      if (node.right) {
        return this._add(key, node.right);
      }
      node.right = new Node(key, node);
      this._nodeCount++;
      return true;
    }

    return false;
  }

  /**
   * Compares two nodes with each other.
   * @param a The first key to compare.
   * @param b The second key to compare.
   * @return -1, 0 or 1 if a < b, a == b or a > b respectively.
   */
  private _defaultCompare(a: K, b: K): number {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }
}
