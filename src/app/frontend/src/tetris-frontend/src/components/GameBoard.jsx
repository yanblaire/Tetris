import React, { useState, useEffect } from "react";

const initializeBoard = () => {
    return Array(20).fill().map(() => Array(10).fill(0));
};

const shapes = [
    {
        name: "L",
        rotations: [
            [[1, 0, 0], [1, 1, 1]], // Rotation 0
            [[0, 1], [0, 1], [1, 1]], // Rotation 1
            [[0, 0, 1], [1, 1, 1]], // Rotation 2
            [[1, 1], [1, 0], [1, 0]]  // Rotation 3
        ],
        color: "red"
    },
    {
        name: "O",
        rotations: [
            [[1, 1], [1, 1]], // Rotation 0 (only one rotation)
        ],
        color: "yellow"
    },
    {
        name: "I",
        rotations: [
            [[1, 1, 1, 1]], // Horizontal
            [[1], [1], [1], [1]], // Vertical
        ],
        color: "cyan"
    }
];

const generateBlock = () => {
    const randomIndex = Math.floor(Math.random() * shapes.length);
    const shape = shapes[randomIndex];
    return {
        shape: shape.rotations[0],
        color: shape.color,
        position: { x: 3, y: 0 },
        rotationIndex: 0,
        rotations: shape.rotations
    };
};

const GameBoard = () => {
    const [board, setBoard] = useState(initializeBoard());
    const [currentBlock, setCurrentBlock] = useState(generateBlock());

    useEffect(() => {
        const gameInterval = setInterval(() => {
            console.log(`Current Block: ${currentBlock.shape}`);
            moveBlock();
        }, 1000);
        return () => clearInterval(gameInterval);
    }, [currentBlock]);
    

    const moveBlock = () => {
        const newY = currentBlock.position.y + 1;
        if (canMove(currentBlock.position.x, newY)) {
            setCurrentBlock(prev => ({ ...prev, position: { ...prev.position, y: newY } }));
        } else {
            lockBlock();
            setCurrentBlock(generateBlock());
        }
    };

    const canMove = (x, y, shape = currentBlock.shape) => {
        for (let rIdx = 0; rIdx < shape.length; rIdx++) {
            for (let cIdx = 0; cIdx < shape[rIdx].length; cIdx++) {
                if (shape[rIdx][cIdx]) {
                    const newY = y + rIdx;
                    const newX = x + cIdx;
                    if (
                        newX < 0 || 
                        newX >= 10 || 
                        newY >= 20 || 
                        (newY >= 0 && board[newY][newX])
                    ) {
                        return false;
                    }
                }
            }
        }
        return true;
    };
    

    const lockBlock = () => {
        const newBoard = [...board];
        currentBlock.shape.forEach((row, rIdx) => {
            row.forEach((cell, cIdx) => {
                if (cell) {
                    newBoard[currentBlock.position.y + rIdx][currentBlock.position.x + cIdx] = currentBlock.color;
                }
            });
        });
        setBoard(newBoard);
    };

    const moveLeft = () => {
        if (canMove(currentBlock.position.x - 1, currentBlock.position.y)) {
            setCurrentBlock(prev => ({ ...prev, position: { x: prev.position.x - 1, y: prev.position.y } }));
        }
    };

    const moveRight = () => {
        if (canMove(currentBlock.position.x + 1, currentBlock.position.y)) {
            setCurrentBlock(prev => ({ ...prev, position: { x: prev.position.x + 1, y: prev.position.y } }));
        }
    };

    const rotate = () => {
        const newRotationIndex = (currentBlock.rotationIndex + 1) % currentBlock.rotations.length;
        const newShape = currentBlock.rotations[newRotationIndex];
        if (canMove(currentBlock.position.x, currentBlock.position.y, newShape)) {
            setCurrentBlock(prev => ({
                ...prev,
                shape: newShape,
                rotationIndex: newRotationIndex
            }));
        }
    };
    

    const drop = () => {
        const newY = currentBlock.position.y + 1;
        if (canMove(currentBlock.position.x, newY)) {
            setCurrentBlock(prev => ({ ...prev, position: { x: prev.position.x, y: newY } }));
        }
    };

    return (
        <div>
            <div className="game-board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="game-row">
                        {row.map((cell, cellIndex) => (
                            <div
                                key={cellIndex}
                                className={`game-cell ${cell ? "filled" : "empty"}`}
                                style={{
                                    backgroundColor: cell ? cell : "transparent",
                                    border: "1px solid #ccc"
                                }}
                            >
                                {currentBlock.position.y === rowIndex && currentBlock.shape.map((blockRow, rIdx) => (
                                    blockRow.map((blockCell, cIdx) => (
                                        blockCell && currentBlock.position.x + cIdx === cellIndex ? (
                                            <div key={`${cellIndex}-${rIdx}`} style={{ backgroundColor: currentBlock.color, width: '100%', height: '100%' }} />
                                        ) : null
                                    ))
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="controls">
                <button onClick={moveLeft}>Left</button>
                <button onClick={moveRight}>Right</button>
                <button onClick={rotate}>Rotate</button>
                <button onClick={drop}>Drop</button>
            </div>
        </div>
    );
};

export default GameBoard;
