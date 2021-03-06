const dotenv = require('dotenv');
const app = require('./config/server');

const {connectDb} = require('./models/dao/index');

dotenv.config();

const port = process.env.PORT;

connectDb().then(async () => {
  app.listen(port, () => {
    console.log('server started on port: ' + port);
  });
});
