import { NaryTree, NaryTreeNode, Nullable } from '../index';

describe('NaryTree (De)Serialization', () => {
  let testableTree: NaryTree<number>;
  let rootNode: Nullable<NaryTreeNode<number>>;

  beforeEach(() => {
    testableTree = new NaryTree<number>();

    rootNode = testableTree.insertNode(null, 1);
    if (!rootNode) return;
    const child1 = testableTree.insertNode(rootNode, 2);
    const child2 = testableTree.insertNode(rootNode, 3);
    const grandchild1 = testableTree.insertNode(child1, 4);
    const grandchild2 = testableTree.insertNode(child1, 5);
    const grandchild3 = testableTree.insertNode(child2, 6);
    const greatgrandchild1 = testableTree.insertNode(grandchild3, 7);
    const greatgrandchild2 = testableTree.insertNode(grandchild3, 8);
  });

  test('Serialize and deserialize tree correctly', () => {
    const serializedTree = testableTree.serializeTree(rootNode);
    const deserializedTree = testableTree.deserializeTree(serializedTree);

    expect(deserializedTree).not.toBeNull();
    expect(deserializedTree!.data.value).toBe(1);
    expect(deserializedTree!.data.children.length).toBe(2);
    expect(deserializedTree!.data.children[0].data.value).toBe(2);
    expect(deserializedTree!.data.children[1].data.value).toBe(3);
    expect(deserializedTree!.data.children[0].data.children.length).toBe(2);
    expect(deserializedTree!.data.children[1].data.children.length).toBe(1);
  });

  test('Serialize and deserialize tree correctly for single node', () => {
    const singleNodeTree = new NaryTree<number>();
    const singleNode = singleNodeTree.insertNode(null, 42);
    const serializedTree = singleNodeTree.serializeTree(singleNode);
    const deserializedTree = singleNodeTree.deserializeTree(serializedTree);

    expect(deserializedTree).not.toBeNull();
    expect(deserializedTree!.data.value).toBe(42);
    expect(deserializedTree!.data.children.length).toBe(0);
  });

  test('Serialize and deserialize null tree', () => {
    const serializedTree = testableTree.serializeTree(null);
    const deserializedTree = testableTree.deserializeTree(serializedTree);

    expect(deserializedTree).toBeNull();
  });
});
