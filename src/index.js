import { getUserName } from './cli/args.js';

const userName = getUserName();
console.log(`Welcome to the File Manager, ${userName}!`);