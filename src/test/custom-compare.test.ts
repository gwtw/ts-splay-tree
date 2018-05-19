import { assert } from 'chai';
import { TestSplayTree } from './testUtils';

describe('Custom compare', () => {
  it('should allow use of a custom compare function', () => {
    const tree = new TestSplayTree<number, null>((a, b) => b - a);
    tree.add(1);
    tree.add(2);
    assert.equal(tree.root.key, 2);
    assert.equal(tree.root.right.key, 1);
  });
});
