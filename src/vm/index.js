import {
  ADD,
  SUB,
  MUL,
  DIV,
  EQL,
  GTR,
  LSS,
  JMP,
  BCH,
  CLL,
  RTN,
  PSH,
  POP,
  LOD,
  SAV,

  // LST,
  // LEN,
  // IDX,
  // SDX,
  // LPO,
  // LPU,
  NOP,
  HLT,
} from 'vm/bytecode/types';

const VMNULL = 0;

export function runVM(program) {
  let running = true;
  let status = 0;

  const callStack = [];
  const opStack = [];
  const heap = [];

  let counter = 0;

  let A;
  let B;

  while (running) {
    let op = program[counter];

    switch (op.type) {
      case ADD:
        if (op.A) {
          A = op.A;
        } else {
          A = opStack.pop();
        }
        if (op.B) {
          B = op.B;
        } else {
          B = opStack.pop();
        }
        opStack.push(A + B);
        counter += 1;
        break;
      case SUB:
        if (op.A) {
          A = op.A;
        } else {
          A = opStack.pop();
        }
        if (op.B) {
          B = op.B;
        } else {
          B = opStack.pop();
        }
        opStack.push(A - B);
        counter += 1;
        break;
      case MUL:
        if (op.A) {
          A = op.A;
        } else {
          A = opStack.pop();
        }
        if (op.B) {
          B = op.B;
        } else {
          B = opStack.pop();
        }
        opStack.push(A * B);
        counter += 1;
        break;
      case DIV:
        if (op.A) {
          A = op.A;
        } else {
          A = opStack.pop();
        }
        if (op.B) {
          B = op.B;
        } else {
          B = opStack.pop();
        }
        opStack.push(A / B);
        counter += 1;
        break;
      case EQL:
        if (op.A) {
          A = op.A;
        } else {
          A = opStack.pop();
        }
        if (op.B) {
          B = op.B;
        } else {
          B = opStack.pop();
        }
        opStack.push(A === B ? 1 : 0);
        counter += 1;
        break;
      case GTR:
        if (op.A) {
          A = op.A;
        } else {
          A = opStack.pop();
        }
        if (op.B) {
          B = op.B;
        } else {
          B = opStack.pop();
        }
        opStack.push(A > B ? 1 : 0);
        counter += 1;
        break;
      case LSS:
        if (op.A) {
          A = op.A;
        } else {
          A = opStack.pop();
        }
        if (op.B) {
          B = op.B;
        } else {
          B = opStack.pop();
        }
        opStack.push(A < B ? 1 : 0);
        counter += 1;
        break;
      case JMP:
        if (op.A) {
          A = op.A;
        } else {
          A = opStack.pop();
        }
        counter = A;
        break;
      case BCH:
        if (op.A) {
          A = op.A;
        } else {
          A = opStack.pop();
        }
        if (op.B) {
          B = op.B;
        } else {
          B = opStack.pop();
        }
        if (A >= 1) {
          counter = B;
        } else {
          counter += 1;
        }
        break;
      case CLL:
        if (op.A) {
          A = op.A;
        } else {
          A = opStack.pop();
        }
        // Want to return to next instruction
        callStack.push(counter + 1);
        counter = A;
        break;
      case RTN:
        counter = callStack.pop();
        break;
      case PSH:
        if (op.A) {
          opStack.push(op.A);
        } else {
          opStack.push(VMNULL);
        }
        counter += 1;
        break;
      case POP:
        opStack.pop();
        counter += 1;
        break;
      case LOD:
        if (op.A) {
          A = op.A;
        } else {
          A = opStack.pop();
        }
        opStack.push(heap[A]);
        counter += 1;
        break;
      case SAV:
        if (op.A) {
          A = op.A;
        } else {
          A = opStack.pop();
        }
        if (op.B) {
          B = op.B;
        } else {
          B = opStack.pop();
        }
        heap[A] = B;
        counter += 1;
        break;
      case NOP:
        counter += 1;
        break;
      case HLT:
        running = false;
        break;
    }
  }

  return status;
}
