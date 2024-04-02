// src/main/index.ts
import {SecurityUtils, AWS4SigningKeyProps} from './SecurityUtils';

export { StringUtils } from './StringUtils';
export { ValidationUtil } from './ValidationUtil';
export { GlobalCounter } from './GlobalCounter';
export { ExecUtil } from './ExecUtil';
export { uniqueId, idMaker } from './random';
import  PopupWindow from './PopupWindow';



function add(a: number, b: number): number {
    return a + b;
}

export { SecurityUtils, AWS4SigningKeyProps, add, PopupWindow };
