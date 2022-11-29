import { handler } from './index.mjs';

const horaireParamIndex = process.argv.indexOf('--horaire') + 1;
const horaire = horaireParamIndex ? process.argv[horaireParamIndex] : undefined;

console.log(`Horaire: ${horaire}`);

handler({ horaire });