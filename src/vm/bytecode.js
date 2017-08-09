// Maths
export const ADD = 'ADD'; // Add top two values of stack
export const SUB = 'SUB'; // Subtract top two values of stack
export const MUL = 'MUL'; // Multiply top two values of stack
export const DIV = 'DIV'; // Divide top value of stack by next

// Conditionals
export const EQL = 'EQL'; // Pop top two values, push 1 if they're equal, else push 0
export const GTR = 'GTR'; // Pop top two values, push 1 if first is greater than second, else push 0
export const LSS = 'LSS'; // Pop top two values, push 1 if first is less than second, else push 0

export const JMP = 'JMP'; // Jump to a new position
export const BCH = 'BCH'; // Pop a value off the stack and jump if it's not zero
export const PSH = 'PSH'; // Push a value onto the stack
export const POP = 'POP'; // Pop a value off the stack

// Misc
export const NOP = 'NOP'; // No Operation
export const HLT = 'HLT'; // Halt running
