import { TestSplayTree } from './testUtils';
import { strictEqual } from 'assert';

describe('insert', () => {
  it('should return the size of the tree', () => {
    const tree = new TestSplayTree<number, undefined>();
    strictEqual(tree.isEmpty, true);
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    strictEqual(tree.size, 5);
    strictEqual(tree.isEmpty, false);
  });

  it('should do nothing when inserting the same key tree', () => {
    const tree = new TestSplayTree<number, undefined>();
    tree.insert(1);
    tree.insert(1);
    strictEqual(tree.size, 1);
  });
});
