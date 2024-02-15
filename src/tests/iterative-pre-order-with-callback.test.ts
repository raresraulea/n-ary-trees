import { NaryTree, NaryTreeNode } from '../index';

describe('Iterative Pre-Order Traversal', () => {
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

  test('Visits nodes in pre-order correctly', () => {
    const visitedNodes: number[] = [];
    testableTree.iterativePreOrderTraversal((node) => {
      visitedNodes.push(node.data.value);
    });
    expect(visitedNodes).toEqual([1, 2, 4, 6, 5, 3]);
  });

  test('Handles an empty tree', () => {
    testableTree = new NaryTree<number>();
    const visitedNodes: number[] = [];
    testableTree.iterativePreOrderTraversal((node) => {
      visitedNodes.push(node.data.value);
    });
    expect(visitedNodes).toEqual([]);
  });

  test('Handles a tree with only the root node', () => {
    testableTree = new NaryTree<number>();
    testableTree.insertNode(null, 1);
    const visitedNodes: number[] = [];
    testableTree.iterativePreOrderTraversal((node) => {
      visitedNodes.push(node.data.value);
    });
    expect(visitedNodes).toEqual([1]);
  });

  test('Handles a tree with multiple levels and uneven branching', () => {
    testableTree.insertNode(child2, 7);
    const visitedNodes: number[] = [];
    testableTree.iterativePreOrderTraversal((node) => {
      visitedNodes.push(node.data.value);
    });
    expect(visitedNodes).toEqual([1, 2, 4, 6, 5, 3, 7]);
  });
});
