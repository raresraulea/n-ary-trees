import { NaryTree, NaryTreeNode } from '../index';

describe('Level Order Traversal with Callback', () => {
  let testableTree: NaryTree<number>;
  let rootNode: NaryTreeNode<number>;
  let child1: NaryTreeNode<number>;
  let child2: NaryTreeNode<number>;
  let grandchild1: NaryTreeNode<number>;
  let grandchild2: NaryTreeNode<number>;
  let greatGrandchild1: NaryTreeNode<number>;

  beforeEach(() => {
    testableTree = new NaryTree<number>();

    rootNode = testableTree.insertNode(null, 1);
    child1 = testableTree.insertNode(rootNode, 2);
    child2 = testableTree.insertNode(rootNode, 3);
    grandchild1 = testableTree.insertNode(child1, 4);
    grandchild2 = testableTree.insertNode(child1, 5);
    greatGrandchild1 = testableTree.insertNode(grandchild1, 6);
  });

  test('Traverses levels with callback correctly', () => {
    const visitedLevels: number[] = [];
    const visitedNodes: number[][] = [];
    testableTree.levelOrderTraversalWithCallback((level, nodes) => {
      visitedLevels.push(level);
      visitedNodes.push(nodes.map((n) => n.data.value));
    });
    expect(visitedLevels).toEqual([0, 1, 2, 3]);
    expect(visitedNodes).toEqual([[1], [2, 3], [4, 5], [6]]);
  });

  test('Handles an empty tree', () => {
    testableTree = new NaryTree<number>();
    const visitedLevels: number[] = [];
    const visitedNodes: number[][] = [];
    testableTree.levelOrderTraversalWithCallback((level, nodes) => {
      visitedLevels.push(level);
      visitedNodes.push(nodes.map((n) => n.data.value));
    });
    expect(visitedLevels).toEqual([]);
    expect(visitedNodes).toEqual([]);
  });

  test('Handles a tree with only the root node', () => {
    testableTree = new NaryTree<number>();
    testableTree.insertNode(null, 1);
    const visitedLevels: number[] = [];
    const visitedNodes: number[][] = [];
    testableTree.levelOrderTraversalWithCallback((level, nodes) => {
      visitedLevels.push(level);
      visitedNodes.push(nodes.map((n) => n.data.value));
    });
    expect(visitedLevels).toEqual([0]);
    expect(visitedNodes).toEqual([[1]]);
  });

  test('Handles a tree with multiple levels and uneven branching', () => {
    testableTree.insertNode(child2, 7);
    const visitedLevels: number[] = [];
    const visitedNodes: number[][] = [];
    testableTree.levelOrderTraversalWithCallback((level, nodes) => {
      visitedLevels.push(level);
      visitedNodes.push(nodes.map((n) => n.data.value));
    });
    expect(visitedLevels).toEqual([0, 1, 2, 3]);
    expect(visitedNodes).toEqual([[1], [2, 3], [4, 5, 7], [6]]);
  });
});
