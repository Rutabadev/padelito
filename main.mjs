import { handler } from "./index.mjs";

const horaire = process.argv
  .find((arg) => arg.startsWith("--horaire="))
  ?.replace("--horaire=", "");

handler({ horaire });
