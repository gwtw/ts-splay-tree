import { SplayTree } from '../splayTree';
import { Node } from '../node';
import { INode } from '../types';
import { strictEqual, fail } from 'assert';

export class TestSplayTree<K, V> extends SplayTree<K, V> {
    public get root(): Node<K, V> | undefined { return this._root; }
}

export function nodeEquals<K, V>(node: INode<K, V> | undefined, key: K, value: V): void {
  if (!node) {
    fail('Node being compared is undefined');
    return;
  }
  strictEqual(node.key, key);
  strictEqual(node.value, value);
}
