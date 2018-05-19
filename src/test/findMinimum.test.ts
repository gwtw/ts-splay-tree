import { assert } from 'chai';
import { TestSplayTree } from './testUtils';

describe('findMinimum', () => {
  it('should return undefined if the tree is empty', () => {
    const tree = new TestSplayTree<number, null>();
    assert.equal(tree.findMinimum(), undefined);
  });

  it('should return the minimum of the tree', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(2);
    assert.equal(tree.findMinimum(), 2);
    tree.add(1);
    assert.equal(tree.findMinimum(), 1);
    tree.add(3);
    assert.equal(tree.findMinimum(), 1);
  });
});
