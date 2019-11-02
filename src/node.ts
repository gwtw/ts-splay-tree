/**
 * @license
 * Copyright Daniel Imms <http://www.growingwiththeweb.com>
 * Released under MIT license. See LICENSE in the project root for details.
 */

import { INode } from './types';

export class Node<K, V> implements INode<K, V> {
  /**
   * The left child of the node.
   */
  public left?: Node<K, V>;

  /**
   * The right child of the node.
   */
  public right?: Node<K, V>;

  /**
   * Creates a binary tree node.
   *
   * @param key The key of the node.
   * @param parent The parent of the node.
   */
  constructor(
    public key: K,
    public value?: V,
    public parent?: Node<K, V>
  ) {
  }

  /**
   * Removes a child from the node. This will remove the left or right node
   * depending on which one matches the argument.
   *
   * @param node The node to remove.
   */
  public removeChild(node: Node<K, V>): void {
    if (this.left === node) {
      this.left = undefined;
    }
    if (this.right === node) {
      this.right = undefined;
    }
  }
}
