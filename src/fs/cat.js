import * as path from 'path';
import { access, stat } from 'fs/promises';
import { open } from 'fs/promises';

export const cat = async (dir, currentDir) => {
  const printCurrentDir = () => console.log(`\x1b[37m\nYou are currently in ${currentDir}`);

  const readFile = async dir => {
    try {
      const fd = await open(dir);
      const myReadStream = fd.createReadStream();

      myReadStream.on('data', chunk => {
        const textData = Buffer.from(chunk).toString();
        process.stdout.write(textData + '\n');
      });

      myReadStream.on('end', () => printCurrentDir());
    } catch (error) {
      process.stdout.write('Read stream error\n')
    }
  }

  const checkDir = async dir => {
    try {
      await access(dir);
      const stats = await stat(dir);
      if (stats.isFile()) readFile(dir);
      else {
        console.log(`\x1b[31m${dir} is not a file`);
        printCurrentDir();
      }
    } catch {
      console.log('\x1b[31mInvalid path input');
      printCurrentDir();
    }
  }

  dir = path.normalize(dir);
  if (!path.isAbsolute(dir)) dir = path.join(currentDir, dir);
  checkDir(dir);
}