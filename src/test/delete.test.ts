import { TestSplayTree } from './testUtils';
import { ok, strictEqual } from 'assert';

describe('delete', () => {
  it('should return false when the tree has no root', () => {
    const tree = new TestSplayTree<number, undefined>();
    ok(!tree.delete(1));
  });

  it('should return false when the tree does not contain the key', () => {
    const tree = new TestSplayTree<number, undefined>();
    tree.insert(1);
    ok(!tree.contains(2));
  });

  it('should delete items from the tree', () => {
    const tree = new TestSplayTree<number, undefined>();
    tree.insert(1);
    tree.insert(2);
    tree.insert(3);
    tree.insert(4);
    tree.insert(5);
    strictEqual(tree.size, 5);
    tree.delete(3);
    tree.delete(5);
    strictEqual(tree.size, 3);
  });

  it('should delete node on the left sub-tree', () => {
    const tree = new TestSplayTree<number, undefined>();
    tree.insert(1);
    tree.insert(2);
    ok(tree.delete(2));
  });

  it('should delete node on the right sub-tree', () => {
    const tree = new TestSplayTree<number, undefined>();
    tree.insert(1);
    tree.insert(0);
    ok(tree.delete(0));
  });

  it('should delete node with a left sub-tree', () => {
    const tree = new TestSplayTree<number, undefined>();
    tree.insert(1);
    tree.insert(0);
    ok(tree.delete(1));
  });

  it('should delete node with a left node that contains a left sub-tree', () => {
    const tree = new TestSplayTree<number, undefined>();
    tree.insert(1);
    tree.insert(0);
    tree.insert(-1);
    /**
     * After splay:
     *
     *      1
     *     /
     *    0
     *   /
     * -1
     */
    ok(tree.delete(1));
  });


  it('should delete node with a left node that contains a right sub-tree', () => {
    const tree = new TestSplayTree<number, undefined>();
    tree.insert(1);
    tree.insert(-1);
    tree.insert(0);
    tree.insert(-2);
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
    ok(tree.delete(1));
  });

  it('should delete node with a right node that contains a left sub-tree', () => {
    const tree = new TestSplayTree<number, undefined>();
    tree.insert(1);
    tree.insert(3);
    tree.insert(2);
    tree.insert(4);
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
    ok(tree.delete(1));
  });

  it('should delete node with a right node that contains a right sub-tree', () => {
    const tree = new TestSplayTree<number, undefined>();
    tree.insert(1);
    tree.insert(3);
    tree.insert(2);
    /**
     * After splay:
     *
     * 1
     *  \
     *   2
     *    \
     *     3
     */
    ok(tree.delete(1));
  });

  it('should delete node with both left and right sub-trees', () => {
    const tree = new TestSplayTree<number, undefined>();
    tree.insert(1);
    tree.insert(0);
    tree.insert(2);
    ok(tree.delete(1));
  });

  it('should delete node with both left and right sub-trees whose right node contains a left sub-tree', () => {
    const tree = new TestSplayTree<number, undefined>();
    tree.insert(1);
    tree.insert(0);
    tree.insert(3);
    tree.insert(2);
    tree.insert(4);
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
    ok(tree.delete(1));
  });

  it('should return false when removing a node whose parent has a left child', () => {
    const tree = new TestSplayTree<number, undefined>();
    tree.insert(1);
    tree.insert(0);
    ok(!tree.delete(2));
  });

  it('should return false when removing a node whose parent has a left child', () => {
    const tree = new TestSplayTree<number, undefined>();
    tree.insert(1);
    tree.insert(2);
    ok(!tree.delete(0));
  });

  it('should set root to undefined when the last item in the tree is deleted', () => {
    const tree = new TestSplayTree<number, undefined>();
    tree.insert(1);
    tree.insert(2);
    ok(tree.delete(2));
    ok(tree.delete(1));
    strictEqual(tree.root, undefined);
  });
});
