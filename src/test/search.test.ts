import { TestSplayTree } from './testUtils';
import { ok, strictEqual } from 'assert';

describe('search', () => {
  it('should return false if the tree is empty', () => {
    const tree = new TestSplayTree<number, null>();
    ok(!tree.search(1));
  });

  it('should return the node being searched for', () => {
    const tree = new TestSplayTree<number, null>();
    ok(!tree.search(1));
    ok(!tree.search(2));
    ok(!tree.search(3));
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);
    strictEqual(tree.search(1)!.key, 1);
    strictEqual(tree.search(2)!.key, 2);
    strictEqual(tree.search(3)!.key, 3);
  });

  it('should return false when the expected parent has no children', () => {
    const tree = new TestSplayTree<number, null>();
    tree.insert(2);
    ok(!tree.search(1));
    ok(!tree.search(3));
  });
});
