import * as path from 'path';

import { getPathArr } from './pathArr.js';
import { deleteLastElement } from './del-last-el.js';

export const cd = (dir, currentPathArr) => {
  dir = path.normalize(dir);
  if (path.isAbsolute(dir)) return getPathArr(dir);
  else {
    if (dir === '..') {
      return deleteLastElement(currentPathArr);
    } else if (true) {
      
    } else {
      console.log('\x1b[31mInvalid input');
      return currentPathArr;
    }
  }
}