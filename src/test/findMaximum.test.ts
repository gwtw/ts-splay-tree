import { assert } from 'chai';
import { TestSplayTree } from './testUtils';

describe('findMaximum', () => {
  it('should return undefined if the tree is empty', () => {
    const tree = new TestSplayTree<number, null>();
    assert.equal(tree.findMaximum(), undefined);
  });

  it('should return the maximum of the tree', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(2);
    assert.equal(tree.findMaximum(), 2);
    tree.add(1);
    assert.equal(tree.findMaximum(), 2);
    tree.add(3);
    assert.equal(tree.findMaximum(), 3);
  });
});
