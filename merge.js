import * as fs from 'fs';
import 'dotenv/config';
import { GithubKV } from "github-keyvalue";

async function main() {
  let db = new GithubKV({ token: process.env.PERSONAL_TOKEN, owner: 'web3-camp', repo: 'test-issue', branch: 'db' });
  let alldaos = await db.list();
  console.log(alldaos);

  let approvedList = alldaos.filter((item) => {return item.data.DAOStatus == 'approved'}).map((item) => { return item.data});
  fs.writeFileSync("dao.json", JSON.stringify(approvedList, null, 2), 'utf8');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });