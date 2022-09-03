# DAO Park database

Here is the repo to store all the submissions.

We use github repo as database to handle all the data needed for DAO park project. To achieve this goal, we use two other projects, [gitrows](https://gitrows.com/) and [github-keyvalue](https://github.com/xrdavies/github-keyvalue)


## How it works

Each time when there is a new issue created, there will be an action to push notification to tg group where we both can be notified, at the same time there will be a new PR created based on the issue. We will review and submitted request in the new issue, and approve the related PR, then another action will handle the PR and merge the new added DAO to the database. All the data will be stored in **db** branch.

## Submit a new DAO

### Way #1

Go to [https://daopark.xyz](https://daopark.xyz) and login with your github account, then click submit new DAO. This is the easiest way to add new DAOs.


### Way #2

Go fire a new issue in this repo as below format and mark it with `daopark` label. If without `daopark` lable, it will not be handled by bot.

``` json
{
"Name": "<DAO's NAME required>",
"Slug": "<DAO's Slug/Handle required>",
"Github": "<DAO's github org required>",
"Tagline": "<DAO's tagline required>",
"Mission": "<DAO's mission required>",
"TokenSymbol": "<DAO's token if have>",
"TokenContractAddress": "<DAO's token contract address if have>",
"Logo": "<DAO's logo url required>",
"CoverPhoto": "<DAO's cover url required>",
"Twitter": "<DAO's twitter handle if have>",
"Discord": "<DAO's discord if have>",
"Mirror": "<DAO's mirror if have>",
"Website": "<DAO's website link if have>",
"Email": "<DAO's contact person if have>"
}
```

## How to contribute

Please follow [our twitter](https://twitter.com/web3camp)
