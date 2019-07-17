const port = 4000;
const app = require('./api/index.js');

app.listen(4000, () => {
  console.log(`Running a GraphQL API server at localhost:${port}/api`);
});
