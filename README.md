# ts-splay-tree

A TypeScript implementation of the [splay heap](http://www.growingwiththeweb.com/data-structures/splay-tree/overview/) data structure.

Note that the primary purpose of this library is education but it should work in a production environment as well. It's certainly not as performant as it could be as it optimises for readability, abstraction and safety over raw performance.

![](https://www.growingwiththeweb.com/images/data-structures/splay-tree/worst-case.svg)

## Features

- 100% test coverage
- Supports common tree operations
- Store keys with optional associated values
- Optional custom compare function

## Install

TODO: Publish package

```bash
npm install --save @gwtw/splay-tree
```

## Usage

See the [typings file](./typings/splay-tree.d.ts) for the full API.

```typescript
// Import npm module
import { SplayTree } from '@gwtw/splay-tree';

// Construct SplayTree
const tree = new SplayTree<number, any>();
// Insert keys only
tree.insert(3);
tree.insert(7);
// Insert keys and values
tree.insert(8, {foo: 'bar'});
tree.insert(1, {foo: 'baz'});

// Search the tree for a key
const found = tree.search(8);
console.log(`key: ${found.key}, value: ${found.value}`);
// > key: 8, value: {foo: 'bar'}

// Extract all nodes in order
while (!tree.isEmpty()) {
  const node = tree.findMinimum();
  console.log(`key: ${node.key}, value: ${node.value}`);
}
// > key: 1, value: {foo: 'baz'}
// > key: 3, value: undefined
// > key: 7, value: undefined
// > key: 8, value: {foo: 'bar'}

// Construct custom compare SplayTree
const tree2 = new SplayTree<string, string>((a, b) => b - a);
tree2.insert(2);
tree2.insert(1);
tree2.insert(4);
tree2.insert(3);

// Extract all nodes in order
while (tree2.size > 0) {
  const node = tree2.findMinimum();
  tree2.delete(node);
  console.log(`key: ${node.key}`);
}
// > key: 4
// > key: 3
// > key: 2
// > key: 1
```

## Operation time complexity

| Operation      | Complexity |
| -------------- | ---------- |
| delete         | O(log n)\* |
| findMaximum    | O(log n)\* |
| findMinimum    | O(log n)\* |
| insert         | O(log n)\* |
| search         | O(log n)\* |
| size           | Θ(1)       |

\* amortized
