import { NaryTree, NaryTreeNode } from '../index';

describe('findShortestPath', () => {
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

  test('Throws error if start node is null', () => {
    const startNode = null;
    const endNode = testableTree.findNodeWithValue(3);
    expect(() => testableTree.findShortestPath(startNode, endNode)).toThrow(
      'Missing start node!'
    );
  });

  test('Throws error if end node is null', () => {
    const startNode = testableTree.findNodeWithValue(4);
    const endNode = null;
    expect(() => testableTree.findShortestPath(startNode, endNode)).toThrow(
      'Missing end node!'
    );
  });

  test('Finds shortest path between nodes', () => {
    const startNode = testableTree.findNodeWithValue(4);
    const endNode = testableTree.findNodeWithValue(5);
    const shortestPath = testableTree.findShortestPath(startNode, endNode);
    console.log({ shortestPath: shortestPath?.map((node) => node.data.value) });
    expect(shortestPath).toHaveLength(3);
    expect(shortestPath?.map((node) => node.data.value)).toEqual([4, 2, 5]);
  });

  test('Finds shortest path between root and leaf', () => {
    const startNode = testableTree.findNodeWithValue(1);
    const endNode = testableTree.findNodeWithValue(4);
    const shortestPath = testableTree.findShortestPath(startNode, endNode);
    console.log({
      shortestPath: shortestPath?.map((node) => node.data.value)
    });
    expect(shortestPath).toHaveLength(3);
    expect(shortestPath?.map((node) => node.data.value)).toEqual([1, 2, 4]);
  });

  test('Finds shortest path between siblings in the same subtree', () => {
    const startNode = testableTree.findNodeWithValue(4);
    const endNode = testableTree.findNodeWithValue(5);
    const shortestPath = testableTree.findShortestPath(startNode, endNode);
    console.log({
      shortestPath: shortestPath?.map((node) => node.data.value)
    });
    expect(shortestPath).toHaveLength(3);
    expect(shortestPath?.map((node) => node.data.value)).toEqual([4, 2, 5]);
  });

  test('Finds shortest path between siblings in different subtrees', () => {
    const startNode = testableTree.findNodeWithValue(4);
    const endNode = testableTree.findNodeWithValue(6);
    const shortestPath = testableTree.findShortestPath(startNode, endNode);

    expect(shortestPath).toHaveLength(5);
    expect(shortestPath?.map((node) => node.data.value)).toEqual([
      4, 2, 1, 3, 6
    ]);
  });
});
