import * as os from 'os';

export const osMethods = async mode => {
  switch (mode) {
    case 'EOL':
      const osEOL = JSON.stringify(os.EOL);
      console.log(`Default system End-Of-Line is ${osEOL}`);
      break;
    case 'cpus':
      const osCpus = os.cpus();
      console.log(`Overall amount of CPUS is ${osCpus.length}`);
      osCpus.forEach((proc, index) => {
        console.log(`${index + 1}:`);
        console.log(`Model: ${proc.model}`);
        console.log(`Clock rate is ${proc.speed} GHz`);
      })
      break;
    default:
  } 
}