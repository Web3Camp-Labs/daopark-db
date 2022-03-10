import * as fs from 'fs';

async function main() {

  console.log("parse issue");

  console.log("argv: ", process.argv.slice(2)[0], process.argv.slice(2)[1]);

  let issue_no = process.argv.slice(2)[0];
  let issue_body = process.argv.slice(2)[1];

  let added_daojson = JSON.parse(issue_body);
  added_daojson['DAOIndex'] = issue_no;

  let daojson = JSON.parse(fs.readFileSync("./dao.json", 'utf8'));

  daojson.push(added_daojson);

  fs.writeFileSync("./dao.json", JSON.stringify(daojson, null, 2), 'utf8');
}

(async function () {
  await main();
}());