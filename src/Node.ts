import { coords } from "./interfaces";

export class Node {
    private _id: string;
    private _position: coords;
    private _level: number;

    constructor(i: number, j:number, level: number) {
        this._id = `${i}${j}`;
        this._position = {i: i, j: j}
        this._level = level;
    }

    public get id(): string { return this._id; }
    public set id(value: string) { this._id = value; }

    public get position(): coords { return this._position; }
    public set position(value: coords) { this._position = value; }

    public get level(): number { return this._level; }
    public set level(value: number) { this._level = value; }
}