import { TestSplayTree } from './testUtils';
import { strictEqual } from 'assert';

describe('add', () => {
  it('should return the size of the tree', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(1);
    tree.add(2);
    tree.add(3);
    tree.add(4);
    tree.add(5);
    strictEqual(tree.size, 5);
  });

  it('should do nothing when adding the same key tree', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(1);
    tree.add(1);
    strictEqual(tree.size, 1);
  });
});
