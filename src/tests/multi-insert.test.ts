import { NaryTree, NaryTreeNode } from '../index';

describe('insertNodes', () => {
  let testableTree: NaryTree<number>;
  let rootNode: NaryTreeNode<number>;

  beforeEach(() => {
    testableTree = new NaryTree<number>();
    rootNode = testableTree.insertNode(null, 1);
  });

  test('Inserts nodes under a non-null parent', () => {
    const parent = rootNode;
    const values = [2, 3, 4];
    const insertedNodes = testableTree.insertNodes(parent, values);
    expect(insertedNodes).toHaveLength(values.length);
    expect(insertedNodes.map((node) => node?.data.value)).toEqual(values);
    expect(parent.data.children).toHaveLength(values.length);
  });

  test('Throws an error if parent is null', () => {
    const parent = null;
    const values = [2, 3, 4];
    expect(() => testableTree.insertNodes(parent, values)).toThrowError(
      'Inserting multiple values cannot happen with a null parent'
    );
  });
});
