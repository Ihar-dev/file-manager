import * as path from 'path';
import { access, readdir, stat } from 'fs/promises';

export const list = async currentDir => {
  const printCurrentDir = () => console.log(`\x1b[37m\nYou are currently in ${currentDir}`);

  const listDirectory = async () => {
    const files = await readdir(currentDir);
    const promiseArr = files.map(file => { return new Promise(async (resolve, reject) => {
        const filePath = path.join(currentDir, file);
        try {
          await access(filePath);
          const stats = await stat(filePath);
          (stats.isDirectory()) ? console.log(`\x1b[33m${file}`) : console.log(`\x1b[36m${file}`);
          resolve();
        } catch {
          console.log(`\x1b[35m${file}`);
          reject();
        } 
      });
    });
    await Promise.allSettled(promiseArr);
    printCurrentDir();
  }

  try {
    await access(currentDir);
    listDirectory();
  } catch {
    console.log('\x1b[31mFS operation failed');
  } 
};