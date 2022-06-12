import * as path from 'path';
import { access } from 'fs/promises';

import { getPathArr } from './pathArr.js';
import { deleteLastElement } from './del-last-el.js';
import { getPath } from './path.js';

export const cd = async (dir, currentPathArr) => {

  dir = path.normalize(dir);
  let newDir = currentPathArr;
  if (path.isAbsolute(dir)) {
    try {
      await access(dir);
      newDir = getPathArr(dir);
    } catch {
      console.log('\x1b[31mInvalid path input');
    }
    return newDir;
  }
  else {
    if (dir === '..') {
      return deleteLastElement(currentPathArr);
    } else if (false) {

    } else {
      console.log('\x1b[31mInvalid input');
      return currentPathArr;
    }
  }
}