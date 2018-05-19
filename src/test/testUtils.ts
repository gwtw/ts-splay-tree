import { SplayTree } from '../splayTree';
import { Node } from '../node';

export class TestSplayTree<K, V> extends SplayTree<K, V> {
    public get root(): Node<K, V> { return this._root; }
}
