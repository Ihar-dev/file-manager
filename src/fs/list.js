import * as path from 'path';
import { access } from 'fs/promises';
import { readdir } from 'fs/promises';
import * as fsPromises from 'fs/promises';

export const list = async (currentPathArr, currentDir) => {
  let dirPath = ''; 
  (currentPathArr.length > 1) ? dirPath = path.join(...currentPathArr) : dirPath = currentPathArr[0];
  if (currentPathArr.length === 1 && path.sep === '\\') dirPath = `${dirPath}\\`;
  console.log(dirPath);
  const listDirectory = async () => {
    const files = await readdir(dirPath);
    files.forEach(async (file, index) => {
      const filePath = path.join(dirPath, file);
      try {
        await access(filePath);
        const stats = await fsPromises.stat(filePath);
        (stats.isDirectory()) ? console.log(`\x1b[33m${file}`) : console.log(`\x1b[36m${file}`);
      } catch {
        console.log(`\x1b[35m${file}`);
      }
      if (index === files.length - 1) console.log(`\x1b[37m\nYou are currently in ${currentDir}`);
    });
  }

  try {
    await access(dirPath);
    listDirectory();
  } catch {
    console.log('\x1b[31mFS operation failed');
  } 
};