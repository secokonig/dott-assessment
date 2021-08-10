import { Node } from "./Node";

export class Tree {
    static _vertices: number[][];
    static _n: number;
    static _m: number;

    private _root: Node;
    private _visited: Set<string>;

    constructor(root: Node, vertices?: number[][], n?: number, m?: number){
        this._root = root;
        this._visited = new Set();
        Tree._vertices = vertices || Tree._vertices;
        Tree._n = n || Tree._n;
        Tree._m = m || Tree._m;
    }

    private addLevelNodes(node: Node) {
        const i = node.position.i;
        const j = node.position.j;

        [i+1, i-1, j+1, j-1].forEach((neighbor, index) => {
            if (this.validateIndex(neighbor, (index > 1 ? Tree._n : Tree._m))){
                node.children.push(new Node((index > 1 ? i : neighbor), (index > 1 ? neighbor : j), node.level+1));
            }
        });
    }

    public calculateDistanceToNearestWhite(node: Node): number | undefined {
        const i = node.position.i;
        const j = node.position.j;

        if (Tree._vertices[i][j] && Tree._vertices[i][j] === 1) {
            return node.level;
        } else {
            this._visited.add(node.id);
            this.addLevelNodes(node);
            if (node.children.length) {
                for (let child of node.children) {
                    if (!this._visited.has(child.id)) this.calculateDistanceToNearestWhite(child);
                }
            } else {
                return undefined;
            }  
        }
    }

    private validateIndex(index: number, dimension: number) {
        return index > 0 && index < dimension;
    }

    public get root(): Node { return this._root; }
    private set root(value: Node) { this._root = value; }
}