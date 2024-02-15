import { NaryTree, NaryTreeNode } from '../index';

describe('NaryTree Balance', () => {
  let testableTree: NaryTree<number>;
  let rootNode: NaryTreeNode<number>;

  beforeEach(() => {
    testableTree = new NaryTree<number>();

    rootNode = testableTree.insertNode(null, 1);
    const child1 = testableTree.insertNode(rootNode, 2);
    const child2 = testableTree.insertNode(rootNode, 3);
    const grandchild1 = testableTree.insertNode(child1, 4);
    const grandchild2 = testableTree.insertNode(child1, 5);
    const grandchild3 = testableTree.insertNode(child2, 6);
    const greatgrandchild1 = testableTree.insertNode(grandchild3, 7);
    const greatgrandchild2 = testableTree.insertNode(grandchild3, 8);
  });

  test('Insert balanced tree correctly with existing nodes', () => {
    const values = [9, 10, 11, 12, 13, 14, 15];
    const newRoot = testableTree.insertBalanced(values);

    expect(newRoot).not.toBeNull();
    expect(testableTree.isBalanced(newRoot)).toBe(true);
    expect(testableTree.calculateSize(newRoot)).toBe(values.length + 8);
  });

  test('Insert balanced tree correctly with empty tree', () => {
    const emptyTree = new NaryTree<number>();
    const values = [1, 2, 3, 4, 5];
    const newRoot = emptyTree.insertBalanced(values);

    expect(newRoot).not.toBeNull();
    expect(emptyTree.isBalanced(newRoot)).toBe(true);
    expect(emptyTree.calculateSize(newRoot)).toBe(values.length);
  });

  test('Get all node values correctly from subtree', () => {
    const child1 = rootNode.data.children[0];
    const allNodeValues = testableTree.getAllNodeValues(child1);
    expect(allNodeValues).toEqual([2, 4, 5]);
  });

  test('Build balanced tree correctly with empty range', () => {
    const sortedValues: number[] = [];
    const newRoot = testableTree.buildBalancedTree(
      sortedValues,
      0,
      sortedValues.length - 1,
      null
    );

    expect(newRoot).toBeNull();
  });
});
