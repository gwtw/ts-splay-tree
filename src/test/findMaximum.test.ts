import { TestSplayTree } from './testUtils';
import { strictEqual } from 'assert';

describe('findMaximum', () => {
  it('should return undefined if the tree is empty', () => {
    const tree = new TestSplayTree<number, null>();
    strictEqual(tree.findMaximum(), undefined);
  });

  it('should return the maximum of the tree', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(2);
    strictEqual(tree.findMaximum(), 2);
    tree.add(1);
    strictEqual(tree.findMaximum(), 2);
    tree.add(3);
    strictEqual(tree.findMaximum(), 3);
  });
});
