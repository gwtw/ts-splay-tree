/**
 * @license
 * Copyright Daniel Imms <http://www.growingwiththeweb.com>
 * Released under MIT license. See LICENSE in the project root for details.
 */

import { CompareFunction, ISplayTree, INode } from './types';
import { Node } from './node';

export class SplayTree<K, V> implements ISplayTree<K, V> {
  protected _root?: Node<K, V>;
  private _size = 0;
  private _compare: CompareFunction<K> = defaultCompare;

  constructor(
    customCompare?: CompareFunction<K>
  ) {
    if (customCompare) {
      this._compare = customCompare;
    }
  }

  public get size(): number {
    return this._size;
  }

  /**
   * Inserts a key into the tree.
   *
   * @param key The key to insert.
   * @return Whether the node was inserted.
   */
  public insert(key: K, value?: V): boolean {
    if (!this._root) {
      this._root = new Node(key, value);
      this._size++;
      return true;
    }

    const result = this._insert(key, value, this._root);
    if (result) {
      // Splay tree
      this.contains(key);
    }
    return result;
  }

  /**
   * Inserts a key into the tree rooted on a particular node.
   *
   * @param key The key to insert.
   * @param node The current node insertion is being considered on.
   * @return Whether the node was inserted.
   */
  private _insert(key: K, value: V | undefined, node: Node<K, V>): boolean {
    if (this._compare(key, node.key) < 0) {
      if (node.left) {
        return this._insert(key, value, node.left);
      }
      node.left = new Node(key, value, node);
      this._size++;
      return true;
    }

    if (this._compare(key, node.key) > 0) {
      if (node.right) {
        return this._insert(key, value, node.right);
      }
      node.right = new Node(key, value, node);
      this._size++;
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
  public contains(key: K): INode<K, V> | undefined {
    if (!this._root) {
      return undefined;
    }

    const node = this._contains(key, this._root);
    if (node) {
      this._splay(node);
    }
    return node;
  }

  /**
   * Determines whether the tree contains a key under a particular node.
   *
   * @param key The key to check.
   * @param node The current node insertion is being considered on.
   * @return The node that was found or undefined.
   */
  private _contains(key: K, node: Node<K, V>): Node<K, V> | undefined {
    const result = this._compare(key, node.key);

    if (result < 0) {
      if (!node.left) {
        return undefined;
      }
      return this._contains(key, node.left);
    }

    if (result > 0) {
      if (!node.right) {
        return undefined;
      }
      return this._contains(key, node.right);
    }

    return node;
  }

  /**
   * @return The maximum key of the tree.
   */
  public findMaximum(): INode<K, V> | undefined {
    if (!this._root) {
      return undefined;
    }

    let current = this._root;
    while (true) {
      if (current.right) {
        current = current.right;
      } else {
        return current;
      }
    }
  }

  /**
   * @return The minimum key of the tree.
   */
  public findMinimum(): INode<K, V> | undefined {
    if (!this._root) {
      return undefined;
    }

    let current = this._root;
    while (true) {
      if (current.left) {
        current = current.left;
      } else {
        return current;
      }
    }
  }

  /**
   * Deletes a key from the tree.
   *
   * @param key The key to delete.
   * @return Whether the key was deleted.
   */
  public delete(key: K): boolean {
    if (!this._root) {
      return false;
    }
    // Splay tree
    this.contains(key);
    return this._delete(key, this._root);
  }

  // TODO: jsdoc
  private _delete(key: K, node: Node<K, V>): boolean {
    const result = this._compare(key, node.key);
    if (result < 0) {
      if (node.left) {
        return this._delete(key, node.left);
      }
      return false;
    }

    if (result > 0) {
      if (node.right) {
        return this._delete(key, node.right);
      }
      return false;
    }

    return this._delete2(node);
  }

  // TODO: jsdoc
  private _delete2(node: Node<K, V>): boolean {
    if (!node.left && !node.right) {
      this._deleteNodeWithNoChildren(node);
      return true;
    }

    if (node.left && !node.right) {
      this._deleteNodeWithLeftOnly(node);
      return true;
    }

    if (node.right && !node.left) {
      this._deleteNodeWithRightOnly(node);
      return true;
    }

    // both exist, replace with node minimum from right sub-tree and delete the
    // node from the right sub-tree
    const minParent = this._findParentOfMinimum(node.right!, node);
    // The min node is guaranteed to be the left node not the right as this can
    // only occur when the node has both children and if the parent of the
    // minimum comes from the right sub-tree the parent must have a left node
    const minNode = minParent.left!;
    const newKey = minNode.key;
    const newValue = minNode.value;
    this._delete2(minNode);
    node.key = newKey;
    node.value = newValue;

    return true;
  }

  /**
   * Deletes a node with no children.
   *
   * @param tree The tree to delete the node from.
   * @param node The node to delete.
   */
  private _deleteNodeWithNoChildren(node: Node<K, V>): void {
    if (node.parent) {
      node.parent.removeChild(node);
    } else {
      this._root = undefined;
    }
    this._size--;
  }

  /**
   * Deletes a node with a left child only, moving the left child in to the
   * node's place.
   *
   * @param tree The tree to delete the node from.
   * @param node The node to delete.
   */
  private _deleteNodeWithLeftOnly(node: Node<K, V>): void {
    node.key = node.left!.key;
    node.value = node.left!.value;
    node.right = node.left!.right;
    if (node.right) {
      node.right.parent = node;
    }
    node.left = node.left!.left;
    if (node.left) {
      node.left.parent = node;
    }
    this._size--;
  }

  /**
   * Deletes a node with a right child only, moving the right child in to the
   * node's place.
   *
   * @param tree The tree to delete the node from.
   * @param node The node to delete.
   */
  private _deleteNodeWithRightOnly(node: Node<K, V>): void {
    node.key = node.right!.key;
    node.value = node.right!.value;
    node.left = node.right!.left;
    if (node.left) {
      node.left.parent = node;
    }
    node.right = node.right!.right;
    if (node.right) {
      node.right.parent = node;
    }
    this._size--;
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
   * @return The parent of the minimum key node in the tree.
   */
  private _findParentOfMinimum(node: Node<K, V>, parent: Node<K, V>): Node<K, V> {
    if (!node.left) {
      return parent;
    }

    return this._findParentOfMinimum(node.left, node);
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
    const y = x.right!;
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
    const y = x.left!;
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
}

/**
 * Compares two nodes with each other.
 * @param a The first key to compare.
 * @param b The second key to compare.
 * @return -1, 0 or 1 if a < b, a == b or a > b respectively.
 */
function defaultCompare<K>(a: K, b: K): number {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}
