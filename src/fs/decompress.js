import * as path from 'path';
import { access, stat } from 'fs/promises';
import { mkdir } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { BrotliDecompress } from 'zlib';

export const decompress = async (oldFilePath, newDirName, currentDir) => {
  const printCurrentDir = () => console.log(`\x1b[37m\nYou are currently in ${currentDir}`);

  const copyOldFile = async () => {
    const prevFilePath = oldFilePath;
    const nextFilePath = path.join(newDirName, path.parse(oldFilePath).base);
    try {
      await mkdir(newDirName, {
        recursive: true
      });
    } catch (error) {
      console.log('Operation is not permitted!');
      printCurrentDir();
    }

    const myReadStream = createReadStream(prevFilePath);
    const myWritableStream = createWriteStream(nextFilePath);

    myReadStream.on('error', () => {
      console.log(`Operation failed`);
    });

    myWritableStream.on('error', () => {
      console.log(`Operation failed`);
    });

    myReadStream.pipe(BrotliDecompress()).pipe(myWritableStream);

    myWritableStream.on('finish', () => {
      console.log('File decompressed');
      printCurrentDir();
    });
  }

  const checkDir = async file => {
    try {
      await access(file);
      const stats = await stat(file);
      if (stats.isFile()) copyOldFile();
      else {
        console.log(`\x1b[31m${file} is not a file`);
        printCurrentDir();
      }
    } catch {
      console.log('\x1b[31mInvalid path_to_file input');
      printCurrentDir();
    }
  }

  oldFilePath = path.normalize(oldFilePath);
  newDirName = path.normalize(newDirName);
  if (!path.isAbsolute(oldFilePath)) oldFilePath = path.join(currentDir, oldFilePath);
  if (!path.isAbsolute(newDirName)) newDirName = path.join(currentDir, newDirName);
  checkDir(oldFilePath);
}