import { getUserName } from './cli/args.js';
import * as readline from 'readline';

const userName = getUserName();
console.log(`Welcome to the File Manager, ${userName}!`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'You are currently in path_to_working_directory\n'
});

rl.prompt();
    
rl.on('line', line => {
  if (line === '.exit') rl.close();
  else {
    rl.prompt();
  }
});

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}!`);
});