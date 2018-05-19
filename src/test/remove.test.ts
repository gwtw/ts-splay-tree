import { assert } from 'chai';
import { TestSplayTree } from './testUtils';

describe('remove', () => {
  it('should return false when the tree has no root', () => {
    const tree = new TestSplayTree<number, null>();
    assert.isFalse(tree.remove(1));
  });

  it('should return false when the tree does not contain the key', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(1);
    assert.isFalse(tree.contains(2));
  });

  it('should remove items from the tree', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(1);
    tree.add(2);
    tree.add(3);
    tree.add(4);
    tree.add(5);
    assert.equal(tree.size, 5);
    tree.remove(3);
    tree.remove(5);
    assert.equal(tree.size, 3);
  });

  it('should remove node on the left sub-tree', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(1);
    tree.add(2);
    assert.isTrue(tree.remove(2));
  });

  it('should remove node on the right sub-tree', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(1);
    tree.add(0);
    assert.isTrue(tree.remove(0));
  });

  it('should remove node with a left sub-tree', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(1);
    tree.add(0);
    assert.isTrue(tree.remove(1));
  });

  it('should remove node with a left node that contains a left sub-tree', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(1);
    tree.add(0);
    tree.add(-1);
    /**
     * After splay:
     *
     *      1
     *     /
     *    0
     *   /
     * -1
     */
    assert.isTrue(tree.remove(1));
  });


  it('should remove node with a left node that contains a right sub-tree', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(1);
    tree.add(-1);
    tree.add(0);
    tree.add(-2);
    /**
     * After splay:
     *
     *    1
     *   /
     * -2
     *   \
     *    0
     *   /
     * -1
     */
    assert.isTrue(tree.remove(1));
  });

  it('should remove node with a right node that contains a left sub-tree', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(1);
    tree.add(3);
    tree.add(2);
    tree.add(4);
    /**
     * After splay:
     * 1
     *  \
     *   4
     *  /
     * 2
     *  \
     *   3
     */
    assert.isTrue(tree.remove(1));
  });

  it('should remove node with a right node that contains a right sub-tree', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(1);
    tree.add(3);
    tree.add(2);
    /**
     * After splay:
     *
     * 1
     *  \
     *   2
     *    \
     *     3
     */
    assert.isTrue(tree.remove(1));
  });

  it('should remove node with both left and right sub-trees', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(1);
    tree.add(0);
    tree.add(2);
    assert.isTrue(tree.remove(1));
  });

  it('should remove node with both left and right sub-trees whose right node contains a left sub-tree', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(1);
    tree.add(0);
    tree.add(3);
    tree.add(2);
    tree.add(4);
    /**
     * After splay:
     *   1
     *  / \
     * 0   4
     *    /
     *   2
     *    \
     *     3
     */
    assert.isTrue(tree.remove(1));
  });

  it('should return false when removing a node whose parent has a left child', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(1);
    tree.add(0);
    assert.isFalse(tree.remove(2));
  });

  it('should return false when removing a node whose parent has a left child', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(1);
    tree.add(2);
    assert.isFalse(tree.remove(0));
  });

  it('should set root to undefined when the last item in the tree is removed', () => {
    const tree = new TestSplayTree<number, null>();
    tree.add(1);
    tree.add(2);
    assert.isTrue(tree.remove(2));
    assert.isTrue(tree.remove(1));
    assert.equal(tree.root, undefined);
  });
});
