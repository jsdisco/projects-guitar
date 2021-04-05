import React, { useState } from 'react';
import ChordFinder from './components/ChordFinder.js';
import GuitarBody from './components/GuitarBody.js';
import Fretboard from './components/Fretboard.js';
import { getNote, isMuted } from './utils/sounds.js';
import './css/guitar.css';

function Guitar() {
    const [currFrets, setCurrFrets] = useState([0, 0, 0, 0, 0, 0]);
    const currNotes = currFrets.map((f, s) => (isMuted(f) ? null : getNote(s, f)[0])).filter(e => !!e);

    function updateCurrFrets(string, fret) {
        let newFrets = [...currFrets];
        newFrets[string] = fret !== undefined ? fret : newFrets[string] * -1;
        setCurrFrets(newFrets);
    }

    return (
        <div className="guitar">
            <ChordFinder currNotes={currNotes} />
            <GuitarBody currFrets={currFrets} />
            <Fretboard currFrets={currFrets} updateCurrFrets={updateCurrFrets} />
        </div>
    );
}

export default Guitar;
