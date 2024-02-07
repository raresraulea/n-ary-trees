type NodeData<T> = {
  value: T;
  children: NaryTreeNode<T>[];
};

type ChildPromotionStrategy = 'all' | 'first';

export class NaryTreeNode<T> {
  data: NodeData<T>;
  parent: NaryTreeNode<T> | null;

  constructor(value: T, parent: NaryTreeNode<T> | null = null) {
    this.data = { value, children: [] };
    this.parent = parent;
  }
}

export class NaryTree<T> {
  root: NaryTreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  insertNode(
    parent: NaryTreeNode<T> | null = this.root,
    value: T
  ): NaryTreeNode<T> {
    const newNode = new NaryTreeNode(value, parent);

    if (!parent) {
      this.root = newNode;
    } else {
      parent.data.children.push(newNode);
    }

    return newNode;
  }

  updateNodeValue(node: NaryTreeNode<T>, newValue: T): void {
    node.data.value = newValue;
  }

  preOrderTraversal(
    node: NaryTreeNode<T> | null = this.root,
    callback: (node: NaryTreeNode<T>) => void
  ) {
    if (node) {
      callback(node);
      node.data.children.forEach((child) =>
        this.preOrderTraversal(child, callback)
      );
    }
  }

  // Conventie:
  // Avand in vedere numarul arbitrar de copii ai arborelui n-ar, traversarea in-order se va face prin vizitarea copiilor in afara de ultimul, aplicarea functiei de prelucrare/vizitare a nodului, iar apoi continuarea recursiva a vizitarii ultimului nod copil
  inOrderTraversal(
    node: NaryTreeNode<T> | null = this.root,
    callbackOnNodeVisit: (node: NaryTreeNode<T>) => void
  ) {
    if (node) {
      if (node.data.children.length === 1) {
        this.inOrderTraversal(node.data.children[0], callbackOnNodeVisit);
      }

      for (let i = 0; i < node.data.children.length - 1; i++) {
        this.inOrderTraversal(node.data.children[i], callbackOnNodeVisit);
      }

      callbackOnNodeVisit(node);

      if (node.data.children.length > 1)
        this.inOrderTraversal(
          node.data.children[node.data.children.length - 1],
          callbackOnNodeVisit
        );
    }
  }

  postOrderTraversal(
    node: NaryTreeNode<T> | null = this.root,
    callback: (node: NaryTreeNode<T>) => void
  ) {
    if (node) {
      for (let i = 0; i < node.data.children.length; i++) {
        this.postOrderTraversal(node.data.children[i], callback);
      }
      callback(node);
    }
  }

  levelOrderTraversal(callback: (node: NaryTreeNode<T>) => void) {
    if (!this.root) return;

    const queue: NaryTreeNode<T>[] = [this.root];

    while (queue.length > 0) {
      const current = queue.shift()!;
      callback(current);

      current.data.children.forEach((child) => {
        queue.push(child);
      });
    }
  }

  // Definitie:
  // Height = numarul de edges de la nod pana la cel mai adanc nod frunza al arborelui
  calculateHeight(node: NaryTreeNode<T> | null = this.root): number {
    if (!node) return 0;

    let maxHeight = 0;
    node.data.children.forEach((child) => {
      const childHeight = this.calculateHeight(child);
      maxHeight = Math.max(maxHeight, childHeight);
    });

    return maxHeight + 1;
  }

  // Definitie:
  // Depth = numarul de edges pe cel mai lung drum de la root pana la nod
  calculateDepth(node: NaryTreeNode<T> | null): number {
    if (!node) return 0;

    let depth = 0;
    let current = node;

    while (current.parent) {
      depth++;
      current = current.parent;
    }

    return depth;
  }

  calculateSize(node: NaryTreeNode<T> | null = this.root): number {
    if (!node) return 0;

    let size = 1;
    node.data.children.forEach((child) => {
      size += this.calculateSize(child);
    });

    return size;
  }

  deleteNode(
    nodeToRemove: NaryTreeNode<T>,
    childPromotionStrategy: ChildPromotionStrategy = 'first'
  ): void {
    if (!nodeToRemove) return;

    const nodeToRemoveParent = nodeToRemove.parent;

    // Cazul 1 (nod frunza)
    if (nodeToRemove.data.children.length === 0) {
      if (nodeToRemoveParent) {
        const index = nodeToRemoveParent.data.children.indexOf(nodeToRemove);
        if (index !== -1) {
          nodeToRemoveParent.data.children.splice(index, 1);
        }
      } else {
        this.root = null;
      }
    }
    // Cazul 2 (un singur copil)
    else if (nodeToRemove.data.children.length === 1) {
      console.log('Case 2 (one child only)');
      const oneChild = nodeToRemove.data.children[0];
      if (nodeToRemoveParent) {
        const index = nodeToRemoveParent.data.children.indexOf(nodeToRemove);
        console.log('index: ', index);
        if (index !== -1) {
          nodeToRemoveParent.data.children[index] = oneChild;
          oneChild.parent = nodeToRemoveParent;
        }
      } else {
        this.root = oneChild;
      }
    }
    // Cazul 3 (mai multi copii, strategia de promovare = 'all')
    else if (
      nodeToRemove.data.children.length > 1 &&
      childPromotionStrategy === 'all'
    ) {
      const nodeToRemoveChildren = nodeToRemove.data.children;
      if (nodeToRemoveParent) {
        const index = nodeToRemoveParent.data.children.indexOf(nodeToRemove);
        if (index !== -1) {
          nodeToRemoveParent.data.children.splice(index, 1);
          for (const child of nodeToRemoveChildren) {
            child.parent = nodeToRemoveParent;
            nodeToRemoveParent.data.children.push(child);
          }
        }
      } else {
        this.root = nodeToRemoveChildren[0];
      }
    }
    // Cazul 4 (mai multi copii, strategia de promovate = all)
    else {
      console.log('Case 4 (many children, promote one)');
      const nodeToRemoveChildren = nodeToRemove.data.children;
      const nodeToPromote = nodeToRemoveChildren[0];

      if (nodeToRemoveParent) {
        const index = nodeToRemoveParent.data.children.indexOf(nodeToRemove);
        if (index !== -1) {
          nodeToRemoveParent.data.children.splice(index, 1);

          for (const child of nodeToRemoveChildren) {
            if (child !== nodeToPromote) {
              nodeToPromote.data.children.push(child);
              child.parent = nodeToPromote;
            }
          }

          nodeToRemoveParent.data.children.splice(index, 0, nodeToPromote);
        }
      } else {
        console.log('Deleting root');
        const oldRootChildren = this.root?.data.children;
        this.root = nodeToPromote;

        if (!oldRootChildren) return;

        for (const oldRootChild of oldRootChildren) {
          if (oldRootChild !== nodeToPromote)
            nodeToPromote.data.children.push(oldRootChild);
        }
      }
    }
  }

  deleteNodeWithValue(
    nodeValue: T,
    childPromotionStrategy: ChildPromotionStrategy = 'first'
  ) {
    const nodeToRemove = this.findNodeWithValue(nodeValue);
    if (!nodeToRemove) return;
    return this.deleteNode(nodeToRemove, childPromotionStrategy);
  }

  // Iteratori
  *preOrderIterator(
    node: NaryTreeNode<T> | null
  ): Generator<NaryTreeNode<T>, void, unknown> {
    if (node) {
      yield node;
      for (const child of node.data.children) {
        yield* this.preOrderIterator(child);
      }
    }
  }

  *inOrderIterator(
    node: NaryTreeNode<T> | null
  ): Generator<NaryTreeNode<T>, void, unknown> {
    if (node) {
      if (node.data.children.length === 1) {
        yield* this.inOrderIterator(node.data.children[0]);
      }

      for (let i = 0; i < node.data.children.length - 1; i++) {
        yield* this.inOrderIterator(node.data.children[i]);
      }

      yield node;

      if (node.data.children.length > 1)
        yield* this.inOrderIterator(
          node.data.children[node.data.children.length - 1]
        );
    }
  }

  *postOrderIterator(
    node: NaryTreeNode<T> | null
  ): Generator<NaryTreeNode<T>, void, unknown> {
    if (node) {
      for (const child of node.data.children) {
        yield* this.postOrderIterator(child);
      }
      yield node;
    }
  }

  *levelOrderIterator(
    node: NaryTreeNode<T> | null
  ): Generator<NaryTreeNode<T>, void, unknown> {
    if (!node) return;

    const queue: NaryTreeNode<T>[] = [node];

    while (queue.length > 0) {
      const current = queue.shift()!;
      yield current;

      current.data.children.forEach((child) => {
        queue.push(child);
      });
    }
  }

  // Serializare
  serializeTree(node: NaryTreeNode<T> | null): string {
    if (!node) return 'null';

    const children = node.data.children
      .map((child) => this.serializeTree(child))
      .join(', ');

    return `{ "value": ${node.data.value}, "children": [${children}] }`;
  }

  // Deserializare
  deserializeTree(serializedTree: string): NaryTreeNode<T> | null {
    const obj = JSON.parse(serializedTree);

    if (obj === null) return null;

    const newNode = new NaryTreeNode(obj.value);
    newNode.data.children = obj.children.map((child: any) =>
      this.deserializeTree(JSON.stringify(child))
    );
    return newNode;
  }

  insertBalanced(values: T[]): NaryTreeNode<T> | null {
    const sortedValues = [...values, ...this.getAllNodeValues(this.root)].sort(
      (a, b) => (a < b ? -1 : 1)
    );
    const newRoot = this.buildBalancedTree(
      sortedValues,
      0,
      sortedValues.length - 1,
      null
    );

    return newRoot;
  }

  private getAllNodeValues(node: NaryTreeNode<T> | null): T[] {
    if (!node) return [];

    let values: T[] = [node.data.value];
    node.data.children.forEach((child) => {
      values = values.concat(this.getAllNodeValues(child));
    });

    return values;
  }

  private buildBalancedTree(
    sortedValues: T[],
    start: number,
    end: number,
    parent: NaryTreeNode<T> | null
  ): NaryTreeNode<T> | null {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const newNode = this.insertNode(parent, sortedValues[mid]);

    this.buildBalancedTree(sortedValues, start, mid - 1, newNode);
    this.buildBalancedTree(sortedValues, mid + 1, end, newNode);

    return newNode;
  }

  getNodesByLevel(): Record<number, Array<NaryTreeNode<T>>> {
    const nodesByLevel: Record<number, Array<NaryTreeNode<T>>> = {};

    const traverse = (node: NaryTreeNode<T> | null, level: number): void => {
      if (!node) return;

      if (!nodesByLevel[level]) {
        nodesByLevel[level] = [];
      }

      nodesByLevel[level].push(node);

      node.data.children.forEach((child) => {
        traverse(child, level + 1);
      });
    };

    traverse(this.root, 0);

    return nodesByLevel;
  }

  getNodeValuesByLevel(): Record<number, Array<NodeData<T>['value']>> {
    const valuesByLevel: Record<number, Array<NodeData<T>['value']>> = {};

    const traverse = (node: NaryTreeNode<T> | null, level: number): void => {
      if (!node) return;

      if (!valuesByLevel[level]) {
        valuesByLevel[level] = [];
      }

      valuesByLevel[level].push(node.data.value);

      node.data.children.forEach((child) => {
        traverse(child, level + 1);
      });
    };

    traverse(this.root, 0);

    return valuesByLevel;
  }

  getSerializedNodesByLevel(): Record<number, Array<string>> {
    const nodesByLevel: Record<number, Array<string>> = {};

    const traverse = (node: NaryTreeNode<T> | null, level: number): void => {
      if (!node) return;

      if (!nodesByLevel[level]) {
        nodesByLevel[level] = [];
      }

      const serializedNode = this.serializeTree(node);
      nodesByLevel[level].push(serializedNode);

      node.data.children.forEach((child) => {
        traverse(child, level + 1);
      });
    };

    traverse(this.root, 0);

    return nodesByLevel;
  }

  findNodeWithValue(
    value: T,
    node: NaryTreeNode<T> | null = this.root
  ): NaryTreeNode<T> | null {
    if (!node) return null;

    if (node.data.value === value) {
      return node;
    }

    for (const child of node.data.children) {
      const foundNode = this.findNodeWithValue(value, child);
      if (foundNode) {
        return foundNode;
      }
    }

    return null;
  }

  findNodesWithCondition(predicate: (value: T) => boolean): NaryTreeNode<T>[] {
    const matchingNodes: NaryTreeNode<T>[] = [];

    const traverse = (node: NaryTreeNode<T> | null): void => {
      if (!node) return;

      if (predicate(node.data.value)) {
        matchingNodes.push(node);
      }

      node.data.children.forEach((child) => {
        traverse(child);
      });
    };

    traverse(this.root);

    return matchingNodes;
  }

  isBalanced(node: NaryTreeNode<T> | null = this.root): boolean {
    if (!node) return true;

    const childHeights = node.data.children.map((child) =>
      this.calculateHeight(child)
    );
    const maxChildHeight = Math.max(...childHeights);
    const minChildHeight = Math.min(...childHeights);

    return (
      maxChildHeight - minChildHeight <= 1 &&
      node.data.children.every((child) => this.isBalanced(child))
    );
  }

  clearTree(): void {
    this.root = null;
  }

  findPathToNode(
    node: NaryTreeNode<T>,
    startNode: NaryTreeNode<T> | null = this.root
  ): NaryTreeNode<T>[] {
    const path: NaryTreeNode<T>[] = [];

    let current: NaryTreeNode<T> | null = node;
    while (current != startNode) {
      if (current) {
        path.unshift(current);
        current = current.parent;
      }
    }

    if (startNode) path.unshift(startNode);

    return path;
  }

  findCommonAncestor(
    node1: NaryTreeNode<T>,
    node2: NaryTreeNode<T>
  ): NaryTreeNode<T> | null {
    const path1 = this.findPathToNode(node1);
    const path2 = this.findPathToNode(node2);

    let commonAncestor: NaryTreeNode<T> | null = null;
    for (let i = 0; i < Math.min(path1.length, path2.length); i++) {
      if (path1[i] === path2[i]) {
        commonAncestor = this.findNodeWithValue(path1[i].data.value);
      } else {
        break;
      }
    }

    return commonAncestor;
  }

  findLowestCommonAncestor(nodes: NaryTreeNode<T>[]): NaryTreeNode<T> | null {
    if (nodes.length === 0) return null;

    let commonAncestor = nodes[0];
    for (let i = 1; i < nodes.length; i++) {
      commonAncestor =
        this.findCommonAncestor(commonAncestor, nodes[i]) || commonAncestor;
    }

    return commonAncestor;
  }

  createMirrorTree(): NaryTree<T> {
    const mirrorTree = new NaryTree<T>();
    const mirrorRoot = this.createMirrorNode(this.root, mirrorTree);
    mirrorTree.root = mirrorRoot;

    return mirrorTree;
  }

  private createMirrorNode(
    originalNode: NaryTreeNode<T> | null,
    mirrorTree: NaryTree<T>,
    mirrorParent: NaryTreeNode<T> | null = null
  ): NaryTreeNode<T> | null {
    if (!originalNode) return null;

    const mirrorNode = mirrorTree.insertNode(
      mirrorParent,
      originalNode.data.value
    );

    for (const child of originalNode.data.children.reverse()) {
      this.createMirrorNode(child, mirrorTree, mirrorNode);
    }

    return mirrorNode;
  }

  isIdentical(otherTree: NaryTree<T>): boolean {
    return (
      this.serializeTree(this.root) === otherTree.serializeTree(otherTree.root)
    );
  }

  isSubtree(
    subtreeRoot: NaryTreeNode<T>,
    rootNode: NaryTreeNode<T> | null = this.root
  ): boolean {
    if (!rootNode) return false;

    if (this.areNodesIdentical(rootNode, subtreeRoot)) {
      return true;
    }

    return rootNode.data.children.some((child) =>
      this.isSubtree(subtreeRoot, child)
    );
  }

  private areNodesIdentical(
    node1: NaryTreeNode<T> | null,
    node2: NaryTreeNode<T> | null
  ): boolean {
    if (!node1 && !node2) return true;
    if (!node1 || !node2) return false;

    return (
      node1.data.value === node2.data.value &&
      node1.data.children.length === node2.data.children.length &&
      node1.data.children.every((child, index) =>
        this.areNodesIdentical(child, node2.data.children[index])
      )
    );
  }

  findLeafNodes(node: NaryTreeNode<T> | null = this.root): NaryTreeNode<T>[] {
    if (!node) return [];

    if (node.data.children.length === 0) {
      return [node];
    }

    return node.data.children.flatMap((child) => this.findLeafNodes(child));
  }

  findSiblings(node: NaryTreeNode<T>): NaryTreeNode<T>[] {
    if (!node.parent) return [];

    return node.parent.data.children.filter((sibling) => sibling !== node);
  }

  countNodesAtEachLevel(): Record<number, number> {
    const counts: Record<number, number> = {};

    const traverse = (node: NaryTreeNode<T> | null, level: number): void => {
      if (!node) return;

      if (!counts[level]) {
        counts[level] = 1;
      } else {
        counts[level]++;
      }

      node.data.children.forEach((child) => {
        traverse(child, level + 1);
      });
    };

    traverse(this.root, 0);

    return counts;
  }

  iterativePreOrderTraversal(callback: (node: NaryTreeNode<T>) => void) {
    const stack: NaryTreeNode<T>[] = [];
    if (this.root) stack.push(this.root);

    while (stack.length > 0) {
      const current = stack.pop()!;
      callback(current);

      stack.push(...current.data.children.reverse());
    }
  }

  levelOrderTraversalWithCallback(
    callback: (level: number, nodes: NaryTreeNode<T>[]) => void
  ) {
    const queue: NaryTreeNode<T>[] = [];
    if (this.root) queue.push(this.root);

    let level = 0;

    while (queue.length > 0) {
      const nodesAtCurrentLevel: NaryTreeNode<T>[] = [];
      const levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
        const current = queue.shift()!;
        nodesAtCurrentLevel.push(current);

        queue.push(...current.data.children);
      }

      callback(level, nodesAtCurrentLevel);
      level++;
    }
  }

  insertNodes(parent: NaryTreeNode<T> | null, values: T[]): NaryTreeNode<T>[] {
    return values.map((value) => this.insertNode(parent, value));
  }

  findShortestPath(
    startNode: NaryTreeNode<T>,
    endNode: NaryTreeNode<T>
  ): NaryTreeNode<T>[] | null {
    // const startPath = this.findPathToNode(startNode);
    // const endPath = this.findPathToNode(endNode);

    const commonAncestor = this.findCommonAncestor(startNode, endNode);
    if (!commonAncestor) return null;

    const commonAncestorToStartNode = this.findPathToNode(
      startNode,
      commonAncestor
    );
    const commonAncestorToEndNode = this.findPathToNode(
      endNode,
      commonAncestor
    );

    return [...commonAncestorToStartNode.reverse(), ...commonAncestorToEndNode];
  }
}

// const tree = new NaryTree<number>();

// let rootNode: NaryTreeNode<number> | null = tree.insertNode(null, 10);
// const child1 = tree.insertNode(rootNode, 20);
// const child2 = tree.insertNode(rootNode, 30);
// const grandchild = tree.insertNode(child1, 40);
// const grandgrandchild = tree.insertNode(grandchild, 50);

// const sortedValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// rootNode = tree.insertBalanced(sortedValues);

// const nodeWithTargetValue = tree.findNodeWithValue(5, rootNode);

// if (nodeWithTargetValue) {
//   const pathToNode = tree.findPathToNode(nodeWithTargetValue);
//   console.log({ pathToNode });
// }
// console.log({ nodeWithTargetValue });
// console.log('Height:', tree.calculateHeight(rootNode));
// console.log('Depth of node 5:', tree.calculateDepth(nodeWithTargetValue));
// console.log('Size of the tree:', tree.calculateSize(rootNode));

// // Delete a node
// // tree.deleteNode(child1);

// console.log('Pre-order iterator: ');
// // Iterate using pre-order iterator
// const preOrderIterator = tree.preOrderIterator(rootNode);
// for (const node of preOrderIterator) {
//   console.log(node.data.value);
// }

// // In-order iterator
// const inOrderIterator = tree.inOrderIterator(rootNode);
// console.log('In-order iterator Traversal:');
// for (const node of inOrderIterator) {
//   console.log(node.data.value);
// }

// // Post-order iterator
// const postOrderIterator = tree.postOrderIterator(rootNode);
// console.log('Post-order iterator Traversal:');
// for (const node of postOrderIterator) {
//   console.log(node.data.value);
// }

// // Level-order iterator
// const levelOrderIterator = tree.levelOrderIterator(rootNode);
// console.log('Level-order iterator Traversal:');
// for (const node of levelOrderIterator) {
//   console.log(node.data.value);
// }

// console.log('Pre order');
// tree.preOrderTraversal(rootNode, (node) => {
//   console.log(node.data.value);
// });

// console.log('In order');
// tree.inOrderTraversal(rootNode, (node) => {
//   console.log(node.data.value);
// });

// console.log('Post order');
// // Post-order traversal
// tree.postOrderTraversal(rootNode, (node) => {
//   console.log(node.data.value);
// });

// console.log('Level order');
// // Post-order traversal
// tree.levelOrderTraversal((node) => {
//   console.log(node.data.value);
// });

// // Serialize and Deserialize
// const serializedTree = tree.serializeTree(rootNode);
// console.log('Serialized Tree:', serializedTree);

// const deserializedTree = tree.deserializeTree(serializedTree);
// console.log('Deserialized Tree:', deserializedTree);

// const nodesWithCondition = tree.findNodesWithCondition((value) => value > 4);
// console.log({
//   nodesWithCondition: nodesWithCondition.map((n) => n.data.value)
// });

// console.log(tree.getNodeValuesByLevel());

//   console.log('Size: ', tree.calculateSize());

// const node1 = tree.findNodeWithValue(8);
// const node2 = tree.findNodeWithValue(50);
// const node20 = tree.findNodeWithValue(20);

// if (node1 && node2) {
//   const commonAncestor = tree.findCommonAncestor(node1, node2);
//   console.log({ commonAncestor });

//   const path = tree.findPathToNode(node2);
//   console.log({ path: path.map((n) => n.data.value) });

//   const path20to50 = tree.findPathToNode(node2, node20);
//   console.log({ path20to50: path20to50.map((n) => n.data.value) });

//   const shortestPath = tree.findShortestPath(node1, node2);
//   if (shortestPath)
//     console.log({ shortestPath: shortestPath.map((n) => n.data.value) });
// }

// console.log('Size: ', tree.calculateSize());
// console.log(tree.getNodeValuesByLevel());

// let testableTree = new NaryTree<number>();

// const rootNode = testableTree.insertNode(null, 1);
// const child1 = testableTree.insertNode(rootNode, 2);
// const child2 = testableTree.insertNode(rootNode, 3);
// const grandchild1 = testableTree.insertNode(child1, 4);
// const grandchild2 = testableTree.insertNode(child1, 5);
// const grandchild3 = testableTree.insertNode(child2, 6);
// const greatgrandchild1 = testableTree.insertNode(grandchild3, 7);
// const greatgrandchild2 = testableTree.insertNode(grandchild3, 8);

// const visitedNodes: number[] = [];
// testableTree.inOrderTraversal(testableTree.root, (node) => {
//   console.log('Pushing: ', node.data.value);
//   visitedNodes.push(node.data.value);
// });

// console.log({ visitedNodes });
