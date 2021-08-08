import { coords } from "./interfaces";

export class Node {
    public position: coords;
    public children: Node[] = [];
    public level: number;

    constructor(i: number, j:number, children: Node[], level: number) {
        this.position.i = i;
        this.position.j = j;
        this.children = children;
        this.level = level;
    }
}