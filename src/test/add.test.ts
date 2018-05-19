import { assert } from 'chai';
import { TestSplayTree } from './testUtils';

describe('add', () => {
  it('should return the size of the tree', () => {
    const tree = new TestSplayTree();
    tree.add(1);
    tree.add(2);
    tree.add(3);
    tree.add(4);
    tree.add(5);
    assert.equal(tree.size, 5);
  });
});
