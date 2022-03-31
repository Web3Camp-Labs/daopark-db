import * as fs from 'fs';
import 'dotenv/config';
import { Octokit } from './octkit';
import { GithubKV } from "github-keyvalue";

async function main() {

  console.log("parse issue");

  let tmpissue = JSON.parse(fs.readFileSync("./tmp-issue.json", 'utf8'));
  let issue_number = tmpissue.issue_no;
  let daojson = tmpissue.issue_body;

  daojson['DAOIndex'] = issue_number;
  daojson['DAOStatus'] = 'pending';

  let owner = 'web3-camp';
  let repo = 'test-issue';
  let branch = 'db';

  // check if the dao is already in the list
  // If one of the following field conflicts, the dao is already in the list
  // TokenContractAddress
  // Github
  // OrangeDAO
  // Website
  let db = new GithubKV({ token: process.env.PERSONAL_TOKEN, owner, repo, branch });
  let alldaos = await db.list();
  console.log(alldaos);

  // check if dao already existed!
  let notfound = true;
  for (let item of alldaos) {
    let dao = item.data;
    // if (dao.TokenContractAddress == daojson.TokenContractAddress ||
    if (
      dao.Github == daojson.Github ||
      dao.Name == daojson.Name ||
      dao.Website == daojson.Website) {
      notfound = false;
      break;
    }
  }

  if (!notfound) {
    let octokit = new Octokit({ auth: `${process.env.PERSONAL_TOKEN}` });
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number,
      body: `Your DAO is already in the list. Please check the list and resubmit.`
    });
    console.log("DAO already in the list");
    return;
  }

  let id = await db.add(daojson);
  console.log("Added DAO: ", id);

  daojson['DAOStatus'] = 'approved';
  fs.writeFileSync(`${id}.tmp`, JSON.stringify(daojson, null, 2), 'utf8');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });