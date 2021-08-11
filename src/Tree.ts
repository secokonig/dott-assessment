import { Node } from "./Node";

export class Tree {
    static _vertices: number[][];
    static _n: number;
    static _m: number;

    private _root: Node;
    private _visited: Set<string>;
    private _bfsQueue: Node[];

    constructor(root: Node, vertices?: number[][], n?: number, m?: number){
        this._root = root;
        this._visited = new Set();
        this._bfsQueue = [root];
        Tree._vertices = vertices || Tree._vertices;
        Tree._n = n || Tree._n;
        Tree._m = m || Tree._m;
    }

    private addLevelNodes(node: Node) {
        const i = node.position.i;
        const j = node.position.j;

        [i+1, i-1, j+1, j-1].forEach((neighbor, index) => {
            if (this.validateIndex(neighbor, (index > 1 ? Tree._n : Tree._m))){
                this._bfsQueue.push(new Node((index > 1 ? i : neighbor), (index > 1 ? neighbor : j), node.level+1));
            }
        });
    }

    public visitNode(node: Node): number | undefined {
        const i = node.position.i;
        const j = node.position.j;

        if (Tree._vertices[i][j] && Tree._vertices[i][j] === 1) {
            return node.level;
        } else {
            this._visited.add(node.id);
            this.addLevelNodes(node);
        }
    }

    public iterateSearchTree(): number {
        let currentNode = this._bfsQueue.shift();
        if (currentNode != undefined) {
            if (!this._visited.has(currentNode.id)) {
                let distance = this.visitNode(currentNode);
                if (distance !== undefined) {
                    return distance;
                } else {
                    // not a white pixel, keep searching
                    return this.iterateSearchTree();
                }
            } else {
                // already visited this node, skip
                return this.iterateSearchTree();
            }
        } else {
            // queue is empty, shouldn't ever run
            console.log(`Somehow didn't find any white pixels?!`);
            return 182+182-2;
        }
    }

    private validateIndex(index: number, dimensionSize: number) {
        return index > 0 && index < dimensionSize;
    }

    public get root(): Node { return this._root; }
    private set root(value: Node) { this._root = value; }
}