'use strict';

var Chord = Object.freeze({
    Major: {},
    Minor: {},
    Major7: {},
    Minor7: {},
    Augmented: {},
    Diminished: {},
});

var chordNames = {};
chordNames[Chord.Major] = ['', 'M', 'maj'];
chordNames[Chord.Minor] = ['m', 'min'];
chordNames[Chord.Major7] = ['7', 'maj7'];
chordNames[Chord.Minor7] = ['m7', 'min7'];
chordNames[Chord.Augmented] = ['aug', '+', '+5'];
chordNames[Chord.Diminished] = ['dim', '◦'];

var Note = Object.freeze({
    C: { toString: () => "C" },
    Csharp: { toString: () => "C♯" },
    D: { toString: () => "D" },
    Dsharp: { toString: () => "D♯" },
    E: { toString: () => "E" },
    F: { toString: () => "F" },
    Fsharp: { toString: () => "F♯" },
    G: { toString: () => "G" },
    Gsharp: { toString: () => "G♯" },
    A: { toString: () => "A" },
    Asharp: { toString: () => "A♯" },
    B: { toString: () => "B" }
});

var notesSequence = [
    Note.C,
    Note.Csharp,
    Note.D,
    Note.Dsharp,
    Note.E,
    Note.F,
    Note.Fsharp,
    Note.G,
    Note.Gsharp,
    Note.A,
    Note.Asharp,
    Note.B
];

function moveNote(note, interval) {
    return notesSequence[(notesSequence.indexOf(note) + interval) % 12];
}

const stringStartNote = [
    Note.E,
    Note.B,
    Note.G,
    Note.D,
    Note.A,
    Note.E
];

function getNoteAt(string, fret) {
    return moveNote(stringStartNote[string-1], fret);
}
