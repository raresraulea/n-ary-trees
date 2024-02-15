import { NaryTree, NaryTreeNode } from '../index';

describe('NaryTree paths', () => {
  let testableTree: NaryTree<number>;
  let rootNode: NaryTreeNode<number>;
  let child1: NaryTreeNode<number>;
  let grandchild1: NaryTreeNode<number>;

  beforeEach(() => {
    testableTree = new NaryTree<number>();

    rootNode = testableTree.insertNode(null, 1);
    child1 = testableTree.insertNode(rootNode, 2);
    const child2 = testableTree.insertNode(rootNode, 3);
    grandchild1 = testableTree.insertNode(child1, 4);
    const grandchild2 = testableTree.insertNode(child1, 5);
    const grandchild3 = testableTree.insertNode(child2, 6);
    const greatgrandchild1 = testableTree.insertNode(grandchild3, 7);
    const greatgrandchild2 = testableTree.insertNode(grandchild3, 8);
  });

  test('Find path from leaf node to root', () => {
    const path = testableTree.findPathToNode(grandchild1);
    expect(path.map((node) => node.data.value)).toEqual([1, 2, 4]);
  });

  test('Find path from node to itself', () => {
    const path = testableTree.findPathToNode(child1, child1);
    expect(path.map((node) => node.data.value)).toEqual([2]);
  });

  test('Find path from root node to itself', () => {
    const path = testableTree.findPathToNode(rootNode, rootNode);
    expect(path.map((node) => node.data.value)).toEqual([1]);
  });

  test('Find path from root node to leaf node', () => {
    const path = testableTree.findPathToNode(grandchild1, rootNode);
    expect(path.map((node) => node.data.value)).toEqual([1, 2, 4]);
  });
});
