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
            
          
          //events 
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
     function isValidPlacement(board, r, c, n){
      // Check if placing number n at (r,c) is valid
      for(let i=0;i<9;i++){
        if(board[r][i]===n && i!==c) return false;
        // Check row for duplicates
        if(board[i][c]===n && i!==r) return false;
        // Check column for duplicates
      }
      const br = Math.floor(r/3)*3, bc = Math.floor(c/3)*3;
      // Find top-left corner of 3x3 box
      for(let i=0;i<3;i++) for(let j=0;j<3;j++){
        if(board[br+i][bc+j]===n && !(br+i===r && bc+j===c)) return false;
        // Check 3x3 box for duplicates
      }
      return true;
      // If no conflicts, placement is valid
    }
     function checkBoard(){
      // Validate the entire board
      const cells = document.querySelectorAll('.cell');
      // Get all cell elements
      let ok = true;
      // Assume board is valid initially
      for(let r=0;r<9;r++){
        for(let c=0;c<9;c++){
          const idx = r*9+c;
          // Calculate index in flat cell list
          cells[idx].classList.remove('error');
          // Clear previous error highlight
          const v = values[r][c];
          // Current value in cell
          if(v && !isValidPlacement(values,r,c,v)){
            // If value exists but is invalid...
            cells[idx].classList.add('error');
            // Highlight cell as error
            ok = false;
            // Mark board as not valid
          }
        }
      }
      document.getElementById('status').textContent = ok ? "Looks good!" : "Conflicts found!";
      // Update status message depending on validity
    }
function buildGrid(){
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  for(let r=0;r<size;r++){
    for(let c=0;c<size;c++){
      const cell = document.createElement('input');
      cell.className = 'cell';
      cell.maxLength = 1;
      cell.value = values[r][c] ? values[r][c] : '';

      // Store row/col for navigation
      cell.dataset.row = r;
      cell.dataset.col = c;

      if(given[r][c]) {
        cell.readOnly = true;   // still focusable, but not editable
        cell.classList.add('given'); // style clue numbers in blue
      }

      // Update values when typing (only if not given)
      cell.addEventListener('input', ()=> {
        if(!given[r][c]) {
          values[r][c] = Number(cell.value) || 0;
        }
      });

      // Arrow key navigation
      cell.addEventListener('keydown', (e) => {
        let newRow = r, newCol = c;
        switch(e.key){
          case 'ArrowUp':    newRow = r > 0 ? r-1 : r; break;
          case 'ArrowDown':  newRow = r < size-1 ? r+1 : r; break;
          case 'ArrowLeft':  newCol = c > 0 ? c-1 : c; break;
          case 'ArrowRight': newCol = c < size-1 ? c+1 : c; break;
        }
        if(newRow !== r || newCol !== c){
          const nextIndex = newRow*size + newCol;
          grid.children[nextIndex].focus();
          e.preventDefault();
        }
      });

      grid.appendChild(cell);
    }
  }
}

