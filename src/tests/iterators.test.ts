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

  test('Pre-order iterator traverses tree correctly', () => {
    const preOrderValues: number[] = [];
    const iterator = testableTree.preOrderIterator(rootNode);
    for (const node of iterator) {
      preOrderValues.push(node.data.value);
    }
    expect(preOrderValues).toEqual([1, 2, 4, 5, 3, 6, 7, 8]);
  });

  test('In-order iterator traverses tree correctly', () => {
    const inOrderValues: number[] = [];
    const iterator = testableTree.inOrderIterator(rootNode);
    for (const node of iterator) {
      inOrderValues.push(node.data.value);
    }
    expect(inOrderValues).toEqual([4, 2, 5, 1, 7, 6, 8, 3]);
  });

  test('Post-order iterator traverses tree correctly', () => {
    const postOrderValues: number[] = [];
    const iterator = testableTree.postOrderIterator(rootNode);
    for (const node of iterator) {
      postOrderValues.push(node.data.value);
    }
    expect(postOrderValues).toEqual([4, 5, 2, 7, 8, 6, 3, 1]);
  });

  test('Level-order iterator traverses tree correctly', () => {
    const levelOrderValues: number[] = [];
    const iterator = testableTree.levelOrderIterator(rootNode);
    for (const node of iterator) {
      levelOrderValues.push(node.data.value);
    }
    expect(levelOrderValues).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
