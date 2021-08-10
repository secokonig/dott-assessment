import { coords } from "./interfaces";

export class Node {
    private _id: string;
    private _position: coords;
    private _level: number;
    private _children: Node[];

    constructor(i: number, j:number, level: number, children?: Node[]) {
        this._position.i = i;
        this._position.j = j;
        this._level = level;
        this._id = `${i}${j}`;
    }

    public get id(): string { return this._id; }
    public set id(value: string) { this._id = value; 
    }
    public get children(): Node[] { return this._children; }
    public set children(value: Node[]) { this._children = value; }

    public get position(): coords { return this._position; }
    public set position(value: coords) { this._position = value; }

    public get level(): number { return this._level; }
    public set level(value: number) { this._level = value; }
}