import { NaryTree, NaryTreeNode } from '../index';

describe('NaryTree Size', () => {
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

  test('calculateSize method calculates tree size correctly', () => {
    expect(testableTree.calculateSize()).toBe(14);
  });

  test('calculateSize method returns 0 for empty tree', () => {
    const emptyTree = new NaryTree<number>();
    expect(emptyTree.calculateSize()).toBe(0);
  });

  test('calculateSize method returns 1 for tree with only root node', () => {
    const rootNode = new NaryTreeNode<number>(10);
    const treeWithRootOnly = new NaryTree<number>();
    treeWithRootOnly.root = rootNode;
    expect(treeWithRootOnly.calculateSize()).toBe(1);
  });

  test('calculateSize method calculates size correctly for tree with one level of children', () => {
    const rootNode = new NaryTreeNode<number>(10);
    const child1 = new NaryTreeNode<number>(20);
    const child2 = new NaryTreeNode<number>(30);
    rootNode.data.children.push(child1, child2);
    const treeWithChildren = new NaryTree<number>();
    treeWithChildren.root = rootNode;
    expect(treeWithChildren.calculateSize()).toBe(3);
  });

  test('calculateSize method calculates size correctly for tree with multiple levels of children', () => {
    const rootNode = new NaryTreeNode<number>(10);
    const child1 = new NaryTreeNode<number>(20);
    const child2 = new NaryTreeNode<number>(30);
    rootNode.data.children.push(child1, child2);
    const grandchild1 = new NaryTreeNode<number>(40);
    const grandchild2 = new NaryTreeNode<number>(50);
    child1.data.children.push(grandchild1, grandchild2);
    const treeWithMultipleLevels = new NaryTree<number>();
    treeWithMultipleLevels.root = rootNode;
    expect(treeWithMultipleLevels.calculateSize()).toBe(5);
  });
});
