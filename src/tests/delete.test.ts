import { NaryTree, NaryTreeNode } from '../index';

describe('NaryTree', () => {
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

  test('Delete leaf node correctly', () => {
    const leafNode = rootNode.data.children[0].data.children[0];
    testableTree.deleteNode(leafNode);
    expect(rootNode.data.children[0].data.children).toHaveLength(1);
  });

  test('Delete node with one child correctly', () => {
    const oldSize = testableTree.calculateSize();
    const nodeWithOneChild = rootNode.data.children[1];
    testableTree.deleteNode(nodeWithOneChild);
    expect(testableTree.calculateSize()).toBe(oldSize - 1);
    expect(rootNode.data.children[1].data.value).toBe(6);
  });

  test('Delete node with multiple children with promotion strategy "all"', () => {
    const nodeWithMultipleChildren = rootNode.data.children[0];
    testableTree.deleteNode(nodeWithMultipleChildren, 'all');
    expect(rootNode.data.children).toHaveLength(3);
    expect(rootNode.data.children.map((v) => v.data.value)).toEqual([3, 4, 5]);
  });

  test('Delete node with multiple children with promotion strategy "first"', () => {
    const nodeWithMultipleChildren = rootNode.data.children[0];
    testableTree.deleteNode(nodeWithMultipleChildren);
    expect(rootNode.data.children).toHaveLength(2);
    expect(rootNode.data.children[0].data.value).toBe(4);
    expect(rootNode.data.children[0].data.children[0].data.value).toBe(5);
  });

  test('Delete node with value correctly using promotion strategy "first"', () => {
    const oldSize = testableTree.calculateSize();
    testableTree.deleteNodeWithValue(5);
    expect(testableTree.calculateSize()).toBe(oldSize - 1);
    expect(
      rootNode.data.children[0].data.children.map((child) => child.data.value)
    ).not.toContain(5);
  });

  test('Delete node with value correctly using promotion strategy "all"', () => {
    const oldSize = testableTree.calculateSize();
    testableTree.deleteNodeWithValue(2, 'all');
    expect(testableTree.calculateSize()).toBe(oldSize - 1);
    expect(
      rootNode.data.children.map((child) => child.data.value)
    ).not.toContain(2);
  });

  test('Delete non-existent node returns null', () => {
    const oldSize = testableTree.calculateSize();
    testableTree.deleteNodeWithValue(10);
    expect(testableTree.calculateSize()).toBe(oldSize);
  });
});
