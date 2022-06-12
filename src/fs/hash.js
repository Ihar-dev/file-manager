import * as path from 'path';
import { access, stat } from 'fs/promises';
import { createReadStream } from 'fs';
import { stdout } from 'process';
const { createHash } = await import('crypto');

export const calculateHash = async (filePath, currentDir) => {
  const printCurrentDir = () => console.log(`\x1b[37m\nYou are currently in ${currentDir}`);

  const hashFile = async () => {
    const hash = createHash('sha256');
    const input = createReadStream(filePath);
    input.pipe(hash).setEncoding('hex').pipe(stdout);

    input.on('end', () => {
      console.log();
      printCurrentDir();
    });
  }

  const checkDir = async file => {
    try {
      await access(file);
      const stats = await stat(file);
      if (stats.isFile()) hashFile();
      else {
        console.log(`\x1b[31m${file} is not a file`);
        printCurrentDir();
      }
    } catch {
      console.log('\x1b[31mInvalid path_to_file input');
      printCurrentDir();
    }
  }

  filePath = path.normalize(filePath);
  if (!path.isAbsolute(filePath)) filePath = path.join(currentDir, filePath);
  checkDir(filePath);
}