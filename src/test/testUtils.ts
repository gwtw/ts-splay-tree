import { SplayTree } from '../splayTree';
import { Node } from '../node';
import { INode } from '../types';
import { strictEqual } from 'assert';

export class TestSplayTree<K, V> extends SplayTree<K, V> {
    public get root(): Node<K, V> { return this._root; }
}

export function nodeEquals<K, V>(node: INode<K, V>, key: K, value: V): void {
  strictEqual(node.key, key);
  strictEqual(node.value, value);
}
