import * as fs from 'fs';
import 'dotenv/config';
import { GithubKV } from "github-keyvalue";

async function main() {

  console.log("parse issue");

  // console.log("argv: ", process.argv.slice(2)[0], process.argv.slice(2)[1]);

  // let issue_no = process.argv.slice(2)[0];
  // let issue_body = process.argv.slice(2)[1];

  let tmpissue = JSON.parse(fs.readFileSync("./test-issue.json", 'utf8'));
  let issue_no = tmpissue.issue_no;
  let issue_body = tmpissue.issue_body;

  // let daojson = JSON.parse(issue_body);
  let daojson = issue_body;

  daojson['DAOIndex'] = issue_no;
  daojson['DAOStatus'] = 'pending';

  // check if the dao is already in the list
  // If one of the following field conflicts, the dao is already in the list
  // TokenContractAddress
  // Github
  // OrangeDAO
  // Website
  let db = new GithubKV({ token: process.env.PERSONAL_TOKEN, owner: 'web3-camp', repo: 'test-issue', branch: 'db' });
  let alldaos = await db.list();
  console.log(alldaos);

  let notfound = true;
  for (let item of alldaos) {
    let dao = item.data;
    if (dao.TokenContractAddress == daojson.TokenContractAddress
      || dao.Github == daojson.Github
      || dao.Name == daojson.Name
      || dao.Website == daojson.Website) {
      notfound = false;
      break;
    }
  }

  if (!notfound) {
    console.log("DAO already in the list");
    return;
  }

  let id = await db.add(daojson);
  console.log("Added DAO: ", id);

  // fs.writeFileSync("./dao.json", JSON.stringify(daojson, null, 2), 'utf8');

  daojson['DAOStatus'] = 'approved';
  fs.writeFileSync(`${id}.tmp`, JSON.stringify(daojson, null, 2), 'utf8');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });