import { Node } from '../node';
import { strictEqual } from 'assert';

describe('node', () => {
  it('should remove the left child', () => {
    const node = new Node<number, number>(2);
    const nodeLeft = new Node<number, number>(1, node);
    node.left = nodeLeft;
    node.removeChild(nodeLeft);
    strictEqual(node.key, 2);
  });

  it('should remove the right child', () => {
    // This isn't expected to ever happen from splay tree since this removeChild
    // is only ever called when removing the minimum of the 2 children or when
    // it's the root.
    const node = new Node<number, number>(1);
    const nodeRight = new Node<number, number>(2, node);
    node.right = nodeRight;
    node.removeChild(nodeRight);
    strictEqual(node.key, 1);
  });
});
