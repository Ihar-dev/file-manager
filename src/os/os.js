import * as os from 'os';

export const osMethods = async mode => {
  switch (mode) {
    case 'EOL':
      const osEOL = JSON.stringify(os.EOL);
      console.log(`Default system End-Of-Line is ${osEOL}`);
      break;
    default:
  } 
}