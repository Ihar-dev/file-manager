import * as path from 'path';
import { access, stat } from 'fs/promises';

import { getPathArr } from './pathArr.js';
import { deleteLastElement } from './del-last-el.js';

export const cd = async (dir, currentPathArr) => {

  dir = path.normalize(dir);
  let newPathArr = currentPathArr;
  if (path.isAbsolute(dir)) {
    try {
      await access(dir);
      const stats = await stat(dir);
      if (stats.isDirectory()) newPathArr = getPathArr(dir);
      else console.log('\x1b[31mIt is not a directory');
    } catch {
      console.log('\x1b[31mInvalid path input');
    }
    return newPathArr;
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