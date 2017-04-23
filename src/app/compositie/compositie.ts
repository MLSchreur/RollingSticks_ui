import { Maat } from './maat';

export class Compositie {
    
    id?         : number;
    title       : string;
    tempo       : number;   //bpm
    mode        : string;
    beats       : number;
    beatType    : number;
    maten       : Maat[] = [];
}