// src/main/index.ts
import SecurityUtil from './SecurityUtil';

export { StringUtils } from './StringUtils';
export { ValidationUtil } from './ValidationUtil';
export { GlobalCounter } from './GlobalCounter';
export { uniqueId, idMaker } from './random';
import  PopupWindow from './PopupWindow';



function add(a: number, b: number): number {
    return a + b;
}

export { SecurityUtil, add, PopupWindow };
