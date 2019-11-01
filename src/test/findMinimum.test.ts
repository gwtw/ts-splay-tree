import { TestSplayTree, nodeEquals } from './testUtils';
import { strictEqual } from 'assert';

describe('findMinimum', () => {
  it('should return undefined if the tree is empty', () => {
    const tree = new TestSplayTree<number, null>();
    strictEqual(tree.findMinimum(), undefined);
  });

  it('should return the minimum of the tree', () => {
    const tree = new TestSplayTree<number, number>();
    tree.add(2, -2);
    nodeEquals(tree.findMinimum(), 2, -2);
    tree.add(1, -1);
    nodeEquals(tree.findMinimum(), 1, -1);
    tree.add(3, -3);
    nodeEquals(tree.findMinimum(), 1, -1);
  });
});
