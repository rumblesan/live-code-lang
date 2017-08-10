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

// Stack and Heap manipulation
export const PSH = 'PSH'; // Push a value onto the stack
export const POP = 'POP'; // Pop a value off the stack
export const LOD = 'LOD'; // Load a value from the heap
export const SAV = 'SAV'; // Save a value to the heap

// List Ops
export const LST = 'LST'; // Create a list object
export const LEN = 'LEN'; // Get the length of the list
export const IDX = 'IDX'; // Get a value from a given index in the list
export const SDX = 'SDX'; // Save a value to a given index in the list
export const LPO = 'LPO'; // Pop a value from a list
export const LPU = 'LPU'; // Push a value to a list

// Misc
export const NOP = 'NOP'; // No Operation
export const HLT = 'HLT'; // Halt running
