import { NaryTree, NaryTreeNode } from '../index';

describe('NaryTree Ancestors', () => {
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

  test('Find common ancestor of two leaf nodes', () => {
    const commonAncestor = testableTree.findCommonAncestor(
      grandchild1,
      grandchild2
    );
    expect(commonAncestor?.data.value).toBe(2);
  });

  test('Find common ancestor of a leaf node and its parent', () => {
    const commonAncestor = testableTree.findCommonAncestor(grandchild1, child1);
    expect(commonAncestor?.data.value).toBe(2);
  });

  test('Find common ancestor of two nodes at different depths', () => {
    const commonAncestor = testableTree.findCommonAncestor(grandchild1, child2);
    expect(commonAncestor?.data.value).toBe(1);
  });

  test('Find common ancestor of two leaf nodes with common parent', () => {
    const commonAncestor = testableTree.findCommonAncestor(
      grandchild1,
      grandchild2
    );
    expect(commonAncestor?.data.value).toBe(2);
  });

  test('Find lowest common ancestor of multiple leaf nodes', () => {
    const commonAncestor = testableTree.findLowestCommonAncestor([
      grandchild1,
      grandchild2
    ]);
    expect(commonAncestor?.data.value).toBe(2);
  });

  test('Find lowest common ancestor of multiple nodes at different depths', () => {
    const commonAncestor = testableTree.findLowestCommonAncestor([
      grandchild1,
      child2
    ]);
    expect(commonAncestor?.data.value).toBe(1);
  });

  test('Find lowest common ancestor of multiple nodes with common parent', () => {
    const commonAncestor = testableTree.findLowestCommonAncestor([
      grandchild1,
      child1
    ]);
    expect(commonAncestor?.data.value).toBe(2);
  });

  test('Find lowest common ancestor of multiple nodes with common ancestor', () => {
    const commonAncestor = testableTree.findLowestCommonAncestor([
      grandchild1,
      grandchild2,
      greatgrandchild1
    ]);
    expect(commonAncestor?.data.value).toBe(1);
  });

  test('Find lowest common ancestor of multiple nodes with the root as ancestor', () => {
    const commonAncestor = testableTree.findLowestCommonAncestor([
      child1,
      child2
    ]);
    expect(commonAncestor?.data.value).toBe(1);
  });

  test('Find lowest common ancestor of empty array returns null', () => {
    const commonAncestor = testableTree.findLowestCommonAncestor([]);
    expect(commonAncestor).toBeNull();
  });
});
