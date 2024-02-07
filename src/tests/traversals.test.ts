import { NaryTree, NaryTreeNode } from '../index';

describe('NaryTree', () => {
  let testableTree: NaryTree<number>;

  beforeEach(() => {
    testableTree = new NaryTree<number>();

    const rootNode = testableTree.insertNode(null, 1);
    const child1 = testableTree.insertNode(rootNode, 2);
    const child2 = testableTree.insertNode(rootNode, 3);
    const grandchild1 = testableTree.insertNode(child1, 4);
    const grandchild2 = testableTree.insertNode(child1, 5);
    const grandchild3 = testableTree.insertNode(child2, 6);
    const greatgrandchild1 = testableTree.insertNode(grandchild3, 7);
    const greatgrandchild2 = testableTree.insertNode(grandchild3, 8);
  });

  test('Pre-order traversal visits nodes in correct order', () => {
    const visitedNodes: number[] = [];
    testableTree.preOrderTraversal(testableTree.root, (node) => {
      visitedNodes.push(node.data.value);
    });
    expect(visitedNodes).toEqual([1, 2, 4, 5, 3, 6, 7, 8]);
  });

  test('In-order traversal visits nodes in correct order', () => {
    const visitedNodes: number[] = [];
    testableTree.inOrderTraversal(testableTree.root, (node) => {
      visitedNodes.push(node.data.value);
    });
    expect(visitedNodes).toEqual([4, 2, 5, 1, 7, 6, 8, 3]);
  });

  test('Post-order traversal visits nodes in correct order', () => {
    const visitedNodes: number[] = [];
    testableTree.postOrderTraversal(testableTree.root, (node) => {
      visitedNodes.push(node.data.value);
    });
    expect(visitedNodes).toEqual([4, 5, 2, 7, 8, 6, 3, 1]);
  });

  test('Pre-order traversal handles empty tree', () => {
    const emptyTree = new NaryTree<number>();
    const visitedNodes: number[] = [];
    emptyTree.preOrderTraversal(emptyTree.root, (node) => {
      visitedNodes.push(node.data.value);
    });
    expect(visitedNodes).toEqual([]);
  });

  test('In-order traversal handles tree with only root', () => {
    const rootNode = new NaryTreeNode<number>(1);
    const treeWithRootOnly = new NaryTree<number>();
    treeWithRootOnly.root = rootNode;
    const visitedNodes: number[] = [];
    treeWithRootOnly.inOrderTraversal(treeWithRootOnly.root, (node) => {
      visitedNodes.push(node.data.value);
    });
    expect(visitedNodes).toEqual([1]);
  });
});
