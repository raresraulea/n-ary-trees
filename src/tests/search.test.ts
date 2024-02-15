import { NaryTree, NaryTreeNode } from '../index';

describe('NaryTree Search', () => {
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

  test('Find node with existing value', () => {
    const nodeWithValue4 = testableTree.findNodeWithValue(4);
    expect(nodeWithValue4?.data.value).toBe(4);
  });

  test('Find node with non-existing value', () => {
    const nodeWithNonExistingValue = testableTree.findNodeWithValue(100);
    expect(nodeWithNonExistingValue).toBeNull();
  });

  test('Find node with existing value starting from a subtree root', () => {
    const child1 = rootNode.data.children[0];
    const nodeWithValue5 = testableTree.findNodeWithValue(5, child1);
    expect(nodeWithValue5?.data.value).toBe(5);
  });

  test('Find node with non-existing value starting from a subtree root', () => {
    const child1 = rootNode.data.children[0];
    const nodeWithNonExistingValue = testableTree.findNodeWithValue(
      100,
      child1
    );
    expect(nodeWithNonExistingValue).toBeNull();
  });

  test('Find nodes with even values', () => {
    const evenNodes = testableTree.findNodesWithCondition(
      (value) => value % 2 === 0
    );
    expect(evenNodes.map((node) => node.data.value).sort()).toEqual([
      2, 4, 6, 8
    ]);
  });

  test('Find nodes with odd values', () => {
    const oddNodes = testableTree.findNodesWithCondition(
      (value) => value % 2 !== 0
    );
    expect(oddNodes.map((node) => node.data.value).sort()).toEqual([
      1, 3, 5, 7
    ]);
  });

  test('Find nodes with values greater than 5', () => {
    const nodesGreaterThan5 = testableTree.findNodesWithCondition(
      (value) => value > 5
    );
    expect(nodesGreaterThan5.map((node) => node.data.value)).toEqual([6, 7, 8]);
  });
});
