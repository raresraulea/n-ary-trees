import { NaryTree, NaryTreeNode } from './index';

let a = 4;
const testableTree = new NaryTree<number>();

beforeEach(() => {
  let rootNode: NaryTreeNode<number> | null = testableTree.insertNode(null, 10);
  const childOne = testableTree.insertNode(rootNode, 20);
  const childTwo = testableTree.insertNode(rootNode, 30);
  const grandchild1 = testableTree.insertNode(childOne, 40);
  const grandgrandchild1 = testableTree.insertNode(grandchild1, 50);

  const mySortedValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  rootNode = testableTree.insertBalanced(mySortedValues);
});

test('calculates tree height correctly without specifying root', () => {
  expect(testableTree.calculateHeight()).toBe(4);
});

test('calculates tree height correctly with specifying subtree root', () => {
  expect(
    testableTree.calculateHeight(testableTree.root?.data.children[0])
  ).toBe(3);
});

test('calculates tree height correctly for leaf node', () => {
  expect(testableTree.calculateHeight(testableTree.findNodeWithValue(50))).toBe(
    1
  );
});

test('calculates tree size correctly', () => {
  expect(testableTree.calculateSize()).toBe(14);
});
