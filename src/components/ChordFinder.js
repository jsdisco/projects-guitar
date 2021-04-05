import React from 'react';

function ChordFinder({ currNotes }) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const getChromScale = r => notes.slice(notes.indexOf(r)).concat(notes.slice(0, notes.indexOf(r)));

    function getIntervals(root, scale, arr) {
        return arr.map(n => {
            const index = scale.indexOf(n);
            switch (index) {
                case 1:
                    return 'minorSecond';
                case 2:
                    return 'majorSecond';
                case 3:
                    return 'minorThird';
                case 4:
                    return 'majorThird';
                case 5:
                    return 'perfectFourth';
                case 6:
                    return 'augFourth';
                case 7:
                    return 'perfectFifth';
                case 8:
                    return 'augFifth';
                case 9:
                    return 'majorSixth';
                case 10:
                    return 'minorSeventh';
                case 11:
                    return 'majorSeventh';
                default:
                    return 'root';
            }
        });
    }

    const chordTree = {
        result: '',
        root: {
            result: '',
            majorThird: {
                result: '',
                perfectFifth: {
                    result: 'major',
                    majorSixth: {
                        result: 'maj6',
                        majorSecond: {
                            result: 'maj6/9'
                        }
                    },
                    minorSeventh: {
                        result: 'dom7',
                        minorSecond: {
                            result: 'dom7b9'
                        },
                        minorThird: {
                            result: 'dom7#9'
                        },
                        majorSecond: {
                            result: 'dom9',
                            perfectFourth: {
                                result: 'dom11',
                                majorSixth: {
                                    result: 'dom13'
                                }
                            }
                        }
                    },
                    majorSeventh: {
                        result: 'maj7',
                        majorSecond: {
                            result: 'maj9',
                            perfectFourth: {
                                result: 'maj11',
                                majorSixth: {
                                    result: 'maj13'
                                }
                            }
                        }
                    }
                },
                augFourth: {
                    result: 'dim',
                    majorSeventh: {
                        result: 'maj7b5'
                    },
                    minorSeventh: {
                        result: 'dom7b5',
                        minorSecond: {
                            result: 'dom7b5b9'
                        },
                        minorThird: {
                            result: 'dom7b5#9'
                        },
                        majorSecond: {
                            result: 'dom9b5',
                            perfectFourth: {
                                result: 'dom11b5',
                                majorSixth: {
                                    result: 'dom13b5'
                                }
                            }
                        }
                    }
                },
                augFifth: {
                    result: 'aug',
                    minorSeventh: {
                        result: 'aug7 / dom7#5',
                        minorSecond: {
                            result: 'dom7#5b9'
                        },
                        minorThird: {
                            result: 'dom7#5#9'
                        },
                        majorSecond: {
                            result: 'dom9#5',
                            perfectFourth: {
                                result: 'dom11#5',
                                majorSixth: {
                                    result: 'dom13#5'
                                }
                            }
                        }
                    },
                    majorSixth: {
                        result: 'maj7#5'
                    }
                }
            },
            perfectFourth: {
                result: '',
                perfectFifth: {
                    result: 'sus',
                    minorSeventh: {
                        result: 'dom7sus'
                    }
                }
            },
            minorThird: {
                result: '',
                perfectFifth: {
                    result: 'min',
                    majorSeventh: {
                        result: 'min(maj7)'
                    },
                    majorSixth: {
                        result: 'min6',
                        majorSecond: {
                            result: 'min6/9'
                        }
                    },
                    minorSeventh: {
                        result: 'min7',
                        majorSecond: {
                            result: 'min9',
                            perfectFourth: {
                                result: 'min11'
                            }
                        }
                    }
                },
                augFourth: {
                    result: 'dim',
                    majorSixth: {
                        result: 'dim7'
                    },
                    minorSeventh: {
                        result: 'dim7b5'
                    }
                }
            }
        }
    };

    function findResult(arr) {
        let results = [];
        let uniqueNotes = [...new Set(arr)];

        for (let i = 0; i < uniqueNotes.length; i++) {
            const root = uniqueNotes[i];
            const chrom = getChromScale(root);
            let intervals = getIntervals(root, chrom, uniqueNotes);

            search(chordTree, intervals);

            function search(currTree, currArr) {
                const keys = Object.keys(currTree);
                const matches = currArr.filter(e => keys.includes(e));

                if (currArr.length === 0 && currTree.result !== '') {
                    results.push(`${root}${currTree.result}`);
                }

                for (let j = 0; j < matches.length; j++) {
                    const currProp = matches[j];
                    const newTree = currTree[currProp];
                    const newArr = currArr.filter(e => e !== currProp);

                    search(newTree, newArr);
                }
            }
        }
        return results;
    }

    const getResult = currNotes => (currNotes.length > 2 ? findResult(currNotes) : []);
    const result = getResult(currNotes);

    return (
        <div className="chordfinder">
            <p>
                {result.length > 0 &&
                    result.map(c => {
                        c = c.replace('sharp', '#');
                        const [root, suffix] = c[1] === '#' ? [c.slice(0, 2), c.slice(2)] : [c.slice(0, 1), c.slice(1)];
                        return (
                            <span key={c}>
                                {root}
                                <sup> {suffix}</sup>
                            </span>
                        );
                    })}
            </p>
        </div>
    );
}

export default ChordFinder;
