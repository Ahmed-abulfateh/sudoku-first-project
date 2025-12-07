const size = 9;
    // Sudoku board size (9 rows × 9 columns)

    let given = Array.from({length:size}, ()=> Array(size).fill(0));
    // Matrix to store the original puzzle clues (0 means blank)

    let values = Array.from({length:size}, ()=> Array(size).fill(0));
    // Matrix to store current values entered by the user

    // Example puzzle (string of 81 digits, 0 = blank)
    const puzzle = "530070000600195000098000060800060003400803001700020006060000280000419005000080079";
