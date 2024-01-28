import React, { useState } from 'react';
import './MatrixMultiplier.css';

const MatrixMultiplier = () => {
  const [rowsA, setRowsA] = useState(0);
  const [colsA, setColsA] = useState(0);
  const [rowsB, setRowsB] = useState(0);
  const [colsB, setColsB] = useState(0);
  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [result, setResult] = useState([]);

  const initializeMatrix = (rows, cols) => {
    const newMatrix = Array.from({ length: rows }, () => Array(cols).fill(''));
    return newMatrix;
  };

  const handleMatrixInputChange = (matrix, rowIndex, colIndex, value) => {
    const newMatrix = matrix.map((row, i) =>
      i === rowIndex ? row.map((cell, j) => (j === colIndex ? value : cell)) : row
    );
    matrix === matrixA ? setMatrixA(newMatrix) : setMatrixB(newMatrix);
  };

  const multiplyMatrices = () => {
    // Parse input matrices
    const a = matrixA.map(row => row.map(Number));
    const b = matrixB.map(row => row.map(Number));

    // Check if matrices can be multiplied
    if (colsA !== rowsB) {
      alert(
        'Matrices cannot be multiplied. Number of columns in matrix A must be equal to the number of rows in matrix B.'
      );
      return;
    }

    // Perform matrix multiplication
    const resultMatrix = [];

    for (let i = 0; i < rowsA; i++) {
      const rowResult = [];
      for (let j = 0; j < colsB; j++) {
        let sum = 0;
        for (let k = 0; k < colsA; k++) {
          sum += a[i][k] * b[k][j];
        }
        rowResult.push(sum);
      }
      resultMatrix.push(rowResult);
    }

    // Update the result state
    setResult(resultMatrix);
  };

  return (
    <div className="container">
      <h2>Matrix Multiplier</h2>
      <div className="input-section">
        <div className="matrix-input">
          <label>
            Matrix A Rows:
            <input
              type="number"
              value={rowsA}
              onChange={(e) => {
                setRowsA(parseInt(e.target.value, 10));
                setMatrixA(initializeMatrix(parseInt(e.target.value, 10), colsA));
              }}
            />
          </label>
          <br />
          <br />
          <label>
            Matrix A Columns:
            <input
              type="number"
              value={colsA}
              onChange={(e) => {
                setColsA(parseInt(e.target.value, 10));
                setMatrixA(initializeMatrix(rowsA, parseInt(e.target.value, 10)));
              }}
            />
          </label>
          <br />
          <br />
          <label className='matrix-name'>
            Matrix A:
            {matrixA.map((row, rowIndex) => (
              <div key={rowIndex} className="matrix-row">
                {row.map((cell, colIndex) => (
                  <input
                    key={colIndex}
                    type="number"
                    value={cell}
                    onChange={(e) =>
                      handleMatrixInputChange(matrixA, rowIndex, colIndex, parseInt(e.target.value, 10))
                    }
                  />
                ))}
              </div>
            ))}
          </label>
        </div>
        <div className="matrix-input">
          <label>
            Matrix B Rows:
            <input
              type="number"
              value={rowsB}
              onChange={(e) => {
                setRowsB(parseInt(e.target.value, 10));
                setMatrixB(initializeMatrix(parseInt(e.target.value, 10), colsB));
              }}
            />
          </label>
          <br />
          <br />
          <label>
            Matrix B Columns:
            <input
              type="number"
              value={colsB}
              onChange={(e) => {
                setColsB(parseInt(e.target.value, 10));
                setMatrixB(initializeMatrix(rowsB, parseInt(e.target.value, 10)));
              }}
            />
          </label>
          <br />
          <br />
          <label className='matrix-name'>
            Matrix B:
            {matrixB.map((row, rowIndex) => (
              <div key={rowIndex} className="matrix-row">
                {row.map((cell, colIndex) => (
                  <input
                    key={colIndex}
                    type="number"
                    value={cell}
                    onChange={(e) =>
                      handleMatrixInputChange(matrixB, rowIndex, colIndex, parseInt(e.target.value, 10))
                    }
                  />
                ))}
              </div>
            ))}
          </label>
        </div>
      </div>
      <button onClick={multiplyMatrices}>Multiply Matrices</button>
      {result && (
        <div className="result-container">
          <h3>Result:</h3>
          <div className="matrix-result">
            {result.map((row, rowIndex) => (
              <div key={rowIndex} className="matrix-row">
                {row.map((cell, colIndex) => (
                  <div key={colIndex} className="matrix-cell">
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrixMultiplier;
