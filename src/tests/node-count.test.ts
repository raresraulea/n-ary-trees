import { NaryTree, NaryTreeNode } from '../index';

describe('Node Count at Each Level', () => {
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

  test('Counts nodes at each level correctly for a balanced tree', () => {
    const counts = testableTree.countNodesAtEachLevel();
    expect(counts[0]).toBe(1);
    expect(counts[1]).toBe(2);
    expect(counts[2]).toBe(2);
    expect(counts[3]).toBe(1);
  });

  test('Counts nodes at each level correctly for a tree with only root node', () => {
    testableTree = new NaryTree<number>();
    testableTree.insertNode(null, 1);
    const counts = testableTree.countNodesAtEachLevel();
    expect(counts[0]).toBe(1);
    expect(Object.keys(counts)).toHaveLength(1);
  });

  test('Counts nodes at each level correctly for a tree with multiple levels and uneven branching', () => {
    testableTree.insertNode(rootNode, 6);
    const counts = testableTree.countNodesAtEachLevel();
    expect(counts[0]).toBe(1);
    expect(counts[1]).toBe(3);
    expect(counts[2]).toBe(2);
    expect(counts[3]).toBe(1);
  });

  test('Counts nodes at each level correctly for an empty tree', () => {
    testableTree = new NaryTree<number>();
    const counts = testableTree.countNodesAtEachLevel();
    expect(Object.keys(counts)).toHaveLength(0);
  });
});
