const { Client } = require('@notionhq/client');
const dotenv = require('dotenv')
dotenv.config()   // dotenv提供了 config 函数，用于加载配置，别名 load

// const notion = new Client({ auth: process.env.NOTION_API_KEY });
const notion = new Client({ auth: "secret_PtfPQolDWSViYUd08pqg26ab1vseidEoGjf1qFwIrBy" });
// console.log( notion)

(async () => {
  const databaseId = '4a21c0baf0b54c7dafe7f4ead4bc9653';
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [

      ],
    },
  });
  console.log(response.results[5].properties.名字);
})();