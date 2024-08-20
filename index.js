import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient;
const Mongo_username = process.env["MONGO_USERNAME"];  
const Mongo_password = process.env["MONGO_PASSWORD"];
const uri = `mongodb+srv://${Mongo_username}:${Mongo_password}@cluster0.z3lqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const port = 8000;

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    //useNewUrlParser: true
  }
)
  .catch(err => {
  console.error(err.stack);
  process.exit(1);
})
  .then(async client => {
    await ReviewsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    });
  });