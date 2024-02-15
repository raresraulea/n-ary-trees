import { NaryTree, NaryTreeNode } from '../index';

describe('NaryTree Get Nodes', () => {
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

  test('Get nodes by level correctly', () => {
    const nodesByLevel = testableTree.getNodesByLevel();

    expect(nodesByLevel[0]).toEqual([rootNode]);
    expect(nodesByLevel[1]).toEqual([
      rootNode.data.children[0],
      rootNode.data.children[1]
    ]);
    expect(nodesByLevel[2]).toEqual([
      rootNode.data.children[0].data.children[0],
      rootNode.data.children[0].data.children[1],
      rootNode.data.children[1].data.children[0]
    ]);
    expect(nodesByLevel[3]).toEqual([
      rootNode.data.children[1].data.children[0].data.children[0],
      rootNode.data.children[1].data.children[0].data.children[1]
    ]);
    expect(nodesByLevel[4]).toEqual(undefined);
  });

  test('Get node values by level correctly', () => {
    const valuesByLevel = testableTree.getNodeValuesByLevel();

    expect(valuesByLevel[0]).toEqual([1]);
    expect(valuesByLevel[1]).toEqual([2, 3]);
    expect(valuesByLevel[2]).toEqual([4, 5, 6]);
    expect(valuesByLevel[3]).toEqual([7, 8]);
  });

  test('Get serialized nodes by level correctly', () => {
    const serializedNodesByLevel = testableTree.getSerializedNodesByLevel();

    expect(serializedNodesByLevel[0]).toEqual([
      '{ "value": 1, "children": [{ "value": 2, "children": [{ "value": 4, "children": [] }, { "value": 5, "children": [] }] }, { "value": 3, "children": [{ "value": 6, "children": [{ "value": 7, "children": [] }, { "value": 8, "children": [] }] }] }] }'
    ]);
    expect(serializedNodesByLevel[1]).toEqual([
      '{ "value": 2, "children": [{ "value": 4, "children": [] }, { "value": 5, "children": [] }] }',
      '{ "value": 3, "children": [{ "value": 6, "children": [{ "value": 7, "children": [] }, { "value": 8, "children": [] }] }] }'
    ]);
    expect(serializedNodesByLevel[2]).toEqual([
      '{ "value": 4, "children": [] }',
      '{ "value": 5, "children": [] }',
      '{ "value": 6, "children": [{ "value": 7, "children": [] }, { "value": 8, "children": [] }] }'
    ]);
    expect(serializedNodesByLevel[3]).toEqual([
      '{ "value": 7, "children": [] }',
      '{ "value": 8, "children": [] }'
    ]);
  });
});
