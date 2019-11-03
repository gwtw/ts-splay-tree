import { TestSplayTree } from './testUtils';
import { ok } from 'assert';

describe('contains', () => {
  it('should return false if the tree is empty', () => {
    const tree = new TestSplayTree<number, null>();
    ok(!tree.contains(1));
  });

  it('should return whether the tree contains a node', () => {
    const tree = new TestSplayTree<number, null>();
    ok(!tree.contains(1));
    ok(!tree.contains(2));
    ok(!tree.contains(3));
    tree.insert(3);
    tree.insert(1);
    tree.insert(2);
    ok(tree.contains(1));
    ok(tree.contains(2));
    ok(tree.contains(3));
  });

  it('should return false when the expected parent has no children', () => {
    const tree = new TestSplayTree<number, null>();
    tree.insert(2);
    ok(!tree.contains(1));
    ok(!tree.contains(3));
  });
});
