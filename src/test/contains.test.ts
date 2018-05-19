import { assert } from 'chai';
import { TestSplayTree } from './testUtils';

describe('contains', () => {
  it('should return false if the tree is empty', () => {
    const tree = new TestSplayTree();
    assert.isFalse(tree.contains(1));
  });

  it('should return whether the tree contains a node', () => {
    const tree = new TestSplayTree();
    assert.isFalse(tree.contains(1));
    assert.isFalse(tree.contains(2));
    assert.isFalse(tree.contains(3));
    tree.add(3);
    tree.add(1);
    tree.add(2);
    assert.isTrue(tree.contains(1));
    assert.isTrue(tree.contains(2));
    assert.isTrue(tree.contains(3));
  });

  it('should return false when the expected parent has no children', () => {
    const tree = new TestSplayTree();
    tree.add(2);
    assert.isFalse(tree.contains(1));
    assert.isFalse(tree.contains(3));
  });
});
