import * as path from 'path';
import { access } from 'fs/promises';
import { readdir } from 'fs/promises';
import * as fsPromises from 'fs/promises';

export const list = async currentDir => {
  const printCurrentDir = () => console.log(`\x1b[37m\nYou are currently in ${currentDir}`);

  const listDirectory = async () => {
    const files = await readdir(currentDir);
    files.forEach(async (file, index) => {
      const filePath = path.join(currentDir, file);
      try {
        await access(filePath);
        const stats = await fsPromises.stat(filePath);
        (stats.isDirectory()) ? console.log(`\x1b[33m${file}`) : console.log(`\x1b[36m${file}`);
        if (index === files.length - 1) printCurrentDir();
      } catch {
        console.log(`\x1b[35m${file}`);
        if (index === files.length - 1) printCurrentDir();
      } 
    });
  }

  try {
    await access(currentDir);
    listDirectory();
  } catch {
    console.log('\x1b[31mFS operation failed');
  } 
};