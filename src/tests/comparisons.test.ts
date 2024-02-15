import { NaryTree, NaryTreeNode } from '../index';

describe('Tree Comparison', () => {
  let testableTree1: NaryTree<number>;
  let testableTree2: NaryTree<number>;
  let rootNode1: NaryTreeNode<number>;
  let rootNode2: NaryTreeNode<number>;
  let child1: NaryTreeNode<number>;
  let child2: NaryTreeNode<number>;
  let grandchild1: NaryTreeNode<number>;
  let grandchild2: NaryTreeNode<number>;

  beforeEach(() => {
    testableTree1 = new NaryTree<number>();
    testableTree2 = new NaryTree<number>();

    rootNode1 = testableTree1.insertNode(null, 1);
    rootNode2 = testableTree2.insertNode(null, 1);

    child1 = testableTree1.insertNode(rootNode1, 2);
    child2 = testableTree2.insertNode(rootNode2, 2);

    grandchild1 = testableTree1.insertNode(child1, 3);
    grandchild2 = testableTree2.insertNode(child2, 3);
  });

  test('areNodesIdenticalByReference returns true when nodes are identical by reference', () => {
    const nodeCopy = testableTree1.findNodeWithValue(child1.data.value);
    expect(testableTree1.areNodesIdenticalByReference(child1, nodeCopy)).toBe(
      true
    );
  });

  test('areNodesIdenticalByReference returns false when nodes are not identical by reference', () => {
    expect(testableTree1.areNodesIdenticalByReference(child1, child2)).toBe(
      false
    );
  });

  test('areNodesIdenticalByValue returns true when nodes are identical by value', () => {
    expect(testableTree1.areNodesIdenticalByValue(child1, child2)).toBe(true);
  });

  test('areNodesIdenticalByValue returns false when nodes are not identical by value', () => {
    testableTree2.updateNodeValue(grandchild2, 100);
    expect(
      testableTree1.areNodesIdenticalByValue(grandchild1, grandchild2)
    ).toBe(false);
  });
});
