import { NaryTree, NaryTreeNode } from '../index';

describe('Leaf Nodes and Siblings', () => {
  let testableTree: NaryTree<number>;
  let rootNode: NaryTreeNode<number>;
  let child1: NaryTreeNode<number>;
  let child2: NaryTreeNode<number>;
  let grandchild1: NaryTreeNode<number>;
  let grandchild2: NaryTreeNode<number>;
  let grandchild3: NaryTreeNode<number>;
  let greatgrandchild1: NaryTreeNode<number>;
  let greatgrandchild2: NaryTreeNode<number>;

  beforeEach(() => {
    testableTree = new NaryTree<number>();

    rootNode = testableTree.insertNode(null, 1);
    child1 = testableTree.insertNode(rootNode, 2);
    child2 = testableTree.insertNode(rootNode, 3);
    grandchild1 = testableTree.insertNode(child1, 4);
    grandchild2 = testableTree.insertNode(child1, 5);
    grandchild3 = testableTree.insertNode(child2, 6);
    greatgrandchild1 = testableTree.insertNode(grandchild3, 7);
    greatgrandchild2 = testableTree.insertNode(grandchild3, 8);
  });

  test('findLeafNodes returns an array with leaf nodes', () => {
    const leafNodes = testableTree.findLeafNodes();
    expect(leafNodes).toHaveLength(4);
    expect(leafNodes.map((node) => node.data.value)).toEqual([4, 5, 7, 8]);
  });

  test('findLeafNodes returns an empty array when called on a tree with no leaf nodes', () => {
    const treeWithNoLeaf = new NaryTree<number>();
    treeWithNoLeaf.insertNode(null, 1);
    const leafNodes = treeWithNoLeaf.findLeafNodes();
    expect(leafNodes).toHaveLength(1); // Only the root node
  });

  test('findSiblings returns an array with siblings of a node', () => {
    const siblingNodes = testableTree.findSiblings(grandchild1);
    expect(siblingNodes).toHaveLength(1);
    expect(siblingNodes[0].data.value).toBe(5);
  });

  test('findSiblings returns an empty array when called on the root node', () => {
    const rootSiblings = testableTree.findSiblings(rootNode);
    expect(rootSiblings).toEqual([]);
  });

  test('findSiblings returns an empty array when called on a node with no parent', () => {
    const nodeWithNoParent = testableTree.findSiblings(rootNode);
    expect(nodeWithNoParent).toEqual([]);
  });
});
