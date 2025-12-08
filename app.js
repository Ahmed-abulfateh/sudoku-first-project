const size = 9;
    // Sudoku board size (9 rows × 9 columns)

    let given = Array.from({length:size}, ()=> Array(size).fill(0));
    // Matrix to store the original puzzle clues (0 means blank)

    let values = Array.from({length:size}, ()=> Array(size).fill(0));
    // Matrix to store current values entered by the user

    // Example puzzle (string of 81 digits, 0 = blank)
    const puzzle = "530070000600195000098000060800060003400803001700020006060000280000419005000080079";

    function loadPuzzle(str){
      // Load puzzle string into given and values matrices
      for(let i=0;i<str.length;i++){
        const r = Math.floor(i/size), c = i%size;
        // Calculate row and column from string index
        const n = Number(str[i]);
        // Convert character to number
        given[r][c] = n;
        // Save clue into given matrix
        values[r][c] = n;
        // Initialize values with same number (clue or blank)
      }
    }
    console.log(given);
    console.log(values);
    loadPuzzle(puzzle);

    
    function buildGrid(){
      // Build the Sudoku grid in the DOM
      const grid = document.getElementById('grid');
      grid.innerHTML = '';// Clear any existing cells
      for(let r=0;r<size;r++){
        for(let c=0;c<size;c++){
          const cell = document.createElement('input');
          // Create an input element for each cell
          cell.className = 'cell';
          // Apply cell styling
          cell.maxLength = 1;
          // Limit input to 1 character
          cell.value = values[r][c] ? values[r][c] : '';
          // Show clue number or blank
          if(given[r][c]) cell.disabled = true;
          // Disable editing if it’s a clue
          cell.addEventListener('input', ()=> {
            // When user types in the cell...
            values[r][c] = Number(cell.value) || 0;
            // Update values matrix with number or 0 if empty
          });
          grid.appendChild(cell);
          // Add cell to grid container
        }
      }
    }
    buildGrid();
    



