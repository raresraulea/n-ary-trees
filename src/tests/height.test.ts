import { NaryTree, NaryTreeNode } from '../index';

describe('NaryTree Height', () => {
  let testableTree: NaryTree<number>;

  beforeEach(() => {
    testableTree = new NaryTree<number>();

    const rootNode = testableTree.insertNode(null, 10);
    const childOne = testableTree.insertNode(rootNode, 20);
    const childTwo = testableTree.insertNode(rootNode, 30);
    const grandchild1 = testableTree.insertNode(childOne, 40);
    const grandgrandchild1 = testableTree.insertNode(grandchild1, 50);

    const mySortedValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    testableTree.insertBalanced(mySortedValues);
  });

  test('calculateHeight method calculates tree height correctly without specifying root', () => {
    expect(testableTree.calculateHeight()).toBe(4);
  });

  test('calculateHeight method calculates tree height correctly with specifying subtree root', () => {
    const subtreeRoot = testableTree.root?.data.children[0];
    expect(testableTree.calculateHeight(subtreeRoot)).toBe(3);
  });

  test('calculateHeight method calculates tree height correctly for leaf node', () => {
    const leafNode = testableTree.findNodeWithValue(50);
    expect(leafNode).not.toBeNull();
    expect(testableTree.calculateHeight(leafNode)).toBe(1);
  });

  test('calculateHeight method returns 0 for empty tree', () => {
    const emptyTree = new NaryTree<number>();
    expect(emptyTree.calculateHeight()).toBe(0);
  });

  test('calculateHeight method returns 1 for tree with only root node', () => {
    const rootNode = new NaryTreeNode<number>(10);
    const treeWithRootOnly = new NaryTree<number>();
    treeWithRootOnly.root = rootNode;
    expect(treeWithRootOnly.calculateHeight()).toBe(1);
  });
});
