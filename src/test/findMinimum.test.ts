import { TestSplayTree } from './testUtils';
import { strictEqual } from 'assert';

describe('findMinimum', () => {
  it('should return undefined if the tree is empty', () => {
    const tree = new TestSplayTree<number, null>();
    strictEqual(tree.findMinimum(), undefined);
  });

  it('should return the minimum of the tree', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(2);
    strictEqual(tree.findMinimum(), 2);
    tree.add(1);
    strictEqual(tree.findMinimum(), 1);
    tree.add(3);
    strictEqual(tree.findMinimum(), 1);
  });
});
