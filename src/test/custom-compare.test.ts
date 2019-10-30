import { TestSplayTree } from './testUtils';
import { strictEqual } from 'assert';

describe('Custom compare', () => {
  it('should allow use of a custom compare function', () => {
    const tree = new TestSplayTree<number, null>((a, b) => b - a);
    tree.add(1);
    tree.add(2);
    strictEqual(tree.root.key, 2);
    strictEqual(tree.root.right.key, 1);
  });
});
