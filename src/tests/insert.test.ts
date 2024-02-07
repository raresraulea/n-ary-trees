import { NaryTree, NaryTreeNode } from '../index';

describe('NaryTree insertNode', () => {
  let testableTree: NaryTree<number>;

  beforeEach(() => {
    testableTree = new NaryTree<number>();
  });

  test('insertNode method inserts node correctly as root', () => {
    const newNode = testableTree.insertNode(null, 10);
    expect(testableTree.root).toBe(newNode);
    expect(newNode.data.value).toBe(10);
  });

  test('insertNode method inserts node correctly as child', () => {
    const rootNode = testableTree.insertNode(null, 10);
    const newNode = testableTree.insertNode(rootNode, 20);
    expect(rootNode.data.children).toContain(newNode);
    expect(newNode.data.value).toBe(20);
    expect(newNode.parent).toBe(rootNode);
  });

  test('insertNode method returns the inserted node', () => {
    const rootNode = testableTree.insertNode(null, 10);
    const newNode = testableTree.insertNode(rootNode, 20);
    expect(newNode).toBeInstanceOf(NaryTreeNode);
    expect(newNode.data.value).toBe(20);
    expect(newNode.parent).toBe(rootNode);
  });

  test('insertNode method inserts node correctly as grandchild', () => {
    const rootNode = testableTree.insertNode(null, 10);
    const childNode = testableTree.insertNode(rootNode, 20);
    const grandchildNode = testableTree.insertNode(childNode, 30);
    expect(childNode.data.children).toContain(grandchildNode);
    expect(grandchildNode.data.value).toBe(30);
    expect(grandchildNode.parent).toBe(childNode);
  });

  test('insertNode method inserts multiple children correctly', () => {
    const rootNode = testableTree.insertNode(null, 10);
    const child1 = testableTree.insertNode(rootNode, 20);
    const child2 = testableTree.insertNode(rootNode, 30);
    expect(rootNode.data.children).toContain(child1);
    expect(rootNode.data.children).toContain(child2);
    expect(child1.parent).toBe(rootNode);
    expect(child2.parent).toBe(rootNode);
  });

  test('insertNode method returns null when parent is null', () => {
    const newNode = testableTree.insertNode(null, 10);
    expect(testableTree.root).toBe(newNode);
    expect(newNode.parent).toBeNull();
  });

  test('insertNode method creates new root when inserting child to null parent', () => {
    const newNode = testableTree.insertNode(null, 10);
    const childNode = testableTree.insertNode(null, 20);
    expect(testableTree.root).toBe(childNode);
    expect(childNode.parent).toBeNull();
  });

  test('insertNode method allows insertion of duplicate values', () => {
    const rootNode = testableTree.insertNode(null, 10);
    const childNode = testableTree.insertNode(rootNode, 20);
    const duplicateNode = testableTree.insertNode(rootNode, 20);
    expect(rootNode.data.children.length).toBe(2);
  });
});
