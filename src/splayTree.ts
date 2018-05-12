/**
 * @license
 * Copyright Daniel Imms <http://www.growingwiththeweb.com>
 * Released under MIT license. See LICENSE in the project root for details.
 */

import { INode, CompareFunction, ISplayTree } from './types';
import { Node } from './node';

export class SplayTree<K, V> implements ISplayTree<K, V> {
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
   * Determines whether the tree contains a key.
   *
   * @param key The key to check.
   * @return Whether the node contains the key.
   */
  public contains(key: K): boolean {
    if (!this._root) {
      return false;
    }

    const node = this._contains(key, this._root);
    if (node) {
      this._splay(node);
    }
    return !!node;
  }

  // TODO: jsdoc
  private _contains(key: K, node: Node<K, V>): Node<K, V> {
    if (key === node.key) {
      return node;
    }

    if (this._compare(key, node.key) < 0) {
      if (!node.left) {
        return undefined;
      }
      return this._contains(key, node.left);
    }

    if (this._compare(key, node.key) > 0) {
      if (!node.right) {
        return undefined;
      }
      return this._contains(key, node.right);
    }

    return undefined;
  }

  /**
   * Splay the tree on a node, bringing it to the root using a series of
   * rotation operations.
   *
   * @param node The node being splayed on.
   */
  private _splay(node: Node<K, V>): void {
    while (node.parent) {
      const parent = node.parent;
      if (!parent.parent) {
        if (parent.left === node) {
          this._rotateRight(parent);
        } else {
          this._rotateLeft(parent);
        }
      } else {
        const gparent = parent.parent;
        if (parent.left === node && gparent.left === parent) {
          this._rotateRight(gparent);
          this._rotateRight(node.parent);
        } else if (parent.right === node && gparent.right === parent) {
          this._rotateLeft(gparent);
          this._rotateLeft(node.parent);
        } else if (parent.left === node && gparent.right === parent) {
          this._rotateRight(parent);
          this._rotateLeft(node.parent);
        } else {
          this._rotateLeft(parent);
          this._rotateRight(node.parent);
        }
      }
    }
  }

  /**
   * Rotates a node in a tree left.
   *
   *     a                             b
   *    / \                           / \
   *   c   b   -> rotateLeft(a) ->   a   e
   *      / \                       / \
   *     d   e                     c   d
   *.
   * @param x The node being rotated.
   */
  private _rotateLeft(x: Node<K, V>): void {
    const y = x.right;
    x.right = y.left;
    if (y.left) {
      y.left.parent = x;
    }
    y.parent = x.parent;
    if (!x.parent) {
      this._root = y;
    } else {
      if (x === x.parent.left) {
        x.parent.left = y;
      } else {
        x.parent.right = y;
      }
    }
    y.left = x;
    x.parent = y;
  }

  /**
   * Rotates a node in a tree right.
   *
   *       b                          a
   *      / \                        / \
   *     a   e -> rotateRight(b) -> c   b
   *    / \                            / \
   *   c   d                          d   e
   *
   * @param x The node being rotated.
   */
  private _rotateRight(x: Node<K, V>): void {
    const y = x.left;
    x.left = y.right;
    if (y.right) {
      y.right.parent = x;
    }
    y.parent = x.parent;
    if (!x.parent) {
      this._root = y;
    } else {
      if (x === x.parent.left) {
        x.parent.left = y;
      } else {
        x.parent.right = y;
      }
    }
    y.right = x;
    x.parent = y;
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
