const { handler } = require('./index.js');

const horaireParamIndex = process.argv.indexOf('--horaire') + 1;
const horaire = horaireParamIndex ? process.argv[horaireParamIndex] : undefined;

handler({ horaire });