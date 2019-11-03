import { TestSplayTree, nodeEquals } from './testUtils';
import { strictEqual } from 'assert';

describe('findMaximum', () => {
  it('should return undefined if the tree is empty', () => {
    const tree = new TestSplayTree<number, undefined>();
    strictEqual(tree.findMaximum(), undefined);
  });

  it('should return the maximum of the tree', () => {
    const tree = new TestSplayTree<number, number>();
    tree.insert(2, -2);
    nodeEquals(tree.findMaximum(), 2, -2);
    tree.insert(1, -1);
    nodeEquals(tree.findMaximum(), 2, -2);
    tree.insert(3, -3);
    nodeEquals(tree.findMaximum(), 3, -3);
    tree.delete(3);
    nodeEquals(tree.findMaximum(), 2, -2);
    tree.delete(1);
    nodeEquals(tree.findMaximum(), 2, -2);
  });
});
