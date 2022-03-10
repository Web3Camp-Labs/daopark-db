import * as fs from 'fs';

async function main() {

  console.log("parse issue");

  console.log("argv: ", process.argv.slice(2)[0]);

  let daojson = JSON.parse(fs.readFileSync("./dao.json", 'r'));

  fs.writeFileSync(JSON.stringify(daojson, null, space=2));
}

(async function () {
  await main();
}());