import { Maat } from '../compositie/maat';

export class Compositie2 {
    
    id?         : number;
    title       : string;
    tempo       : number;   //bpm
    mode        : string;
    beats       : number;
    beatType    : number;
    maten       : Maat[] = [];
}