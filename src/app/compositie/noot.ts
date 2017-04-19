export class Noot {

    // length moet nummber zijn en height is overbodig
    // Nu aanpassen zorgt er voor dat de code van Rosalynn niet meer werkt.
    // Later dus deze code daar op aanpassen en dan deze class bijwerken.
    id?         : number;
    chord       : boolean;
    instrument  : string;    
    nootNaam    : string;   // d4 .. g4, a5 .. g5
    //length      : number;       // 1, 2, 4, 8, 16, 32, 64 
    length      : string;   // whole, half, quarter, eight, sixteenth
    stem        : string;   // down-up + eventueel default-y waarde erbij
    beam        : string;   // start-continiue-end + eventueel number waarde erbij
    // height is overbodig, dat is nootNaam geworden
    height      : string;   // d4 .. g4, a5 .. g5
}