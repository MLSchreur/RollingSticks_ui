export class Noot {

    id?         : number;
    length      : string;   // whole, half, quarter, eight, sixteenth
    height      : string;   // d4 .. g4, a5 .. g5
    stem        : string;   // down-up + eventueel default-y waarde erbij
    beam        : string;   // start-continiue-end + eventueel number waarde erbij
    chord       : boolean;
    instrument  : string;    
}