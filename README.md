# ts-splay-tree

[![Build Status](https://dev.azure.com/growingwiththeweb/ts-splay-tree/_apis/build/status/gwtw.ts-splay-tree?branchName=master)](https://dev.azure.com/growingwiththeweb/ts-splay-tree/_build/latest?definitionId=3&branchName=master)

A TypeScript implementation of the [splay heap](http://www.growingwiththeweb.com/data-structures/splay-tree/overview/) data structure.

Note that the primary purpose of this library is education but it should work in a production environment as well. It's certainly not as performant as it could be as it optimises for readability, abstraction and safety over raw performance.

![](https://www.growingwiththeweb.com/images/data-structures/splay-tree/worst-case.svg)

## Features

- 100% test coverage
- Supports common tree operations
- Store keys with optional associated values
- Optional custom compare function

## Install

TODO

## Usage

See the [typings file](./typings/splay-tree.d.ts) for the full API.

```typescript
// Import npm module
import { SplayTree } from '@gwtw/splay-tree';

// Construct SplayTree
const tree = new SplayTree<number, any>();
// Add keys only
tree.add(3);
tree.add(7);
// Add keys and values
tree.add(8, {foo: 'bar'});
tree.add(1, {foo: 'baz'});

// Check if the tree contains keys
const found = tree.contains(8);
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
tree2.add(2);
tree2.add(1);
tree2.add(4);
tree2.add(3);

// Extract all nodes in order
while (tree2.size > 0) {
  const node = tree2.findMinimum();
  tree2.remove(node);
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
| add            | O(log n)\* |
| contains       | O(log n)\* |
| findMaximum    | O(log n)\* |
| findMinimum    | O(log n)\* |
| remove         | O(log n)\* |
| size           | Θ(1)       |

\* amortized
