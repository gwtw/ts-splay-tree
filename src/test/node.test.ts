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
    const node = new Node<number, number>(1);
    const nodeRight = new Node<number, number>(2, node);
    node.right = nodeRight;
    node.removeChild(nodeRight);
    strictEqual(node.key, 1);
  });
});
