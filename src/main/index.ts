// src/main/index.ts

import StringUtils from "./StringUtils";
import ValidationUtil from "./ValidationUtil";
import SecurityUtil from "./SecurityUtil";
import {sequence, GlobalCounter} from "./GlobalCounter";
import { uniqueId, idMaker } from "./random";
import PopupWindow from "./PopupWindow";
import ExecUtil from "./ExecUtil";


function add(a: number, b: number): number {
    return a + b;
}

export { add, StringUtils, ValidationUtil, SecurityUtil, sequence, GlobalCounter , ExecUtil, uniqueId, idMaker }
